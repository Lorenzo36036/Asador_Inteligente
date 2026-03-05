import { PieChart, Utensils } from 'lucide-react'
import { FC } from 'react'

interface Product {
  id: number | string
  nombre_platillo: string
}

interface ChartPlaceholderProps {
  title: string
  data: Product[]
}

export const ChartPlaceholder: FC<ChartPlaceholderProps> = ({ title, data }) => (
  <div className="bg-white border border-gray-100 rounded-2xl p-6 h-80 flex flex-col shadow-sm">
    <h3 className="font-bold text-gray-800 border-b border-gray-50 pb-4 mb-4">{title}</h3>

    <div className="flex-1 flex flex-col items-center justify-center overflow-y-auto">
      {data.length === 0 ? (
        <div className="flex flex-col items-center opacity-40">
          <PieChart size={48} className="mb-4 text-gray-300" />
          <p className="text-sm italic font-medium">No hay datos de ventas aún</p>
        </div>
      ) : (
        <div className="w-full">
          {data.map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-4 mb-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                <Utensils size={18} className="text-orange-500" />
              </div>
              <p className="text-sm font-medium text-gray-700">{product.nombre_platillo}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
)
