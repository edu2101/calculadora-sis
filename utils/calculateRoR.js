/**
 * Calcula la Tasa de Rendimiento (Rate of Return) anual
 * Fórmula: RoR = ((Monto Final / Monto Inicial)^(1/n)) - 1
 *
 * @param {number} initialAmount - Monto inicial de la inversión
 * @param {number} finalAmount - Monto final de la inversión
 * @param {number} years - Número de años de la inversión
 * @returns {number} Tasa de rendimiento como decimal (ej: 0.10 = 10%)
 */
export function calculateRoR(initialAmount, finalAmount, years) {
  // Validar que los parámetros sean números válidos
  if (typeof initialAmount !== "number" || typeof finalAmount !== "number" || typeof years !== "number") {
    throw new Error("Todos los parámetros deben ser números válidos")
  }

  // Validar que no sean valores negativos o cero donde no corresponde
  if (initialAmount <= 0) {
    throw new Error("El monto inicial debe ser mayor a cero")
  }

  if (finalAmount <= 0) {
    throw new Error("El monto final debe ser mayor a cero")
  }

  if (years <= 0) {
    throw new Error("El número de años debe ser mayor a cero")
  }

  // Calcular la tasa de rendimiento
  const ratio = finalAmount / initialAmount
  const ror = Math.pow(ratio, 1 / years) - 1

  // Validar que el resultado sea un número válido
  if (!isFinite(ror)) {
    throw new Error("Error en el cálculo: resultado no válido")
  }

  return ror
}

/**
 * Valida los inputs del formulario
 *
 * @param {number} initialAmount - Monto inicial
 * @param {number} finalAmount - Monto final
 * @param {number} years - Años
 * @returns {object} Objeto con isValid y errors
 */
export function validateInputs(initialAmount, finalAmount, years) {
  const errors = {}
  let isValid = true

  // Validar monto inicial
  if (isNaN(initialAmount) || initialAmount === "") {
    errors.initialAmount = "Ingresa un monto inicial válido"
    isValid = false
  } else if (initialAmount <= 0) {
    errors.initialAmount = "El monto inicial debe ser mayor a cero"
    isValid = false
  } else if (initialAmount > 1000000000) {
    errors.initialAmount = "El monto inicial es demasiado grande"
    isValid = false
  }

  // Validar monto final
  if (isNaN(finalAmount) || finalAmount === "") {
    errors.finalAmount = "Ingresa un monto final válido"
    isValid = false
  } else if (finalAmount <= 0) {
    errors.finalAmount = "El monto final debe ser mayor a cero"
    isValid = false
  } else if (finalAmount > 1000000000) {
    errors.finalAmount = "El monto final es demasiado grande"
    isValid = false
  }

  // Validar años
  if (isNaN(years) || years === "") {
    errors.years = "Ingresa un número de años válido"
    isValid = false
  } else if (years <= 0) {
    errors.years = "El número de años debe ser mayor a cero"
    isValid = false
  } else if (years > 100) {
    errors.years = "El número de años no puede ser mayor a 100"
    isValid = false
  }

  // Validación adicional: monto final vs inicial
  if (isValid && Math.abs(finalAmount - initialAmount) < 0.01) {
    errors.finalAmount = "El monto final debe ser diferente al inicial"
    isValid = false
  }

  return {
    isValid,
    errors: isValid ? null : errors,
  }
}

/**
 * Formatea un número como moneda
 *
 * @param {number} amount - Cantidad a formatear
 * @param {string} currency - Código de moneda (default: 'USD')
 * @returns {string} Cantidad formateada
 */
export function formatCurrency(amount, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

/**
 * Formatea un porcentaje
 *
 * @param {number} decimal - Número decimal (ej: 0.10)
 * @param {number} decimals - Número de decimales (default: 2)
 * @returns {string} Porcentaje formateado
 */
export function formatPercentage(decimal, decimals = 2) {
  return `${(decimal * 100).toFixed(decimals)}%`
}

/**
 * Calcula el valor futuro de una inversión
 *
 * @param {number} presentValue - Valor presente
 * @param {number} rate - Tasa de rendimiento anual (como decimal)
 * @param {number} years - Número de años
 * @returns {number} Valor futuro
 */
export function calculateFutureValue(presentValue, rate, years) {
  return presentValue * Math.pow(1 + rate, years)
}

/**
 * Calcula el valor presente de una inversión futura
 *
 * @param {number} futureValue - Valor futuro
 * @param {number} rate - Tasa de descuento anual (como decimal)
 * @param {number} years - Número de años
 * @returns {number} Valor presente
 */
export function calculatePresentValue(futureValue, rate, years) {
  return futureValue / Math.pow(1 + rate, years)
}
