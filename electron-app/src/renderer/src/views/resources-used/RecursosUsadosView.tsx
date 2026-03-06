/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState, useEffect } from 'react'

export default function RecursosUsadosView() {
  const [showModal, setShowModal] = useState(false)

  const [stock, setStock] = useState<any[]>([])
  const [stocksUsed, setStockUsed] = useState<any[]>([])
  const [insumoSeleccionado, setInsumoSeleccionado] = useState('')
  const [cantidadDisponible, setCantidadDisponible] = useState(0)
  const [cantidadUsada, setCantidadUsada] = useState(0)
  const [motivo, setMotivo] = useState('')
  const [success, setSucces] = useState()

  // GET para recursos usados
  const fetchStockUsed = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/recursos/') // URL vacía por ahora
      const data = await res.json()
      console.log(data)
      setStockUsed(data)
    } catch (error) {
      console.error('Error obteniendo recursos usados:', error)
    }
  }

  const stockUsedSend = async () => {
    // Validación básica antes de enviar
    if (!insumoSeleccionado || cantidadUsada <= 0) return

    const dataSend = {
      id_insumo: insumoSeleccionado,
      cantidad_usada: cantidadUsada,
      motivo: motivo || 'Sin motivo especificado'
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/recursos/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataSend)
      })

      if (response.ok) {
        const res = await response.json()
        setSucces(res)
        setShowModal(false)

        fetchStockUsed()
        fetchStock()

        // Limpiar formulario
        setInsumoSeleccionado('')
        setCantidadUsada(0)
        setMotivo('')
      }
    } catch (error) {
      console.error('Error enviando datos:', error)
    }
  }

  const fetchStock = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/inventario/')
      if (response.ok) {
        const data = await response.json()
        setStock(data)
      }
    } catch (error) {
      console.error('Error de conexión:', error)
    }
  }

  // Ejecutar ambos GET al cargar la vista
  useEffect(() => {
    fetchStockUsed()
    stockUsedSend()
    fetchStock()
  }, [])

  const handleSelectInsumo = (id: string) => {
    setInsumoSeleccionado(id)

    const item = stock.find((s) => s.id === id)

    if (item) {
      setCantidadDisponible(item.cantidad)
      setCantidadUsada(0)
    } else {
      setCantidadDisponible(0)
      setCantidadUsada(0)
    }
  }

  return (
    <div className="p-8">
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 border border-gray-200 animate-fadeIn">
            <h2 className="text-xl font-bold mb-4">Registrar Uso de Insumo</h2>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-600">Insumo</label>

                <select
                  className="w-full border rounded-lg px-4 py-2 bg-gray-50 mt-1 text-black"
                  value={insumoSeleccionado}
                  onChange={(e) => handleSelectInsumo(e.target.value)}
                >
                  <option value="">Seleccione un insumo</option>

                  {stock.map((item) => (
                    <option key={item.id} value={item.id} className="text-black">
                      {item.nombre_insumo}
                    </option>
                  ))}
                </select>

                {insumoSeleccionado && (
                  <p className="text-sm text-gray-500 mt-1">
                    Disponible: <span className="font-bold">{cantidadDisponible} kg</span>
                  </p>
                )}
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Cantidad usada</label>

                <input
                  type="number"
                  className="w-full border rounded-lg px-4 py-2 bg-gray-50 mt-1"
                  placeholder="Ej: 5"
                  value={cantidadUsada}
                  min={1}
                  max={cantidadDisponible}
                  onChange={(e) => {
                    const valStr = e.target.value
                    if (valStr === '') {
                      setCantidadUsada(0)
                      return
                    }
                    const value = Number(valStr)
                    if (value <= cantidadDisponible) {
                      setCantidadUsada(value)
                    } else {
                      setCantidadUsada(cantidadDisponible)
                    }
                  }}
                />

                {cantidadDisponible > 0 && (
                  <p className="text-xs text-gray-500 mt-1">
                    Máximo permitido: {cantidadDisponible} kg
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-600">Motivo</label>
                <textarea
                  className="w-full border rounded-lg px-4 py-2 bg-gray-50 mt-1"
                  placeholder="Ej: Preparación de guarniciones"
                  value={motivo}
                  onChange={(e) => setMotivo(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2 rounded-lg font-bold text-gray-600 hover:bg-gray-100"
              >
                Cancelar
              </button>

              <button
                onClick={() => {
                  stockUsedSend()
                }}
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2 rounded-lg shadow"
              >
                Registrar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl font-bold">Recursos Usados</h2>
          <p className="text-gray-500">Registro de materiales consumidos del inventario</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2 rounded-lg shadow"
        >
          + Registrar Uso
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <p className="text-gray-500 font-semibold">Carnes</p>
          <p className="text-3xl font-black text-red-600">5 kg</p>
          <p className="text-gray-500 font-semibold">Total usado</p>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <p className="text-gray-500 font-semibold">Guarniciones</p>
          <p className="text-3xl font-black text-yellow-600">10 kg</p>
          <p className="text-gray-500 font-semibold">Total usado</p>
        </div>
      </div>

      {}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
        <table className="min-w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="py-4 px-6 font-semibold">Fecha y Hora</th>
              <th className="py-4 px-6 font-semibold">Insumo</th>
              <th className="py-4 px-6 font-semibold">Cantidad Usada</th>
              <th className="py-4 px-6 font-semibold">Motivo</th>
            </tr>
          </thead>

          <tbody>
            {stocksUsed.length > 0 ? (
              stocksUsed.map((item, index) => (
                <tr key={item.id || index} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-6">
                    {item.created_at
                      ? new Date(item.created_at).toLocaleString('es-VE', {
                          timeZone: 'America/Caracas'
                        })
                      : 'Sin fecha'}
                    .
                  </td>
                  <td className="py-3 px-6">{item.id}</td>
                  <td className="py-3 px-6 font-bold text-red-600">
                    -{item.cantidad_usada || 0} kg
                  </td>
                  <td className="py-3 px-6">{item.motivo}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-10 text-center text-gray-400">
                  No hay registros de uso todavía.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="p-6 bg-gray-50 flex justify-end items-center border-t">
          <span className="text-gray-600 mr-4 font-semibold">Total Recursos Usados:</span>
          <span className="text-2xl font-black text-red-600">
            -{stocksUsed.reduce((acc, curr) => acc + (curr.cantidad_usada || 0), 0)} kg
          </span>
        </div>
      </div>
    </div>
  )
}
