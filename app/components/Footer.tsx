"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export default function Footer() {
  return (
    <footer className="bg-gray-900 py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <motion.div
            className="w-full sm:w-1/2 md:w-1/4 mb-6 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-bold text-primary mb-4">ВкуснО</h3>
            <p className="text-gray-400">Доставка вкусной еды прямо к вашей двери</p>
          </motion.div>
          <motion.div
            className="w-full sm:w-1/2 md:w-1/4 mb-6 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold text-white mb-4">Меню</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/category/sushi" className="text-gray-400 hover:text-primary">
                  Суши
                </Link>
              </li>
              <li>
                <Link href="/category/pizza" className="text-gray-400 hover:text-primary">
                  Пицца
                </Link>
              </li>
              <li>
                <Link href="/category/burgers" className="text-gray-400 hover:text-primary">
                  Бургеры
                </Link>
              </li>
              <li>
                <Link href="/category/drinks" className="text-gray-400 hover:text-primary">
                  Напитки
                </Link>
              </li>
            </ul>
          </motion.div>
          <motion.div
            className="w-full sm:w-1/2 md:w-1/4 mb-6 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold text-white mb-4">Информация</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-primary">
                  Главная
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-gray-400 hover:text-primary">
                  Корзина
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-gray-400 hover:text-primary">
                  Вход
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-gray-400 hover:text-primary">
                  Регистрация
                </Link>
              </li>
            </ul>
          </motion.div>
          <motion.div
            className="w-full sm:w-1/2 md:w-1/4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold text-white mb-4">Контакты</h4>
            <p className="text-gray-400 mb-2">Телефон: +7 (777)858 77 70 (</p>
            <p className="text-gray-400 mb-2">Email: vkusno@gmail.com</p>
            <p className="text-gray-400">г. Усть - Каменогорск, улица 30 Гвардейская дивизия 24/1</p>
          </motion.div>
        </div>
        <motion.div
          className="border-t border-gray-800 mt-8 pt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-gray-400">&copy; 2023 ВкуснО. Все права защищены.</p>
        </motion.div>
      </div>
    </footer>
  )
}

