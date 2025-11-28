"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"

interface EligibilityModalProps {
  carPrice: number
  onClose: () => void
}

export default function EligibilityModal({ carPrice, onClose }: EligibilityModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    monthlyIncome: "",
    employmentType: "salaried",
    panNumber: "",
  })

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [eligibilityResult, setEligibilityResult] = useState<{
    eligible: boolean
    maxLoanAmount: number
    maxEmi: number
  } | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const calculateEligibility = () => {
    const monthlyIncome = Number.parseFloat(formData.monthlyIncome) || 0
    const maxEmi = monthlyIncome * 0.6 // 60% of monthly income
    const maxLoanAmount = maxEmi * 60 // Approximate for 60 months at 9%
    const eligible = maxLoanAmount >= carPrice * 0.3

    return {
      eligible,
      maxLoanAmount,
      maxEmi,
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const result = calculateEligibility()
    setEligibilityResult(result)
    setIsSubmitted(true)
  }

  if (isSubmitted && eligibilityResult) {
    const formatPrice = (price: number) => {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(price)
    }

    return (
      <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
        <div className="bg-card rounded-lg max-w-md w-full p-8">
          <div className="text-center mb-6">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                eligibilityResult.eligible ? "bg-secondary/20" : "bg-destructive/20"
              }`}
            >
              <span className={`text-3xl ${eligibilityResult.eligible ? "text-secondary" : "text-destructive"}`}>
                {eligibilityResult.eligible ? "✓" : "!"}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {eligibilityResult.eligible ? "Pre-Approved!" : "Eligibility Assessment"}
            </h2>
            <p className="text-muted-foreground mb-6">
              {eligibilityResult.eligible
                ? "Great news! You are eligible for financing."
                : "We'll contact you to discuss financing options."}
            </p>
          </div>

          <div className="space-y-3 mb-6 p-4 bg-muted rounded-lg">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Max Loan Amount:</span>
              <span className="font-semibold text-foreground">{formatPrice(eligibilityResult.maxLoanAmount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Max Monthly EMI:</span>
              <span className="font-semibold text-foreground">{formatPrice(eligibilityResult.maxEmi)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Car Price:</span>
              <span className="font-semibold text-foreground">{formatPrice(carPrice)}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-card">
          <h2 className="text-xl font-bold text-foreground">Check Eligibility</h2>
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
            <label className="block text-sm font-medium text-foreground mb-1">Monthly Income *</label>
            <input
              type="number"
              name="monthlyIncome"
              value={formData.monthlyIncome}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="₹ 50,000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Employment Type *</label>
            <select
              name="employmentType"
              value={formData.employmentType}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="salaried">Salaried</option>
              <option value="self-employed">Self-Employed</option>
              <option value="business">Business Owner</option>
              <option value="freelancer">Freelancer</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">PAN Number *</label>
            <input
              type="text"
              name="panNumber"
              value={formData.panNumber}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="XXXXX XXXXX XXXXX"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-lg hover:bg-primary/90 transition-colors mt-6"
          >
            Check My Eligibility
          </button>
        </form>

        <p className="text-xs text-muted-foreground px-6 pb-6">
          *Rate of interest can vary subject to credit profile. Loan approval is at the sole discretion of the finance
          partner.
        </p>
      </div>
    </div>
  )
}
