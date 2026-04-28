import { useState } from 'react';
import { StatsCards } from './StatsCards';
import { TranscodingTable } from './TranscodingTable';
import type { QuestionGenerationTask } from './QuestionGenerationTask';

export function VideoTranscodingPage() {
  const [activeTab, setActiveTab] = useState<'tasks' | 'history'>('tasks');

  const stats = {
    waiting: 3,
    processing: 2,
    cancelled: 1,
    completed: 892,
    failed: 8
  };

  const tasks: QuestionGenerationTask[] = [
    {
      taskId: 2001,
      taskTitle: '培训视频转码-前端开发',
      knowledgeBase: ['intro.mp4', 'advanced.mp4'],
      status: '处理中',
      createdAt: '2026-04-27 16:30:00',
      completedAt: null,
      processingTime: '已用5分12秒',
      generatedCount: 0,
      operatorUser: 'admin'
    },
    {
      taskId: 2002,
      taskTitle: '产品介绍视频处理',
      knowledgeBase: ['product-demo.mp4'],
      status: '已完成',
      createdAt: '2026-04-27 15:20:00',
      completedAt: '2026-04-27 15:35:00',
      processingTime: '15分钟',
      generatedCount: 1,
      operatorUser: 'zhang_san'
    },
    {
      taskId: 2003,
      taskTitle: '客户案例视频集',
      knowledgeBase: ['case1.mp4', 'case2.mp4', 'case3.mp4'],
      status: '已完成',
      createdAt: '2026-04-27 14:00:00',
      completedAt: '2026-04-27 14:45:00',
      processingTime: '45分钟',
      generatedCount: 3,
      operatorUser: 'li_si'
    }
  ];

  return (
    <div>
      {/* 页面标题 */}
      <div className="mb-6">
        <h2 className="text-xl font-medium text-gray-900">视频转码管理</h2>
        <p className="text-sm text-gray-500 mt-1">管理视频转码任务，查看转码进度与结果</p>
      </div>

      {/* 三级Tab：转码任务 / 历史记录 */}
      <div className="mb-6 flex gap-2">
        <button
          onClick={() => setActiveTab('tasks')}
          className={`px-5 py-2 rounded-t-lg text-sm font-medium transition-colors ${
            activeTab === 'tasks'
              ? 'bg-blue-500 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          转码任务
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-5 py-2 rounded-t-lg text-sm font-medium transition-colors ${
            activeTab === 'history'
              ? 'bg-blue-500 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          历史记录
        </button>
      </div>

      {/* 统计卡片 */}
      <StatsCards stats={stats} />

      {/* 任务表格 */}
      <div className="mt-6">
        <TranscodingTable tasks={tasks} />
      </div>
    </div>
  );
}