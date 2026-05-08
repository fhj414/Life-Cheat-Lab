export type Answer = {
  questionId: string;
  question: string;
  answer: string;
};

export type Attributes = {
  money: number;
  execution: number;
  social: number;
  emotion: number;
  creativity: number;
  future: number;
};

export type ParallelLife = {
  title: string;
  oneYear: string;
  threeYears: string;
  tenYears: string;
  risk: string;
  opportunity: string;
};

export type MissionBlock = {
  dayRange: string;
  title: string;
  tasks: string[];
};

export type LifeReport = {
  roleName: string;
  hiddenJob: string;
  slogan: string;
  systemStatus: string;
  attributes: Attributes;
  advantages: string[];
  bugs: string[];
  parallelLives: ParallelLife[];
  missions30Days: MissionBlock[];
  roast: string;
  shareCardText: string;
};

export type StoredReport = {
  id: string;
  createdAt: string;
  answers: Answer[];
  report: LifeReport;
};

export type GenerateReportResult = {
  report: LifeReport;
  source: "openrouter" | "mock";
  warning?: string;
};

export type Question = {
  id: string;
  title: string;
  options: string[];
};
