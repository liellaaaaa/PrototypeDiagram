import type { QuestionGenerationTask } from './QuestionGenerationTask';

interface TranscodingTableProps {
  tasks: QuestionGenerationTask[];
}

export function TranscodingTable({ tasks }: TranscodingTableProps) {
  const getStatusBadge = (status: QuestionGenerationTask['status']) => {
    const styles = {
      '待处理': 'bg-gray-100 text-gray-800',
      '处理中': 'bg-yellow-100 text-yellow-800',
      '已完成': 'bg-green-100 text-green-800',
      '失败': 'bg-red-100 text-red-800'
    };

    return (
      <span className={`px-2 py-1 rounded text-xs ${styles[status]}`}>
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
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-4 py-3 text-left text-gray-600">序号</th>
            <th className="px-4 py-3 text-left text-gray-600">任务标题</th>
            <th className="px-4 py-3 text-left text-gray-600">状态</th>
            <th className="px-4 py-3 text-left text-gray-600">进度</th>
            <th className="px-4 py-3 text-left text-gray-600">创建时间</th>
            <th className="px-4 py-3 text-left text-gray-600">完成时间</th>
            <th className="px-4 py-3 text-left text-gray-600">原始大小</th>
            <th className="px-4 py-3 text-left text-gray-600">转码后</th>
            <th className="px-4 py-3 text-left text-gray-600">压缩比</th>
            <th className="px-4 py-3 text-left text-gray-600">操作</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {tasks.map((task) => (
            <tr key={task.taskId} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-gray-900 font-mono">{task.taskId}</td>
              <td className="px-4 py-3">
                <span className="text-blue-600">{task.taskTitle}</span>
              </td>
              <td className="px-4 py-3">{getStatusBadge(task.status)}</td>
              <td className="px-4 py-3">{getProgressBar(task.status)}</td>
              <td className="px-4 py-3 text-gray-600">{task.createdAt}</td>
              <td className="px-4 py-3 text-gray-600">
                {task.completedAt || '-'}
              </td>
              <td className="px-4 py-3 text-gray-600">{task.originalSize || '-'}</td>
              <td className="px-4 py-3 text-gray-600">{task.transcodedSize || '-'}</td>
              <td className="px-4 py-3 text-gray-600">{task.compressionRatio || '-'}</td>
              <td className="px-4 py-3">
                <button className="text-blue-600 hover:text-blue-800 text-xs">
                  详情
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}