"use client";

import { useState } from "react";
import { Copy, Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/lib/supabase/browser";
import { toolConfigs, type ToolKey } from "@/lib/foundry";

function renderValue(value: unknown): React.ReactNode {
  if (Array.isArray(value)) {
    return (
      <ul className="space-y-2">
        {value.map((item, index) => (
          <li key={index} className="rounded-md border border-white/10 bg-slate-950/50 p-3 text-sm text-slate-200">
            {typeof item === "object" ? renderValue(item) : String(item)}
          </li>
        ))}
      </ul>
    );
  }
  if (value && typeof value === "object") {
    return (
      <div className="grid gap-2">
        {Object.entries(value).map(([key, nested]) => (
          <div key={key}>
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-200/70">{key}</p>
            <div className="text-sm text-slate-200">{renderValue(nested)}</div>
          </div>
        ))}
      </div>
    );
  }
  return <p className="whitespace-pre-wrap text-sm leading-6 text-slate-200">{String(value)}</p>;
}

export function ToolPage({ tool }: { tool: ToolKey }) {
  const config = toolConfigs[tool];
  const [form, setForm] = useState<Record<string, string>>(
    Object.fromEntries(config.fields.map(([key, , placeholder]) => [key, placeholder])),
  );
  const [result, setResult] = useState<Record<string, unknown> | null>(null);
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit() {
    setLoading(true);
    setNotice("");
    try {
      const response = await fetch(config.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await response.json();
      if (!json.ok) throw new Error(json.error || "Generation failed");
      setResult(json.data);
      setNotice(
        json.fallback
          ? `Fallback mode returned a usable plan because live AI or scraping was unavailable.${json.error ? ` Reason: ${json.error}` : ""}`
          : "Generated with live AI.",
      );
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function save() {
    const supabase = createClient();
    if (!supabase || !result) {
      setNotice("Sign in and configure Supabase to save this output.");
      return;
    }
    const { data } = await supabase.auth.getUser();
    if (!data.user) {
      setNotice("Create an account or log in to save this output.");
      return;
    }
    const { error } = await supabase.from("analyses").insert({
      user_id: data.user.id,
      type: tool,
      input: form,
      output: result,
    });
    setNotice(error ? error.message : "Saved to your project history.");
  }

  return (
    <main className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[0.9fr_1.1fr]">
      <section>
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-200">{config.eyebrow}</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-5xl">{config.title}</h1>
        <p className="mt-4 max-w-2xl text-slate-300">{config.description}</p>
        <Card className="mt-8">
          <CardContent className="space-y-4">
            {config.fields.map(([key, label, placeholder]) => (
              <label key={key} className="block">
                <span className="mb-2 block text-sm text-slate-300">{label}</span>
                {key === "idea" || key === "problem" || key === "constraints" ? (
                  <Textarea value={form[key] || ""} placeholder={placeholder} onChange={(event) => setForm({ ...form, [key]: event.target.value })} />
                ) : (
                  <Input value={form[key] || ""} placeholder={placeholder} onChange={(event) => setForm({ ...form, [key]: event.target.value })} />
                )}
              </label>
            ))}
            <div className="flex flex-wrap gap-3">
              <Button onClick={submit} disabled={loading}>
                {loading ? <Loader2 className="size-4 animate-spin" /> : null}
                Generate plan
              </Button>
              <Button type="button" variant="secondary" onClick={save}>
                <Save className="size-4" />
                Save
              </Button>
            </div>
            {notice ? <p className="rounded-md border border-cyan-300/20 bg-cyan-300/10 p-3 text-sm text-cyan-100">{notice}</p> : null}
          </CardContent>
        </Card>
      </section>
      <section>
        <Card className="min-h-[520px]">
          <CardHeader>
            <CardTitle>Founder operating brief</CardTitle>
            <CardDescription>Structured output you can copy, save, and execute.</CardDescription>
          </CardHeader>
          <CardContent>
            {result ? (
              <div className="space-y-5">
                <div className="flex justify-end">
                  <Button variant="secondary" size="sm" onClick={() => navigator.clipboard.writeText(JSON.stringify(result, null, 2))}>
                    <Copy className="size-4" />
                    Copy JSON
                  </Button>
                </div>
                {Object.entries(result).map(([key, value]) => (
                  <div key={key} className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
                    <h2 className="mb-3 text-lg font-semibold capitalize text-white">{key.replace(/([A-Z])/g, " $1")}</h2>
                    {renderValue(value)}
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid min-h-[380px] place-items-center rounded-lg border border-dashed border-white/10 text-center">
                <div>
                  <p className="text-lg font-medium text-white">No output yet</p>
                  <p className="mt-2 max-w-sm text-sm text-slate-400">Run the generator to create a practical founder execution brief.</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
