"use client";

import { Button } from "@/components/ui/button";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="grid min-h-[70vh] place-items-center px-4 text-center">
      <div>
        <h1 className="text-4xl font-semibold text-white">Foundry hit a runtime error.</h1>
        <p className="mt-3 text-slate-400">Try again. The generators also include safe fallback output.</p>
        <Button className="mt-6" onClick={reset}>Retry</Button>
      </div>
    </main>
  );
}
