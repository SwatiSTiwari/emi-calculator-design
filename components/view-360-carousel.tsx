"use client"
import { useState } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface View360CarouselProps {
  images: string[]
  carModel: string
  onClose: () => void
}

export default function View360Carousel({ images, carModel, onClose }: View360CarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const handlePrev = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">360° View - {carModel}</h2>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Image Container */}
        <div className="flex-1 bg-muted relative overflow-hidden flex items-center justify-center">
          <img
            src={images[currentImageIndex] || "/placeholder.svg"}
            alt={`360° View - Angle ${currentImageIndex + 1}`}
            className="h-full object-contain"
            draggable={false}
          />

          {/* Image Counter */}
          <div className="absolute top-4 right-4 bg-black/70 text-white px-4 py-2 rounded-lg font-mono text-sm">
            {currentImageIndex + 1}/{images.length}
          </div>

          {/* Previous Button */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/90 text-white p-3 rounded-full transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/90 text-white p-3 rounded-full transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Thumbnail Navigation */}
        <div className="bg-muted p-4 border-t border-border overflow-x-auto">
          <div className="flex gap-3 justify-center">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`h-16 w-20 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                  index === currentImageIndex ? "border-primary" : "border-border hover:border-primary/50"
                }`}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`Angle ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Info Text */}
        <div className="bg-muted p-3 text-center text-sm text-muted-foreground border-t border-border">
          Use arrow buttons or click thumbnails to view 360° angles
        </div>
      </div>
    </div>
  )
}
