import { NextResponse } from "next/server";
import { generateReportWithOpenRouter } from "@/lib/openrouter";
import type { Answer } from "@/types/report";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { answers?: Answer[] };

    if (!Array.isArray(body.answers) || body.answers.length === 0) {
      return NextResponse.json({ error: "answers is required" }, { status: 400 });
    }

    const result = await generateReportWithOpenRouter(body.answers);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
