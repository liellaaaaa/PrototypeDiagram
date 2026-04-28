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

  const getProgressBar = (status: QuestionGenerationTask['status']) => {
    if (status === '已完成') {
      return (
        <div className="w-24 bg-green-200 rounded-full h-2">
          <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
        </div>
      );
    } else if (status === '处理中') {
      return (
        <div className="w-24 bg-yellow-200 rounded-full h-2">
          <div className="bg-yellow-500 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
        </div>
      );
    } else if (status === '失败') {
      return (
        <div className="w-24 bg-red-200 rounded-full h-2">
          <div className="bg-red-500 h-2 rounded-full" style={{ width: '30%' }}></div>
        </div>
      );
    }
    return (
      <div className="w-24 bg-gray-200 rounded-full h-2">
        <div className="bg-gray-400 h-2 rounded-full" style={{ width: '10%' }}></div>
      </div>
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
              <th className="px-4 py-3 text-left text-gray-600 font-medium">状态</th>
              <th className="px-4 py-3 text-left text-gray-600 font-medium">进度</th>
              <th className="px-4 py-3 text-left text-gray-600 font-medium">创建时间</th>
              <th className="px-4 py-3 text-left text-gray-600 font-medium">完成时间</th>
              <th className="px-4 py-3 text-left text-gray-600 font-medium">生成题数</th>
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
                <td className="px-4 py-3">{getStatusBadge(task.status)}</td>
                <td className="px-4 py-3">{getProgressBar(task.status)}</td>
                <td className="px-4 py-3 text-gray-600">{task.createdAt}</td>
                <td className="px-4 py-3 text-gray-600">
                  {task.completedAt || '-'}
                </td>
                <td className="px-4 py-3 text-center font-medium">{task.generatedCount ?? '-'}</td>
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