"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"

interface TestDriveModalProps {
  carModel: string
  onClose: () => void
}

export default function TestDriveModal({ carModel, onClose }: TestDriveModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    preferredDate: "",
    preferredTime: "",
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Test drive request:", formData)
    setIsSubmitted(true)
    setTimeout(() => {
      onClose()
    }, 2000)
  }

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
        <div className="bg-card rounded-lg max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">✓</span>
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Request Submitted!</h2>
          <p className="text-muted-foreground mb-4">
            We'll contact you shortly to confirm your test drive appointment for the {carModel}.
          </p>
          <p className="text-sm text-secondary font-semibold">Redirecting...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">Request Test Drive</h2>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Phone Number *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="+91 XXXXX XXXXX"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Preferred Date *</label>
            <input
              type="date"
              name="preferredDate"
              value={formData.preferredDate}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Preferred Time *</label>
            <select
              name="preferredTime"
              value={formData.preferredTime}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select a time</option>
              <option value="09:00-11:00">9:00 AM - 11:00 AM</option>
              <option value="11:00-13:00">11:00 AM - 1:00 PM</option>
              <option value="14:00-16:00">2:00 PM - 4:00 PM</option>
              <option value="16:00-18:00">4:00 PM - 6:00 PM</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-lg hover:bg-primary/90 transition-colors mt-6"
          >
            Confirm Test Drive
          </button>
        </form>

        <p className="text-xs text-muted-foreground px-6 pb-6">
          We'll contact you to confirm your test drive appointment within 24 hours.
        </p>
      </div>
    </div>
  )
}
