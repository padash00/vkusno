import Link from "next/link"

export default function ThankYouPage() {
  return (
    <div className="text-center py-8">
      <h1 className="text-3xl font-bold mb-4">Спасибо за ваш заказ!</h1>
      <p className="mb-4">Мы свяжемся с вами в ближайшее время для подтверждения заказа.</p>
      <Link href="/" className="text-blue-500 hover:underline">
        Вернуться на главную
      </Link>
    </div>
  )
}

