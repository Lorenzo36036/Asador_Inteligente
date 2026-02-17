import React, { FC } from 'react'
import {
  DollarSign,
  TrendingUp,
  AlertCircle,
  PieChart,
  Bot,
  Lightbulb,
  SendHorizontal
} from 'lucide-react'
import { StatCard } from './components/StatCard'
import { ChartPlaceholder } from './components/ChartPlaceholder'
import { AnalysisToast } from './components/AnalysisToast'
import { AnalysisItem } from './interfaces/AnalysisType'

const analysisData: AnalysisItem[] = [
  {
    type: 'error',
    label: 'Estado',
    content: (
      <>
        Pérdida actual de <span className="text-red-600 font-bold">$292.000</span>
      </>
    )
  },
  {
    type: 'info',
    label: 'Análisis',
    content: 'Necesitas aumentar ventas o reducir costos operativos.'
  },
  {
    type: 'warning',
    label: 'Recomendación urgente',
    urgent: true,
    content:
      '1) Ajusta precios al alza, 2) Promociona productos más rentables, 3) Reduce el stock de bajo movimiento.'
  }
]

const DashboardIa: FC = () => {
  const handleSendMessage = (e: React.FormEvent): void => {
    e.preventDefault()
    console.log('Enviando consulta a la IA...')
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-8 font-sans text-gray-800 select-none">
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Dashboard con IA</h1>
          <p className="text-gray-500 text-sm font-medium">Análisis inteligente de tu negocio</p>
        </div>
        <div className="text-[10px] text-gray-400 font-mono bg-white px-2 py-1 rounded border">
          APP_VER: 1.0.0-STABLE
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard
          title="Inversión Total"
          value="$292.000"
          subtext="9 productos en stock"
          icon={<DollarSign />}
          bgColor="bg-[#1a73e8]"
          label="Inversión Total"
        />
        <StatCard
          title="Ventas Totales"
          value="$0"
          subtext="0 transacciones"
          icon={<TrendingUp />}
          bgColor="bg-[#34a853]"
          label="Ventas Totales"
        />
        <StatCard
          title="Pérdida"
          value="$292.000"
          subtext="-100.0% margen"
          icon={<AlertCircle />}
          bgColor="bg-[#d93025]"
          label="Pérdida"
        />
        <StatCard
          title="ROI"
          value="0%"
          subtext="Retorno de inversión"
          icon={<PieChart />}
          bgColor="bg-[#9333ea]"
          label="ROI"
        />
      </div>

      <section className="bg-red-50 border border-red-100 rounded-2xl p-6 mb-8 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-red-600 p-1.5 rounded-lg shadow-inner">
            <Bot size={18} className="text-white" />
          </div>
          <h2 className="font-bold text-sm text-red-800 uppercase tracking-widest">
            Análisis Financiero Inteligente
          </h2>
        </div>

        <div className="space-y-3">
          {analysisData.map((item, index) => (
            <AnalysisToast key={index} type={item.type} label={item.label} isUrgent={item.urgent}>
              {item.content}
            </AnalysisToast>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <ChartPlaceholder title="Productos Más Vendidos" emptyText="No hay datos de ventas aún" />
        <ChartPlaceholder
          title="Distribución por Método de Pago"
          emptyText="No hay datos de pago aún"
        />
      </div>

      <section className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xl shadow-gray-200/50">
        <div className="bg-[#c5221f] p-5 text-white">
          <div className="flex items-center gap-3 mb-1">
            <Bot size={22} className="animate-pulse" />
            <span className="font-bold text-lg tracking-tight">Consulta con el Asistente IA</span>
          </div>
          <p className="text-xs text-red-100/80 italic font-light">
            Estrategias personalizadas y análisis en tiempo real
          </p>
        </div>

        <div className="p-6">
          <div className="inline-block bg-gray-100 p-4 rounded-2xl rounded-tl-none max-w-[80%] text-sm text-gray-700 mb-6 border border-gray-200 shadow-sm">
            ¡Hola! Soy tu asistente de análisis financiero. Puedo ayudarte a entender el desempeño
            de tu negocio y sugerir mejoras. ¿En qué puedo apoyarte hoy?
          </div>

          <form onSubmit={handleSendMessage} className="relative group">
            <input
              type="text"
              placeholder="Pregunta sobre tu negocio..."
              className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl py-4 px-5 pr-14 focus:outline-none focus:border-red-500 focus:bg-white transition-all text-sm shadow-inner"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
            >
              <SendHorizontal size={24} />
            </button>
          </form>

          <div className="mt-5 flex items-start gap-2 bg-amber-50/50 border border-amber-100 rounded-xl p-3">
            <Lightbulb size={16} className="text-amber-500 shrink-0 mt-0.5" />
            <p className="text-[11px] text-gray-500 leading-relaxed">
              <span className="font-bold text-amber-700 uppercase mr-2">Sugerencias:</span>
              <button className="hover:underline text-blue-600">¿Cuál es mi ganancia?</button> •
              <button className="hover:underline text-blue-600 ml-1">
                ¿Qué producto se vende más?
              </button>{' '}
              •
              <button className="hover:underline text-blue-600 ml-1">
                ¿Cómo recupero mi inversión?
              </button>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default DashboardIa
