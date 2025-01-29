"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface DateInputProps {
  label?: string
  value: string
  onChange: (value: string) => void
  className?: string
}

export function DateInput({ label, value, onChange, className = "" }: DateInputProps) {
  return (
    <div className={className}>
      {label && <Label className="mb-2 block">{label}</Label>}
      <Input type="date" value={value} onChange={(e) => onChange(e.target.value)} className="w-full" />
    </div>
  )
}

