"use client";

import { Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NeonButton } from "@/components/NeonButton";
import { clearHistory, deleteHistoryReport, getHistory, setCurrentReport } from "@/lib/storage";
import type { StoredReport } from "@/types/report";

export default function HistoryPage() {
  const [items, setItems] = useState<StoredReport[]>([]);

  function refresh() {
    setItems(getHistory());
  }

  useEffect(() => {
    refresh();
  }, []);

  function handleView(item: StoredReport) {
    setCurrentReport(item);
  }

  function handleDelete(id: string) {
    deleteHistoryReport(id);
    refresh();
  }

  function handleClear() {
    clearHistory();
    refresh();
  }

  return (
    <main className="min-h-screen px-5 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-5xl">
        <nav className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <Link href="/" className="font-mono text-xs uppercase tracking-[0.26em] text-cyan">
            Life Cheat Lab
          </Link>
          <NeonButton href="/test" className="px-4 py-2 text-xs">启动新扫描</NeonButton>
        </nav>

        <header className="mb-6">
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-gold">LOCAL ARCHIVE</p>
          <h1 className="mt-3 text-4xl font-black sm:text-6xl">历史报告</h1>
        </header>

        {items.length > 0 ? (
          <div className="mb-5 flex justify-end">
            <NeonButton onClick={handleClear} variant="danger" className="gap-2 px-4 py-2 text-xs">
              <Trash2 size={15} /> 清空历史
            </NeonButton>
          </div>
        ) : null}

        <div className="grid gap-4">
          {items.map((item) => (
            <article key={item.id} className="terminal-border glass rounded-lg p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-mono text-xs text-white/42">{new Date(item.createdAt).toLocaleString()}</p>
                  <h2 className="mt-2 text-2xl font-black text-white">{item.report.roleName}</h2>
                  <p className="mt-1 text-cyan">{item.report.systemStatus}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <NeonButton href="/report" onClick={() => handleView(item)} variant="ghost" className="px-4 py-2 text-xs">
                    查看
                  </NeonButton>
                  <NeonButton onClick={() => handleDelete(item.id)} variant="danger" className="px-4 py-2 text-xs">
                    删除
                  </NeonButton>
                </div>
              </div>
            </article>
          ))}
        </div>

        {items.length === 0 ? (
          <div className="terminal-border glass rounded-lg p-8 text-center">
            <p className="text-xl font-black">还没有历史报告</p>
            <p className="mt-3 text-white/56">先完成一次人生扫描，系统会自动存入本地历史。</p>
          </div>
        ) : null}
      </div>
    </main>
  );
}
