"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Coins, Clock, Percent, Calculator, ArrowRight } from "lucide-react"

interface InterestAnimationProps {
  principal: number
  interestRate: number
  years: number
  interest: number
  totalHPCost: number
  monthlyPayment: number
}

export default function InterestAnimation({
  principal,
  interestRate,
  years,
  interest,
  totalHPCost,
  monthlyPayment,
}: InterestAnimationProps) {
  const [step, setStep] = useState(0)
  const [animationComplete, setAnimationComplete] = useState(false)
  const [showFormula, setShowFormula] = useState(false)
  const [showPrincipal, setShowPrincipal] = useState(false)
  const [showRate, setShowRate] = useState(false)
  const [showTime, setShowTime] = useState(false)
  const [showCalculation, setShowCalculation] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [showMonthly, setShowMonthly] = useState(false)

  // Animation sequence
  useEffect(() => {
    const sequence = [
      () => setShowFormula(true),
      () => setShowPrincipal(true),
      () => setShowRate(true),
      () => setShowTime(true),
      () => setShowCalculation(true),
      () => setShowResult(true),
      () => setShowMonthly(true),
      () => setAnimationComplete(true),
    ]

    if (step < sequence.length) {
      const timer = setTimeout(() => {
        sequence[step]()
        setStep(step + 1)
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [step])

  // Reset animation
  useEffect(() => {
    setStep(0)
    setAnimationComplete(false)
    setShowFormula(false)
    setShowPrincipal(false)
    setShowRate(false)
    setShowTime(false)
    setShowCalculation(false)
    setShowResult(false)
    setShowMonthly(false)

    // Start animation
    const timer = setTimeout(() => {
      setStep(0)
      setShowFormula(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [principal, interestRate, years])

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-100 overflow-hidden">
      <h3 className="font-semibold text-lg mb-6 text-center">Simple Interest Calculation</h3>

      <div className="relative min-h-[280px]">
        {/* Formula Introduction */}
        <AnimatePresence>
          {showFormula && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 text-center">
              <div className="inline-flex items-center justify-center bg-white px-4 py-2 rounded-lg shadow-sm border border-blue-100">
                <Calculator className="h-5 w-5 text-blue-500 mr-2" />
                <span className="font-medium">Simple Interest Formula</span>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-3 text-xl font-mono bg-white p-3 rounded-lg inline-block shadow-sm border border-blue-100"
              >
                Interest = Principal × Rate × Time
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Animation Steps */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          {/* Principal */}
          <AnimatePresence>
            {showPrincipal && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col items-center"
              >
                <div className="bg-blue-100 p-3 rounded-full mb-2">
                  <Coins className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-center">
                  <div className="text-sm text-slate-600 mb-1">Principal</div>
                  <div className="font-mono font-bold text-blue-700">${principal.toLocaleString()}</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Rate */}
          <AnimatePresence>
            {showRate && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center"
              >
                <div className="bg-purple-100 p-3 rounded-full mb-2">
                  <Percent className="h-6 w-6 text-purple-600" />
                </div>
                <div className="text-center">
                  <div className="text-sm text-slate-600 mb-1">Rate</div>
                  <div className="font-mono font-bold text-purple-700">{interestRate}%</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Time */}
          <AnimatePresence>
            {showTime && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col items-center"
              >
                <div className="bg-amber-100 p-3 rounded-full mb-2">
                  <Clock className="h-6 w-6 text-amber-600" />
                </div>
                <div className="text-center">
                  <div className="text-sm text-slate-600 mb-1">Time</div>
                  <div className="font-mono font-bold text-amber-700">
                    {years} {years === 1 ? "year" : "years"}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Calculation */}
        <AnimatePresence>
          {showCalculation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 bg-white p-4 rounded-lg border border-blue-100 shadow-sm"
            >
              <div className="font-mono text-center">
                <span className="text-blue-700">£{principal.toLocaleString()}</span>
                <span className="mx-2">×</span>
                <span className="text-purple-700">{interestRate / 100}</span>
                <span className="mx-2">×</span>
                <span className="text-amber-700">{years}</span>
                <span className="mx-2">=</span>
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="font-bold text-green-600"
                >
                  ${interest.toFixed(2)}
                </motion.span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result */}
        <AnimatePresence>
          {showResult && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6 text-center">
              <div className="inline-flex items-center gap-2 mb-2">
                <div className="h-1 w-8 bg-slate-200 rounded"></div>
                <div className="font-medium text-slate-600">Total Cost</div>
                <div className="h-1 w-8 bg-slate-200 rounded"></div>
              </div>
              <div className="flex items-center justify-center gap-3">
                <div className="bg-blue-50 px-3 py-2 rounded border border-blue-100">
                  <div className="text-xs text-slate-500 mb-1">Principal</div>
                  <div className="font-mono font-medium">${principal.toLocaleString()}</div>
                </div>
                <div className="text-2xl">+</div>
                <div className="bg-green-50 px-3 py-2 rounded border border-green-100">
                  <div className="text-xs text-slate-500 mb-1">Interest</div>
                  <div className="font-mono font-medium">${interest.toFixed(2)}</div>
                </div>
                <div className="text-2xl">=</div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-purple-100 px-3 py-2 rounded border border-purple-200"
                >
                  <div className="text-xs text-slate-500 mb-1">Total</div>
                  <div className="font-mono font-bold text-purple-700">${(principal + interest).toFixed(2)}</div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Monthly Payment */}
        <AnimatePresence>
          {showMonthly && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 flex items-center justify-center"
            >
              <div className="bg-slate-50 px-4 py-3 rounded-lg border border-slate-200 flex items-center gap-3">
                <div>
                  <div className="text-xs text-slate-500">Monthly Payment</div>
                  <div className="font-mono font-bold text-blue-700">£{monthlyPayment.toFixed(2)}</div>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-400" />
                <div>
                  <div className="text-xs text-slate-500">Over</div>
                  <div className="font-mono font-medium">
                    {years * 12} {years * 12 === 1 ? "month" : "months"}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Replay Button */}
        <AnimatePresence>
          {animationComplete && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 text-center">
              <button
                onClick={() => {
                  setStep(0)
                  setAnimationComplete(false)
                  setShowFormula(false)
                  setShowPrincipal(false)
                  setShowRate(false)
                  setShowTime(false)
                  setShowCalculation(false)
                  setShowResult(false)
                  setShowMonthly(false)
                  setTimeout(() => setShowFormula(true), 300)
                }}
                className="text-sm text-blue-600 hover:text-blue-800 underline underline-offset-2"
              >
                Replay Animation
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
