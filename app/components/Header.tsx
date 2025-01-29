"use client"

import type React from "react"
import { useState, useCallback } from "react"
import Link from "next/link"
import { ShoppingCart, Sun, Moon, Search, User, LogOut, Menu, X, Heart } from "lucide-react"
import { useCart } from "../contexts/CartContext"
import { useTheme } from "../contexts/ThemeContext"
import { useUser } from "../contexts/UserContext"
import { useRouter } from "next/navigation"
import LoyaltyPoints from "./LoyaltyPoints"
import { motion } from "framer-motion"

export default function Header() {
  const { cartItems } = useCart()
  const { theme, toggleTheme } = useTheme()
  const { user, logout } = useUser()
  const [searchQuery, setSearchQuery] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (searchQuery.trim()) {
        router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      }
    },
    [searchQuery, router],
  )

  const handleLogout = () => {
    logout()
    router.push("/")
    setMobileMenuOpen(false)
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <motion.header
      className="bg-gray-900 shadow-md fixed top-0 left-0 right-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Link href="/" className="text-2xl font-bold text-primary">
              ВкуснО
            </Link>
          </motion.div>
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Поиск блюд..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 px-4 py-2 rounded-full border border-gray-700 bg-gray-800 text-white"
              />
              <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Search className="w-5 h-5 text-gray-400" />
              </button>
            </form>
            <LoyaltyPoints />
            <motion.button
              onClick={toggleTheme}
              className="text-gray-400"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {theme === "light" ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
            </motion.button>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link
                href="/cart"
                className="flex items-center text-white hover:text-primary transition-colors duration-300"
              >
                <ShoppingCart className="w-6 h-6 mr-2" />
                <span className="font-semibold">{cartItems.length}</span>
              </Link>
            </motion.div>
            {user ? (
              <div className="flex items-center space-x-2">
                <Link href="/profile" className="text-white hover:text-primary">
                  {user.name}
                </Link>
                <Link href="/profile/favorites" className="text-white hover:text-primary">
                  <Heart className="w-6 h-6" />
                </Link>
                <span className="text-yellow-400">{user.bonusPoints} бонусов</span>
                <motion.button
                  onClick={handleLogout}
                  className="text-white hover:text-primary"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <LogOut className="w-6 h-6" />
                </motion.button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Link href="/login" className="text-white hover:text-primary">
                    Войти
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Link href="/register" className="text-white hover:text-primary">
                    <User className="w-6 h-6" />
                  </Link>
                </motion.div>
              </div>
            )}
          </div>
          <motion.button
            className="md:hidden text-white"
            onClick={toggleMobileMenu}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden mt-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <form onSubmit={handleSearch} className="mb-4">
              <input
                type="text"
                placeholder="Поиск блюд..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-full border border-gray-700 bg-gray-800 text-white"
              />
            </form>
            <div className="flex flex-col space-y-4">
              <LoyaltyPoints />
              <motion.button
                onClick={toggleTheme}
                className="text-gray-400 flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {theme === "light" ? <Moon className="w-6 h-6 mr-2" /> : <Sun className="w-6 h-6 mr-2" />}
                {theme === "light" ? "Темная тема" : "Светлая тема"}
              </motion.button>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/cart"
                  className="flex items-center text-white hover:text-primary transition-colors duration-300"
                >
                  <ShoppingCart className="w-6 h-6 mr-2" />
                  <span className="font-semibold">Корзина ({cartItems.length})</span>
                </Link>
              </motion.div>
              {user ? (
                <>
                  <Link href="/profile" className="text-white hover:text-primary">
                    {user.name}
                  </Link>
                  <Link href="/profile/favorites" className="text-white hover:text-primary flex items-center">
                    <Heart className="w-6 h-6 mr-2" />
                    Избранное
                  </Link>
                  <span className="text-yellow-400">{user.bonusPoints} бонусов</span>
                  <motion.button
                    onClick={handleLogout}
                    className="text-white hover:text-primary flex items-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <LogOut className="w-6 h-6 mr-2" />
                    Выйти
                  </motion.button>
                </>
              ) : (
                <>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link href="/login" className="text-white hover:text-primary">
                      Войти
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link href="/register" className="text-white hover:text-primary flex items-center">
                      <User className="w-6 h-6 mr-2" />
                      Регистрация
                    </Link>
                  </motion.div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  )
}

