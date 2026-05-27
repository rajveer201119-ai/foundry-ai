import Link from "next/link";
import { ArrowRight, Check, Sparkles, Target, TrendingUp, Workflow } from "lucide-react";
import { JsonLd } from "@/components/foundry/json-ld";
import { Reveal } from "@/components/foundry/reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { siteUrl } from "@/lib/utils";

const features = [
  ["Idea validation", "Score demand, risks, competitor angles, and the best MVP path."],
  ["Growth assets", "Generate Reddit posts, LinkedIn content, X posts, outreach, and launch copy."],
  ["SEO engine", "Create keywords, metadata, FAQs, blog structures, and internal linking plans."],
  ["Execution planner", "Convert strategy into daily tasks, milestones, and a six-month roadmap."],
];

export default function Home() {
  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Foundry",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "19", priceCurrency: "USD" },
          url: siteUrl("/"),
        }}
      />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Organization", name: "Foundry", url: siteUrl("/") }} />
      <section className="mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl items-center gap-12 px-4 py-16 lg:grid-cols-[1fr_0.9fr]">
        <Reveal>
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-sm text-cyan-100">
            <Sparkles className="size-4" /> Your AI execution system for building and growing startups.
          </div>
          <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-tight text-white md:text-7xl">
            Foundry turns founder chaos into clear execution.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Validate ideas, generate MVP prompts, map SEO strategy, create growth content, and know the exact next action to ship.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/idea-analyzer">Analyze an idea <ArrowRight className="size-4" /></Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/dashboard">View dashboard</Link>
            </Button>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
        <Card className="relative overflow-hidden">
          <CardContent>
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm text-cyan-200">Mission control</p>
                <h2 className="text-2xl font-semibold text-white">Startup operating brief</h2>
              </div>
              <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-sm text-emerald-200">Live plan</span>
            </div>
            {["Market score 82", "MVP prompt ready", "14-day launch sprint", "SEO cluster generated"].map((item) => (
              <div key={item} className="mb-3 flex items-center justify-between rounded-md border border-white/10 bg-slate-950/60 p-4">
                <span className="text-slate-200">{item}</span>
                <Check className="size-5 text-cyan-200" />
              </div>
            ))}
            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
              {["Validation", "Growth", "Execution"].map((label, index) => (
                <div key={label} className="rounded-md bg-white/[0.06] p-4">
                  <p className="text-3xl font-semibold text-white">{[82, 74, 61][index]}</p>
                  <p className="text-xs text-slate-400">{label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        </Reveal>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {features.map(([title, copy]) => (
            <Reveal key={title}>
              <Card>
                <CardContent>
                  <h3 className="text-lg font-semibold text-white">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{copy}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-16 lg:grid-cols-3">
        {[
          ["Validate", "For founders testing demand before building."],
          ["Launch", "For indie hackers preparing public launches."],
          ["Grow", "For SaaS teams improving SEO and conversion."],
        ].map(([title, copy]) => (
          <Card key={title}>
            <CardContent>
              <Target className="size-6 text-cyan-200" />
              <h3 className="mt-4 text-2xl font-semibold text-white">{title}</h3>
              <p className="mt-3 text-slate-400">{copy}</p>
            </CardContent>
          </Card>
        ))}
      </section>
      <section className="mx-auto max-w-7xl px-4 py-16">
        <Card>
          <CardContent className="grid gap-8 md:grid-cols-3">
            {[
              ["Starter", "$19", "For validating one idea at a time."],
              ["Operator", "$49", "For saved projects and growth plans."],
              ["Studio", "$149", "For repeatable launch systems."],
            ].map(([name, price, copy]) => (
              <div key={name} className="rounded-lg border border-white/10 bg-slate-950/40 p-6">
                <h3 className="text-xl font-semibold text-white">{name}</h3>
                <p className="mt-3 text-4xl font-semibold text-white">{price}</p>
                <p className="mt-3 text-sm text-slate-400">{copy}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-16 text-center">
        <Workflow className="mx-auto size-10 text-cyan-200" />
        <h2 className="mt-4 text-4xl font-semibold text-white">Know what to build, post, optimize, and execute next.</h2>
        <p className="mx-auto mt-4 max-w-2xl text-slate-300">Founder testimonials and customer proof slots are ready for production content as usage grows.</p>
        <Button asChild className="mt-8" size="lg">
          <Link href="/growth-engine">Generate growth plan <TrendingUp className="size-4" /></Link>
        </Button>
      </section>
    </main>
  );
}
