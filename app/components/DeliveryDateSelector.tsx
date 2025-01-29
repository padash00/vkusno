"use client"

import { useState } from "react"
import { DateInput } from "./DateInput"

export function DeliveryDateSelector() {
  const [selectedDate, setSelectedDate] = useState("")

  return (
    <DateInput
      label="Выберите дату доставки"
      value={selectedDate}
      onChange={setSelectedDate}
      className="w-full max-w-xs"
    />
  )
}

