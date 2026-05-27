import type { Metadata } from "next";
import { ToolPage } from "@/components/foundry/tool-page";

export const metadata: Metadata = {
  title: "Growth Engine",
  description: "Generate Reddit, LinkedIn, X, Product Hunt, cold outreach, and email launch content.",
  alternates: { canonical: "/growth-engine" },
};

export default function Page() {
  return <ToolPage tool="growth-engine" />;
}
