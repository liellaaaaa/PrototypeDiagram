import type { QuestionGenerationTask } from './QuestionGenerationTask';

interface QuestionGenerationTableProps {
  tasks: QuestionGenerationTask[];
  onTaskClick: (task: QuestionGenerationTask) => void;
}

export function QuestionGenerationTable({ tasks, onTaskClick }: QuestionGenerationTableProps) {
  const getStatusBadge = (status: QuestionGenerationTask['status']) => {
    const styles = {
      '待处理': 'bg-gray-100 text-gray-700',
      '处理中': 'bg-yellow-100 text-yellow-700',
      '已完成': 'bg-green-100 text-green-700',
      '失败': 'bg-red-100 text-red-700'
    };

    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${styles[status]}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-gray-600 font-medium">序号</th>
              <th className="px-4 py-3 text-left text-gray-600 font-medium">任务标题</th>
              <th className="px-4 py-3 text-left text-gray-600 font-medium">关联文件</th>
              <th className="px-4 py-3 text-left text-gray-600 font-medium">任务状态</th>
              <th className="px-4 py-3 text-left text-gray-600 font-medium">创建时间</th>
              <th className="px-4 py-3 text-left text-gray-600 font-medium">完成时间</th>
              <th className="px-4 py-3 text-left text-gray-600 font-medium">处理时长</th>
              <th className="px-4 py-3 text-left text-gray-600 font-medium">生成数量</th>
              <th className="px-4 py-3 text-left text-gray-600 font-medium">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tasks.map((task) => (
              <tr key={task.taskId} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-gray-900 font-mono">{task.taskId}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => onTaskClick(task)}
                    className="text-blue-600 hover:text-blue-800 hover:underline text-left"
                  >
                    {task.taskTitle}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1 max-w-xs">
                    {task.knowledgeBase.map((file, index) => (
                      <span
                        key={index}
                        className="inline-block px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs"
                        title={file}
                      >
                        {file}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3">{getStatusBadge(task.status)}</td>
                <td className="px-4 py-3 text-gray-600">{task.createdAt}</td>
                <td className="px-4 py-3 text-gray-600">
                  {task.completedAt || '-'}
                </td>
                <td className="px-4 py-3 text-gray-600">{task.processingTime}</td>
                <td className="px-4 py-3 text-center font-medium">{task.generatedCount}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => onTaskClick(task)}
                    className="text-blue-600 hover:text-blue-800 text-xs"
                  >
                    查看详情
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}