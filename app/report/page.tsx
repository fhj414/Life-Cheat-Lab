"use client";

import { toPng } from "html-to-image";
import { Copy, Download, History, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { NeonButton } from "@/components/NeonButton";
import { RadarStats } from "@/components/RadarStats";
import { ReportCard } from "@/components/ReportCard";
import { ShareCard } from "@/components/ShareCard";
import { getCurrentReport } from "@/lib/storage";
import type { StoredReport } from "@/types/report";

function buildReportText(stored: StoredReport) {
  const { report } = stored;
  return [
    `我的人生角色：${report.roleName}`,
    `隐藏职业：${report.hiddenJob}`,
    `系统状态：${report.systemStatus}`,
    `一句话唤醒：${report.slogan}`,
    `核心优势：${report.advantages.join("、")}`,
    `致命 Bug：${report.bugs.join("、")}`,
    `毒舌唤醒：${report.roast}`,
    "30 天升级任务：",
    ...report.missions30Days.map((mission) => `${mission.dayRange} ${mission.title}：${mission.tasks.join("；")}`)
  ].join("\n");
}

export default function ReportPage() {
  const router = useRouter();
  const shareRef = useRef<HTMLDivElement>(null);
  const [stored, setStored] = useState<StoredReport | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const current = getCurrentReport();
    if (!current) {
      router.replace("/test");
      return;
    }
    setStored(current);
  }, [router]);

  const reportText = useMemo(() => (stored ? buildReportText(stored) : ""), [stored]);

  async function handleCopy() {
    await navigator.clipboard.writeText(reportText);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  async function handleDownload() {
    if (!shareRef.current) return;
    const dataUrl = await toPng(shareRef.current, {
      pixelRatio: 2,
      cacheBust: true,
      backgroundColor: "#07050d"
    });
    const link = document.createElement("a");
    link.download = `life-cheat-lab-${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
  }

  if (!stored) {
    return <main className="min-h-screen px-5 py-10 text-white">LOADING...</main>;
  }

  const { report } = stored;

  return (
    <main className="min-h-screen px-5 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-7xl">
        <nav className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <Link href="/" className="font-mono text-xs uppercase tracking-[0.26em] text-cyan">
            Life Cheat Lab
          </Link>
          <div className="flex flex-wrap gap-3">
            <NeonButton href="/history" variant="ghost" className="gap-2 px-4 py-2 text-xs">
              <History size={15} /> 历史
            </NeonButton>
            <NeonButton href="/test" variant="ghost" className="gap-2 px-4 py-2 text-xs">
              <RefreshCw size={15} /> 重新生成
            </NeonButton>
          </div>
        </nav>

        <header className="terminal-border glass mb-6 rounded-lg p-6 sm:p-8">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold">SCAN COMPLETE</p>
          <h1 className="mt-4 text-4xl font-black leading-tight sm:text-6xl">{report.roleName}</h1>
          <p className="mt-3 text-2xl font-black text-cyan">{report.hiddenJob}</p>
          <p className="mt-5 max-w-3xl text-xl leading-8 text-white/76">{report.slogan}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <NeonButton onClick={handleCopy} variant="ghost" className="gap-2">
              <Copy size={16} /> {copied ? "已复制" : "复制报告"}
            </NeonButton>
            <NeonButton onClick={handleDownload} className="gap-2">
              <Download size={16} /> 下载分享卡 PNG
            </NeonButton>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <ReportCard title="你的当前系统状态" eyebrow="SYSTEM STATUS">
              <p className="text-2xl font-black text-gold">{report.systemStatus}</p>
            </ReportCard>

            <ReportCard title="你的属性雷达图" eyebrow="ATTRIBUTES">
              <RadarStats attributes={report.attributes} />
            </ReportCard>

            <div className="grid gap-6 md:grid-cols-2">
              <ReportCard title="三个核心优势" eyebrow="BUFF">
                <ul className="space-y-3">
                  {report.advantages.map((item) => (
                    <li key={item} className="rounded border border-cyan/20 bg-cyan/10 px-4 py-3 text-white/86">
                      {item}
                    </li>
                  ))}
                </ul>
              </ReportCard>
              <ReportCard title="三个致命 Bug" eyebrow="BUG">
                <ul className="space-y-3">
                  {report.bugs.map((item) => (
                    <li key={item} className="rounded border border-magenta/20 bg-magenta/10 px-4 py-3 text-white/86">
                      {item}
                    </li>
                  ))}
                </ul>
              </ReportCard>
            </div>

            <ReportCard title="三条平行人生路线" eyebrow="PARALLEL LIVES">
              <div className="grid gap-4">
                {report.parallelLives.map((life) => (
                  <div key={life.title} className="rounded-md border border-white/12 bg-black/24 p-4">
                    <h3 className="text-xl font-black text-cyan">{life.title}</h3>
                    <div className="mt-3 grid gap-3 text-sm leading-6 text-white/72 sm:grid-cols-3">
                      <p><span className="text-gold">1 年：</span>{life.oneYear}</p>
                      <p><span className="text-gold">3 年：</span>{life.threeYears}</p>
                      <p><span className="text-gold">10 年：</span>{life.tenYears}</p>
                    </div>
                    <div className="mt-3 grid gap-3 text-sm text-white/70 sm:grid-cols-2">
                      <p>风险：{life.risk}</p>
                      <p>机会：{life.opportunity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ReportCard>

            <ReportCard title="30 天升级任务" eyebrow="MISSIONS">
              <div className="grid gap-4 md:grid-cols-2">
                {report.missions30Days.map((mission) => (
                  <div key={mission.dayRange} className="rounded-md border border-gold/20 bg-gold/10 p-4">
                    <p className="font-mono text-xs text-gold">{mission.dayRange}</p>
                    <h3 className="mt-2 text-lg font-black">{mission.title}</h3>
                    <ul className="mt-3 space-y-2 text-sm text-white/76">
                      {mission.tasks.map((task) => (
                        <li key={task}>▸ {task}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </ReportCard>

            <ReportCard title="毒舌唤醒文案" eyebrow="WAKE UP">
              <p className="text-xl font-black leading-9 text-white">{report.roast}</p>
            </ReportCard>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-8 lg:self-start">
            <ReportCard title="你的社交分享卡" eyebrow="SHARE CARD">
              <ShareCard ref={shareRef} report={report} />
            </ReportCard>
          </aside>
        </div>
      </div>
    </main>
  );
}
