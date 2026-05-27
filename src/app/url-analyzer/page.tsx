import type { Metadata } from "next";
import { ToolPage } from "@/components/foundry/tool-page";

export const metadata: Metadata = {
  title: "Existing App URL Analyzer",
  description: "Analyze positioning, landing copy, CTA clarity, SEO quality, trust signals, and conversion bottlenecks.",
  alternates: { canonical: "/url-analyzer" },
};

export default function Page() {
  return <ToolPage tool="url-analyzer" />;
}
