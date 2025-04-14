import Link from "next/link"
import { FileText, ExternalLink } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-200 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">Educational Resources</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-medium mb-2">Simple Interest</h3>
                <p className="text-slate-400 mb-2">
                  A way to calculate the cost of borrowing money using a fixed rate over time.
                </p>
                <div className="bg-slate-800 p-4 rounded-lg">
                  <p className="font-mono text-green-400">Interest = Principal × Rate × Time</p>
                  <p className="text-slate-500 text-sm mt-2">
                    Where Principal is the amount borrowed, Rate is the interest rate (as a decimal), and Time is the
                    period in years.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-2">Hire Purchase</h3>
                <p className="text-slate-400 mb-2">
                  A system where you pay a deposit, then installments over time — including interest — to fully own an
                  item.
                </p>
                <div className="bg-slate-800 p-4 rounded-lg">
                  <p className="font-mono text-green-400">Total HP Cost = Deposit + Principal + Interest</p>
                  <p className="text-slate-500 text-sm mt-2">
                    The item legally belongs to you only after the final payment is made.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">Additional Information</h2>
            <div className="bg-slate-800 p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-4">Key Points to Remember</h3>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 font-bold">•</span>
                  <span>Hire purchase agreements often include additional fees and charges.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 font-bold">•</span>
                  <span>Missing payments can affect your credit score and may result in repossession.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 font-bold">•</span>
                  <span>Always read the terms and conditions carefully before signing.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 font-bold">•</span>
                  <span>Compare different financing options to find the best deal.</span>
                </li>
              </ul>

              <div className="mt-6 flex items-center gap-2">
                <FileText className="h-5 w-5 text-purple-400" />
                <Link
                  href="https://hire-purchase.vercel.app/"
                  className="text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1"
                target="_blank"
                >
                  Sample Hire Purchase Agreement
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
            </div>

            <div className="mt-8 text-center text-slate-400 text-sm">
              <p>Created for educational purposes only. Not financial advice.</p>
              <p className="mt-2">© {new Date().getFullYear()} Should I Buy It? Student Project</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
