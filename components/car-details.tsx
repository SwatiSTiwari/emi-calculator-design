"use client"

import { Gauge, Calendar, Zap } from "lucide-react"

interface Car {
  model: string
  year: number
  mileage: string
  price: number
}

interface CarDetailsProps {
  car: Car
  onRequestTestDrive: () => void
}

export default function CarDetails({ car, onRequestTestDrive }: CarDetailsProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-2xl font-bold text-foreground mb-6">{car.model}</h2>

      <div className="space-y-4">
        {/* Year */}
        <div className="flex items-center gap-3 pb-4 border-b border-border">
          <Calendar className="w-5 h-5 text-primary" />
          <div>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Year</p>
            <p className="text-lg font-semibold text-foreground">{car.year}</p>
          </div>
        </div>

        {/* Mileage */}
        <div className="flex items-center gap-3 pb-4 border-b border-border">
          <Gauge className="w-5 h-5 text-primary" />
          <div>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Mileage</p>
            <p className="text-lg font-semibold text-foreground">{car.mileage}</p>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3 pt-2">
          <Zap className="w-5 h-5 text-secondary" />
          <div>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">On-Road Price</p>
            <p className="text-2xl font-bold text-secondary">{formatPrice(car.price)}</p>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={onRequestTestDrive}
        className="w-full mt-6 bg-primary text-primary-foreground font-semibold py-3 rounded-lg hover:bg-primary/90 transition-colors"
      >
        Request Test Drive
      </button>
    </div>
  )
}
