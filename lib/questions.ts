import type { Question } from "@/types/report";

export const questions: Question[] = [
  {
    id: "desire",
    title: "你现在最强烈的欲望是什么？",
    options: ["搞钱", "变强", "被喜欢", "逃离", "做出作品"]
  },
  {
    id: "status",
    title: "你目前的人生状态？",
    options: ["上班", "学生", "自由职业", "创业", "迷茫"]
  },
  {
    id: "anxiety",
    title: "你最焦虑什么？",
    options: ["钱", "年龄", "能力", "关系", "未来"]
  },
  {
    id: "envy",
    title: "你最羡慕哪类人？",
    options: ["有钱人", "自由职业者", "大厂高手", "网红博主", "稳定幸福的人"]
  },
  {
    id: "action",
    title: "你的行动力如何？",
    options: ["很强", "一般", "三分钟热度", "想很多做很少"]
  },
  {
    id: "identity",
    title: "你想成为怎样的人？",
    options: ["有钱", "有趣", "有影响力", "自由", "被尊重"]
  },
  {
    id: "missing",
    title: "你现在最缺什么？",
    options: ["方向", "资源", "勇气", "技能", "贵人"]
  },
  {
    id: "ai_attitude",
    title: "你对 AI 的态度？",
    options: ["兴奋", "焦虑", "观望", "想利用它赚钱"]
  },
  {
    id: "upgrade",
    title: "你最想提升哪方面？",
    options: ["职业", "副业", "表达", "恋爱", "情绪"]
  },
  {
    id: "future_self",
    title: "你希望三年后的自己？",
    options: ["买房", "自由职业", "月入更高", "作品出圈", "家庭稳定"]
  },
  {
    id: "bug",
    title: "你觉得自己最大的 Bug？",
    options: ["拖延", "自卑", "焦虑", "分心", "过度完美主义"]
  },
  {
    id: "cheat",
    title: "如果给你一个人生外挂，你想要？",
    options: ["赚钱外挂", "表达外挂", "魅力外挂", "执行外挂", "好运外挂"]
  }
];
