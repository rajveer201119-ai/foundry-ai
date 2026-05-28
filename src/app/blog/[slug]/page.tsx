import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { JsonLd } from "@/components/foundry/json-ld";
import { getPost, blogPosts } from "@/lib/content/blog";
import { siteUrl } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.meta,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { title: post.title, description: post.meta, type: "article", url: siteUrl(`/blog/${post.slug}`) },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.meta,
          url: siteUrl(`/blog/${post.slug}`),
          author: { "@type": "Organization", name: "Foundry" },
        }}
      />
      <Link href="/blog" className="text-sm font-medium text-cyan-200">Back to blog</Link>
      <h1 className="text-balance mt-5 text-4xl font-semibold tracking-[-0.055em] text-white md:text-6xl">{post.title}</h1>
      <p className="mt-4 text-lg leading-8 text-slate-300">{post.meta}</p>
      <article className="mt-10 space-y-9">
        {post.headings.map((heading, index) => (
          <section key={heading}>
            <h2 className="text-2xl font-semibold text-white">{heading}</h2>
            <p className="mt-3 leading-8 text-slate-300">{post.content[index]}</p>
          </section>
        ))}
      </article>
      <div className="glass-ring mt-10 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-5 shadow-2xl shadow-cyan-950/20">
        <p className="font-medium text-white">Build the plan in Foundry</p>
        <p className="mt-2 text-sm text-slate-300">
          Turn this topic into execution steps with the <Link className="text-cyan-200" href="/execution-planner">Execution Planner</Link> or create search assets with the <Link className="text-cyan-200" href="/seo-engine">SEO Engine</Link>.
        </p>
      </div>
    </main>
  );
}
