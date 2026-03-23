export const getSeparators = (locale: Intl.LocalesArgument, options?: Intl.NumberFormatOptions) => {
  const formatter = new Intl.NumberFormat(locale, options)
  const parts = formatter.formatToParts(12345.67)
  const groupSeparator = parts.find(part => part.type === 'group')?.value || ','
  const decimalSeparator = parts.find(part => part.type === 'decimal')?.value || '.'
  return { groupSeparator, decimalSeparator }
}

export const formatValue = (
  value: number | null,
  decimalPlaces?: number,
  formatOptions?: Intl.NumberFormatOptions,
  locale?: Intl.LocalesArgument,
) => {
  if (value === null) return ''
  const formatedValue = new Intl.NumberFormat(locale, {
    ...formatOptions,
    maximumFractionDigits: decimalPlaces,
  }).format(value)
  return formatedValue
}

export const validateValue = (
  value: string,
  allowNegative?: boolean,
  min?: number,
  max?: number,
) => {
  let numberValue = Number(value)
  if (isNaN(numberValue)) return null
  if (!allowNegative && numberValue < 0) {
    numberValue = Math.abs(numberValue)
  }
  if (min !== undefined) {
    numberValue = Math.max(numberValue, min)
  }
  if (max !== undefined) {
    numberValue = Math.min(numberValue, max)
  }
  return numberValue
}

export const cleanValue = (
  value: string,
  decimalPlaces: number,
  allowNegative: boolean,
  groupSeparator: string,
  decimalSeparator: string,
) => {
  let cleanValue = value
  if ([' ', '\u00A0', '\u202F'].includes(groupSeparator)) {
    cleanValue = value.replace(/[\s\u00A0\u202F]/g, '')
  } else {
    const escapedGroupSeparator = groupSeparator.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
    cleanValue = cleanValue.replace(new RegExp(escapedGroupSeparator, 'g'), '')
  }
  const escapedDecimalSeparator = decimalSeparator.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
  cleanValue = cleanValue.replace(new RegExp(escapedDecimalSeparator, 'g'), '.')
  const negativePattern = allowNegative ? '-?' : ''
  const decimalPattern = decimalPlaces > 0 ? `(\\.\\d{0,${decimalPlaces}})?` : ''
  const regex = new RegExp(`^${negativePattern}(\\d*${decimalPattern}|\\.)?$`)
  if (!regex.test(cleanValue)) return null
  return cleanValue
}
