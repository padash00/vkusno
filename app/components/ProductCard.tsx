"use client"

import Image from "next/image"
import { useState } from "react"
import { useCart } from "../contexts/CartContext"
import { useUser } from "../contexts/UserContext"
import { Star, Plus, Minus, Info, Heart } from "lucide-react"
import { motion } from "framer-motion"

interface ProductCardProps {
  id: string
  name: string
  price: number
  image: string
  rating?: number
  reviewCount?: number
  description?: string
  calories?: number
}

export default function ProductCard({
  id,
  name,
  price,
  image,
  rating = 0,
  reviewCount = 0,
  description = "",
  calories = 0,
}: ProductCardProps) {
  const { addToCart } = useCart()
  const { user, addToFavorites, removeFromFavorites, isFavorite } = useUser()
  const [quantity, setQuantity] = useState(1)
  const [size, setSize] = useState("standard")
  const [showInfo, setShowInfo] = useState(false)

  const handleAddToCart = () => {
    addToCart({ id, name, price: price * (size === "large" ? 1.5 : size === "small" ? 0.8 : 1), image, quantity })
    setQuantity(1)
    setSize("standard")
  }

  const handleToggleFavorite = () => {
    if (user) {
      if (isFavorite(id)) {
        removeFromFavorites(id)
      } else {
        addToFavorites({ id, name, price, image })
      }
    } else {
      // Можно добавить уведомление о необходимости войти в систему
      console.log("Пожалуйста, войдите в систему, чтобы добавить в избранное")
    }
  }

  return (
    <motion.div
      className="bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="relative">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          width={300}
          height={200}
          className="w-full h-48 sm:h-56 object-cover"
        />
        <motion.button
          onClick={() => setShowInfo(!showInfo)}
          className="absolute top-2 right-2 bg-gray-900 bg-opacity-70 p-2 rounded-full"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Info className="w-5 h-5 text-white" />
        </motion.button>
        <motion.button
          onClick={handleToggleFavorite}
          className={`absolute top-2 left-2 bg-gray-900 bg-opacity-70 p-2 rounded-full ${
            isFavorite(id) ? "text-red-500" : "text-white"
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart className="w-5 h-5" fill={isFavorite(id) ? "currentColor" : "none"} />
        </motion.button>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg sm:text-xl font-semibold mb-2">{name}</h3>
        <p className="text-gray-300 mb-2 text-sm sm:text-base">{price} ₸</p>
        <div className="flex items-center mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-4 h-4 ${star <= rating ? "text-yellow-400 fill-current" : "text-gray-600"}`}
            />
          ))}
          <span className="ml-2 text-sm text-gray-400">({reviewCount})</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <div className="mb-2 sm:mb-0">
            <label className="block text-sm font-medium text-gray-400 mb-1">Размер порции:</label>
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="w-full sm:w-auto bg-gray-700 border border-gray-600 text-white rounded px-3 py-2"
            >
              <option value="small">Маленькая</option>
              <option value="standard">Стандартная</option>
              <option value="large">Большая</option>
            </select>
          </div>
          <div className="flex items-center">
            <motion.button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="bg-gray-700 text-white p-2 rounded-l"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Minus className="w-4 h-4" />
            </motion.button>
            <span className="bg-gray-700 text-white px-4 py-2">{quantity}</span>
            <motion.button
              onClick={() => setQuantity(quantity + 1)}
              className="bg-gray-700 text-white p-2 rounded-r"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Plus className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
        <motion.button
          onClick={handleAddToCart}
          className="w-full bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-opacity-90 transition duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          В корзину
        </motion.button>
        {showInfo && (
          <motion.div
            className="mt-4 p-4 bg-gray-700 rounded"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-sm text-gray-300 mb-2">{description}</p>
            <p className="text-sm text-gray-400">Калорийность: {calories} ккал</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

