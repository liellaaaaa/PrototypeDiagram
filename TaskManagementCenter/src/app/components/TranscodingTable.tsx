import { QuestionGenerationTask } from './VideoTranscodingDashboard';

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

  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-4 py-3 text-left text-gray-600">任务序号</th>
            <th className="px-4 py-3 text-left text-gray-600">任务标题</th>
            <th className="px-4 py-3 text-left text-gray-600">知识库来源</th>
            <th className="px-4 py-3 text-left text-gray-600">任务状态</th>
            <th className="px-4 py-3 text-left text-gray-600">创建时间</th>
            <th className="px-4 py-3 text-left text-gray-600">完成时间</th>
            <th className="px-4 py-3 text-left text-gray-600">处理时长</th>
            <th className="px-4 py-3 text-left text-gray-600">生成试题数</th>
            <th className="px-4 py-3 text-left text-gray-600">操作用户</th>
            <th className="px-4 py-3 text-left text-gray-600">操作</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {tasks.map((task) => (
            <tr key={task.taskId} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-gray-900">{task.taskId}</td>
              <td className="px-4 py-3">
                <span className="text-blue-600">{task.taskTitle}</span>
              </td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-1 max-w-xs">
                  {task.knowledgeBase.map((file, index) => (
                    <span
                      key={index}
                      className="inline-block px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs"
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
              <td className="px-4 py-3 text-gray-900">{task.generatedCount}</td>
              <td className="px-4 py-3 text-gray-600">{task.operatorUser}</td>
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
