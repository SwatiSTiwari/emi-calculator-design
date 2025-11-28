"use client"
import { useState, useRef, useCallback, useEffect } from "react"
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ChevronUp, 
  ChevronDown,
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  Move,
  Maximize2
} from "lucide-react"

interface View360CarouselProps {
  images: string[]
  carModel: string
  onClose: () => void
}

export default function View360Carousel({ images, carModel, onClose }: View360CarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [dragMode, setDragMode] = useState<'rotate' | 'pan'>('rotate')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  const MIN_ZOOM = 0.5
  const MAX_ZOOM = 3
  const ZOOM_STEP = 0.25
  const ROTATION_STEP = 15

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          if (e.shiftKey) {
            handleRotateLeft()
          } else {
            handlePrev()
          }
          break
        case 'ArrowRight':
          if (e.shiftKey) {
            handleRotateRight()
          } else {
            handleNext()
          }
          break
        case 'ArrowUp':
          if (e.shiftKey) {
            handleRotateUp()
          }
          break
        case 'ArrowDown':
          if (e.shiftKey) {
            handleRotateDown()
          }
          break
        case '+':
        case '=':
          handleZoomIn()
          break
        case '-':
          handleZoomOut()
          break
        case 'Escape':
          if (isFullscreen) {
            setIsFullscreen(false)
          } else {
            onClose()
          }
          break
        case 'r':
        case 'R':
          handleReset()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isFullscreen])

  // Handle wheel zoom
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP
      setZoom(prev => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, prev + delta)))
    }

    container.addEventListener('wheel', handleWheel, { passive: false })
    return () => container.removeEventListener('wheel', handleWheel)
  }, [])

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const handlePrev = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleZoomIn = () => {
    setZoom(prev => Math.min(MAX_ZOOM, prev + ZOOM_STEP))
  }

  const handleZoomOut = () => {
    setZoom(prev => Math.max(MIN_ZOOM, prev - ZOOM_STEP))
  }

  const handleRotateLeft = () => {
    setRotation(prev => ({ ...prev, y: prev.y - ROTATION_STEP }))
  }

  const handleRotateRight = () => {
    setRotation(prev => ({ ...prev, y: prev.y + ROTATION_STEP }))
  }

  const handleRotateUp = () => {
    setRotation(prev => ({ ...prev, x: Math.max(-60, prev.x - ROTATION_STEP) }))
  }

  const handleRotateDown = () => {
    setRotation(prev => ({ ...prev, x: Math.min(60, prev.x + ROTATION_STEP) }))
  }

  const handleReset = () => {
    setZoom(1)
    setRotation({ x: 0, y: 0 })
    setPosition({ x: 0, y: 0 })
  }

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX, y: e.clientY })
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return

    const deltaX = e.clientX - dragStart.x
    const deltaY = e.clientY - dragStart.y

    if (dragMode === 'rotate') {
      setRotation(prev => ({
        x: Math.max(-60, Math.min(60, prev.x + deltaY * 0.5)),
        y: prev.y + deltaX * 0.5
      }))
    } else {
      setPosition(prev => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY
      }))
    }

    setDragStart({ x: e.clientX, y: e.clientY })
  }, [isDragging, dragStart, dragMode])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true)
      setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY })
    }
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return

    const deltaX = e.touches[0].clientX - dragStart.x
    const deltaY = e.touches[0].clientY - dragStart.y

    if (dragMode === 'rotate') {
      setRotation(prev => ({
        x: Math.max(-60, Math.min(60, prev.x + deltaY * 0.5)),
        y: prev.y + deltaX * 0.5
      }))
    } else {
      setPosition(prev => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY
      }))
    }

    setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY })
  }, [isDragging, dragStart, dragMode])

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false)
  }, [])

  return (
    <div className={`fixed inset-0 bg-black/90 z-50 flex items-center justify-center ${isFullscreen ? 'p-0' : 'p-4'}`}>
      <div className={`bg-card rounded-lg w-full flex flex-col ${isFullscreen ? 'max-w-none h-full rounded-none' : 'max-w-5xl max-h-[90vh]'}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-card/95 backdrop-blur">
          <h2 className="text-xl font-bold text-foreground">360° View - {carModel}</h2>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsFullscreen(!isFullscreen)} 
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              title="Toggle Fullscreen"
            >
              <Maximize2 className="w-5 h-5" />
            </button>
            <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Controls Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-3 bg-muted/50 border-b border-border">
          {/* Zoom Controls */}
          <div className="flex items-center gap-1 bg-background rounded-lg p-1">
            <button
              onClick={handleZoomOut}
              disabled={zoom <= MIN_ZOOM}
              className="p-2 hover:bg-muted rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Zoom Out (-)"
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            <span className="px-3 font-mono text-sm min-w-[60px] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              disabled={zoom >= MAX_ZOOM}
              className="p-2 hover:bg-muted rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Zoom In (+)"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
          </div>

          {/* Rotation Controls */}
          <div className="flex items-center gap-1 bg-background rounded-lg p-1">
            <button
              onClick={handleRotateLeft}
              className="p-2 hover:bg-muted rounded-md transition-colors"
              title="Rotate Left (Shift + ←)"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleRotateUp}
              className="p-2 hover:bg-muted rounded-md transition-colors"
              title="Rotate Up (Shift + ↑)"
            >
              <ChevronUp className="w-5 h-5" />
            </button>
            <button
              onClick={handleRotateDown}
              className="p-2 hover:bg-muted rounded-md transition-colors"
              title="Rotate Down (Shift + ↓)"
            >
              <ChevronDown className="w-5 h-5" />
            </button>
            <button
              onClick={handleRotateRight}
              className="p-2 hover:bg-muted rounded-md transition-colors"
              title="Rotate Right (Shift + →)"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Mode Toggle */}
          <div className="flex items-center gap-1 bg-background rounded-lg p-1">
            <button
              onClick={() => setDragMode('rotate')}
              className={`p-2 rounded-md transition-colors ${dragMode === 'rotate' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
              title="Rotate Mode"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
            <button
              onClick={() => setDragMode('pan')}
              className={`p-2 rounded-md transition-colors ${dragMode === 'pan' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
              title="Pan Mode"
            >
              <Move className="w-5 h-5" />
            </button>
          </div>

          {/* Reset Button */}
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-3 py-2 bg-background hover:bg-muted rounded-lg transition-colors text-sm"
            title="Reset View (R)"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>

        {/* Image Container */}
        <div 
          ref={containerRef}
          className={`flex-1 bg-gradient-to-b from-muted to-muted/50 relative overflow-hidden flex items-center justify-center ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ minHeight: isFullscreen ? '60vh' : '400px' }}
        >
          <div
            className="transition-transform duration-100 ease-out"
            style={{
              transform: `
                translate(${position.x}px, ${position.y}px)
                scale(${zoom})
                perspective(1000px)
                rotateX(${rotation.x}deg)
                rotateY(${rotation.y}deg)
              `,
              transformStyle: 'preserve-3d'
            }}
          >
            <img
              ref={imageRef}
              src={images[currentImageIndex] || "/placeholder.svg"}
              alt={`360° View - Angle ${currentImageIndex + 1}`}
              className="max-h-[50vh] max-w-full object-contain select-none"
              draggable={false}
            />
          </div>

          {/* Image Counter */}
          <div className="absolute top-4 right-4 bg-black/70 text-white px-4 py-2 rounded-lg font-mono text-sm">
            {currentImageIndex + 1}/{images.length}
          </div>

          {/* Quick Rotation Info */}
          <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-2 rounded-lg text-xs">
            X: {rotation.x.toFixed(0)}° | Y: {rotation.y.toFixed(0)}°
          </div>

          {/* Previous Image Button */}
          <button
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/90 text-white p-3 rounded-full transition-colors shadow-lg"
            title="Previous Image (←)"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Image Button */}
          <button
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/90 text-white p-3 rounded-full transition-colors shadow-lg"
            title="Next Image (→)"
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
                  index === currentImageIndex ? "border-primary ring-2 ring-primary/30" : "border-border hover:border-primary/50"
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
          <span className="hidden sm:inline">
            🖱️ Drag to {dragMode === 'rotate' ? 'rotate' : 'pan'} | ⚙️ Scroll to zoom | ⌨️ Arrow keys to navigate | Shift+Arrows to rotate | R to reset
          </span>
          <span className="sm:hidden">
            Drag to {dragMode === 'rotate' ? 'rotate' : 'pan'} | Use controls above
          </span>
        </div>
      </div>
    </div>
  )
}
