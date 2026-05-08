import type { LifeReport } from "@/types/report";

export const mockReport: LifeReport = {
  roleName: "广州夜行产品猎人",
  hiddenJob: "机会捕手",
  slogan: "不是没有机会，是你还没把自己产品化。",
  systemStatus: "野心过载，执行力待升级",
  attributes: {
    money: 86,
    execution: 62,
    social: 71,
    emotion: 55,
    creativity: 89,
    future: 77
  },
  advantages: ["对机会敏感", "有表达欲", "愿意学习新技术"],
  bugs: ["想得太宏大，启动太慢", "容易被别人的成功刺激", "阶段性热血，持续性怀疑"],
  parallelLives: [
    {
      title: "稳定大厂线",
      oneYear: "你开始系统提升技术能力。",
      threeYears: "你成为团队核心。",
      tenYears: "你拥有稳定现金流，但可能失去冒险感。",
      risk: "舒适区会慢慢吞掉你的野心。",
      opportunity: "借助平台积累资源和信用。"
    },
    {
      title: "自由职业线",
      oneYear: "你开始接项目并公开表达。",
      threeYears: "你形成稳定客户来源。",
      tenYears: "你拥有更大自由，但需要强自律。",
      risk: "收入波动和孤独感。",
      opportunity: "个人品牌会成为你的复利资产。"
    },
    {
      title: "AI 产品创业线",
      oneYear: "你做出第一个 AI 小产品。",
      threeYears: "你拥有一批付费用户。",
      tenYears: "你可能成为小而美产品公司的创始人。",
      risk: "容易追热点，缺少长期定位。",
      opportunity: "AI 会放大你的创造力。"
    }
  ],
  missions30Days: [
    {
      dayRange: "第 1-7 天",
      title: "清理混乱",
      tasks: ["写下当前最大焦虑", "确定一个主线目标", "删除三个分散注意力的事项"]
    },
    {
      dayRange: "第 8-15 天",
      title: "建立作品",
      tasks: ["做一个可展示页面", "每天输出一条内容", "找一个目标用户反馈"]
    },
    {
      dayRange: "第 16-23 天",
      title: "公开表达",
      tasks: ["发布项目介绍", "写一篇复盘", "录一个短视频"]
    },
    {
      dayRange: "第 24-30 天",
      title: "寻找变现",
      tasks: ["设计一个 9.9 元产品", "找 10 个潜在用户", "完成第一次付费验证"]
    }
  ],
  roast: "你最大的问题不是没机会，而是你总想等一个完美方案。但现实是，烂开始也比永远准备强。",
  shareCardText: "我的人生角色：广州夜行产品猎人｜当前状态：野心过载，执行力待升级｜下一步：用 30 天做出一个公开作品。"
};
