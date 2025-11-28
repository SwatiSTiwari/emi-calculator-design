"use client"

import { useState } from "react"
import Header from "@/components/header"
import ImageCarousel from "@/components/image-carousel"
import CarDetails from "@/components/car-details"
import PriceCalculator from "@/components/price-calculator"
import View360Button from "@/components/view-360-button"
import View360Carousel from "@/components/view-360-carousel"
import TestDriveModal from "@/components/test-drive-modal"
import EligibilityModal from "@/components/eligibility-modal"

const CARS_DATA = [
  {
    id: 1,
    model: "BMW M5 2024",
    year: 2024,
    mileage: "0 km",
    price: 12500000,
    images: [
      "/luxury-bmw-sedan-exterior.jpg",
      "/bmw-m5-front-view.jpg",
      "/bmw-m5-side-profile.jpg",
      "/bmw-m5-interior-dashboard.jpg",
      "/bmw-m5-rear-view.jpg",
    ],
  },
  {
    id: 2,
    model: "Mercedes-Benz S-Class 2024",
    year: 2024,
    mileage: "0 km",
    price: 13500000,
    images: [
      "/mercedes-s-class.png",
      "/mercedes-front-exterior.jpg",
      "/mercedes-side-view.jpg",
      "/mercedes-interior.jpg",
      "/mercedes-rear-view.jpg",
    ],
  },
  {
    id: 3,
    model: "Audi A8 2024",
    year: 2024,
    mileage: "0 km",
    price: 11800000,
    images: [
      "/audi-a8-luxury-car.jpg",
      "/audi-front-view.jpg",
      "/audi-side-profile.jpg",
      "/audi-interior-premium.jpg",
      "/audi-rear-view.jpg",
    ],
  },
]

export default function Home() {
  const [selectedCar, setSelectedCar] = useState(CARS_DATA[0])
  const [show360View, setShow360View] = useState(false)
  const [showTestDriveModal, setShowTestDriveModal] = useState(false)
  const [showEligibilityModal, setShowEligibilityModal] = useState(false)

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Image Carousel and 360 View */}
          <div className="lg:col-span-2">
            <ImageCarousel images={selectedCar.images} carModel={selectedCar.model} />
            <div className="mt-6">
              <View360Button onClick={() => setShow360View(true)} isActive={show360View} />
            </div>
          </div>

          {/* Right: Car Details and Calculator */}
          <div className="space-y-6">
            <CarDetails car={selectedCar} onRequestTestDrive={() => setShowTestDriveModal(true)} />
            <PriceCalculator carPrice={selectedCar.price} onCheckEligibility={() => setShowEligibilityModal(true)} />
          </div>
        </div>

        {/* Car Selection Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">More Vehicles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CARS_DATA.map((car) => (
              <button
                key={car.id}
                onClick={() => setSelectedCar(car)}
                className={`text-left p-4 rounded-lg border-2 transition-all ${
                  selectedCar.id === car.id
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card hover:border-primary"
                }`}
              >
                <h3 className="font-semibold text-foreground">{car.model}</h3>
                <p className="text-sm text-muted-foreground">₹{(car.price / 1000000).toFixed(1)}M</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {show360View && (
        <View360Carousel
          images={selectedCar.images}
          carModel={selectedCar.model}
          onClose={() => setShow360View(false)}
        />
      )}

      {showTestDriveModal && (
        <TestDriveModal carModel={selectedCar.model} onClose={() => setShowTestDriveModal(false)} />
      )}

      {showEligibilityModal && (
        <EligibilityModal carPrice={selectedCar.price} onClose={() => setShowEligibilityModal(false)} />
      )}
    </main>
  )
}
