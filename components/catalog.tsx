"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"
import ProductCard from "./product-card"
import CalculatorModal from "./calculator-modal"

export type Product = {
  id: number
  name: string
  price: number
  image: string
  description: string
}

export default function Catalog() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" })
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)

  const products: Product[] = [
    {
      id: 1,
      name: "HP Victus by HP Gaming Laptop ",
      price: 2499,
      image: "https://m.media-amazon.com/images/I/51WsaK-BlbL._AC_SX466_.jpg",
      description: "Powerful performance with 16GB RAM and 512GB SSD storage.",
    },
    {
      id: 2,
      name: "Sony - WH1000XM4 Wireless Noise-Cancelling Over-the-Ear Headphones - Black",
      price: 499,
      image: "https://m.media-amazon.com/images/I/51SKmu2G9FL._AC_SL1500_.jpg",
      description: "Noise-cancelling with crystal clear audio quality.",
    },
    {
      id: 3,
      name: "SAMSUNG Galaxy Tab A9",
      price: 299,
      image: "https://m.media-amazon.com/images/I/61d46oYQgdL._AC_SL1500_.jpg",
      description: "Self-balancing with LED lights and Bluetooth speakers.",
    },
    {
      id: 4,
      name: "Beats Solo 3 Wireless On-Ear Headphones",
      price: 149,
      image: "https://m.media-amazon.com/images/I/51oZOucMJyL._AC_SL1000_.jpg",
      description: "Fast, high-quality printing for home or small office.",
    },
    {
      id: 5,
      name: "Nintendo Switch Lite",
      price: 199,
      image: "https://m.media-amazon.com/images/I/31CHVspmUeL._SY300_SX300_QL70_FMwebp_.jpg",
      description: "Ultra-wide curved display with 144Hz refresh rate.",
    }
  ]

  const handleHirePurchase = (product: Product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index)
    },
    [emblaApi],
  )

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on("select", onSelect)
    return () => {
      emblaApi.off("select", onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <section id="catalog" className="py-20 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Tech Catalog</h2>
      <p className="text-slate-600 text-center mb-12 max-w-2xl mx-auto">
        Browse our selection of the latest tech products and compare payment options to make the best decision for your
        budget.
      </p>

      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {products.map((product) => (
              <div key={product.id} className="flex-[0_0_100%] min-w-3xl sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-4">
                <ProductCard product={product} onHirePurchase={() => handleHirePurchase(product)} />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={scrollPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 bg-white/90 hover:bg-white text-slate-700 p-3 rounded-full shadow-lg border border-slate-100 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hidden sm:flex"
          aria-label="Previous product"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={scrollNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 bg-white/90 hover:bg-white text-slate-700 p-3 rounded-full shadow-lg border border-slate-100 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hidden sm:flex"
          aria-label="Next product"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-8">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === selectedIndex ? "bg-blue-600 w-6" : "bg-slate-300 hover:bg-slate-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {selectedProduct && (
        <CalculatorModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} product={selectedProduct} />
      )}
    </section>
  )
}
