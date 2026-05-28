import Link from "next/link";
import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { blogPosts } from "@/lib/content/blog";

export const metadata: Metadata = {
  title: "Foundry Blog - AI startup execution guides",
  description: "SEO guides for AI startup tools, startup validation, SaaS marketing, Reddit growth, MVP building, and founder execution.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <p className="text-sm font-semibold uppercase tracking-[0.34em] text-cyan-200">Founder SEO Library</p>
      <h1 className="text-balance mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.055em] text-white md:text-6xl">Practical guides for building and growing with AI.</h1>
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <Card className="h-full transition hover:border-cyan-300/40 hover:bg-white/[0.1]">
              <CardContent>
                <h2 className="text-lg font-semibold text-white">{post.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-400">{post.meta}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
