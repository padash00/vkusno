"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "../contexts/UserContext"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [showVerification, setShowVerification] = useState(false)
  const [showBonusNotification, setShowBonusNotification] = useState(false)
  const router = useRouter()
  const { setUser, verifyPhone } = useUser()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (formData.password !== formData.confirmPassword) {
      setError("Пароли не совпадают")
      return
    }

    // В реальном приложении здесь был бы запрос к API для регистрации пользователя
    // и отправки кода подтверждения
    setShowVerification(true)
  }

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault()
    const isVerified = await verifyPhone(verificationCode)
    if (isVerified) {
      const newUser = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        phoneVerified: true,
        address: "",
        loyaltyPoints: 0,
        bonusPoints: 1000,
        orders: [],
      }
      setUser(newUser)
      localStorage.setItem("user", JSON.stringify(newUser))
      setShowBonusNotification(true)
      setTimeout(() => {
        router.push("/")
      }, 3000)
    } else {
      setError("Неверный код подтверждения")
    }
  }

  useEffect(() => {
    if (showBonusNotification) {
      const timer = setTimeout(() => setShowBonusNotification(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [showBonusNotification])

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Регистрация</h1>
      {!showVerification ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Имя</Label>
            <Input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="phone">Номер телефона</Label>
            <Input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="password">Пароль</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
            <Input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <Button type="submit" className="w-full">
            Зарегистрироваться
          </Button>
        </form>
      ) : (
        <form onSubmit={handleVerification} className="space-y-4">
          <div>
            <Label htmlFor="verificationCode">Код подтверждения</Label>
            <Input
              type="text"
              id="verificationCode"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <Button type="submit" className="w-full">
            Подтвердить
          </Button>
        </form>
      )}
      <AnimatePresence>
        {showBonusNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-md shadow-lg"
          >
            Вам начислено 1000 бонусных баллов!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

