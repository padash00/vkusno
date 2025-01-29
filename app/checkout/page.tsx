"use client"

import { useState, useEffect } from "react"
import { useCart } from "../contexts/CartContext"
import { useUser } from "../contexts/UserContext"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useRouter } from "next/navigation"

export default function CheckoutPage() {
  const { cartItems, clearCart, checkout } = useCart()
  const { user, updateBonusPoints, addOrder } = useUser()
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    paymentMethod: "cash",
  })

  useEffect(() => {
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        name: user.name || "",
        phone: user.phone || "",
        address: user.address || "",
      }))
    }
  }, [user])

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const bonusDiscount = user?.bonusPoints ? Math.min(user.bonusPoints, 1000, subtotal) : 0
  const total = subtotal - bonusDiscount
  const pointsToEarn = Math.floor(total / 100)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      router.push("/login")
      return
    }
    if (!formData.name || !formData.phone || !formData.address) {
      alert("Пожалуйста, заполните все обязательные поля")
      return
    }
    const order = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      total,
      items: cartItems.map((item) => ({ name: item.name, quantity: item.quantity })),
    }
    addOrder(order)
    updateBonusPoints(-bonusDiscount)
    checkout()
    router.push("/thank-you")
  }

  if (typeof window !== "undefined" && !user) {
    router.push("/login")
    return null
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Оформление заказа</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Имя</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Введите ваше имя"
          />
        </div>
        <div>
          <Label htmlFor="phone">Номер телефона</Label>
          <Input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Введите ваш номер телефона"
          />
        </div>
        <div>
          <Label htmlFor="address">Адрес доставки</Label>
          <Input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Введите адрес доставки"
          />
        </div>
        <div>
          <Label>Способ оплаты</Label>
          <RadioGroup
            name="paymentMethod"
            value={formData.paymentMethod}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, paymentMethod: value }))}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="cash" id="cash" />
              <Label htmlFor="cash">Наличные</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="card" id="card" />
              <Label htmlFor="card">Карта</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="font-bold text-xl mb-2">Итого: {subtotal} ₸</div>
        {bonusDiscount > 0 && <div className="text-green-500 mb-2">Бонусная скидка: -{bonusDiscount} ₸</div>}
        <div className="font-bold text-xl mb-4">К оплате: {total} ₸</div>
        <div className="text-sm text-gray-400 mb-4">Вы получите {pointsToEarn} баллов за этот заказ</div>
        <Button type="submit" className="w-full">
          Оформить заказ
        </Button>
      </form>
    </div>
  )
}

