/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'

interface Insumo {
  id: number
  nombre_insumo: string
  categoria: string
  cantidad: number
  precio_compra: number
  created_at: string
}

function StockManagement(): React.JSX.Element {
  const [stock, setStock] = useState<Insumo[]>([])
  const [busqueda, setBusqueda] = useState('')
  const [categoria, setCategoria] = useState('Todas las categorías')
  const [showModal, setShowModal] = useState(false)

  const [nuevo, setNuevo] = useState({
    nombre: '',
    categoria: '',
    cantidad: '',
    compra: ''
  })

  const fetchStock = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/inventario/')
      if (response.ok) {
        const data = await response.json()
        console.log(data)
        setStock(data)
      }
    } catch (error) {
      console.error('Error de conexión:', error)
    }
  }

  useEffect(() => {
    fetchStock()
  }, [])

  const eliminarInsumo = async (id: number) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/inventario/${id}`, {
        method: 'DELETE'
      })
      if (response.ok) {
        setStock(stock.filter((item) => item.id !== id))
      }
    } catch (error) {
      alert('Error al conectar con FastAPI')
    }
  }

  const categorias = ['Todas las categorías', ...Array.from(new Set(stock.map((i) => i.categoria)))]
  const filtrados = stock.filter(
    (i) =>
      (categoria === 'Todas las categorías' || i.categoria === categoria) &&
      i.nombre_insumo.toLowerCase().includes(busqueda.toLowerCase())
  )

  const totalInversion = filtrados.reduce((acc, i) => acc + Number(i.precio_compra), 0)
  const abrirModal = () => {
    setNuevo({ nombre: '', categoria: '', cantidad: '', compra: '' })
    setShowModal(true)
  }

  const cerrarModal = () => setShowModal(false)

  async function registrarInsumo() {
    if (!nuevo.nombre || !nuevo.categoria || !nuevo.cantidad) {
      alert('Por favor, completa los campos obligatorios.')
      return
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/inventario/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre_insumo: nuevo.nombre,
          categoria: nuevo.categoria,
          cantidad: Number(nuevo.cantidad),
          precio_compra: Number(nuevo.compra)
        })
      })

      if (response.ok) {
        const creado = await response.json()
        setStock([...stock, creado])
        cerrarModal()
      } else {
        alert('Error al guardar en la base de datos')
      }
    } catch (error) {
      alert('No se pudo conectar con el servidor')
    }
  }

  return (
    <>
      <div className={showModal ? 'p-8 z-10' : 'p-8'}>
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl font-bold">Gestión de Stock</h2>
            <p className="text-gray-500">Inventario sincronizado con DB</p>
          </div>
          <button
            onClick={abrirModal}
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2 rounded-lg shadow"
          >
            + Registrar Insumo
          </button>
        </div>

        <div className="flex gap-4 mb-6">
          <input
            className="flex-1 border rounded-lg px-4 py-2 bg-gray-50"
            placeholder="Buscar insumo..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <select
            className="border rounded-lg px-4 py-2 bg-gray-50"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            {categorias.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="min-w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="py-4 px-6 font-semibold">Insumo</th>
                <th className="py-4 px-6 font-semibold">Categoría</th>
                <th className="py-4 px-6 font-semibold">Cantidad </th>
                <th className="py-4 px-6 font-semibold">Costo Compra</th>
                <th className="py-4 px-6 font-semibold">Fecha ingreso</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map((i, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-6">{i.nombre_insumo}</td>
                  <td className="py-3 px-6">
                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold">
                      {i.categoria}
                    </span>
                  </td>
                  <td className="py-3 px-6 font-medium">
                    {i.cantidad} {i.categoria === 'Bebidas' ? 'unidades' : 'Kg'}{' '}
                  </td>
                  <td className="py-3 px-6 font-bold text-gray-700">
                    ${Number(i.precio_compra).toLocaleString()}
                  </td>

                  <td className="py-3 px-6 font-bold text-gray-700">
                    {i.created_at
                      ? new Date(i.created_at).toLocaleDateString('es-ES', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        })
                      : 'Sin fecha'}
                  </td>
                  <td className="py-2 px-4 text-center">
                    <button
                      onClick={() => eliminarInsumo(i.id)}
                      className="text-red-600 hover:text-red-800 font-bold text-sm"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="p-6 bg-gray-50 flex justify-end items-center border-t">
            <span className="text-gray-600 mr-4 font-semibold">Inversión Total:</span>
            <span className="text-2xl font-black text-red-600">
              ${totalInversion.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
      {showModal && (
        <div className=" fixed inset-0 z-100 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <h3 className="text-xl font-bold mb-6 text-gray-800">Nuevo Registro</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-1">Nombre del Insumo</label>
                <input
                  className="w-full border rounded-lg px-4 py-2"
                  value={nuevo.nombre}
                  onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-1">Categoría</label>
                <select
                  className="w-full border rounded-lg px-4 py-2"
                  value={nuevo.categoria}
                  onChange={(e) => setNuevo({ ...nuevo, categoria: e.target.value })}
                >
                  <option value="">Seleccionar...</option>
                  <option value="Carnes">Carnes</option>
                  <option value="Bebidas">Bebidas</option>
                  <option value="Guarniciones">Guarniciones</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-1">
                    Cantidad {`(${nuevo.categoria === 'Bebidas' ? 'unidad' : 'kg'})`}
                  </label>
                  <input
                    type="number"
                    className="w-full border rounded-lg px-4 py-2"
                    value={nuevo.cantidad}
                    onChange={(e) => setNuevo({ ...nuevo, cantidad: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">Costo ($)</label>
                  <input
                    type="number"
                    className="w-full border rounded-lg px-4 py-2"
                    value={nuevo.compra}
                    onChange={(e) => setNuevo({ ...nuevo, compra: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  className="flex-1 py-2 font-bold text-gray-500 hover:bg-gray-100 rounded-lg"
                  onClick={cerrarModal}
                >
                  Cancelar
                </button>
                <button
                  className="flex-1 py-2 bg-red-600 text-white font-bold rounded-lg shadow-lg hover:bg-red-700"
                  onClick={registrarInsumo}
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default StockManagement
