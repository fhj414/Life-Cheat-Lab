"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function ReportCard({
  title,
  eyebrow,
  children,
  className = ""
}: {
  title: string;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.42 }}
      className={`terminal-border glass rounded-lg p-5 sm:p-6 ${className}`}
    >
      {eyebrow ? <p className="mb-2 font-mono text-xs uppercase tracking-[0.22em] text-cyan">{eyebrow}</p> : null}
      <h2 className="mb-4 text-xl font-black text-white sm:text-2xl">{title}</h2>
      {children}
    </motion.section>
  );
}
