import { useState, useMemo } from 'react';
import { StatsCards } from './StatsCards';
import { QuestionGenerationTable } from './QuestionGenerationTable';
import { TaskDetailModal } from './TaskDetailModal';
import type { QuestionGenerationTask } from './QuestionGenerationTask';

const PAGE_SIZE = 10;

export function QuestionGenerationDashboard() {
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [dateFilter, setDateFilter] = useState<string>('');
  const [selectedTask, setSelectedTask] = useState<QuestionGenerationTask | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const stats = {
    waiting: 6,
    processing: 1,
    cancelled: 3,
    completed: 1519,
    failed: 17
  };

  const tasks: QuestionGenerationTask[] = [
    { taskId: 1594, taskTitle: 'JavaScript基础知识测试题生成', knowledgeBase: ['javascript-fundamentals.md', 'es6-features.md', 'async-programming.md'], status: '已完成', createdAt: '2026-04-27 17:44:08', completedAt: '2026-04-27 17:46:23', generatedCount: 25, operatorUser: 'admin' },
    { taskId: 1593, taskTitle: 'React Hooks高级应用试题', knowledgeBase: ['react-hooks.md', 'custom-hooks.md', 'performance-optimization.md'], status: '已完成', createdAt: '2026-04-27 17:44:02', completedAt: '2026-04-27 17:45:18', generatedCount: 18, operatorUser: 'zhang_san' },
    { taskId: 1592, taskTitle: 'TypeScript类型系统综合测试', knowledgeBase: ['typescript-basics.md', 'generics.md', 'advanced-types.md', 'utility-types.md'], status: '已完成', createdAt: '2026-04-27 17:42:42', completedAt: '2026-04-27 17:45:57', generatedCount: 30, operatorUser: 'admin' },
    { taskId: 1591, taskTitle: 'CSS布局与响应式设计', knowledgeBase: ['css-layout.md', 'flexbox-guide.md', 'grid-system.md', 'responsive-design.md'], status: '已完成', createdAt: '2026-04-27 17:42:36', completedAt: '2026-04-27 17:44:12', generatedCount: 22, operatorUser: 'li_si' },
    { taskId: 1590, taskTitle: 'Node.js后端开发实战', knowledgeBase: ['nodejs-basics.md', 'express-framework.md'], status: '处理中', createdAt: '2026-04-27 17:30:26', completedAt: null, generatedCount: 0, operatorUser: 'wang_wu' },
    { taskId: 1589, taskTitle: 'Vue3组合式API深入理解', knowledgeBase: ['vue3-composition-api.md', 'reactivity-system.md', 'lifecycle.md'], status: '已完成', createdAt: '2026-04-27 17:30:22', completedAt: '2026-04-27 17:32:08', generatedCount: 20, operatorUser: 'admin' },
    { taskId: 1588, taskTitle: 'HTTP协议与网络安全', knowledgeBase: ['http-protocol.md', 'https-ssl.md', 'web-security.md', 'cors.md'], status: '已完成', createdAt: '2026-04-27 17:29:43', completedAt: '2026-04-27 17:32:18', generatedCount: 28, operatorUser: 'zhang_san' },
    { taskId: 1587, taskTitle: '数据结构与算法基础', knowledgeBase: ['data-structures.md', 'algorithms.md', 'complexity-analysis.md'], status: '失败', createdAt: '2026-04-27 17:29:42', completedAt: '2026-04-27 17:30:05', generatedCount: 0, operatorUser: 'li_si' },
    { taskId: 1586, taskTitle: 'Git版本控制最佳实践', knowledgeBase: ['git-basics.md', 'branching-strategies.md', 'git-workflow.md'], status: '已完成', createdAt: '2026-04-27 17:29:29', completedAt: '2026-04-27 17:31:05', generatedCount: 15, operatorUser: 'admin' },
    { taskId: 1585, taskTitle: 'Docker容器化部署实战', knowledgeBase: ['docker-basics.md', 'dockerfile.md', 'docker-compose.md'], status: '已完成', createdAt: '2026-04-27 17:29:28', completedAt: '2026-04-27 17:31:42', generatedCount: 24, operatorUser: 'wang_wu' },
    { taskId: 1584, taskTitle: 'MongoDB数据库操作', knowledgeBase: ['mongodb-basics.md', 'aggregation.md'], status: '已完成', createdAt: '2026-04-27 17:29:17', completedAt: '2026-04-27 17:30:33', generatedCount: 16, operatorUser: 'zhang_san' },
    { taskId: 1583, taskTitle: 'GraphQL API设计', knowledgeBase: ['graphql-basics.md', 'schema-design.md', 'resolvers.md'], status: '已完成', createdAt: '2026-04-27 17:29:11', completedAt: '2026-04-27 17:30:27', generatedCount: 19, operatorUser: 'li_si' },
    { taskId: 1582, taskTitle: 'Webpack构建工具配置', knowledgeBase: ['webpack-config.md', 'loaders.md', 'plugins.md', 'optimization.md'], status: '已完成', createdAt: '2026-04-23 16:22:53', completedAt: '2026-04-23 16:25:08', generatedCount: 21, operatorUser: 'admin' },
    { taskId: 1581, taskTitle: 'Python数据分析实战', knowledgeBase: ['pandas.md', 'numpy.md', 'matplotlib.md'], status: '已完成', createdAt: '2026-04-23 15:10:00', completedAt: '2026-04-23 15:15:30', generatedCount: 35, operatorUser: 'admin' },
    { taskId: 1580, taskTitle: '机器学习算法基础', knowledgeBase: ['ml-basics.md', 'sklearn.md'], status: '已完成', createdAt: '2026-04-23 14:00:00', completedAt: '2026-04-23 14:10:00', generatedCount: 28, operatorUser: 'zhang_san' },
    { taskId: 1579, taskTitle: 'Redis缓存实战', knowledgeBase: ['redis-basics.md', 'redis-cache.md'], status: '已完成', createdAt: '2026-04-23 13:00:00', completedAt: '2026-04-23 13:08:00', generatedCount: 18, operatorUser: 'li_si' },
    { taskId: 1578, taskTitle: 'Kafka消息队列', knowledgeBase: ['kafka-intro.md', 'kafka-producer.md'], status: '失败', createdAt: '2026-04-23 12:00:00', completedAt: '2026-04-23 12:05:00', generatedCount: 0, operatorUser: 'wang_wu' },
    { taskId: 1577, taskTitle: 'Spring Cloud微服务', knowledgeBase: ['spring-cloud.md', 'feign.md', 'gateway.md'], status: '已完成', createdAt: '2026-04-22 17:00:00', completedAt: '2026-04-22 17:12:00', generatedCount: 32, operatorUser: 'admin' },
    { taskId: 1576, taskTitle: 'Kubernetes容器编排', knowledgeBase: ['k8s-basics.md', 'k8s-deploy.md'], status: '已完成', createdAt: '2026-04-22 16:00:00', completedAt: '2026-04-22 16:10:00', generatedCount: 25, operatorUser: 'zhang_san' },
    { taskId: 1575, taskTitle: 'MySQL数据库优化', knowledgeBase: ['mysql-optimization.md', 'indexing.md'], status: '已完成', createdAt: '2026-04-22 15:00:00', completedAt: '2026-04-22 15:08:00', generatedCount: 20, operatorUser: 'li_si' },
    { taskId: 1574, taskTitle: 'Linux系统管理', knowledgeBase: ['linux-commands.md', 'shell-scripting.md'], status: '已完成', createdAt: '2026-04-22 14:00:00', completedAt: '2026-04-22 14:06:00', generatedCount: 15, operatorUser: 'wang_wu' },
    { taskId: 1573, taskTitle: 'Nginx反向代理配置', knowledgeBase: ['nginx-basics.md', 'nginx-proxy.md'], status: '已完成', createdAt: '2026-04-22 13:00:00', completedAt: '2026-04-22 13:05:00', generatedCount: 12, operatorUser: 'admin' },
    { taskId: 1572, taskTitle: 'Java并发编程', knowledgeBase: ['java-concurrency.md', 'thread-pool.md'], status: '已完成', createdAt: '2026-04-22 12:00:00', completedAt: '2026-04-22 12:10:00', generatedCount: 22, operatorUser: 'zhang_san' },
    { taskId: 1571, taskTitle: 'Elasticsearch搜索', knowledgeBase: ['es-basics.md', 'es-query.md'], status: '已完成', createdAt: '2026-04-22 11:00:00', completedAt: '2026-04-22 11:08:00', generatedCount: 18, operatorUser: 'li_si' },
    { taskId: 1570, taskTitle: 'RabbitMQ消息中间件', knowledgeBase: ['rabbitmq-basics.md', 'amqp.md'], status: '已完成', createdAt: '2026-04-22 10:00:00', completedAt: '2026-04-22 10:07:00', generatedCount: 14, operatorUser: 'wang_wu' },
    { taskId: 1569, taskTitle: 'Flutter移动开发', knowledgeBase: ['flutter-basics.md', 'dart.md'], status: '待处理', createdAt: '2026-04-22 09:00:00', completedAt: null, generatedCount: 0, operatorUser: 'admin' },
    { taskId: 1568, taskTitle: 'iOS Swift编程', knowledgeBase: ['swift-basics.md', 'swiftui.md'], status: '已完成', createdAt: '2026-04-21 17:00:00', completedAt: '2026-04-21 17:10:00', generatedCount: 20, operatorUser: 'zhang_san' },
    { taskId: 1567, taskTitle: 'Android Jetpack组件', knowledgeBase: ['android-jetpack.md', 'compose.md'], status: '已完成', createdAt: '2026-04-21 16:00:00', completedAt: '2026-04-21 16:09:00', generatedCount: 24, operatorUser: 'li_si' },
    { taskId: 1566, taskTitle: 'React Native跨平台', knowledgeBase: ['react-native.md', 'expo.md'], status: '已完成', createdAt: '2026-04-21 15:00:00', completedAt: '2026-04-21 15:08:00', generatedCount: 16, operatorUser: 'wang_wu' },
    { taskId: 1565, taskTitle: 'WebSocket实时通信', knowledgeBase: ['websocket.md', 'socket-io.md'], status: '已完成', createdAt: '2026-04-21 14:00:00', completedAt: '2026-04-21 14:05:00', generatedCount: 10, operatorUser: 'admin' },
    { taskId: 1564, taskTitle: 'CSS动画特效', knowledgeBase: ['css-animation.md', 'transition.md'], status: '已完成', createdAt: '2026-04-21 13:00:00', completedAt: '2026-04-21 13:04:00', generatedCount: 8, operatorUser: 'zhang_san' },
    { taskId: 1563, taskTitle: 'TypeScript高级类型', knowledgeBase: ['advanced-typescript.md', 'generics.md'], status: '失败', createdAt: '2026-04-21 12:00:00', completedAt: '2026-04-21 12:03:00', generatedCount: 0, operatorUser: 'li_si' },
    { taskId: 1562, taskTitle: '微服务架构设计', knowledgeBase: ['microservices.md', 'api-gateway.md'], status: '已完成', createdAt: '2026-04-21 11:00:00', completedAt: '2026-04-21 11:15:00', generatedCount: 30, operatorUser: 'wang_wu' },
    { taskId: 1561, taskTitle: 'CI/CD持续集成', knowledgeBase: ['jenkins.md', 'gitlab-ci.md'], status: '已完成', createdAt: '2026-04-21 10:00:00', completedAt: '2026-04-21 10:08:00', generatedCount: 12, operatorUser: 'admin' },
    { taskId: 1560, taskTitle: 'Terraform基础设施代码化', knowledgeBase: ['terraform-basics.md', 'aws-terraform.md'], status: '已完成', createdAt: '2026-04-21 09:00:00', completedAt: '2026-04-21 09:06:00', generatedCount: 10, operatorUser: 'zhang_san' }
  ];

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      if (statusFilter && task.status !== statusFilter) return false;
      if (dateFilter && !task.createdAt.startsWith(dateFilter)) return false;
      return true;
    });
  }, [tasks, statusFilter, dateFilter]);

  const totalPages = Math.ceil(filteredTasks.length / PAGE_SIZE);
  const paginatedTasks = filteredTasks.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
        <QuestionGenerationTable tasks={paginatedTasks} onTaskClick={setSelectedTask} />
      </div>

      {/* 分页 */}
      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            共 {filteredTasks.length} 条记录，第 {currentPage}/{totalPages} 页
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm border border-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              首页
            </button>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm border border-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              上一页
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`px-3 py-1 text-sm border rounded ${
                    currentPage === pageNum
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm border border-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              下一页
            </button>
            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm border border-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              末页
            </button>
          </div>
        </div>
      )}

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