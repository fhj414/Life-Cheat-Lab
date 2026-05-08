"use client";

import { forwardRef } from "react";
import type { LifeReport } from "@/types/report";

export const ShareCard = forwardRef<HTMLDivElement, { report: LifeReport }>(({ report }, ref) => {
  return (
    <div
      ref={ref}
      className="relative w-full max-w-[430px] overflow-hidden rounded-lg border border-gold/40 bg-[#07050d] p-6 text-white shadow-gold"
      style={{ aspectRatio: "3 / 4" }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(69,245,255,0.22),transparent_32%),radial-gradient(circle_at_90%_12%,rgba(255,61,242,0.2),transparent_28%),linear-gradient(135deg,rgba(248,216,121,0.12),transparent_42%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[length:28px_28px]" />
      <div className="relative flex h-full flex-col justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-cyan">Life Cheat Lab</p>
          <h3 className="mt-5 text-4xl font-black leading-tight text-white">{report.roleName}</h3>
          <p className="mt-3 inline-flex rounded border border-gold/40 bg-gold/10 px-3 py-2 font-mono text-sm text-gold">
            隐藏职业：{report.hiddenJob}
          </p>
        </div>
        <div className="space-y-4">
          <p className="text-xl font-black leading-snug text-white">{report.slogan}</p>
          <div className="rounded-md border border-white/14 bg-black/35 p-4">
            <p className="font-mono text-xs text-white/48">CURRENT STATUS</p>
            <p className="mt-2 text-lg font-bold text-cyan">{report.systemStatus}</p>
          </div>
          <p className="text-sm leading-6 text-white/74">{report.shareCardText}</p>
        </div>
        <div className="flex items-center justify-between border-t border-white/12 pt-4 font-mono text-xs text-white/52">
          <span>人生外挂实验室</span>
          <span>SCAN COMPLETE</span>
        </div>
      </div>
    </div>
  );
});

ShareCard.displayName = "ShareCard";
