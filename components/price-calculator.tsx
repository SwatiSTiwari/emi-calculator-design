"use client"

import { useState, useMemo } from "react"
import { ChevronDown } from "lucide-react"

interface PriceCalculatorProps {
  carPrice: number
  onCheckEligibility: () => void
}

export default function PriceCalculator({ carPrice, onCheckEligibility }: PriceCalculatorProps) {
  const [loanAmount, setLoanAmount] = useState(carPrice * 0.7)
  const [downPayment, setDownPayment] = useState(carPrice * 0.3)
  const [loanDuration, setLoanDuration] = useState(60)
  const [showBreakup, setShowBreakup] = useState(false)

  // EMI Calculator
  const monthlyEMI = useMemo(() => {
    const monthlyRate = 9 / 100 / 12 // 9% annual rate
    const numerator = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanDuration)
    const denominator = Math.pow(1 + monthlyRate, loanDuration) - 1
    return Math.round(numerator / denominator)
  }, [loanAmount, loanDuration])

  const totalAmount = monthlyEMI * loanDuration
  const totalInterest = totalAmount - loanAmount

  const handleLoanAmountChange = (value: number) => {
    const newLoan = value
    const newDown = carPrice - newLoan
    setLoanAmount(newLoan)
    setDownPayment(newDown)
  }

  const handleDownPaymentChange = (value: number) => {
    const newDown = value
    const newLoan = carPrice - newDown
    setDownPayment(newDown)
    setLoanAmount(newLoan)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-2xl font-bold text-foreground mb-6">Check Eligibility</h3>

      {/* Loan Amount Section */}
      <div className="mb-8">
        <div className="flex justify-between items-baseline mb-2">
          <label className="text-sm font-semibold text-foreground uppercase tracking-wide">Loan Amount</label>
          <span className="text-xl font-bold text-primary">₹{(loanAmount / 100000).toFixed(1)}L</span>
        </div>
        <input
          type="range"
          min={carPrice * 0.1}
          max={carPrice * 0.9}
          value={loanAmount}
          onChange={(e) => handleLoanAmountChange(Number(e.target.value))}
          className="w-full mb-3"
        />
        <div className="flex justify-between text-xs text-muted-foreground font-medium">
          <span>₹{((carPrice * 0.1) / 100000).toFixed(1)}L</span>
          <span>₹{((carPrice * 0.9) / 100000).toFixed(1)}L</span>
        </div>
      </div>

      {/* Down Payment Section */}
      <div className="mb-8">
        <div className="flex justify-between items-baseline mb-2">
          <label className="text-sm font-semibold text-foreground uppercase tracking-wide">Down Payment</label>
          <span className="text-xl font-bold text-primary">₹{(downPayment / 100000).toFixed(1)}L</span>
        </div>
        <input
          type="range"
          min={carPrice * 0.1}
          max={carPrice * 0.9}
          value={downPayment}
          onChange={(e) => handleDownPaymentChange(Number(e.target.value))}
          className="w-full mb-3"
        />
        <div className="flex justify-between text-xs text-muted-foreground font-medium">
          <span>₹{((carPrice * 0.1) / 100000).toFixed(1)}L</span>
          <span>₹{((carPrice * 0.9) / 100000).toFixed(1)}L</span>
        </div>
      </div>

      {/* Loan Duration Section */}
      <div className="mb-8">
        <div className="flex justify-between items-baseline mb-2">
          <label className="text-sm font-semibold text-foreground uppercase tracking-wide">Duration of Loan</label>
          <span className="text-xl font-bold text-primary">{loanDuration} Months</span>
        </div>
        <input
          type="range"
          min={12}
          max={84}
          value={loanDuration}
          onChange={(e) => setLoanDuration(Number(e.target.value))}
          className="w-full mb-3"
        />
        <div className="flex justify-between text-xs text-muted-foreground font-medium">
          <span>12 Months</span>
          <span>84 Months</span>
        </div>
      </div>

      {/* EMI Display */}
      <div className="bg-gradient-to-r from-secondary/10 to-secondary/5 border border-secondary/20 rounded-lg p-6 mb-6 text-center">
        <p className="text-muted-foreground text-sm mb-1 font-medium">Monthly EMI</p>
        <p className="text-3xl font-bold text-secondary">{formatPrice(monthlyEMI)}</p>
        <p className="text-xs text-muted-foreground mt-2">per month</p>
      </div>

      <button
        onClick={() => setShowBreakup(!showBreakup)}
        className="w-full text-left flex items-center justify-between py-3 px-4 rounded-lg hover:bg-muted transition-colors mb-4"
      >
        <span className="flex items-center gap-2 text-primary font-semibold">
          <ChevronDown className={`w-4 h-4 transition-transform ${showBreakup ? "rotate-180" : ""}`} />
          View Loan Breakup
        </span>
      </button>

      {showBreakup && (
        <div className="bg-muted p-4 rounded-lg mb-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Loan Amount:</span>
            <span className="font-semibold text-foreground">{formatPrice(loanAmount)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Monthly EMI:</span>
            <span className="font-semibold text-foreground">{formatPrice(monthlyEMI)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Loan Duration:</span>
            <span className="font-semibold text-foreground">{loanDuration} months</span>
          </div>
          <div className="border-t border-border pt-2 mt-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Amount Payable:</span>
              <span className="font-semibold text-foreground">{formatPrice(totalAmount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Interest:</span>
              <span className="font-semibold text-secondary">{formatPrice(totalInterest)}</span>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={onCheckEligibility}
        className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
      >
        <span className="text-lg">💳</span>
        Check Eligibility
      </button>

      {/* Disclaimer */}
      <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
        *Rate of interest can vary subject to credit profile. Loan approval is at the sole discretion of the finance
        partner.
      </p>
    </div>
  )
}
