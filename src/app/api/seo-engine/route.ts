import { NextResponse } from "next/server";
import { generateWithFallback, requestSchema } from "@/lib/ai";

export async function POST(request: Request) {
  const parsed = requestSchema.safeParse(await request.json().catch(() => ({})));
  if (!parsed.success) return NextResponse.json({ ok: false, data: null, fallback: false, error: "Invalid input" }, { status: 400 });
  return NextResponse.json(await generateWithFallback("seo-engine", parsed.data));
}
