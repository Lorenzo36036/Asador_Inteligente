/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useEffect, useState } from 'react'
import { DollarSign, TrendingUp, Bot, Lightbulb, SendHorizontal, User, Loader2 } from 'lucide-react'
import { StatCard } from './components/StatCard'
import { ChartPlaceholder } from './components/ChartPlaceholder'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const DashboardIa: FC = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [productsVerySells, setProductsVerySells] = useState([])
  const [totalSales, setTotalSales] = useState(0)
  const [totalInvestment, setTotalInvestment] = useState(0)

  useEffect(() => {
    const GetTotalSales = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/ventas_totales_raw/')
        const data = await response.json()
        console.log('Ventas Totales:', data.ventas_totales)
        if (response.ok) {
          setTotalSales(data.ventas_totales || 0)
        }
      } catch (error) {
        console.error('Error de conexión:', error)
      }
    }
    const GetTotalInvestment = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/inventario/inventario-valor-total/')
        const data = await response.json()
        console.log('Inversión Total:', data.inversion_total)
        if (response.ok) {
          setTotalInvestment(data.inversion_total || 0)
        }
      } catch (error) {
        console.error('Error de conexión:', error)
      }
    }

    const getthreeProducts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/ventas/productos-top3?limite=3')
        const data = await response.json()
        if (response.ok) {
          setProductsVerySells(data)
        }
      } catch (error) {
        console.error('Error de conexión:', error)
      }
    }
    getthreeProducts()
    GetTotalSales()
    GetTotalInvestment()
  }, [])

  const handleSendMessage = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    if (!inputValue.trim() || isLoading) return

    const userQuery = inputValue.trim()
    setInputValue('')
    setIsLoading(true)
    setMessages((prev) => [...prev, { role: 'user', content: userQuery }])

    try {
      const response = await fetch('http://127.0.0.1:8000/respuesta_ia/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ respuesta: userQuery })
      })

      if (response.ok) {
        const data = await response.json()
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: data || 'Lo siento, no pude generar una respuesta.'
          }
        ])
      } else {
        throw new Error('Error en la respuesta')
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Lo siento, tuve un problema al conectar con el servidor.' }
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-8 font-sans text-gray-800 select-none">
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Dashboard con IA</h1>
          <p className="text-gray-500 text-sm font-medium">Análisis inteligente de tu negocio</p>
        </div>
      </header>

      <div className="justify-center grid grid-cols-1 sm:grid-cols-2  gap-5 mb-8">
        <StatCard
          title="Inversión Total"
          value={`$${totalInvestment}`}
          subtext="-"
          icon={<DollarSign />}
          bgColor="bg-[#1a73e8]"
          label="Inversión Total"
        />
        <StatCard
          title="Ventas Totales"
          value={`$${totalSales}`}
          subtext="-"
          icon={<TrendingUp />}
          bgColor="bg-[#34a853]"
          label="Ventas Totales"
        />
      </div>

      <div className="grid grid-cols-1  gap-8 mb-8">
        <ChartPlaceholder title="Productos Más Vendidos" data={productsVerySells} />
      </div>

      <section className="bg-white border border-gray-200 rounded-2xl overflow-hidden  shadow-xl">
        <div className="bg-gray-900 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bot size={22} className={isLoading ? 'animate-bounce' : ''} />
            <span className="font-bold text-lg">Asistente de Análisis</span>
          </div>
          {isLoading && (
            <span className="text-xs bg-gray-700 px-2 py-1 rounded-md animate-pulse">
              IA pensando...
            </span>
          )}
        </div>

        <div className="p-6">
          <div className="space-y-4 mb-6 h-100 overflow-y-auto pr-2">
            <div className="flex gap-3 max-w-[80%]">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                <Bot size={16} />
              </div>
              <div className="bg-gray-100 p-4 rounded-2xl rounded-tl-none text-sm text-gray-700 border border-gray-200">
                ¡Hola! Soy tu asistente. ¿En qué puedo ayudarte hoy?
              </div>
            </div>

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                >
                  {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div
                  className={`p-4 rounded-2xl text-sm shadow-sm border ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white border-blue-700 rounded-tr-none'
                      : 'bg-gray-50 text-gray-800 border-gray-200 rounded-tl-none'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading}
              placeholder={
                isLoading ? 'La IA está respondiendo...' : 'Pregunta sobre tu negocio...'
              }
              className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl py-4 px-5 pr-14 focus:outline-none focus:border-blue-500 transition-all text-sm disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all disabled:text-gray-300 disabled:hover:bg-transparent"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={24} />
              ) : (
                <SendHorizontal size={24} />
              )}
            </button>
          </form>

          <div className="mt-5 flex items-start gap-2 bg-amber-50 border border-amber-100 rounded-xl p-3">
            <Lightbulb size={16} className="text-amber-500 shrink-0 mt-0.5" />
            <p className="text-[11px] text-gray-500">
              <span className="font-bold text-amber-700 uppercase mr-2">Sugerencias:</span>
              <button
                onClick={() => setInputValue('¿Cuál es mi ganancia?')}
                className="hover:underline text-blue-600"
              >
                ¿Cuál es mi ganancia?
              </button>{' '}
              •
              <button
                onClick={() => setInputValue('¿Cómo recupero mi inversión?')}
                className="hover:underline text-blue-600 ml-1"
              >
                ¿Cómo recupero mi inversión?
              </button>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default DashboardIa
