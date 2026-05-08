"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip
} from "recharts";
import type { Attributes } from "@/types/report";

const labels: Record<keyof Attributes, string> = {
  money: "搞钱",
  execution: "执行",
  social: "社交",
  emotion: "情绪",
  creativity: "创造",
  future: "未来"
};

export function RadarStats({ attributes }: { attributes: Attributes }) {
  const data = Object.entries(attributes).map(([key, value]) => ({
    subject: labels[key as keyof Attributes],
    value
  }));

  return (
    <div className="h-72 w-full sm:h-96">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} outerRadius="72%">
          <PolarGrid stroke="rgba(255,255,255,0.16)" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: "#f8d879", fontSize: 13 }} />
          <Tooltip
            contentStyle={{
              background: "rgba(5,3,10,0.92)",
              border: "1px solid rgba(69,245,255,0.4)",
              borderRadius: 8,
              color: "#fff"
            }}
          />
          <Radar
            dataKey="value"
            stroke="#45f5ff"
            fill="#45f5ff"
            fillOpacity={0.28}
            strokeWidth={3}
            dot={{ fill: "#f8d879", r: 4 }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
