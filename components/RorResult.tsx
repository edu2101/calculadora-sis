"use client"

import { TrendingUp, TrendingDown, AlertCircle, BarChart3 } from "lucide-react"

interface RorResultProps {
  result: {
    ror: number
    isValid: boolean
    error?: string
  } | null
}

export default function RorResult({ result }: RorResultProps) {
  if (!result) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center py-12">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: "#f8f9fa", borderColor: "#007BFF", border: "2px solid" }}
          >
            <BarChart3 className="w-8 h-8" style={{ color: "#007BFF" }} />
          </div>
          <h3 className="text-xl font-semibold mb-2" style={{ color: "#001F3F" }}>
            Resultado del Cálculo
          </h3>
          <p className="text-gray-500">Ingresa los datos y presiona "Calcular RoR" para ver el resultado</p>
        </div>
      </div>
    )
  }

  if (!result.isValid) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 border-2" style={{ borderColor: "#FF0000" }}>
        <div className="text-center py-8">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: "#FF0000" }}
          >
            <AlertCircle className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-2" style={{ color: "#990000" }}>
            Error en el Cálculo
          </h3>
          <p style={{ color: "#FF0000" }}>{result.error || "Verifica los datos ingresados"}</p>
        </div>
      </div>
    )
  }

  const rorPercentage = result.ror * 100
  const isPositive = rorPercentage >= 0
  const interpretation = getInterpretation(rorPercentage)

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="text-center mb-6">
        <div
          className="w-24 h-24 sm:w-32 sm:h-32 rounded-full flex items-center justify-center mx-auto mb-4 relative"
          style={{
            background: `conic-gradient(${isPositive ? "#007BFF" : "#FF0000"} ${Math.min(Math.abs(rorPercentage) * 3.6, 360)}deg, #f1f5f9 0deg)`,
          }}
        >
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-full flex items-center justify-center">
            {isPositive ? (
              <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: "#007BFF" }} />
            ) : (
              <TrendingDown className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: "#FF0000" }} />
            )}
          </div>
          {/* Indicador de porcentaje en el borde */}
          <div
            className="absolute text-xs font-bold px-2 py-1 rounded-full bg-white shadow-md"
            style={{
              color: isPositive ? "#007BFF" : "#FF0000",
              top: "10px",
              right: "10px",
            }}
          >
            {rorPercentage >= 0 ? "+" : ""}
            {rorPercentage.toFixed(1)}%
          </div>
        </div>

        <h3 className="text-xl sm:text-2xl font-semibold mb-2" style={{ color: "#001F3F" }}>
          Tasa de Rendimiento
        </h3>

        {/* Barra de progreso horizontal */}
        <div className="w-full bg-gray-200 rounded-full h-3 sm:h-4 mb-4">
          <div
            className="h-3 sm:h-4 rounded-full transition-all duration-1000 ease-out relative"
            style={{
              width: `${Math.min(Math.abs(rorPercentage) * 2, 100)}%`,
              backgroundColor: isPositive ? "#007BFF" : "#FF0000",
            }}
          >
            <div className="absolute right-2 top-0 h-full flex items-center">
              <span className="text-white text-xs font-bold">{Math.abs(rorPercentage).toFixed(1)}%</span>
            </div>
          </div>
        </div>

        <p className="text-gray-600 text-sm sm:text-base">Rendimiento anual promedio</p>
      </div>

      {/* Interpretación */}
      <div
        className="rounded-xl p-3 sm:p-4 border-2"
        style={{
          backgroundColor: interpretation.bgColor,
          borderColor: interpretation.borderColor,
          color: interpretation.textColor,
        }}
      >
        <h4 className="font-semibold mb-2 text-sm sm:text-base">{interpretation.title}</h4>
        <p className="text-xs sm:text-sm">{interpretation.description}</p>
      </div>

      {/* Métricas adicionales */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-4 sm:mt-6">
        <div
          className="rounded-lg p-3 sm:p-4 text-center border-2"
          style={{ backgroundColor: "#f8f9fa", borderColor: "#007BFF" }}
        >
          <div className="text-xl sm:text-2xl font-bold" style={{ color: "#001F3F" }}>
            {Math.abs(rorPercentage).toFixed(1)}%
          </div>
          <div className="text-xs sm:text-sm text-gray-600">Rendimiento Absoluto</div>
        </div>

        <div
          className="rounded-lg p-3 sm:p-4 text-center border-2"
          style={{ backgroundColor: "#f8f9fa", borderColor: "#007BFF" }}
        >
          <div className="text-xl sm:text-2xl font-bold" style={{ color: "#001F3F" }}>
            {isPositive ? "Ganancia" : "Pérdida"}
          </div>
          <div className="text-xs sm:text-sm text-gray-600">Resultado de Inversión</div>
        </div>
      </div>
    </div>
  )
}

function getInterpretation(rorPercentage: number) {
  if (rorPercentage >= 15) {
    return {
      type: "excellent",
      title: "Excelente Rendimiento",
      description: "Tu inversión ha generado un rendimiento excepcional. ¡Felicitaciones!",
      bgColor: "#007BFF",
      textColor: "white",
      borderColor: "#0056D2",
    }
  } else if (rorPercentage >= 8) {
    return {
      type: "good",
      title: "Buen Rendimiento",
      description: "Tu inversión ha tenido un rendimiento sólido y por encima del promedio del mercado.",
      bgColor: "#007BFF",
      textColor: "white",
      borderColor: "#0056D2",
    }
  } else if (rorPercentage >= 0) {
    return {
      type: "moderate",
      title: "Rendimiento Moderado",
      description: "Tu inversión ha generado ganancias, aunque el rendimiento es conservador.",
      bgColor: "#f8f9fa",
      textColor: "#001F3F",
      borderColor: "#007BFF",
    }
  } else {
    return {
      type: "poor",
      title: "Rendimiento Negativo",
      description: "Tu inversión ha tenido pérdidas. Considera revisar tu estrategia de inversión.",
      bgColor: "#FF0000",
      textColor: "white",
      borderColor: "#990000",
    }
  }
}
