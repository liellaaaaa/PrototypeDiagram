import { useState } from 'react';
import { QuestionGenerationDashboard } from './components/QuestionGenerationDashboard';
import { VideoTranscodingPage } from './components/VideoTranscodingPage';

type SecondLevelTab = 'question-generation' | 'video-transcoding' | 'other-tasks';

export default function App() {
  const [activeSecondTab, setActiveSecondTab] = useState<SecondLevelTab>('question-generation');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部标题 */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1800px] mx-auto px-6 py-4">
          <h1 className="text-2xl font-semibold text-gray-900">任务管理中心</h1>
        </div>
      </div>

      {/* 二级Tab切换 - 试题生成、视频转码、其他任务 */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1800px] mx-auto px-6">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveSecondTab('question-generation')}
              className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeSecondTab === 'question-generation'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              试题生成管理
            </button>
            <button
              onClick={() => setActiveSecondTab('video-transcoding')}
              className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeSecondTab === 'video-transcoding'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              视频转码管理
            </button>
            <button
              onClick={() => setActiveSecondTab('other-tasks')}
              className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeSecondTab === 'other-tasks'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              其他任务
            </button>
          </div>
        </div>
      </div>

      {/* 主内容区域 */}
      <div className="p-6">
        <div className="max-w-[1800px] mx-auto">
          {activeSecondTab === 'question-generation' && <QuestionGenerationDashboard />}
          {activeSecondTab === 'video-transcoding' && <VideoTranscodingPage />}
          {activeSecondTab === 'other-tasks' && (
            <div className="bg-white rounded-lg shadow p-12 text-center text-gray-500">
              暂无其他任务
            </div>
          )}
        </div>
      </div>
    </div>
  );
}