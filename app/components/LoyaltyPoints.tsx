"use client"

import { useUser } from "../contexts/UserContext"
import { Star } from "lucide-react"

export default function LoyaltyPoints() {
  const { user } = useUser()

  if (!user) return null

  return (
    <div className="flex items-center bg-gray-800 rounded-full px-3 py-1">
      <Star className="w-4 h-4 text-yellow-400 mr-1" />
      <span className="text-sm font-medium">{user.loyaltyPoints} баллов</span>
    </div>
  )
}

