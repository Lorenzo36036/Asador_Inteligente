/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import SalesHistory from './components/SalesHistory'
import PurchaseOfConsumables from './components/PurchaseOfConsumables'
import Products from './components/products'
import { Shoping, Venta } from '../../interfaces/pointOfSale'

const PointOfSale = (): React.JSX.Element => {
  const [carrito, setCarrito] = useState<Shoping[]>([])
  const [metodoPago, setMetodoPago] = useState('efectivo')
  const [ventasRealizadas, setVentasRealizadas] = useState<Venta[]>(() => {
    const saved = localStorage.getItem('historial_ventas')
    return saved ? JSON.parse(saved) : []
  })
  const [products, setProducts] = useState([])

  const METODOSPAGO = {
    transfer: 1,
    tarjeta: 2,
    efectivo: 3
  }

  const agregarAlCarrito = (producto): any => {
    setCarrito((prev) => {
      const existe = prev.find((item) => item.id == producto.id)
      if (existe) {
        return prev.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        )
      }
      return [...prev, { ...producto, cantidad: 1 }]
    })
  }

  const modificarCantidad = (id, delta): void => {
    setCarrito((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nuevaCant = Math.max(0, item.cantidad + delta)
            return { ...item, cantidad: nuevaCant }
          }
          return item
        })
        .filter((item) => item.cantidad > 0)
    )
  }

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0)

  const getProducts = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/platillos/')
      if (response.ok) {
        const data = await response.json()
        setProducts(data)
      }
    } catch (error) {
      console.error('Error de conexión:', error)
    }
  }

  useEffect(() => {
    getProducts()
    localStorage.setItem('historial_ventas', JSON.stringify(ventasRealizadas))
  }, [ventasRealizadas])

  async function registrarVenta() {
    if (carrito.length === 0) return
    const car = carrito.map((item) => ({
      id_platillo: item.id,
      cantidad: item.cantidad
    }))

    const dataSend = {
      id_metodo_pago: METODOSPAGO[metodoPago],
      platillos: car,
      total_venta: total
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/registro_pagos/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataSend)
      })
      const creado = await response.json()
      if (response.ok) {
        const nuevaVenta = {
          id: Date.now(),
          items: [...carrito],
          total: total,
          metodo: metodoPago,
          hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
        setVentasRealizadas([nuevaVenta, ...ventasRealizadas])
        setCarrito([])
      } else {
        console.error('Error de validación FastAPI:', creado)
        alert('Error al guardar en la base de datos')
      }
    } catch (error) {
      alert('No se pudo conectar con el servidor')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans text-gray-800 select-none">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <header className="mb-6">
            <h1 className="text-2xl font-bold italic">Punto de Venta</h1>
            <p className="text-gray-500 text-sm">Selecciona los productos para vender</p>
          </header>

          {/* <div className="flex justify-center gap-2 mb-8">
            <button
              type="button"
              onClick={() => setActiveTab('comida')}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all ${activeTab === 'comida' ? 'bg-red-600 text-white shadow-lg' : 'bg-white text-gray-400 border'}`}
            >
              <Utensils size={18} /> Comida
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('bebidas')}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all ${activeTab === 'bebidas' ? 'bg-red-600 text-white shadow-lg' : 'bg-white text-gray-400 border'}`}
            >
              <Beer size={18} /> Bebidas
            </button>
          </div> */}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Products productos={products} agregarAlCarrito={agregarAlCarrito} />
          </div>
        </div>

        <div className="w-full lg:w-100 flex flex-col gap-6">
          <PurchaseOfConsumables
            carrito={carrito}
            modificarCantidad={modificarCantidad}
            setMetodoPago={setMetodoPago}
            total={total}
            metodoPago={metodoPago}
            finalizarVenta={registrarVenta}
          />
          <SalesHistory ventasRealizadas={ventasRealizadas} />
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 0px; background: transparent; }
        .custom-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `
        }}
      />
    </div>
  )
}

export default PointOfSale
