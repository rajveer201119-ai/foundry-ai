import type { Metadata } from "next";
import { ToolPage } from "@/components/foundry/tool-page";

export const metadata: Metadata = {
  title: "New Idea Analyzer",
  description: "Validate a startup idea and generate MVP prompts, pricing, and launch checklists.",
  alternates: { canonical: "/idea-analyzer" },
};

export default function Page() {
  return <ToolPage tool="idea-analyzer" />;
}
