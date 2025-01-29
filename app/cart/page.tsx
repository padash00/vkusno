"use client"

import { useCart } from "../contexts/CartContext"
import { useUser } from "../contexts/UserContext"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2, Clock } from "lucide-react"

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, estimatedDeliveryTime } = useCart()
  const { user } = useUser()

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const bonusDiscount = user?.bonusPoints ? Math.min(user.bonusPoints, 1000, subtotal) : 0
  const total = subtotal - bonusDiscount

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-8">
        <h1 className="text-2xl font-bold mb-4">Ваша корзина пуста</h1>
        <Link href="/" className="text-primary hover:underline">
          Вернуться к покупкам
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Корзина</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 bg-gray-800 p-4 rounded-lg shadow"
            >
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                width={80}
                height={80}
                className="rounded-md w-full sm:w-20 h-20 object-cover"
              />
              <div className="flex-grow text-center sm:text-left">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-400">{item.price} ₸</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="p-1 rounded-full bg-gray-700 hover:bg-gray-600"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-1 rounded-full bg-gray-700 hover:bg-gray-600"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-600">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Итого заказа</h2>
          <div className="flex justify-between items-center mb-2">
            <span>Сумма:</span>
            <span className="font-bold">{subtotal} ₸</span>
          </div>
          {bonusDiscount > 0 && (
            <div className="flex justify-between items-center mb-2 text-green-500">
              <span>Бонусная скидка:</span>
              <span>-{bonusDiscount} ₸</span>
            </div>
          )}
          <div className="flex justify-between items-center mb-4">
            <span>Итого к оплате:</span>
            <span className="font-bold text-xl">{total} ₸</span>
          </div>
          <div className="flex items-center mb-6 text-gray-400">
            <Clock className="w-5 h-5 mr-2" />
            <span className="text-sm">Ожидаемое время доставки: {estimatedDeliveryTime}</span>
          </div>
          <Link
            href="/checkout"
            className="block w-full bg-primary text-primary-foreground text-center py-3 px-4 rounded hover:bg-opacity-90 transition-colors duration-300"
          >
            Оформить заказ
          </Link>
        </div>
      </div>
    </div>
  )
}

