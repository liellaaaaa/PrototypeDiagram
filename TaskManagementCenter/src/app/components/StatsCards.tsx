interface StatsCardsProps {
  stats: {
    waiting: number;
    processing: number;
    cancelled: number;
    completed: number;
    failed: number;
  };
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    { label: '等待中', value: stats.waiting, color: 'bg-gray-50 border-gray-200' },
    { label: '生成中', value: stats.processing, color: 'bg-yellow-50 border-yellow-200' },
    { label: '已取消', value: stats.cancelled, color: 'bg-gray-50 border-gray-200' },
    { label: '已完成', value: stats.completed, color: 'bg-green-50 border-green-200' },
    { label: '失败', value: stats.failed, color: 'bg-red-50 border-red-200' }
  ];

  return (
    <div className="grid grid-cols-5 gap-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`${card.color} border rounded-lg p-6 text-center`}
        >
          <div className="text-3xl mb-2">{card.value}</div>
          <div className="text-sm text-gray-600">{card.label}</div>
        </div>
      ))}
    </div>
  );
}
