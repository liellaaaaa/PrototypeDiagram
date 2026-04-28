import { Task } from '../App';

interface TaskListProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
}

export function TaskList({ tasks, onTaskClick }: TaskListProps) {
  const getStatusBadge = (status: Task['status']) => {
    const styles = {
      completed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      failed: 'bg-red-100 text-red-800'
    };

    const labels = {
      completed: '已完成',
      pending: '进行中',
      failed: '失败'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-sm ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-sm text-gray-600">序号</th>
            <th className="px-6 py-3 text-left text-sm text-gray-600">试题内容</th>
            <th className="px-6 py-3 text-left text-sm text-gray-600">创建时间</th>
            <th className="px-6 py-3 text-left text-sm text-gray-600">状态</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {tasks.map((task) => (
            <tr
              key={task.id}
              className="hover:bg-gray-50 transition-colors"
            >
              <td className="px-6 py-4 text-sm text-gray-900">{task.id}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => onTaskClick(task)}
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline text-left max-w-xl"
                >
                  {task.question}
                </button>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">{task.createdAt}</td>
              <td className="px-6 py-4">{getStatusBadge(task.status)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
