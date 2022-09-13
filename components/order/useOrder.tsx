/* eslint-disable no-underscore-dangle */
import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useMemo
} from 'react'

const ORDER_STATE_KEY = 'cart'

interface Order {
  products: any[]
}

export interface OrderContextData {
  order: Order | null
  addToOrder: (newProduct: any, amount?: number) => void
  checkout: () => void
  subtotal: number
  quantity: number
}

export const orderContextDefaultValue: OrderContextData = {
  order: { products: [] },
  addToOrder: () => null,
  checkout: () => null,
  subtotal: 0,
  quantity: 0
}

export const OrderContext = createContext<OrderContextData>(
  orderContextDefaultValue
)

export const OrderProvider = ({ children }: any) => {
  const [order, updateOrder] = useState<Order>({ products: [] })

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem(ORDER_STATE_KEY) ?? '')
    if (data) {
      updateOrder(data)
    }
  }, [])

  useEffect(() => {
    sessionStorage.setItem(ORDER_STATE_KEY, JSON.stringify(order))
  }, [order])

  const addToOrder = (newProduct: any, amount = 1) => {
    updateOrder(prev => {
      const o = { ...prev }

      const productIndex = o.products.findIndex(p => p._id === newProduct._id)
      if (productIndex > -1) {
        o.products[productIndex].quantity += amount
      } else {
        o.products.push({ ...newProduct, quantity: amount })
      }
      return o
    })
  }

  const subtotal = order.products.reduce(
    (accumulator, p) => accumulator + p.pricePerUnit * p.quantity,
    0
  )

  const quantity = order.products.reduce(
    (accumulator, p) => accumulator + p.quantity,
    0
  )

  const checkout = () => {
    // TODO: create order in backend
    throw Error('Not implemented')
  }

  return (
    <OrderContext.Provider
      value={{ order, addToOrder, checkout, subtotal, quantity }}
    >
      {children}
    </OrderContext.Provider>
  )
}

export const useOrder = () => useContext(OrderContext)
