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
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-white">
          <span className="grid size-8 place-items-center rounded-md bg-cyan-300 text-slate-950">F</span>
          Foundry
        </Link>
        <nav className="hidden items-center gap-5 md:flex">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="text-sm text-slate-300 transition hover:text-white">
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
