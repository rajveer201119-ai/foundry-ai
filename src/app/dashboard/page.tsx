import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock, FolderKanban } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScoreChart } from "@/components/foundry/score-chart";
import { metricCards } from "@/lib/foundry";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Foundry founder mission-control dashboard for projects, scores, progress, analyses, and next actions.",
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: userData } = supabase ? await supabase.auth.getUser() : { data: { user: null } };
  const { data: analyses } =
    supabase && userData.user
      ? await supabase.from("analyses").select("id,type,created_at,input").order("created_at", { ascending: false }).limit(5)
      : { data: [] };

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.34em] text-cyan-200">Mission control</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.055em] text-white md:text-6xl">Founder dashboard</h1>
          <p className="mt-3 text-slate-300">Track projects, scores, saved analyses, and next actions from one operating surface.</p>
        </div>
        <Button asChild>
          <Link href="/idea-analyzer">New analysis <ArrowUpRight className="size-4" /></Link>
        </Button>
      </div>
      {!userData.user ? (
        <Card className="mt-8 border-cyan-300/20">
          <CardContent className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-white">Sign in to persist projects</h2>
              <p className="mt-2 text-slate-400">The dashboard works as a demo now. Auth unlocks saved history.</p>
            </div>
            <Button asChild variant="secondary"><Link href="/login">Log in</Link></Button>
          </CardContent>
        </Card>
      ) : null}
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {metricCards.map((metric) => (
          <Card key={metric.label}>
            <CardContent>
              <ScoreChart value={metric.value} />
              <p className="text-3xl font-semibold text-white">{metric.value}</p>
              <p className="mt-1 text-sm text-slate-400">{metric.label} - {metric.hint}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-8 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader><CardTitle>Saved projects</CardTitle></CardHeader>
          <CardContent className="grid gap-3">
            {["Validate AI founder copilot", "Launch SEO content engine", "Build Reddit acquisition loop"].map((project, index) => (
              <div key={project} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.055] p-4 shadow-inner shadow-white/5">
                <div className="flex items-center gap-3">
                  <FolderKanban className="size-5 text-cyan-200" />
                  <div>
                    <p className="font-medium text-white">{project}</p>
                    <p className="text-sm text-slate-400">{[68, 42, 29][index]}% execution progress</p>
                  </div>
                </div>
                <Button asChild variant="ghost" size="sm"><Link href="/execution-planner">Plan</Link></Button>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Recent analyses</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {(analyses || []).length ? analyses?.map((item) => (
              <div key={item.id} className="rounded-xl border border-white/10 bg-white/[0.045] p-3">
                <p className="text-sm font-medium text-white">{item.type}</p>
                <p className="text-xs text-slate-500">{new Date(item.created_at).toLocaleString()}</p>
              </div>
            )) : (
              <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.035] p-6 text-center">
                <Clock className="mx-auto size-6 text-slate-500" />
                <p className="mt-3 text-sm text-slate-400">No saved analyses yet.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
