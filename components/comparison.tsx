"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, DollarSign, Calculator } from "lucide-react"

export default function Comparison() {
  type ExampleKey = keyof typeof examples;
  const [activeTab, setActiveTab] = useState<ExampleKey>("laptop")

  const examples = {
    laptop: {
      name: "HP Victus by HP Gaming Laptop ",
      cashPrice: 2499,
      deposit: 130,
      interestRate: 15,
      years: 2,
    },
    headset: {
      name: "SAMSUNG Galaxy Tab A9",
      cashPrice: 249,
      deposit: 25,
      interestRate: 18,
      years: 1,
    },
    hoverboard: {
      name: "Nintendo Switch Lite",
      cashPrice: 299,
      deposit: 40,
      interestRate: 20,
      years: 1.5,
    },
  }

  interface Example {
    name: string;
    cashPrice: number;
    deposit: number;
    interestRate: number;
    years: number;
  }

  const calculateHPCost = (example: Example) => {
    const principal = example.cashPrice - example.deposit
    const interest = principal * (example.interestRate / 100) * example.years
    return example.cashPrice + interest
  }
  const selectedExample = examples[activeTab as ExampleKey]
  const hpCost = calculateHPCost(selectedExample)
  const difference = hpCost - selectedExample.cashPrice
  const percentageMore = ((hpCost / selectedExample.cashPrice - 1) * 100).toFixed(1)

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Cash vs. Hire Purchase</h2>
        <p className="text-slate-600 text-center mb-12 max-w-2xl mx-auto">
          See the difference between paying cash upfront versus spreading payments over time with hire purchase.
        </p>

        <Tabs defaultValue="laptop" value={activeTab} onValueChange={(value) => setActiveTab(value as ExampleKey)} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="laptop">Laptop</TabsTrigger>
              <TabsTrigger value="headset">Headset</TabsTrigger>
              <TabsTrigger value="hoverboard">Game Console</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value={activeTab} className="mt-0">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <Card className="overflow-hidden border-2 border-slate-100">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <DollarSign className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold">Cash Price</h3>
                  </div>

                  <div className="space-y-4">
                    <p className="text-4xl font-bold text-blue-600">${selectedExample.cashPrice.toLocaleString()}</p>
                    <p className="text-slate-600">Pay once, own immediately. No additional costs.</p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 font-bold">✓</span>
                        <span>No interest charges</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 font-bold">✓</span>
                        <span>Immediate ownership</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 font-bold">✓</span>
                        <span>No monthly commitments</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <div className="relative">
                <Card className="overflow-hidden border-2 border-slate-100">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="bg-purple-100 p-2 rounded-full">
                        <Calculator className="h-6 w-6 text-purple-600" />
                      </div>
                      <h3 className="text-xl font-semibold">Hire Purchase</h3>
                    </div>

                    <div className="space-y-4">
                      <p className="text-4xl font-bold text-purple-600">${hpCost.toFixed(0).toLocaleString()}</p>
                      <p className="text-slate-600">
                        ${selectedExample.deposit} deposit + monthly payments over {selectedExample.years}{" "}
                        {selectedExample.years === 1 ? "year" : "years"}
                      </p>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 font-bold">✓</span>
                          <span>Smaller initial payment</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 font-bold">✓</span>
                          <span>Spread cost over time</span>
                        </li>
                        <li className="flex items-start gap-2 text-amber-700">
                          <span className="text-amber-500 font-bold">!</span>
                          <span>
                            Pay £{difference.toFixed(0)} more overall ({percentageMore}%)
                          </span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <motion.div
                  className="absolute -left-4 top-1/2 -translate-y-1/2 hidden md:block"
                  animate={{ x: [0, 10, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                >
                  <ArrowRight className="h-8 w-8 text-slate-400" />
                </motion.div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <h3 className="text-2xl font-semibold mb-4">Which option works best for you?</h3>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Consider your budget, how urgently you need the item, and whether you're comfortable paying extra for
                the convenience of spreading payments over time.
              </p>
              <p className="text-lg font-medium text-blue-600 mt-4">Make the smart choice!</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
