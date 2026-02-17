import React, { useState } from 'react'
import PointOfSale from './views/point-of-sale/PointOfSale'
import SideBar from './components/Sidebar'
import StockManagement from './views/stock-management/StockManagement'
import DashboardIa from './views/dasboard-ia/DashboardIa'

function App(): React.JSX.Element {
  // El estado de la navegación principal vive aquí
  const [currentView, setCurrentView] = useState('pos')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Pasamos el estado y la función al SideBar */}
      <SideBar activeTab={currentView} setActiveTab={setCurrentView} />
      <main>
        {currentView === 'pos' && <PointOfSale />}
        {currentView === 'stock' && <StockManagement />}
        {currentView === 'ia' && <DashboardIa />}
      </main>
    </div>
  )
}

export default App
