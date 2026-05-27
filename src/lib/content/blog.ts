import { slugify } from "@/lib/utils";

const topics = [
  "AI startup tools for solo founders",
  "Startup validation with AI",
  "Solo founder growth systems",
  "SaaS marketing for early products",
  "SEO for SaaS landing pages",
  "Reddit marketing for founders",
  "AI cofounders and execution workflows",
  "Product launch strategy",
  "Getting your first 100 users",
  "Building MVPs with AI",
  "Founder dashboards that drive execution",
  "Conversion copy for indie SaaS",
  "Product Hunt launch planning",
  "LinkedIn content for startup founders",
  "Cold outreach for early SaaS",
  "Pricing strategy for AI SaaS",
  "Market research prompts for founders",
  "Landing page trust signals",
  "SaaS keyword research",
  "Founder roadmap planning",
  "No-code MVP validation",
  "Vercel deployment for SaaS MVPs",
  "Supabase auth for solo founders",
  "AI-generated launch checklists",
  "Community-led SaaS growth",
  "Startup positioning frameworks",
  "Indie hacker execution habits",
  "Blog ideas for SaaS SEO",
  "Customer interview scripts",
  "AI COO workflows for startups",
];

export type BlogPost = {
  title: string;
  slug: string;
  meta: string;
  headings: string[];
  content: string[];
};

export const blogPosts: BlogPost[] = topics.map((topic) => {
  const title = `${topic}: a practical Foundry guide`;
  const slug = slugify(topic);
  return {
    title,
    slug,
    meta: `A practical guide to ${topic.toLowerCase()} for solo founders building, launching, and growing lean SaaS products.`,
    headings: ["Why it matters", "The operating system", "A weekly workflow", "What to measure"],
    content: [
      `${topic} matters because solo founders have limited time and cannot afford vague strategy. The highest-leverage work is the work that creates proof: interviews, landing page tests, conversion improvements, content assets, and direct customer conversations.`,
      "Foundry treats the founder workflow as an execution system. Start with a narrow audience, define the painful job, choose one channel, and turn the strategy into daily tasks. AI is useful when it compresses research and drafting into decisions you can act on the same day.",
      "A strong weekly loop includes one validation activity, one product improvement, one public learning, and one distribution experiment. Use the idea analyzer for positioning, the growth engine for channel assets, and the execution planner to decide the next best action.",
      "Measure signal, not activity. Track qualified conversations, waitlist conversions, demo requests, activation, paid intent, search impressions, and content saves. If a metric does not change a decision, it is probably noise at this stage.",
    ],
  };
});

export function getPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
