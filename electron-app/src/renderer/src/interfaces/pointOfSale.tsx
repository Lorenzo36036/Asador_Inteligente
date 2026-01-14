export interface Shoping {
  id: string
  nombre: string
  precio: number
  cantidad: number
}

export interface Venta {
  id: number
  items: Shoping[]
  total: number
  metodo: string
  hora: string
}
