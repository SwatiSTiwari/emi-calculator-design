"use client"

import { RotateCw } from "lucide-react"

interface View360ButtonProps {
  onClick: () => void
  isActive: boolean
}

export default function View360Button({ onClick, isActive }: View360ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold transition-all ${
        isActive ? "bg-secondary text-secondary-foreground" : "bg-primary text-primary-foreground hover:bg-primary/90"
      }`}
    >
      <RotateCw className="w-5 h-5" />
      {isActive ? "Exit 360° View" : "View 360°"}
    </button>
  )
}
