import React, { useState } from 'react'
import PointOfSale from './components/PointOfSale'
import SideBar from './components/Sidebar'

function App(): React.JSX.Element {
  // El estado de la navegación principal vive aquí
  const [currentView, setCurrentView] = useState('pos')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Pasamos el estado y la función al SideBar */}
      <SideBar activeTab={currentView} setActiveTab={setCurrentView} />
      <main>
        {/* Renderizado condicional de las vistas */}
        {currentView === 'pos' && <PointOfSale />}

        {currentView === 'stock' && (
          <div className="p-20 text-center font-bold text-gray-400">
            Próximamente: Gestión de Stock
          </div>
        )}
        {/* Agrega aquí las demás vistas según el ID */}
      </main>
    </div>
  )
}

export default App
