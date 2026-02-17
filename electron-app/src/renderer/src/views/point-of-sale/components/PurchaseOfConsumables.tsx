/* eslint-disable @typescript-eslint/no-explicit-any */
import { CreditCard, DollarSign, Minus, Plus, ShoppingBag, Smartphone } from 'lucide-react'
import { JSX } from 'react'

function PurchaseOfConsumables({
  carrito,
  modificarCantidad,
  setMetodoPago,
  total,
  metodoPago,
  finalizarVenta
}: {
  carrito: any
  modificarCantidad: any
  setMetodoPago: any
  total: any
  metodoPago: any
  finalizarVenta: any
}): JSX.Element {
  return (
    <div className="bg-white rounded-4xl p-8 shadow-sm border border-gray-100">
      <h2 className="font-bold text-xl mb-6">Carrito Actual</h2>

      <div className="space-y-6 mb-8 max-h-62.5 overflow-y-auto pr-2 custom-scrollbar">
        {carrito.length === 0 ? (
          <div className="py-10 text-center text-gray-300 flex flex-col items-center">
            <ShoppingBag size={40} className="opacity-20 mb-2" />
            <p className="text-sm font-bold uppercase tracking-widest">Carrito vacío</p>
          </div>
        ) : (
          carrito.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="text-sm font-bold text-gray-700">{item.nombre}</h4>
                <p className="text-xs text-gray-400">${item.precio.toLocaleString('es-AR')} c/u</p>
              </div>
              <div className="flex items-center gap-3 ml-4 bg-gray-50 p-1 rounded-xl">
                <button
                  title="modificar"
                  type="button"
                  onClick={() => modificarCantidad(item.id, -1)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-white hover:text-red-500 transition-all"
                >
                  <Minus size={14} />
                </button>
                <span className="font-black text-sm">{item.cantidad}</span>
                <button
                  title="cantidad"
                  type="button"
                  onClick={() => modificarCantidad(item.id, 1)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-red-500 hover:bg-white transition-all"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="border-t border-dashed pt-6 mb-8 flex justify-between items-end">
        <span className="text-gray-400 font-bold text-xs uppercase">Total:</span>
        <span className="text-4xl font-black text-red-600">${total.toLocaleString('es-AR')}</span>
      </div>

      <div className="mb-8">
        <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">
          Método de Pago
        </p>
        <div className="grid grid-cols-3 gap-3">
          {['efectivo', 'tarjeta', 'transfer'].map((m) => (
            <button
              type="button"
              key={m}
              onClick={() => setMetodoPago(m)}
              className={`flex flex-col items-center justify-center py-4 rounded-2xl border-2 transition-all ${metodoPago === m ? 'border-red-500 bg-red-50 text-red-600 shadow-sm' : 'border-gray-50 text-gray-400'}`}
            >
              {m === 'efectivo' ? (
                <DollarSign size={20} />
              ) : m === 'tarjeta' ? (
                <CreditCard size={20} />
              ) : (
                <Smartphone size={20} />
              )}
              <span className="text-[10px] mt-2 font-black uppercase tracking-tighter">{m}</span>
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={finalizarVenta}
        disabled={carrito.length === 0}
        className="w-full bg-red-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-red-700 active:scale-[0.98] transition-all disabled:opacity-30 shadow-xl shadow-red-100"
      >
        COMPLETAR VENTA
      </button>
    </div>
  )
}

export default PurchaseOfConsumables
