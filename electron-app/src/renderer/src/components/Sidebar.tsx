/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ShoppingCart, Package, Brain, ClipboardList, Utensils } from 'lucide-react'

const SideBar = () => {
  const navItems = [
    { id: 'pos', label: 'Punto de Venta', icon: <ShoppingCart size={18} />, active: true },
    { id: 'stock', label: 'Gestión de Stock', icon: <Package size={18} />, active: false },
    { id: 'ia', label: 'Dashboard IA', icon: <Brain size={18} />, active: false },
    { id: 'recursos', label: 'Recursos Usados', icon: <ClipboardList size={18} />, active: false }
  ]

  return (
    <nav className="w-full bg-white border-b border-gray-100 pt-8 pb-4 select-none">
      {/* Contenedor con el mismo padding/margen que el contenido principal 
         para asegurar que todo empiece al ras.
      */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-start">
          {/* Bloque Superior: Logo y Título */}
          <div className="flex items-center gap-3 my-3">
            <div className="bg-red-600 p-2 rounded-xl text-white shadow-sm">
              <Utensils size={24} />
            </div>
            <div className="flex flex-col leading-tight">
              <h1 className="font-bold text-2xl text-black tracking-tight">CarnesPro</h1>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">
                SISTEMA DE GESTIÓN
              </span>
            </div>
          </div>
          <div className="flex bg-[#ededed] w-full h-px px-0 mx-0"></div>

          {/* Bloque Inferior: Navegación al ras del título */}
          <div className="flex items-center gap-10">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`flex items-center gap-2 font-bold text-sm transition-all py-2 border-b-2 ${
                  item.active
                    ? 'text-red-600 border-red-600'
                    : 'text-gray-500 border-transparent hover:text-gray-800'
                }`}
              >
                <span className={item.active ? 'text-red-600' : 'text-gray-400'}>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
          <div className="flex bg-[#ededed] w-full h-px px-0 my-1"></div>
        </div>
      </div>
    </nav>
  )
}

export default SideBar
