/* eslint-disable @typescript-eslint/no-explicit-any */
import { Clock } from 'lucide-react'
import { JSX } from 'react'

function SalesHistory({ ventasRealizadas }: { ventasRealizadas: any }): JSX.Element {
  return (
    <div className="bg-white rounded-4xl p-6 shadow-sm border border-gray-100 flex flex-col">
      <div className="flex justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <Clock size={18} className="text-gray-400" />
          <h2 className="font-bold text-gray-700">Ventas recientes</h2>
        </div>
        <span
          className="text-red-500 hover:text-red-400 text-bold "
          onClick={() => {
            localStorage.removeItem('historial_ventas')
            window.location.reload()
          }}
        >
          Delete
        </span>
      </div>

      <div className="space-y-3 max-h-75 overflow-y-auto pr-2 custom-scrollbar">
        {ventasRealizadas.length === 0 ? (
          <div className="text-center py-8 text-gray-300 text-sm font-medium">
            Sin ventas registradas hoy
          </div>
        ) : (
          ventasRealizadas.map((venta) => (
            <div
              key={venta.id}
              className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100 flex justify-between items-center animate-in fade-in zoom-in-95 duration-300"
            >
              <div>
                <p className="text-xs font-black text-gray-700 leading-tight">
                  {venta.items[0].nombre}{' '}
                  {venta.items.length > 1 && (
                    <span className="text-red-500">+{venta.items.length - 1}</span>
                  )}
                </p>
                <p className="text-[10px] text-gray-400 font-bold uppercase mt-0.5">
                  {venta.hora} • {venta.metodo}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-black text-red-600">
                  ${venta.total.toLocaleString('es-AR')}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default SalesHistory
