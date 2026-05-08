import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Life Cheat Lab｜人生外挂实验室",
  description: "给 90 后、00 后的一次 AI 人生开挂测试"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>
        <div className="hud-bg" />
        <div className="noise" />
        <div className="scanlines" />
        {children}
      </body>
    </html>
  );
}
