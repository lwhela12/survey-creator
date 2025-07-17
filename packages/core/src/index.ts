
export interface Survey {
  id: string;
  name: string;
  ownerId: string;
  createdAt: Date;
  publishedAt?: Date;
  nodes: Record<string, QuestionNode>;
  styleConfig: StyleConfig;
}

export interface QuestionNode {
  id: string;
  messageText: string;
  questionType: 'statement' | 'text' | 'number' | 'single_choice' | 'multi_choice';
  options?: string[];
  nextId?: string;
  nextLogic?: Record<string, string>;
}

export interface StyleConfig {
  botMessageBg?: string;
  userMessageBg?: string;
  avatarUrl?: string;
  messageDelay?: number;
}

export interface SurveyResponse {
  id: string;
  surveyId: string;
  completedAt: Date;
  answers: Record<string, string | string[]>;
}
