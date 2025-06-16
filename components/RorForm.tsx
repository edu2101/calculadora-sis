"use client"

import { useState } from "react"
import { calculateRoR, validateInputs } from "@/utils/calculateRoR"
import { DollarSign, Calendar, Calculator, RotateCcw } from "lucide-react"

interface ValidationResult {
  isValid: boolean
  errors?: {
    initialAmount?: string
    finalAmount?: string
    years?: string
  }
}

interface RorFormProps {
  onCalculate: (result: { ror: number; isValid: boolean; error?: string }) => void
  onClear: () => void
}

export default function RorForm({ onCalculate, onClear }: RorFormProps) {
  const [formData, setFormData] = useState({
    initialAmount: "",
    finalAmount: "",
    years: "",
  })

  const [errors, setErrors] = useState<{
    initialAmount?: string
    finalAmount?: string
    years?: string
  }>({})

  const [isCalculating, setIsCalculating] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    // Solo permitir números y punto decimal
    const numericValue = value.replace(/[^0-9.]/g, "")

    setFormData((prev) => ({
      ...prev,
      [field]: numericValue,
    }))

    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }))
    }
  }

  const handleCalculate = async () => {
    setIsCalculating(true)

    // Simular un pequeño delay para mejor UX
    await new Promise((resolve) => setTimeout(resolve, 300))

    const initialAmount = Number.parseFloat(formData.initialAmount)
    const finalAmount = Number.parseFloat(formData.finalAmount)
    const years = Number.parseFloat(formData.years)

    // Validar inputs
    const validation = validateInputs(initialAmount, finalAmount, years) as ValidationResult

    if (!validation.isValid) {
      setErrors(validation.errors || {})
      onCalculate({
        ror: 0,
        isValid: false,
        error: "Por favor, corrige los errores en el formulario",
      })
      setIsCalculating(false)
      return
    }

    // Limpiar errores
    setErrors({})

    // Calcular RoR
    try {
      const ror = calculateRoR(initialAmount, finalAmount, years)
      onCalculate({
        ror,
        isValid: true,
      })
    } catch (error) {
      onCalculate({
        ror: 0,
        isValid: false,
        error: "Error en el cálculo. Verifica los datos ingresados.",
      })
    }

    setIsCalculating(false)
  }

  const handleClear = () => {
    setFormData({
      initialAmount: "",
      finalAmount: "",
      years: "",
    })
    setErrors({})
    onClear()
  }

  return (
    <div className="space-y-6">
      {/* Monto Inicial */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <DollarSign className="w-4 h-4" style={{ color: "#007BFF" }} />
          Monto Inicial
        </label>
        <div className="relative">
          <input
            type="text"
            value={formData.initialAmount}
            onChange={(e) => handleInputChange("initialAmount", e.target.value)}
            placeholder="Ej: 10000"
            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:border-[#007BFF] focus:ring-[#007BFF]/20 transition-all duration-200 ${
              errors.initialAmount ? "border-[#FF0000] bg-[#FF0000]/5" : "border-gray-200"
            }`}
            onFocus={(e) => {
              e.target.style.borderColor = "#007BFF"
              e.target.style.boxShadow = `0 0 0 2px ${errors.initialAmount ? "#FF0000" : "#007BFF"}33`
            }}
            onBlur={(e) => {
              e.target.style.borderColor = errors.initialAmount ? "#FF0000" : "#e5e7eb"
              e.target.style.boxShadow = "none"
            }}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <span className="text-gray-400 text-sm">USD</span>
          </div>
        </div>
        {errors.initialAmount && (
          <p className="text-sm flex items-center gap-1" style={{ color: "#FF0000" }}>
            <span className="w-1 h-1 rounded-full" style={{ backgroundColor: "#FF0000" }}></span>
            {errors.initialAmount}
          </p>
        )}
      </div>

      {/* Monto Final */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <DollarSign className="w-4 h-4" style={{ color: "#007BFF" }} />
          Monto Final
        </label>
        <div className="relative">
          <input
            type="text"
            value={formData.finalAmount}
            onChange={(e) => handleInputChange("finalAmount", e.target.value)}
            placeholder="Ej: 15000"
            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:border-[#007BFF] focus:ring-[#007BFF]/20 transition-all duration-200 ${
              errors.finalAmount ? "border-[#FF0000] bg-[#FF0000]/5" : "border-gray-200"
            }`}
            onFocus={(e) => {
              e.target.style.borderColor = "#007BFF"
              e.target.style.boxShadow = `0 0 0 2px ${errors.finalAmount ? "#FF0000" : "#007BFF"}33`
            }}
            onBlur={(e) => {
              e.target.style.borderColor = errors.finalAmount ? "#FF0000" : "#e5e7eb"
              e.target.style.boxShadow = "none"
            }}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <span className="text-gray-400 text-sm">USD</span>
          </div>
        </div>
        {errors.finalAmount && (
          <p className="text-sm flex items-center gap-1" style={{ color: "#FF0000" }}>
            <span className="w-1 h-1 rounded-full" style={{ backgroundColor: "#FF0000" }}></span>
            {errors.finalAmount}
          </p>
        )}
      </div>

      {/* Años */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Calendar className="w-4 h-4" style={{ color: "#007BFF" }} />
          Tiempo en Años
        </label>
        <div className="relative">
          <input
            type="text"
            value={formData.years}
            onChange={(e) => handleInputChange("years", e.target.value)}
            placeholder="Ej: 5"
            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:border-[#007BFF] focus:ring-[#007BFF]/20 transition-all duration-200 ${
              errors.years ? "border-[#FF0000] bg-[#FF0000]/5" : "border-gray-200"
            }`}
            onFocus={(e) => {
              e.target.style.borderColor = "#007BFF"
              e.target.style.boxShadow = `0 0 0 2px ${errors.years ? "#FF0000" : "#007BFF"}33`
            }}
            onBlur={(e) => {
              e.target.style.borderColor = errors.years ? "#FF0000" : "#e5e7eb"
              e.target.style.boxShadow = "none"
            }}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <span className="text-gray-400 text-sm">años</span>
          </div>
        </div>
        {errors.years && (
          <p className="text-sm flex items-center gap-1" style={{ color: "#FF0000" }}>
            <span className="w-1 h-1 rounded-full" style={{ backgroundColor: "#FF0000" }}></span>
            {errors.years}
          </p>
        )}
      </div>

      {/* Botones */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <button
          onClick={handleCalculate}
          disabled={isCalculating}
          className="w-full sm:flex-1 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-60"
          style={{
            backgroundColor: isCalculating ? "#990000" : "#FF0000",
          }}
          onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
            if (!isCalculating) {
              e.currentTarget.style.backgroundColor = "#990000"
            }
          }}
          onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
            if (!isCalculating) {
              e.currentTarget.style.backgroundColor = "#FF0000"
            }
          }}
        >
          {isCalculating ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Calculando...
            </>
          ) : (
            <>
              <Calculator className="w-4 h-4" />
              Calcular RoR
            </>
          )}
        </button>

        <button
          onClick={handleClear}
          className="w-full sm:flex-1 text-[#FF0000] font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
          style={{
            backgroundColor: "white",
            border: "2px solid #FF0000"
          }}
          onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.currentTarget.style.backgroundColor = "#FF0000"
            e.currentTarget.style.color = "white"
          }}
          onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.currentTarget.style.backgroundColor = "white"
            e.currentTarget.style.color = "#FF0000"
          }}
        >
          <RotateCcw className="w-4 h-4" style={{ color: "currentColor" }} />
          Limpiar
        </button>
      </div>
    </div>
  )
}
