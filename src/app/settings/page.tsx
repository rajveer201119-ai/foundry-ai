import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = { title: "Settings", robots: { index: false, follow: false } };

export default function SettingsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-4xl font-semibold text-white">Settings</h1>
      <Card className="mt-8">
        <CardContent className="space-y-3 text-slate-300">
          <p>Environment-backed settings keep deployments simple on Vercel.</p>
          <p>Configure OpenAI, Supabase, and app URL values in Vercel project environment variables.</p>
        </CardContent>
      </Card>
    </main>
  );
}
