import { useState, useMemo } from 'react';
import { StatsCards } from './StatsCards';
import { TranscodingTable } from './TranscodingTable';
import type { QuestionGenerationTask } from './QuestionGenerationTask';

export function VideoTranscodingPage() {
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [dateFilter, setDateFilter] = useState<string>('');

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
      originalSize: '1.2GB',
      transcodedSize: '480MB',
      compressionRatio: '60%',
      operatorUser: 'admin'
    },
    {
      taskId: 2002,
      taskTitle: '产品介绍视频处理',
      knowledgeBase: ['product-demo.mp4'],
      status: '已完成',
      createdAt: '2026-04-27 15:20:00',
      completedAt: '2026-04-27 15:35:00',
      originalSize: '500MB',
      transcodedSize: '180MB',
      compressionRatio: '64%',
      operatorUser: 'zhang_san'
    },
    {
      taskId: 2003,
      taskTitle: '客户案例视频集',
      knowledgeBase: ['case1.mp4', 'case2.mp4', 'case3.mp4'],
      status: '已完成',
      createdAt: '2026-04-27 14:00:00',
      completedAt: '2026-04-27 14:45:00',
      originalSize: '2.1GB',
      transcodedSize: '720MB',
      compressionRatio: '66%',
      operatorUser: 'li_si'
    }
  ];

	const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      if (statusFilter && task.status !== statusFilter) return false;
      if (dateFilter && !task.createdAt.startsWith(dateFilter)) return false;
      return true;
    });
  }, [tasks, statusFilter, dateFilter]);

	return (
    <div>
      {/* 筛选框 */}
      <div className="mb-6 flex items-center gap-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">全部状态</option>
          <option value="已完成">已完成</option>
          <option value="处理中">处理中</option>
          <option value="失败">失败</option>
        </select>
        <select
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">全部时间</option>
          <option value="2026-04-27">今天</option>
          <option value="2026-04-26">昨天</option>
          <option value="2026-04-25">前天</option>
        </select>
      </div>

      {/* 统计卡片 */}
      <StatsCards stats={stats} />

      {/* 任务表格 */}
      <div className="mt-6">
        <TranscodingTable tasks={filteredTasks} />
      </div>
    </div>
  );
}