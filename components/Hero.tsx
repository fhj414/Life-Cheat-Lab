import { ArrowRight, Cpu, History } from "lucide-react";
import { GlitchText } from "@/components/GlitchText";
import { NeonButton } from "@/components/NeonButton";

const fragments = ["检测到：野心过载", "检测到：表达欲未释放", "检测到：赚钱欲望增强", "检测到：睡眠系统异常"];

export function Hero() {
  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-7 text-white sm:px-8">
      <div className="absolute left-1/2 top-16 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan/15 blur-3xl" />
      <div className="absolute bottom-12 right-8 h-72 w-72 rounded-full bg-magenta/15 blur-3xl" />
      <nav className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="font-mono text-xs uppercase tracking-[0.34em] text-cyan">LCL / v0.9</div>
        <NeonButton href="/history" variant="ghost" className="gap-2 px-4 py-2 text-xs">
          <History size={16} /> 历史报告
        </NeonButton>
      </nav>

      <section className="mx-auto flex min-h-[calc(100vh-104px)] max-w-7xl flex-col justify-center">
        <div className="max-w-5xl">
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-cyan/30 bg-cyan/10 px-4 py-2 font-mono text-xs uppercase tracking-[0.24em] text-cyan shadow-neon">
            <Cpu size={15} />
            AI Life System Booting
          </div>
          <h1 className="font-display text-6xl font-black leading-none text-white sm:text-8xl lg:text-[8.8rem]">
            <GlitchText>Life Cheat Lab</GlitchText>
          </h1>
          <h2 className="mt-4 bg-gradient-to-r from-gold via-white to-cyan bg-clip-text text-3xl font-black text-transparent sm:text-5xl">
            人生外挂实验室
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72 sm:text-2xl">
            给 90 后、00 后的一次 AI 人生开挂测试。回答 12 个游戏化问题，生成你的隐藏角色、人生路线和 30 天升级任务。
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <NeonButton href="/test" className="gap-3 text-base">
              启动人生扫描 <ArrowRight size={19} />
            </NeonButton>
            <div className="glass rounded-md px-5 py-3 font-mono text-xs text-white/62">
              STATUS: READY / SIGNAL: 99.7% / MODE: CHAOS-TO-PLAN
            </div>
          </div>
        </div>
      </section>

      <div className="absolute bottom-0 left-0 right-0 border-y border-white/10 bg-black/30 py-4 backdrop-blur-md">
        <div className="flex w-[200%] animate-marquee gap-5 font-mono text-sm text-gold">
          {[...fragments, ...fragments, ...fragments, ...fragments].map((item, index) => (
            <span key={`${item}-${index}`} className="mx-2 whitespace-nowrap">
              {item}
            </span>
          ))}
        </div>
      </div>
    </main>
  );
}
