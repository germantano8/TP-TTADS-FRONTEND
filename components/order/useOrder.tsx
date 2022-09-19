/* eslint-disable no-underscore-dangle */
import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useMemo
} from 'react'

const ORDER_STATE_KEY = 'order'

interface Order {
  products: any[]
}

const orderDefaultValue: Order = {
  products: []
}

export interface OrderContextData {
  order: Order | null
  addToOrder: (newProduct: any, amount?: number) => void
  removeItem: (id: string) => boolean
  updateItem: (id: string, amount: number) => boolean
  checkout: () => void
  subtotal: number
  quantity: number
  isEmpty: boolean
  reset: () => void
}

export const OrderContext = createContext<OrderContextData>(
  {} as OrderContextData
)

export const OrderProvider = ({ children }: any) => {
  const [order, updateOrder] = useState<Order>(orderDefaultValue)

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem(ORDER_STATE_KEY) ?? '{}')
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

  const removeItem = (id: string) => {
    let success = false
    updateOrder(prev => {
      const o = { ...prev }

      const productIndex = o.products.findIndex(p => p._id === id)
      if (productIndex > -1) {
        o.products.splice(productIndex, 1)
        success = true
      }
      return o
    })
    return success
  }

  const updateItem = (id: string, amount: number) => {
    let success = false

    if (amount === 0) return removeItem(id)

    updateOrder(prev => {
      const o = { ...prev }

      const productIndex = o.products.findIndex(p => p._id === id)
      if (productIndex > -1) {
        o.products[productIndex].quantity = amount
        success = true
      }
      return o
    })
    return success
  }

  const reset = () => {
    updateOrder(orderDefaultValue)
  }

  const subtotal = order.products.reduce(
    (accumulator, p) => accumulator + p.price * p.quantity,
    0
  )

  const quantity = order.products.reduce(
    (accumulator, p) => accumulator + p.quantity,
    0
  )

  const isEmpty = order.products.length === 0

  const checkout = () => {
    // TODO: create order in backend
    throw Error('Not implemented')
  }

  const value = useMemo(
    () => ({
      order,
      addToOrder,
      removeItem,
      updateItem,
      checkout,
      subtotal,
      quantity,
      isEmpty,
      reset
    }),
    [order]
  )

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
}

export const useOrder = () => useContext(OrderContext)
