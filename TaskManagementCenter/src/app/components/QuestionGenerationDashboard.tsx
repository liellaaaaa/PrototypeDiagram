import { useState, useMemo } from 'react';
import { StatsCards } from './StatsCards';
import { QuestionGenerationTable } from './QuestionGenerationTable';
import { TaskDetailModal } from './TaskDetailModal';
import type { QuestionGenerationTask } from './QuestionGenerationTask';

export function QuestionGenerationDashboard() {
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [dateFilter, setDateFilter] = useState<string>('');
  const [selectedTask, setSelectedTask] = useState<QuestionGenerationTask | null>(null);

  const stats = {
    waiting: 6,
    processing: 1,
    cancelled: 3,
    completed: 1519,
    failed: 17
  };

  const tasks: QuestionGenerationTask[] = [
    {
      taskId: 1594,
      taskTitle: 'JavaScript基础知识测试题生成',
      knowledgeBase: ['javascript-fundamentals.md', 'es6-features.md', 'async-programming.md'],
      status: '已完成',
      createdAt: '2026-04-27 17:44:08',
      completedAt: '2026-04-27 17:46:23',
      processingTime: '2分15秒',
      generatedCount: 25,
      operatorUser: 'admin'
    },
    {
      taskId: 1593,
      taskTitle: 'React Hooks高级应用试题',
      knowledgeBase: ['react-hooks.md', 'custom-hooks.md', 'performance-optimization.md'],
      status: '已完成',
      createdAt: '2026-04-27 17:44:02',
      completedAt: '2026-04-27 17:45:18',
      processingTime: '1分16秒',
      generatedCount: 18,
      operatorUser: 'zhang_san'
    },
    {
      taskId: 1592,
      taskTitle: 'TypeScript类型系统综合测试',
      knowledgeBase: ['typescript-basics.md', 'generics.md', 'advanced-types.md', 'utility-types.md'],
      status: '已完成',
      createdAt: '2026-04-27 17:42:42',
      completedAt: '2026-04-27 17:45:57',
      processingTime: '3分15秒',
      generatedCount: 30,
      operatorUser: 'admin'
    },
    {
      taskId: 1591,
      taskTitle: 'CSS布局与响应式设计',
      knowledgeBase: ['css-layout.md', 'flexbox-guide.md', 'grid-system.md', 'responsive-design.md'],
      status: '已完成',
      createdAt: '2026-04-27 17:42:36',
      completedAt: '2026-04-27 17:44:12',
      processingTime: '1分36秒',
      generatedCount: 22,
      operatorUser: 'li_si'
    },
    {
      taskId: 1590,
      taskTitle: 'Node.js后端开发实战',
      knowledgeBase: ['nodejs-basics.md', 'express-framework.md'],
      status: '处理中',
      createdAt: '2026-04-27 17:30:26',
      completedAt: null,
      processingTime: '已用1分32秒',
      generatedCount: 0,
      operatorUser: 'wang_wu'
    },
    {
      taskId: 1589,
      taskTitle: 'Vue3组合式API深入理解',
      knowledgeBase: ['vue3-composition-api.md', 'reactivity-system.md', 'lifecycle.md'],
      status: '已完成',
      createdAt: '2026-04-27 17:30:22',
      completedAt: '2026-04-27 17:32:08',
      processingTime: '1分46秒',
      generatedCount: 20,
      operatorUser: 'admin'
    },
    {
      taskId: 1588,
      taskTitle: 'HTTP协议与网络安全',
      knowledgeBase: ['http-protocol.md', 'https-ssl.md', 'web-security.md', 'cors.md'],
      status: '已完成',
      createdAt: '2026-04-27 17:29:43',
      completedAt: '2026-04-27 17:32:18',
      processingTime: '2分35秒',
      generatedCount: 28,
      operatorUser: 'zhang_san'
    },
    {
      taskId: 1587,
      taskTitle: '数据结构与算法基础',
      knowledgeBase: ['data-structures.md', 'algorithms.md', 'complexity-analysis.md'],
      status: '失败',
      createdAt: '2026-04-27 17:29:42',
      completedAt: '2026-04-27 17:30:05',
      processingTime: '23秒',
      generatedCount: 0,
      operatorUser: 'li_si'
    },
    {
      taskId: 1586,
      taskTitle: 'Git版本控制最佳实践',
      knowledgeBase: ['git-basics.md', 'branching-strategies.md', 'git-workflow.md'],
      status: '已完成',
      createdAt: '2026-04-27 17:29:29',
      completedAt: '2026-04-27 17:31:05',
      processingTime: '1分36秒',
      generatedCount: 15,
      operatorUser: 'admin'
    },
    {
      taskId: 1585,
      taskTitle: 'Docker容器化部署实战',
      knowledgeBase: ['docker-basics.md', 'dockerfile.md', 'docker-compose.md'],
      status: '已完成',
      createdAt: '2026-04-27 17:29:28',
      completedAt: '2026-04-27 17:31:42',
      processingTime: '2分14秒',
      generatedCount: 24,
      operatorUser: 'wang_wu'
    },
    {
      taskId: 1584,
      taskTitle: 'MongoDB数据库操作',
      knowledgeBase: ['mongodb-basics.md', 'aggregation.md'],
      status: '已完成',
      createdAt: '2026-04-27 17:29:17',
      completedAt: '2026-04-27 17:30:33',
      processingTime: '1分16秒',
      generatedCount: 16,
      operatorUser: 'zhang_san'
    },
    {
      taskId: 1583,
      taskTitle: 'GraphQL API设计',
      knowledgeBase: ['graphql-basics.md', 'schema-design.md', 'resolvers.md'],
      status: '已完成',
      createdAt: '2026-04-27 17:29:11',
      completedAt: '2026-04-27 17:30:27',
      processingTime: '1分16秒',
      generatedCount: 19,
      operatorUser: 'li_si'
    },
    {
      taskId: 1582,
      taskTitle: 'Webpack构建工具配置',
      knowledgeBase: ['webpack-config.md', 'loaders.md', 'plugins.md', 'optimization.md'],
      status: '已完成',
      createdAt: '2026-04-23 16:22:53',
      completedAt: '2026-04-23 16:25:08',
      processingTime: '2分15秒',
      generatedCount: 21,
      operatorUser: 'admin'
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
        <QuestionGenerationTable tasks={filteredTasks} onTaskClick={setSelectedTask} />
      </div>

      {/* 任务详情弹窗 */}
      {selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </div>
  );
}