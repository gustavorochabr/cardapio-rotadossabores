import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { CartItem, OrderInfo } from './types'

type StoreContextValue = {
  items: CartItem[]
  orderInfo: OrderInfo
  addItem: (item: Omit<CartItem, 'id'>) => void
  updateQuantity: (id: string, quantity: number) => void
  removeItem: (id: string) => void
  clearCart: () => void
  updateOrderInfo: (info: OrderInfo) => void
}

const defaultOrderInfo: OrderInfo = {
  fulfillment: 'delivery',
  name: '',
  address: '',
  reference: '',
  payment: 'pix',
  changeFor: '',
  note: '',
}

const readLocal = <T,>(key: string, fallback: T): T => {
  try {
    const value = localStorage.getItem(key)
    return value ? (JSON.parse(value) as T) : fallback
  } catch {
    return fallback
  }
}

const StoreContext = createContext<StoreContextValue | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => readLocal('rota-cart', []))
  const [orderInfo, setOrderInfo] = useState<OrderInfo>(() => readLocal('rota-order-info', defaultOrderInfo))

  useEffect(() => localStorage.setItem('rota-cart', JSON.stringify(items)), [items])
  useEffect(() => localStorage.setItem('rota-order-info', JSON.stringify(orderInfo)), [orderInfo])

  const value = useMemo<StoreContextValue>(() => ({
    items,
    orderInfo,
    addItem: (item) => setItems((current) => [...current, { ...item, id: crypto.randomUUID() }]),
    updateQuantity: (id, quantity) => setItems((current) => current.map((item) => item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item)),
    removeItem: (id) => setItems((current) => current.filter((item) => item.id !== id)),
    clearCart: () => setItems([]),
    updateOrderInfo: setOrderInfo,
  }), [items, orderInfo])

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export const useStore = () => {
  const context = useContext(StoreContext)
  if (!context) throw new Error('useStore must be used inside StoreProvider')
  return context
}
