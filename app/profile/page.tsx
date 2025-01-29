"use client"

import { useState } from "react"
import { useUser } from "../contexts/UserContext"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import PhoneVerificationStatus from "../components/PhoneVerificationStatus"
import { formatDate } from "../utils/date"

export default function ProfilePage() {
  const { user, updateUserInfo } = useUser()
  const router = useRouter()
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
  })

  if (!user) {
    router.push("/login")
    return null
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateUserInfo(formData)
    setEditMode(false)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Профиль пользователя</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Личная информация</CardTitle>
            <CardDescription>Управляйте своими личными данными</CardDescription>
          </CardHeader>
          <CardContent>
            {editMode ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Имя</Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Телефон</Label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                  <PhoneVerificationStatus />
                </div>
                <div>
                  <Label htmlFor="address">Адрес</Label>
                  <Input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <Button type="submit">Сохранить</Button>
                <Button type="button" variant="outline" onClick={() => setEditMode(false)} className="ml-2">
                  Отмена
                </Button>
              </form>
            ) : (
              <div className="space-y-2">
                <p>
                  <strong>Имя:</strong> {user.name}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Телефон:</strong> {user.phone || "Не указан"}
                </p>
                <PhoneVerificationStatus />
                <p>
                  <strong>Адрес:</strong> {user.address || "Не указан"}
                </p>
                <Button onClick={() => setEditMode(true)}>Редактировать</Button>
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Бонусы и баллы</CardTitle>
            <CardDescription>Ваши накопленные бонусы и баллы лояльности</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold mb-2">{user.bonusPoints} бонусных баллов</p>
            <p className="text-lg">{user.loyaltyPoints} баллов лояльности</p>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>История заказов</CardTitle>
          <CardDescription>Ваши последние заказы</CardDescription>
        </CardHeader>
        <CardContent>
          {user.orders && user.orders.length > 0 ? (
            <ul className="space-y-4">
              {user.orders.map((order) => (
                <motion.li
                  key={order.id}
                  className="bg-gray-800 p-4 rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="font-bold">Заказ №{order.id}</p>
                  <p>Дата: {formatDate(order.date)}</p>
                  <p>Сумма: {order.total} ₸</p>
                  <ul className="mt-2">
                    {order.items.map((item, index) => (
                      <li key={index}>
                        {item.name} x{item.quantity}
                      </li>
                    ))}
                  </ul>
                </motion.li>
              ))}
            </ul>
          ) : (
            <p>У вас пока нет заказов.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

