"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ImageCarouselProps {
  images: string[]
  carModel: string
}

export default function ImageCarousel({ images, carModel }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="relative w-full bg-white rounded-lg overflow-hidden border border-border">
      {/* Main Image */}
      <div className="relative w-full pt-[75%]">
        <img
          src={images[currentIndex] || "/placeholder.svg"}
          alt={`${carModel} - View ${currentIndex + 1}`}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all z-10"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6 text-primary" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all z-10"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6 text-primary" />
      </button>

      {/* Image Counter */}
      <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium">
        {currentIndex + 1}/{images.length}
      </div>

      {/* Thumbnail Strip */}
      <div className="bg-muted px-4 py-3 flex gap-2 overflow-x-auto">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`flex-shrink-0 w-16 h-16 rounded border-2 overflow-hidden transition-all ${
              index === currentIndex ? "border-primary" : "border-border"
            }`}
          >
            <img
              src={image || "/placeholder.svg"}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
