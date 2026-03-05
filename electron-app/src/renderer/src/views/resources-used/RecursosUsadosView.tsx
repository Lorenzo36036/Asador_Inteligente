import { useState, useEffect } from "react";

export default function RecursosUsadosView() {
  const [showModal, setShowModal] = useState(false);

  // Estados para los GET
  const [usados, setUsados] = useState<any[]>([]);
  const [stock, setStock] = useState<any[]>([]);

  // Estados del modal
  const [insumoSeleccionado, setInsumoSeleccionado] = useState("");
  const [cantidadDisponible, setCantidadDisponible] = useState(0);
  const [cantidadUsada, setCantidadUsada] = useState(0);

  // GET para recursos usados
  const fetchUsados = async () => {
    try {
      const res = await fetch(""); // URL vacía por ahora
      console.log("GET usados preparado");
    } catch (error) {
      console.error("Error obteniendo recursos usados:", error);
    }
  };

  // GET para inventario de stock
  const fetchStock = async () => {
    try {
      const res = await fetch(""); // URL vacía por ahora
      console.log("GET stock preparado");
    } catch (error) {
      console.error("Error obteniendo stock:", error);
    }
  };

  // Ejecutar ambos GET al cargar la vista
  useEffect(() => {
    fetchUsados();
    fetchStock();
  }, []);

  // Manejar selección de insumo
  const handleSelectInsumo = (nombre: string) => {
    setInsumoSeleccionado(nombre);

    const item = stock.find((s) => s.nombre === nombre);

    if (item) {
      setCantidadDisponible(item.cantidad);
      setCantidadUsada(0); // Reiniciar cantidad usada
    } else {
      setCantidadDisponible(0);
      setCantidadUsada(0);
    }
  };

  return (
    <div className="p-8">

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 border border-gray-200 animate-fadeIn">

            <h2 className="text-xl font-bold mb-4">Registrar Uso de Insumo</h2>

            <div className="space-y-4">

              {/* Select de insumo */}
              <div>
                <label className="text-sm font-semibold text-gray-600">Insumo</label>

                <select
                  className="w-full border rounded-lg px-4 py-2 bg-gray-50 mt-1"
                  value={insumoSeleccionado}
                  onChange={(e) => handleSelectInsumo(e.target.value)}
                >
                  <option value="">Seleccione un insumo</option>

                  {stock.map((item) => (
                    <option key={item.id} value={item.nombre}>
                      {item.nombre}
                    </option>
                  ))}
                </select>

                {/* Mostrar cantidad disponible */}
                {insumoSeleccionado && (
                  <p className="text-sm text-gray-500 mt-1">
                    Disponible: <span className="font-bold">{cantidadDisponible} kg</span>
                  </p>
                )}
              </div>

              {/* Cantidad usada */}
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
                    const value = Number(e.target.value);
                    if (value <= cantidadDisponible) {
                      setCantidadUsada(value);
                    }
                  }}
                />

                {cantidadDisponible > 0 && (
                  <p className="text-xs text-gray-500 mt-1">
                    Máximo permitido: {cantidadDisponible} kg
                  </p>
                )}
              </div>

              {/* Motivo */}
              <div>
                <label className="text-sm font-semibold text-gray-600">Motivo</label>
                <textarea
                  className="w-full border rounded-lg px-4 py-2 bg-gray-50 mt-1"
                  placeholder="Ej: Preparación de guarniciones"
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

              <button className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2 rounded-lg shadow">
                Registrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Encabezado */}
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

      {/* Tarjetas de resumen */}
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

      {/* Tabla */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
        <table className="min-w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="py-4 px-6 font-semibold">Fecha y Hora</th>
              <th className="py-4 px-6 font-semibold">Insumo</th>
              <th className="py-4 px-6 font-semibold">Categoría</th>
              <th className="py-4 px-6 font-semibold">Cantidad Usada</th>
              <th className="py-4 px-6 font-semibold">Motivo</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b hover:bg-gray-50">
              <td className="py-3 px-6">08/01/2026, 08:00 p.m.</td>
              <td className="py-3 px-6">Papas</td>
              <td className="py-3 px-6">
                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold">
                  Guarniciones
                </span>
              </td>
              <td className="py-3 px-6 font-bold text-red-600">-10 kg</td>
              <td className="py-3 px-6">Preparación guarniciones</td>
            </tr>

            <tr className="border-b hover:bg-gray-50">
              <td className="py-3 px-6">07/01/2026, 08:00 p.m.</td>
              <td className="py-3 px-6">Bife de Chorizo Premium</td>
              <td className="py-3 px-6">
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold">
                  Carnes
                </span>
              </td>
              <td className="py-3 px-6 font-bold text-red-600">-5 kg</td>
              <td className="py-3 px-6">Producción de platos</td>
            </tr>
          </tbody>
        </table>

        <div className="p-6 bg-gray-50 flex justify-end items-center border-t">
          <span className="text-gray-600 mr-4 font-semibold">Total Recursos Usados:</span>
          <span className="text-2xl font-black text-red-600">-15 kg</span>
        </div>
      </div>
    </div>
  );
}
