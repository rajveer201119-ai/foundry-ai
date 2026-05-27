import OpenAI from "openai";
import { z } from "zod";

export const requestSchema = z.record(z.string(), z.string().min(1)).refine((value) => Object.keys(value).length > 0);

type ApiResult = {
  ok: boolean;
  data: Record<string, unknown>;
  fallback: boolean;
  error?: string;
};

let client: OpenAI | null = null;

function getClient() {
  if (!process.env.OPENAI_API_KEY) return null;
  if (!client) client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  return client;
}

function bullets(items: string[]) {
  return items.map((item) => `- ${item}`).join("\n");
}

export function fallbackFor(tool: string, input: Record<string, string>) {
  const subject = input.idea || input.product || input.productName || input.url || "the product";
  const audience = input.audience || "solo founders and early users";

  const base = {
    summary: `${subject} should be positioned around one painful job, one measurable outcome, and one narrow acquisition channel before broadening the roadmap.`,
    scores: [
      { name: "Market pull", value: 78 },
      { name: "Execution clarity", value: 72 },
      { name: "Growth leverage", value: 69 },
    ],
    nextBestAction: "Interview five target users, rewrite the offer around the clearest pain, and ship one testable landing page this week.",
  };

  if (tool === "idea-analyzer") {
    return {
      ...base,
      validation: bullets([
        `Primary customer: ${audience}`,
        "Strongest test: collect five pre-orders or demo calls before building depth",
        "Risk: broad messaging will reduce urgency",
      ]),
      mvpRoadmap: ["Landing page", "Manual concierge workflow", "Self-serve project dashboard", "Usage-based upgrade path"],
      lovablePrompt: `Build a premium SaaS MVP for ${subject} with auth, dashboard, and a guided onboarding flow.`,
      cursorPrompt: `Implement a Next.js App Router MVP for ${subject}. Include typed data models, forms, API routes, and graceful empty states.`,
      vercelPrompt: `Deploy ${subject} as a Vercel-native Next.js app with environment variables, analytics-ready pages, and production metadata.`,
      pricing: "Start at $19/month for solo users, $49/month for operators who need saved projects and team sharing.",
      launchChecklist: ["Ship waitlist", "Post build-in-public thread", "Run 10 founder interviews", "Launch in two niche communities"],
    };
  }

  if (tool === "url-analyzer") {
    return {
      ...base,
      positioning: "Lead with the specific user, painful moment, and business outcome in the hero.",
      ctaClarity: "Use one primary CTA above the fold and repeat it after proof sections.",
      seoQuality: "Add intent-matched title, description, canonical URL, FAQ schema, and comparison pages.",
      bottlenecks: ["Generic headline", "Missing proof", "No risk reversal", "CTA competes with secondary links"],
      improvements: ["Rewrite hero", "Add founder/customer proof", "Add pricing anchor", "Create use-case pages"],
    };
  }

  if (tool === "growth-engine") {
    return {
      ...base,
      subreddits: ["r/SaaS", "r/Entrepreneur", "r/SideProject", "r/IndieHackers", "r/startups"],
      redditPosts: ["I built a simple workflow to turn startup ideas into weekly execution plans. What would make this actually useful?"],
      linkedIn: ["Solo founders do not need more ideas. They need a tighter execution loop: validate, build, distribute, measure, repeat."],
      xPosts: ["A useful AI founder copilot should produce tasks you can ship today, not strategy docs you never open."],
      launchAnnouncement: `${subject} is live: an AI execution system for founders who need clear next actions.`,
      productHunt: "Foundry helps solo founders validate ideas, plan MVPs, generate growth content, and execute weekly.",
      outreach: "Saw you are building in this space. I made a tool that turns founder goals into validation, SEO, and launch plans. Worth a look?",
      emailSequence: ["Problem email", "Proof email", "Launch offer email", "Objection handling email"],
    };
  }

  if (tool === "seo-engine") {
    return {
      ...base,
      keywords: ["AI startup tools", "startup validation tool", "AI cofounder", "SaaS SEO strategy", "MVP prompt generator"],
      metaTitle: `${subject} - AI Startup Execution System`,
      metaDescription: `Use ${subject} to validate startup ideas, plan MVPs, generate growth content, and build a repeatable execution system.`,
      blogTitles: ["How to validate a startup idea with AI", "The solo founder SEO checklist", "How to get your first 100 SaaS users"],
      faq: ["What is an AI founder copilot?", "How do I validate an MVP?", "Can AI help with SaaS marketing?"],
      internalLinks: ["/idea-analyzer", "/growth-engine", "/seo-engine", "/execution-planner"],
    };
  }

  return {
    ...base,
    sevenDayPlan: ["Clarify ICP", "Run interviews", "Ship landing page", "Draft offer", "Post in communities", "Review signals", "Choose build scope"],
    thirtyDayPlan: ["Weeks 1-2: validation and content", "Weeks 3-4: MVP build and sales calls"],
    sixMonthRoadmap: ["MVP", "Paid beta", "Content engine", "Automated onboarding", "Retention loops", "Scale channels"],
    dailyTasks: ["Talk to one user", "Ship one improvement", "Publish one learning", "Review one metric"],
    weeklyMilestones: ["10 interviews", "100 waitlist signups", "5 paid pilots", "Repeatable onboarding"],
  };
}

export async function generateWithFallback(tool: string, input: Record<string, string>): Promise<ApiResult> {
  const fallback = fallbackFor(tool, input);
  const openai = getClient();
  if (!openai) return { ok: true, data: fallback, fallback: true };

  try {
    const response = await openai.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content:
            "You are Foundry, an AI COO for solo founders. Return concise, useful JSON only. Use arrays for lists and include concrete next actions.",
        },
        {
          role: "user",
          content: JSON.stringify({ tool, input, requiredFallbackShape: fallback }),
        },
      ],
    });
    const text = response.output_text?.trim() || "";
    const json = JSON.parse(text.replace(/^```json|```$/g, ""));
    return { ok: true, data: json, fallback: false };
  } catch (error) {
    return {
      ok: true,
      data: fallback,
      fallback: true,
      error: error instanceof Error ? error.message : "AI generation failed",
    };
  }
}
