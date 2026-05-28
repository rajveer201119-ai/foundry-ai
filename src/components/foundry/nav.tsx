import Link from "next/link";
import { Button } from "@/components/ui/button";

const links = [
  ["Dashboard", "/dashboard"],
  ["Idea", "/idea-analyzer"],
  ["URL", "/url-analyzer"],
  ["Growth", "/growth-engine"],
  ["SEO", "/seo-engine"],
  ["Planner", "/execution-planner"],
  ["Blog", "/blog"],
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/45 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="group flex items-center gap-3 text-lg font-semibold tracking-tight text-white">
          <span className="grid size-9 place-items-center rounded-xl border border-white/20 bg-white/10 text-cyan-100 shadow-[0_0_35px_rgba(103,232,249,0.24)] transition group-hover:rotate-6 group-hover:scale-105">F</span>
          <span className="bg-gradient-to-r from-white to-cyan-100 bg-clip-text text-transparent">Foundry</span>
        </Link>
        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.055] p-1 shadow-inner shadow-white/5 md:flex">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="rounded-full px-3 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white">
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link href="/login">Log in</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/signup">Start</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
