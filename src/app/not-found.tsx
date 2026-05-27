import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="grid min-h-[70vh] place-items-center px-4 text-center">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">404</p>
        <h1 className="mt-4 text-4xl font-semibold text-white">This page is not in the roadmap.</h1>
        <p className="mt-3 text-slate-400">Return to Foundry and generate the next best action.</p>
        <Button asChild className="mt-6"><Link href="/">Go home</Link></Button>
      </div>
    </main>
  );
}
