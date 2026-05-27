import { NextResponse } from "next/server";
import { generateWithFallback, requestSchema } from "@/lib/ai";

async function safeFetchTitle(url: string): Promise<Record<string, string>> {
  try {
    const parsed = new URL(url);
    if (!["http:", "https:"].includes(parsed.protocol)) return {};
    const response = await fetch(parsed.toString(), { signal: AbortSignal.timeout(5000) });
    const html = await response.text();
    return {
      fetchedTitle: html.match(/<title[^>]*>(.*?)<\/title>/i)?.[1]?.replace(/\s+/g, " ").trim() || "",
      fetchedDescription: html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i)?.[1] || "",
    };
  } catch {
    return {};
  }
}

export async function POST(request: Request) {
  const parsed = requestSchema.safeParse(await request.json().catch(() => ({})));
  if (!parsed.success) return NextResponse.json({ ok: false, data: null, fallback: false, error: "Invalid input" }, { status: 400 });
  const pageSignals = parsed.data.url ? await safeFetchTitle(parsed.data.url) : {};
  const result = await generateWithFallback("url-analyzer", { ...parsed.data, ...pageSignals });
  return NextResponse.json({
    ...result,
    data: {
      ...result.data,
      livePageSignals: Object.keys(pageSignals).length
        ? pageSignals
        : { note: "The page could not be fetched safely, so Foundry used the supplied context." },
    },
  });
}
