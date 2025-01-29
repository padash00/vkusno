"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { useUser } from "./UserContext"

interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  estimatedDeliveryTime: string
  checkout: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [estimatedDeliveryTime, setEstimatedDeliveryTime] = useState("")
  const { addLoyaltyPoints } = useUser()

  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems))
    updateEstimatedDeliveryTime()
  }, [cartItems])

  const addToCart = useCallback((item: CartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id)
      if (existingItem) {
        return prevItems.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i))
      }
      return [...prevItems, item]
    })
  }, [])

  const removeFromCart = useCallback((id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }, [])

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item)),
    )
  }, [])

  const clearCart = useCallback(() => {
    setCartItems([])
  }, [])

  const updateEstimatedDeliveryTime = useCallback(() => {
    const now = new Date()
    const estimatedTime = new Date(now.getTime() + 30 * 60000) // 30 minutes from now
    setEstimatedDeliveryTime(estimatedTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))
  }, [])

  const checkout = useCallback(() => {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const pointsEarned = Math.floor(total / 100) // Earn 1 point for every 100 ₸
    addLoyaltyPoints(pointsEarned)
    clearCart()
  }, [cartItems, addLoyaltyPoints, clearCart])

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    estimatedDeliveryTime,
    checkout,
  }

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

