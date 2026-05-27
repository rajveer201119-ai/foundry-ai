import type { Metadata } from "next";
import { ToolPage } from "@/components/foundry/tool-page";

export const metadata: Metadata = {
  title: "Execution Planner",
  description: "Create a 7-day action plan, 30-day growth plan, six-month roadmap, daily tasks, and milestones.",
  alternates: { canonical: "/execution-planner" },
};

export default function Page() {
  return <ToolPage tool="execution-planner" />;
}
