import React, { FC } from 'react'
import { AlertTriangle, PieChart, Lightbulb, LucideIcon } from 'lucide-react'
import { AnalysisType } from '../interfaces/AnalysisType'

interface AnalysisToastProps {
  type: AnalysisType
  label: string
  children: React.ReactNode
  isUrgent?: boolean
}

export const AnalysisToast: FC<AnalysisToastProps> = ({ type, label, children, isUrgent }) => {
  const config: Record<
    AnalysisType,
    { icon: LucideIcon; iconColor: string; borderColor?: string }
  > = {
    error: {
      icon: AlertTriangle,
      iconColor: 'text-amber-500'
    },
    info: {
      icon: PieChart,
      iconColor: 'text-blue-500'
    },
    warning: {
      icon: Lightbulb,
      iconColor: 'text-amber-500',
      borderColor: 'border-l-4 border-amber-400'
    }
  }

  const { icon: Icon, iconColor, borderColor } = config[type]

  return (
    <div
      className={`flex gap-3 text-sm bg-white/50 p-2 rounded-lg ${borderColor || ''} items-start`}
    >
      <Icon
        size={18}
        className={`${iconColor} shrink-0 ${type === 'warning' ? 'mt-0.5' : 'self-center'}`}
      />
      <p className="leading-relaxed">
        <span className={`font-bold text-gray-700 ${isUrgent ? 'block mb-1' : 'mr-1'}`}>
          {label}:
        </span>
        <span className={isUrgent ? 'text-gray-600' : 'text-gray-800'}>{children}</span>
      </p>
    </div>
  )
}
