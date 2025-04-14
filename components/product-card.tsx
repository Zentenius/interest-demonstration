"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import type { Product } from "./catalog"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ProductCardProps {
  product: Product
  onHirePurchase: () => void
}

export default function ProductCard({ product, onHirePurchase }: ProductCardProps) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
      <Card className="overflow-hidden border-2 border-slate-100 h-full flex flex-col">
        <div className="relative h-48 bg-slate-50 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 " />
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={300}
            height={200}
            className="object-contain p-4 w-full h-full "
          />
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-purple-500 opacity-70" />
        </div>

        <CardContent className="pt-6 flex-grow">
          <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
          <p className="text-slate-600 text-sm mb-4">{product.description}</p>
          <p className="text-2xl font-bold text-blue-600">${product.price.toLocaleString()}</p>
        </CardContent>

        <CardFooter className="pt-0 pb-4">
          <div className="w-full space-y-2">
            <Button variant="outline" className="w-full border-slate-200">
              Buy Now
            </Button>
            <Button
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              onClick={onHirePurchase}
            >
              Buy on Hire Purchase
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
