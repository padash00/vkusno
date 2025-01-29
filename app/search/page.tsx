"use client"

import { useSearchParams } from "next/navigation"
import ProductCard from "../components/ProductCard"
import { useState, useEffect, useCallback } from "react"

// This would typically come from an API or database
const allProducts = [
  {
    id: "sushi1",
    name: "Филадельфия",
    price: 2500,
    image:
      "https://images.unsplash.com/photo-1583623025817-d180a2221d0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
    category: "sushi",
    rating: 4.5,
    reviewCount: 120,
  },
  {
    id: "sushi2",
    name: "Калифорния",
    price: 2200,
    image:
      "https://images.unsplash.com/photo-1558985250-27a406d64cb3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    category: "sushi",
    rating: 4.2,
    reviewCount: 95,
  },
  {
    id: "pizza1",
    name: "Маргарита",
    price: 3000,
    image:
      "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80",
    category: "pizza",
    rating: 4.8,
    reviewCount: 200,
  },
  {
    id: "pizza2",
    name: "Пепперони",
    price: 3500,
    image:
      "https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80",
    category: "pizza",
    rating: 4.6,
    reviewCount: 180,
  },
  {
    id: "burger1",
    name: "Классический",
    price: 1800,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1899&q=80",
    category: "burgers",
    rating: 4.3,
    reviewCount: 150,
  },
  {
    id: "burger2",
    name: "Чизбургер",
    price: 2000,
    image:
      "https://images.unsplash.com/photo-1551615593-ef5fe247e8f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    category: "burgers",
    rating: 4.4,
    reviewCount: 130,
  },
  {
    id: "drink1",
    name: "Кола",
    price: 500,
    image:
      "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    category: "drinks",
    rating: 4.0,
    reviewCount: 80,
  },
  {
    id: "drink2",
    name: "Лимонад",
    price: 600,
    image:
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    category: "drinks",
    rating: 4.1,
    reviewCount: 75,
  },
  {
    id: "sauce1",
    name: "Кетчуп",
    price: 200,
    image:
      "https://images.unsplash.com/photo-1607604760903-1961a8e4fc8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    category: "sauces",
    rating: 3.9,
    reviewCount: 50,
  },
  {
    id: "sauce2",
    name: "Майонез",
    price: 200,
    image:
      "https://images.unsplash.com/photo-1585302769412-25972143ede8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    category: "sauces",
    rating: 3.8,
    reviewCount: 45,
  },
]

const filterProducts = useCallback((query: string) => {
  return allProducts.filter((product) => product.name.toLowerCase().includes(query.toLowerCase()))
}, [])

const sortProducts = useCallback((products: typeof allProducts, sortBy: string) => {
  return [...products].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name)
    } else if (sortBy === "price_asc") {
      return a.price - b.price
    } else if (sortBy === "price_desc") {
      return b.price - a.price
    }
    return 0
  })
}, [])

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [filteredProducts, setFilteredProducts] = useState(allProducts)
  const [sortBy, setSortBy] = useState("name")

  useEffect(() => {
    const filtered = filterProducts(query)
    setFilteredProducts(filtered)
  }, [query, filterProducts])

  useEffect(() => {
    const sorted = sortProducts(filteredProducts, sortBy)
    setFilteredProducts(sorted)
  }, [sortBy, filteredProducts, sortProducts])

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Результаты поиска: {query}</h1>
      <div className="mb-4">
        <label htmlFor="sort" className="mr-2">
          Сортировать по:
        </label>
        <select id="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border rounded p-1">
          <option value="name">Названию</option>
          <option value="price_asc">Цене (по возрастанию)</option>
          <option value="price_desc">Цене (по убыванию)</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-500 mt-8">Ничего не найдено. Попробуйте изменить запрос.</p>
      )}
    </div>
  )
}

