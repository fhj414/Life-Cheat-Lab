import type { Answer, GenerateReportResult, LifeReport } from "@/types/report";
import { mockReport } from "@/lib/mockReport";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

const schemaInstruction = `你是 Life Cheat Lab｜人生外挂实验室 的 AI 人生系统分析器。
请根据用户的 12 个回答生成一份犀利、酷、有游戏系统感、适合 90 后和 00 后传播的人生系统报告。
要求：
1. 只返回严格 JSON，不要 Markdown，不要代码块，不要解释。
2. 所有字段必须完整，字段名必须和示例完全一致。
3. 文字用中文，风格可以毒舌但不要侮辱、歧视、医疗诊断或承诺确定收益。
4. attributes 数值必须是 0 到 100 的整数。
5. parallelLives 必须 3 条，missions30Days 必须 4 个阶段。

JSON 结构：
{
  "roleName": "广州夜行产品猎人",
  "hiddenJob": "机会捕手",
  "slogan": "不是没有机会，是你还没把自己产品化。",
  "systemStatus": "野心过载，执行力待升级",
  "attributes": {
    "money": 86,
    "execution": 62,
    "social": 71,
    "emotion": 55,
    "creativity": 89,
    "future": 77
  },
  "advantages": ["对机会敏感", "有表达欲", "愿意学习新技术"],
  "bugs": ["想得太宏大，启动太慢", "容易被别人的成功刺激", "阶段性热血，持续性怀疑"],
  "parallelLives": [
    {
      "title": "稳定大厂线",
      "oneYear": "你开始系统提升技术能力。",
      "threeYears": "你成为团队核心。",
      "tenYears": "你拥有稳定现金流，但可能失去冒险感。",
      "risk": "舒适区会慢慢吞掉你的野心。",
      "opportunity": "借助平台积累资源和信用。"
    }
  ],
  "missions30Days": [
    {
      "dayRange": "第 1-7 天",
      "title": "清理混乱",
      "tasks": ["写下当前最大焦虑", "确定一个主线目标", "删除三个分散注意力的事项"]
    }
  ],
  "roast": "你最大的问题不是没机会，而是你总想等一个完美方案。但现实是，烂开始也比永远准备强。",
  "shareCardText": "我的人生角色：广州夜行产品猎人｜当前状态：野心过载，执行力待升级｜下一步：用 30 天做出一个公开作品。"
}`;

function extractJson(content: string): LifeReport {
  const cleaned = content.trim().replace(/^```json\s*/i, "").replace(/```$/i, "").trim();
  try {
    return JSON.parse(cleaned) as LifeReport;
  } catch {
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("OpenRouter response did not contain JSON.");
    return JSON.parse(match[0]) as LifeReport;
  }
}

function buildMockReport(answers: Answer[]): LifeReport {
  return {
    ...mockReport,
    roleName: `${answers[0]?.answer ?? "城市"}外挂觉醒者`,
    systemStatus: `${answers[0]?.answer ?? "野心"}信号增强，${answers[10]?.answer ?? "执行"} Bug 待修复`
  };
}

function isProviderBlocked(status: number, text: string) {
  const normalized = text.toLowerCase();
  return status === 403 && (normalized.includes("terms of service") || normalized.includes("prohibited"));
}

export async function generateReportWithOpenRouter(answers: Answer[]): Promise<GenerateReportResult> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  const model = process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini";
  const shouldFallbackToMock = process.env.OPENROUTER_FALLBACK_TO_MOCK !== "false";

  if (!apiKey) {
    return {
      report: buildMockReport(answers),
      source: "mock",
      warning: "未配置 OPENROUTER_API_KEY，已使用本地 mock 报告。"
    };
  }

  const response = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "http://localhost:3000",
      "X-OpenRouter-Title": "Life Cheat Lab"
    },
    body: JSON.stringify({
      model,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: schemaInstruction },
        {
          role: "user",
          content: `用户问答如下：\n${JSON.stringify(answers, null, 2)}`
        }
      ],
      temperature: 0.85,
      max_tokens: 2400
    })
  });

  if (!response.ok) {
    const text = await response.text();
    if (shouldFallbackToMock && isProviderBlocked(response.status, text)) {
      return {
        report: buildMockReport(answers),
        source: "mock",
        warning: `当前模型 ${model} 被 OpenRouter 上游 provider 拒绝，已使用本地 mock 报告兜底。建议更换 OPENROUTER_MODEL。原始错误：${text}`
      };
    }
    throw new Error(`OpenRouter request failed: ${response.status} ${text}`);
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content || typeof content !== "string") {
    throw new Error("OpenRouter response is empty.");
  }

  return {
    report: extractJson(content),
    source: "openrouter"
  };
}
