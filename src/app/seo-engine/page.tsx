import type { Metadata } from "next";
import { ToolPage } from "@/components/foundry/tool-page";

export const metadata: Metadata = {
  title: "SEO Engine",
  description: "Generate SaaS keywords, metadata, FAQ sections, blog ideas, and internal linking strategy.",
  alternates: { canonical: "/seo-engine" },
};

export default function Page() {
  return <ToolPage tool="seo-engine" />;
}
