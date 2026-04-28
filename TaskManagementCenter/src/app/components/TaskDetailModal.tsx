import { useState } from 'react';
import type { QuestionGenerationTask } from './QuestionGenerationTask';

interface TaskDetailModalProps {
  task: QuestionGenerationTask;
  onClose: () => void;
}

export function TaskDetailModal({ task, onClose }: TaskDetailModalProps) {
  const [activeInnerTab, setActiveInnerTab] = useState<'questions' | 'files'>('questions');

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div
        className="bg-white rounded-lg shadow-xl w-[900px] max-h-[80vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 弹窗头部 */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">任务详情</h3>
            <p className="text-sm text-gray-500 mt-0.5">任务ID: {task.taskId}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 任务基本信息 */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="grid grid-cols-4 gap-4">
            <div>
              <div className="text-xs text-gray-500 mb-1">任务标题</div>
              <div className="text-sm font-medium text-gray-900 truncate">{task.taskTitle}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">任务状态</div>
              <div className="mt-0.5">{getStatusBadge(task.status)}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">操作用户</div>
              <div className="text-sm text-gray-900">{task.operatorUser}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">处理时长</div>
              <div className="text-sm text-gray-900">{task.processingTime}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">创建时间</div>
              <div className="text-sm text-gray-900">{task.createdAt}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">完成时间</div>
              <div className="text-sm text-gray-900">{task.completedAt || '-'}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">生成数量</div>
              <div className="text-sm font-medium text-gray-900">{task.generatedCount} 题</div>
            </div>
          </div>
        </div>

        {/* 内部Tab切换：试题内容 / 关联文件 */}
        <div className="px-6 pt-4">
          <div className="flex gap-4 border-b border-gray-200">
            <button
              onClick={() => setActiveInnerTab('questions')}
              className={`pb-2 text-sm font-medium transition-colors ${
                activeInnerTab === 'questions'
                  ? 'text-blue-600 border-b-2 border-blue-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              试题内容
            </button>
            <button
              onClick={() => setActiveInnerTab('files')}
              className={`pb-2 text-sm font-medium transition-colors ${
                activeInnerTab === 'files'
                  ? 'text-blue-600 border-b-2 border-blue-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              关联文件 ({task.knowledgeBase.length})
            </button>
          </div>
        </div>

        {/* 内容区域 */}
        <div className="px-6 py-4 max-h-[400px] overflow-y-auto">
          {activeInnerTab === 'questions' && (
            <div className="text-sm text-gray-600">
              {task.status === '处理中' ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-pulse text-gray-500">正在生成试题，请稍候...</div>
                </div>
              ) : task.status === '失败' ? (
                <div className="text-red-600 text-center py-8">任务处理失败，请联系管理员排查</div>
              ) : task.generatedCount > 0 ? (
                <div className="space-y-3">
                  {Array.from({ length: task.generatedCount }, (_, i) => (
                    <div key={i} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <div className="text-gray-700">
                        第{i + 1}题：这是一道示例试题内容，实际内容将在真实环境中呈现。
                      </div>
                      <div className="mt-2 flex gap-2">
                        <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded">选择题</span>
                        <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded">难度: 中</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-400 text-center py-8">暂无试题数据</div>
              )}
            </div>
          )}

          {activeInnerTab === 'files' && (
            <div className="space-y-2">
              {task.knowledgeBase.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100"
                >
                  <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                    <span className="text-blue-600 text-xs font-mono">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">{file}</div>
                    <div className="text-xs text-gray-500 mt-0.5">知识库文件</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 弹窗底部 */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            关闭
          </button>
          {task.status === '已完成' && (
            <button className="px-4 py-2 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors">
              导出试题
            </button>
          )}
        </div>
      </div>
    </div>
  );
}