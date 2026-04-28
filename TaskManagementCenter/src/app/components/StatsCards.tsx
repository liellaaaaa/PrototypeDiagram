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
    { label: '等待中', value: stats.waiting, valueColor: 'text-gray-600' },
    { label: '生成中', value: stats.processing, valueColor: 'text-yellow-600' },
    { label: '已取消', value: stats.cancelled, valueColor: 'text-gray-500' },
    { label: '已完成', value: stats.completed, valueColor: 'text-green-600' },
    { label: '失败', value: stats.failed, valueColor: 'text-red-600' }
  ];

  return (
    <div className="grid grid-cols-5 gap-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white border border-gray-200 rounded-lg p-6 text-center"
        >
          <div className={`text-3xl mb-2 font-semibold ${card.valueColor}`}>{card.value}</div>
          <div className="text-sm text-gray-600">{card.label}</div>
        </div>
      ))}
    </div>
  );
}
