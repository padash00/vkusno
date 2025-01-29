"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface Order {
  id: string
  date: string
  total: number
  items: { name: string; quantity: number }[]
}

interface FavoriteItem {
  id: string
  name: string
  price: number
  image: string
}

interface User {
  id: string
  name: string
  email: string
  phone: string
  phoneVerified: boolean
  address: string
  loyaltyPoints: number
  bonusPoints: number
  orders: Order[]
  favorites: FavoriteItem[]
}

interface UserContextType {
  user: User | null
  setUser: (user: User | null) => void
  addLoyaltyPoints: (points: number) => void
  updateBonusPoints: (points: number) => void
  updateUserInfo: (info: Partial<User>) => void
  addOrder: (order: Order) => void
  logout: () => void
  verifyPhone: (verificationCode: string) => Promise<boolean>
  addToFavorites: (item: FavoriteItem) => void
  removeFromFavorites: (itemId: string) => void
  isFavorite: (itemId: string) => boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const addLoyaltyPoints = (points: number) => {
    setUser((prevUser) => {
      if (prevUser) {
        const updatedUser = { ...prevUser, loyaltyPoints: prevUser.loyaltyPoints + points }
        localStorage.setItem("user", JSON.stringify(updatedUser))
        return updatedUser
      }
      return prevUser
    })
  }

  const updateBonusPoints = (points: number) => {
    setUser((prevUser) => {
      if (prevUser) {
        const updatedUser = { ...prevUser, bonusPoints: Math.max(0, prevUser.bonusPoints + points) }
        localStorage.setItem("user", JSON.stringify(updatedUser))
        return updatedUser
      }
      return prevUser
    })
  }

  const updateUserInfo = (info: Partial<User>) => {
    setUser((prevUser) => {
      if (prevUser) {
        const updatedUser = { ...prevUser, ...info }
        localStorage.setItem("user", JSON.stringify(updatedUser))
        return updatedUser
      }
      return prevUser
    })
  }

  const addOrder = (order: Order) => {
    setUser((prevUser) => {
      if (prevUser) {
        const updatedUser = { ...prevUser, orders: [order, ...prevUser.orders] }
        localStorage.setItem("user", JSON.stringify(updatedUser))
        return updatedUser
      }
      return prevUser
    })
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const verifyPhone = async (verificationCode: string): Promise<boolean> => {
    // В реальном приложении здесь был бы запрос к API для проверки кода
    // Сейчас мы просто имитируем успешную верификацию
    return new Promise((resolve) => {
      setTimeout(() => {
        if (verificationCode === "1234") {
          setUser((prevUser) => {
            if (prevUser) {
              const updatedUser = { ...prevUser, phoneVerified: true }
              localStorage.setItem("user", JSON.stringify(updatedUser))
              return updatedUser
            }
            return prevUser
          })
          resolve(true)
        } else {
          resolve(false)
        }
      }, 1000)
    })
  }

  const addToFavorites = (item: FavoriteItem) => {
    setUser((prevUser) => {
      if (prevUser) {
        const updatedFavorites = [...prevUser.favorites, item]
        const updatedUser = { ...prevUser, favorites: updatedFavorites }
        localStorage.setItem("user", JSON.stringify(updatedUser))
        return updatedUser
      }
      return prevUser
    })
  }

  const removeFromFavorites = (itemId: string) => {
    setUser((prevUser) => {
      if (prevUser) {
        const updatedFavorites = prevUser.favorites.filter((item) => item.id !== itemId)
        const updatedUser = { ...prevUser, favorites: updatedFavorites }
        localStorage.setItem("user", JSON.stringify(updatedUser))
        return updatedUser
      }
      return prevUser
    })
  }

  const isFavorite = (itemId: string) => {
    return user?.favorites.some((item) => item.id === itemId) || false
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        addLoyaltyPoints,
        updateBonusPoints,
        updateUserInfo,
        addOrder,
        logout,
        verifyPhone,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}

