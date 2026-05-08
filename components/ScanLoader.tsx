"use client";

import { motion } from "framer-motion";

const steps = [
  "正在扫描你的欲望结构……",
  "正在匹配你的隐藏职业……",
  "正在生成未来人生分支……",
  "正在检测你的最大人生 Bug……",
  "正在生成专属行动补丁……"
];

export function ScanLoader({ activeStep }: { activeStep: number }) {
  return (
    <div className="terminal-border glass w-full max-w-3xl rounded-lg p-5 sm:p-8">
      <div className="relative mx-auto mb-8 flex aspect-square max-w-[280px] items-center justify-center rounded-full border border-cyan/30 bg-black/30">
        <div className="absolute inset-5 rounded-full border border-gold/30" />
        <div className="absolute inset-12 rounded-full border border-magenta/30" />
        <motion.div
          className="absolute h-[46%] w-1 origin-bottom rounded-full bg-gradient-to-t from-gold to-cyan shadow-neon"
          animate={{ rotate: 360 }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
        />
        <div className="h-20 w-20 rounded-full border border-white/15 bg-white/10 shadow-neon" />
      </div>
      <div className="space-y-3 font-mono text-sm">
        {steps.map((step, index) => (
          <div
            key={step}
            className={`flex items-center gap-3 rounded border px-3 py-3 transition ${
              index <= activeStep ? "border-cyan/40 bg-cyan/10 text-cyan" : "border-white/10 bg-black/20 text-white/35"
            }`}
          >
            <span className={index === activeStep ? "animate-pulse" : ""}>
              {index < activeStep ? "DONE" : index === activeStep ? "RUN" : "WAIT"}
            </span>
            <span>{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
