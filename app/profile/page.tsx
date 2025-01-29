"use client"

import { useUser } from "../../contexts/UserContext"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"

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
    </div>
  )
}

