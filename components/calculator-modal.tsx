"use client"

import { useState } from "react"
import type { Product } from "./catalog"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Calculator, Info } from "lucide-react"
import InterestAnimation from "./interest-animation"

interface CalculatorModalProps {
  isOpen: boolean
  onClose: () => void
  product: Product
}

export default function CalculatorModal({ isOpen, onClose, product }: CalculatorModalProps) {
  const [deposit, setDeposit] = useState(Math.round(product.price * 0.1))
  const [interestRate, setInterestRate] = useState(15)
  const [years, setYears] = useState(2)
  const [showResults, setShowResults] = useState(false)

  const principal = product.price - deposit
  const interest = principal * (interestRate / 100) * years
  const totalHPCost = deposit + principal + interest
  const monthlyPayment = (principal + interest) / (years * 12)

  const handleCalculate = () => {
    setShowResults(true)
  }

  const handleReset = () => {
    setShowResults(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Hire Purchase Calculator
          </DialogTitle>
          <DialogDescription>
            Calculate the total cost and monthly payments for {product.name} using hire purchase.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {!showResults ? (
            <>
              <div className="grid gap-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="deposit">Deposit Amount (£)</Label>
                  <span className="text-sm text-slate-500">
                    Recommended: £{Math.round(product.price * 0.1)} - £{Math.round(product.price * 0.3)}
                  </span>
                </div>
                <Input
                  id="deposit"
                  type="number"
                  value={deposit}
                  onChange={(e) => setDeposit(Number(e.target.value))}
                  min={0}
                  max={product.price}
                />
                <div className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                  <Info className="h-3 w-3" />
                  Typically 10-30% of the item's price
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="interest">Interest Rate (%)</Label>
                <div className="flex gap-4 items-center">
                  <Slider
                    id="interest"
                    min={5}
                    max={30}
                    step={0.5}
                    value={[interestRate]}
                    onValueChange={(value) => setInterestRate(value[0])}
                    className="flex-1"
                  />
                  <span className="w-12 text-right font-medium">{interestRate}%</span>
                </div>
                <div className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                  <Info className="h-3 w-3" />
                  Typical rates range from 10% to 25%
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="years">Repayment Period (Years)</Label>
                <div className="flex gap-4 items-center">
                  <Slider
                    id="years"
                    min={1}
                    max={5}
                    step={1}
                    value={[years]}
                    onValueChange={(value) => setYears(value[0])}
                    className="flex-1"
                  />
                  <span className="w-12 text-right font-medium">
                    {years} {years === 1 ? "year" : "years"}
                  </span>
                </div>
              </div>

              <Button
                onClick={handleCalculate}
                className="mt-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                Calculate
              </Button>
            </>
          ) : (
            <div className="space-y-6">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                <h3 className="font-semibold text-lg mb-4">Step-by-Step Calculation</h3>

                <div className="space-y-3 text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-slate-600">Cash Price:</div>
                    <div className="font-medium">£{product.price.toLocaleString()}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-slate-600">Deposit:</div>
                    <div className="font-medium">£{deposit.toLocaleString()}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-slate-600">Principal (Cash Price - Deposit):</div>
                    <div className="font-medium">£{principal.toLocaleString()}</div>
                  </div>
                </div>
              </div>

              <InterestAnimation
                principal={principal}
                interestRate={interestRate}
                years={years}
                interest={interest}
                totalHPCost={totalHPCost}
                monthlyPayment={monthlyPayment}
              />

              <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                <h3 className="font-semibold text-amber-800 mb-2">Cost Comparison</h3>
                <p className="text-amber-700 text-sm">
                  With hire purchase, you'll pay{" "}
                  <span className="font-bold">£{(totalHPCost - product.price).toFixed(2)}</span> more than the cash
                  price of £{product.price}.
                </p>
                <p className="text-amber-700 text-sm mt-1">
                  That's <span className="font-bold">{((totalHPCost / product.price - 1) * 100).toFixed(1)}%</span> more
                  than paying in cash.
                </p>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={handleReset} className="flex-1">
                  Adjust Values
                </Button>
                <Button
                  onClick={onClose}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
