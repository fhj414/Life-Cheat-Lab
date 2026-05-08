"use client";

import { AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { QuestionCard } from "@/components/QuestionCard";
import { questions } from "@/lib/questions";
import { saveAnswers } from "@/lib/storage";
import type { Answer } from "@/types/report";
import { useState } from "react";

export default function TestPage() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const progress = (index / questions.length) * 100;
  const question = questions[index];

  function handleSelect(answer: string) {
    const nextAnswers = [
      ...answers,
      {
        questionId: question.id,
        question: question.title,
        answer
      }
    ];

    if (index === questions.length - 1) {
      saveAnswers(nextAnswers);
      router.push("/analyzing");
      return;
    }

    setAnswers(nextAnswers);
    setIndex((current) => current + 1);
  }

  return (
    <main className="min-h-screen px-5 py-6 text-white sm:px-8">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-2 font-mono text-sm text-white/60 transition hover:text-cyan">
          <ArrowLeft size={16} /> EXIT
        </Link>
        <span className="font-mono text-xs text-gold">LIFE SCAN / QUESTION MODULE</span>
      </div>

      <section className="mx-auto flex min-h-[calc(100vh-88px)] max-w-5xl flex-col justify-center">
        <div className="mb-8">
          <div className="mb-3 flex items-center justify-between font-mono text-xs text-white/48">
            <span>SCAN PROGRESS</span>
            <span>{index + 1}/{questions.length}</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full border border-white/12 bg-white/5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-gold via-cyan to-magenta transition-all duration-500"
              style={{ width: `${Math.max(progress, 8)}%` }}
            />
          </div>
        </div>
        <AnimatePresence mode="wait">
          <QuestionCard question={question} index={index} total={questions.length} onSelect={handleSelect} />
        </AnimatePresence>
      </section>
    </main>
  );
}
