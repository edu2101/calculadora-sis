"use client"

import { useState } from "react"
import RorForm from "@/components/RorForm"
import RorResult from "@/components/RorResult"
import { Calculator, TrendingUp } from "lucide-react"

export default function App() {
  const [result, setResult] = useState<{
    ror: number
    isValid: boolean
    error?: string
  } | null>(null)

  const handleCalculationResult = (calculationResult: {
    ror: number
    isValid: boolean
    error?: string
  }) => {
    setResult(calculationResult)
  }

  const handleClearResult = () => {
    setResult(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#001F3F]/5 to-[#001F3F]/10 py-4 sm:py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 rounded-full" style={{ backgroundColor: "#007BFF" }}>
              <Calculator className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold" style={{ color: "#001F3F" }}>
              Calculadora de Tasa de Rendimiento
            </h1>
          </div>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto px-4">
            Calcula la tasa de rendimiento anual de tus inversiones de manera rápida y precisa
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="w-6 h-6" style={{ color: "#007BFF" }} />
                <h2 className="text-2xl font-semibold" style={{ color: "#001F3F" }}>
                  Datos de Inversión
                </h2>
              </div>
              <RorForm onCalculate={handleCalculationResult} onClear={handleClearResult} />
            </div>

            {/* Formula Info */}
            <div className="rounded-xl p-6 border-2" style={{ backgroundColor: "#007BFF", borderColor: "#0056D2" }}>
              <h3 className="text-lg font-semibold text-white mb-3">Fórmula Utilizada</h3>
              <div className="bg-white rounded-lg p-4 border" style={{ borderColor: "#0056D2" }}>
                <code className="font-mono text-sm" style={{ color: "#001F3F" }}>
                  RoR = ((Monto Final / Monto Inicial)^(1/n)) - 1
                </code>
              </div>
              <p className="text-white text-sm mt-2">
                Donde <strong>n</strong> es el número de años de la inversión
              </p>
            </div>
          </div>

          {/* Result Section */}
          <div className="space-y-6">
            <RorResult result={result} />

            {/* Future Feature Placeholder */}
            <div className="bg-gray-50 rounded-xl p-6 border-2 border-dashed" style={{ borderColor: "#007BFF" }}>
              <h3 className="text-lg font-medium mb-2" style={{ color: "#001F3F" }}>
                Próximamente: Historial de Cálculos
              </h3>
              <p className="text-gray-500 text-sm">
                Guarda y revisa tus cálculos anteriores para un mejor seguimiento de tus inversiones.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>Calculadora de Tasa de Rendimiento - Herramienta financiera profesional</p>
        </div>
      </div>
    </div>
  )
}
