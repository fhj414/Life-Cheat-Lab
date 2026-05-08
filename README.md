# Life Cheat Lab｜人生外挂实验室

一个完整可运行的 Next.js 15 + React + TypeScript 项目。用户通过 12 道游戏化问题，生成一份 AI 人生系统报告，视觉风格为赛博朋克、游戏 HUD、黑金科技、玻璃拟态、故障艺术和终端扫描界面。

## 技术栈

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Recharts
- OpenRouter API
- html-to-image
- localStorage 历史报告

## 本地启动

建议使用 Node.js 20 或至少 Node.js 18.18+。

```bash
npm install
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000)。

没有配置 `OPENROUTER_API_KEY` 时，项目会自动使用 mock 报告，方便本地演示。

如果 OpenRouter 返回 `403 The request is prohibited due to a violation of provider Terms Of Service`，通常不是 key 错了，而是当前 `OPENROUTER_MODEL` 背后的上游 provider 拒绝了请求。默认 `OPENROUTER_FALLBACK_TO_MOCK=true` 会自动兜底生成 mock 报告，避免演示流程中断。想严格暴露错误时可设置为 `false`。

## 环境变量

复制环境变量示例：

```bash
cp .env.example .env.local
```

配置：

```bash
OPENROUTER_API_KEY=你的 OpenRouter Key
OPENROUTER_MODEL=openai/gpt-4o-mini
OPENROUTER_FALLBACK_TO_MOCK=true
```

API 路由位于：

```txt
app/api/generate-report/route.ts
```

请求 OpenRouter：

```txt
https://openrouter.ai/api/v1/chat/completions
```

并带有：

- `Authorization: Bearer ${OPENROUTER_API_KEY}`
- `Content-Type: application/json`
- `HTTP-Referer: http://localhost:3000`
- `X-OpenRouter-Title: Life Cheat Lab`

## 页面

- `/` 首页：全屏科技感 Hero、故障标题、扫描线、滚动报告片段
- `/test` 测试页：12 道游戏化问答、进度条、键盘风格选项卡
- `/analyzing` 分析页：AI 系统扫描动画、loading/error/retry
- `/report` 报告页：完整 AI 报告、雷达图、分享卡、复制、下载 PNG、重新生成
- `/history` 历史页：读取 localStorage，可查看、删除、清空历史

## 部署到 Vercel

1. 将项目推送到 GitHub。
2. 在 Vercel 导入该仓库。
3. Framework Preset 选择 Next.js。
4. 在 Project Settings → Environment Variables 中添加：
   - `OPENROUTER_API_KEY`
   - `OPENROUTER_MODEL`
   - `OPENROUTER_FALLBACK_TO_MOCK`
5. 部署即可。

## 项目结构

```txt
app/
  page.tsx
  test/page.tsx
  analyzing/page.tsx
  report/page.tsx
  history/page.tsx
  api/generate-report/route.ts
components/
  Hero.tsx
  QuestionCard.tsx
  ScanLoader.tsx
  ReportCard.tsx
  RadarStats.tsx
  ShareCard.tsx
  GlitchText.tsx
  NeonButton.tsx
lib/
  questions.ts
  openrouter.ts
  storage.ts
  mockReport.ts
types/
  report.ts
```
