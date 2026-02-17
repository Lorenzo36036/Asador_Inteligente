import React from 'react'
import { FC, ReactNode } from 'react'

interface StatCardProps {
  title: string
  value: string
  subtext: string
  icon: ReactNode
  bgColor: string
  label?: string
}

export const StatCard: FC<StatCardProps> = ({ title, value, subtext, icon, bgColor, label }) => (
  <div
    className={`${bgColor} rounded-xl p-5 text-white shadow-md relative overflow-hidden transition-transform hover:scale-[1.02]`}
  >
    <div className="flex justify-between items-start mb-4">
      <div className="flex flex-col">
        <span className="text-[10px] font-bold opacity-80 uppercase tracking-widest">{title}</span>
        <span className="text-3xl font-bold mt-1 tracking-tight">{value}</span>
      </div>
      <div className="opacity-40 font-bold text-xs uppercase tracking-tighter">
        {label || title}
      </div>
    </div>
    <div className="text-xs font-medium opacity-90 relative z-10">{subtext}</div>
    {/* Icono decorativo de fondo */}
    <div className="absolute -right-4 -bottom-4 opacity-10 transform -rotate-12">
      {React.isValidElement(icon) && React.cloneElement(icon as React.ReactElement, { size: 90 })}
    </div>
  </div>
)
