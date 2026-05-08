"use client";

import { RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { NeonButton } from "@/components/NeonButton";
import { ScanLoader } from "@/components/ScanLoader";
import { getAnswers, saveCurrentReport } from "@/lib/storage";
import type { GenerateReportResult } from "@/types/report";

export default function AnalyzingPage() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const runAnalysis = useCallback(async () => {
    const answers = getAnswers();
    if (answers.length === 0) {
      router.replace("/test");
      return;
    }

    setError("");
    setLoading(true);
    setActiveStep(0);

    const timer = window.setInterval(() => {
      setActiveStep((current) => Math.min(current + 1, 4));
    }, 760);

    try {
      const response = await fetch("/api/generate-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers })
      });
      const data = (await response.json()) as Partial<GenerateReportResult> & { error?: string };
      if (!response.ok || !data.report) {
        throw new Error(data.error || "报告生成失败");
      }
      saveCurrentReport(data.report, answers);
      window.clearInterval(timer);
      setActiveStep(4);
      window.setTimeout(() => router.push("/report"), 680);
    } catch (err) {
      window.clearInterval(timer);
      setError(err instanceof Error ? err.message : "报告生成失败");
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    runAnalysis();
  }, [runAnalysis]);

  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-10 text-white">
      <div className="w-full max-w-3xl">
        <p className="mb-4 text-center font-mono text-xs uppercase tracking-[0.32em] text-gold">AI SYSTEM SCANNING</p>
        <h1 className="mb-8 text-center text-3xl font-black sm:text-5xl">正在生成你的人生系统报告</h1>
        <ScanLoader activeStep={activeStep} />
        {error ? (
          <div className="mt-6 rounded-md border border-magenta/50 bg-magenta/10 p-4 text-center text-magenta">
            <p className="mb-4 font-mono text-sm">{error}</p>
            <NeonButton onClick={runAnalysis} variant="ghost" className="gap-2">
              <RotateCcw size={16} /> RETRY
            </NeonButton>
          </div>
        ) : null}
        {loading && !error ? <p className="mt-6 text-center font-mono text-sm text-white/48">请保持连接，命运分支正在加载。</p> : null}
      </div>
    </main>
  );
}
