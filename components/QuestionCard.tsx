"use client";

import { motion } from "framer-motion";
import type { Question } from "@/types/report";

type QuestionCardProps = {
  question: Question;
  index: number;
  total: number;
  onSelect: (answer: string) => void;
};

export function QuestionCard({ question, index, total, onSelect }: QuestionCardProps) {
  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -24, filter: "blur(10px)" }}
      transition={{ duration: 0.35 }}
      className="terminal-border glass mx-auto w-full max-w-3xl rounded-lg p-5 sm:p-8"
    >
      <div className="mb-5 flex items-center justify-between font-mono text-xs text-white/52">
        <span>QUESTION / {String(index + 1).padStart(2, "0")}</span>
        <span>{Math.round(((index + 1) / total) * 100)}%</span>
      </div>
      <h1 className="text-2xl font-black leading-tight text-white sm:text-4xl">{question.title}</h1>
      <div className="mt-8 grid gap-3">
        {question.options.map((option, optionIndex) => (
          <button
            key={option}
            onClick={() => onSelect(option)}
            className="group flex items-center justify-between rounded-md border border-white/12 bg-black/28 px-4 py-4 text-left font-mono text-sm text-white transition duration-300 hover:-translate-y-0.5 hover:border-cyan/70 hover:bg-cyan/10 hover:shadow-neon sm:px-5 sm:text-base"
          >
            <span className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded border border-gold/40 bg-gold/10 text-gold">
                {String.fromCharCode(65 + optionIndex)}
              </span>
              {option}
            </span>
            <span className="text-white/28 transition group-hover:text-cyan">ENTER</span>
          </button>
        ))}
      </div>
    </motion.div>
  );
}
