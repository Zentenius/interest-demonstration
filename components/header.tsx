"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

export default function Header() {
  const scrollToCatalog = () => {
    const catalogSection = document.getElementById("catalog")
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#0a1128] opacity-5"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 max-w-4xl mx-auto"
      >
        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-300 mb-6">
          Should I Buy It?
        </h1>
        <p className="text-xl md:text-2xl text-slate-700 mb-12 max-w-2xl mx-auto">
          Helping you make smarter buying decisions with Simple Interest & Hire Purchase.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToCatalog}
          className="bg-gradient-to-r from-blue-500 to-blue-300 text-white font-medium py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
        >
          Explore Catalog
          <ChevronDown className="inline ml-2 group-hover:translate-y-1 transition-transform" />
        </motion.button>
      </motion.div>

      <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
        <ChevronDown className="h-8 w-8 text-slate-400" />
      </div>
    </section>
  )
}
