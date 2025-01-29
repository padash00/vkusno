"use client"

import { useUser } from "../../contexts/UserContext"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
<<<<<<< HEAD
import { Label } from "@/components/ui/label"
import PhoneVerificationStatus from "../components/PhoneVerificationStatus"
import { formatDate } from "../utils/date"
=======
import { useEffect, useState } from "react"
>>>>>>> a58e5eff2727ae94d16ba417f085578e6369c28b

export default function FavoritesPage() {
  const { user, removeFromFavorites } = useUser()
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null // или можно вернуть заглушку, например, <div>Loading...</div>
  }

  if (!user) {
    router.push("/login")
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
<<<<<<< HEAD
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
=======
      <h1 className="text-3xl font-bold mb-6">Избранные блюда</h1>
      {user.favorites.length === 0 ? (
        <p className="text-gray-400">У вас пока нет избранных блюд.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {user.favorites.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-800 rounded-lg shadow-md overflow-hidden"
            >
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="relative h-48">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md"
                    />
                  </div>
                  <p className="mt-2 text-gray-300">{item.price} ₸</p>
                  <Button variant="destructive" size="sm" className="mt-4" onClick={() => removeFromFavorites(item.id)}>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Удалить из избранного
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
>>>>>>> a58e5eff2727ae94d16ba417f085578e6369c28b
    </div>
  )
}

