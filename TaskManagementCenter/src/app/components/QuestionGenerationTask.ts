export interface QuestionGenerationTask {
  taskId: number;
  taskTitle: string;
  knowledgeBase: string[];
  status: '待处理' | '处理中' | '已完成' | '失败';
  createdAt: string;
  completedAt: string | null;
  processingTime: string;
  generatedCount: number;
  operatorUser: string;
}