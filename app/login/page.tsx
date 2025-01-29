"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "../contexts/UserContext"
import Link from "next/link"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const router = useRouter()
  const { setUser } = useUser()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // В реальном приложении здесь был бы запрос к API для проверки учетных данных
    // Сейчас мы просто имитируем успешный вход
    if (formData.email === "user@example.com" && formData.password === "password") {
      const user = {
        id: "1",
        name: "Иван Иванов",
        email: formData.email,
        loyaltyPoints: 100,
      }
      setUser(user)
      localStorage.setItem("user", JSON.stringify(user))
      router.push("/")
    } else {
      setError("Неверный email или пароль")
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Вход</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md bg-gray-800 text-white border-gray-700"
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1">
            Пароль
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md bg-gray-800 text-white border-gray-700"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full bg-primary text-primary-foreground py-2 px-4 rounded hover:bg-opacity-90 transition-colors duration-300"
        >
          Войти
        </button>
      </form>
      <p className="mt-4 text-center">
        Нет аккаунта?{" "}
        <Link href="/register" className="text-primary hover:underline">
          Зарегистрироваться
        </Link>
      </p>
    </div>
  )
}

