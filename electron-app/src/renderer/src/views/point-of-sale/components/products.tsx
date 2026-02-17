/* eslint-disable @typescript-eslint/no-explicit-any */
import { ShoppingBag } from 'lucide-react'
import { JSX } from 'react'

function products({
  productos,
  agregarAlCarrito,
  activeTab
}: {
  productos: any
  agregarAlCarrito: any
  activeTab: any
}): JSX.Element {
  return (
    <>
      {productos[activeTab].map((prod) => (
        <button
          type="button"
          key={prod.id}
          onClick={() => agregarAlCarrito(prod)}
          className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:border-red-200 transition-all flex flex-col items-center"
        >
          <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-4">
            <ShoppingBag className="text-red-500" size={22} />
          </div>
          <h3 className="text-xs font-bold text-gray-600 mb-1 h-8 flex items-center leading-tight">
            {prod.nombre}
          </h3>
          <span className="text-red-600 font-black text-lg">
            ${prod.precio.toLocaleString('es-AR')}
          </span>
        </button>
      ))}
    </>
  )
}

export default products
