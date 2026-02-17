import { PieChart } from 'lucide-react'
import { FC } from 'react'

export const ChartPlaceholder: FC<{ title: string; emptyText: string }> = ({
  title,
  emptyText
}) => (
  <div className="bg-white border border-gray-100 rounded-2xl p-6 h-80 flex flex-col shadow-sm">
    <h3 className="font-bold text-gray-800 border-b border-gray-50 pb-4 mb-4">{title}</h3>
    <div className="flex-1 flex flex-col items-center justify-center opacity-40">
      <PieChart size={48} className="mb-4 text-gray-300" />
      <p className="text-sm italic font-medium">{emptyText}</p>
    </div>
  </div>
)
