export type ToolKey = "idea-analyzer" | "url-analyzer" | "growth-engine" | "seo-engine" | "execution-planner";

export const toolConfigs = {
  "idea-analyzer": {
    title: "New Idea Analyzer",
    eyebrow: "Validation",
    description: "Turn a raw startup idea into validation, MVP prompts, pricing, and launch actions.",
    endpoint: "/api/idea-analyzer",
    fields: [
      ["idea", "Startup idea", "AI workspace for freelance designers"],
      ["audience", "Target audience", "Solo creative operators"],
      ["problem", "Problem solved", "Clients, files, and revisions are scattered"],
      ["stage", "Product stage", "Idea"],
      ["goal", "Goal", "Validate demand and build an MVP"],
      ["platform", "Preferred platform", "Next.js on Vercel"],
    ],
  },
  "url-analyzer": {
    title: "Existing App URL Analyzer",
    eyebrow: "Conversion",
    description: "Analyze positioning, SEO, CTA clarity, trust, conversion bottlenecks, and growth opportunities.",
    endpoint: "/api/url-analyzer",
    fields: [
      ["url", "App URL", "https://example.com"],
      ["productName", "Product name", "LaunchPilot"],
      ["goal", "Current goal", "Increase trials"],
      ["problem", "Current problem", "Traffic is not converting"],
    ],
  },
  "growth-engine": {
    title: "Growth Engine",
    eyebrow: "Distribution",
    description: "Generate Reddit, LinkedIn, X, Product Hunt, outreach, and email launch assets.",
    endpoint: "/api/growth-engine",
    fields: [
      ["product", "Product", "AI execution copilot for founders"],
      ["audience", "Audience", "Solo founders and indie hackers"],
      ["goal", "Campaign goal", "Get first 100 users"],
      ["tone", "Voice", "Useful, specific, founder-to-founder"],
    ],
  },
  "seo-engine": {
    title: "SEO Engine",
    eyebrow: "Search",
    description: "Generate keyword clusters, metadata, FAQs, internal links, and blog architecture.",
    endpoint: "/api/seo-engine",
    fields: [
      ["product", "Product", "Foundry"],
      ["category", "Category", "AI startup tool"],
      ["audience", "Audience", "Solo founders"],
      ["goal", "SEO goal", "Rank for startup validation and AI MVP prompts"],
    ],
  },
  "execution-planner": {
    title: "Execution Planner",
    eyebrow: "Operating system",
    description: "Create a 7-day plan, 30-day growth sprint, six-month roadmap, and next best action.",
    endpoint: "/api/execution-planner",
    fields: [
      ["product", "Product", "Founder copilot SaaS"],
      ["stage", "Stage", "Pre-launch"],
      ["constraints", "Constraints", "Solo founder, 10 hours per week"],
      ["goal", "Goal", "Launch MVP and close 10 paid users"],
    ],
  },
} satisfies Record<ToolKey, {
  title: string;
  eyebrow: string;
  description: string;
  endpoint: string;
  fields: [string, string, string][];
}>;

export const metricCards = [
  { label: "Startup score", value: 82, hint: "Validation strength" },
  { label: "Growth score", value: 74, hint: "Distribution readiness" },
  { label: "Execution", value: 61, hint: "Plan completion" },
];
