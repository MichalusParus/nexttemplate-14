import { isValid, startOfDay } from 'date-fns'

type DatePartType = 'day' | 'month' | 'year'

export type DateFormat = {
  order: DatePartType[]
  separator: string
  placeholder: string
}

export const getDateFormat = (locale?: Intl.LocalesArgument): DateFormat => {
  const formatter = new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
  const parts = formatter.formatToParts(new Date(2000, 0, 15))
  const order = parts
    .filter((p): p is Intl.DateTimeFormatPart & { type: DatePartType } =>
      ['day', 'month', 'year'].includes(p.type),
    )
    .map(p => p.type)
  const separator = parts.find(p => p.type === 'literal')?.value?.trim() || '/'

  const labels: Record<DatePartType, string> = { day: 'DD', month: 'MM', year: 'YYYY' }
  const placeholder = order.map(p => labels[p]).join(separator)

  return { order, separator, placeholder }
}

export const applyMask = (digits: string, separator: string): string => {
  let result = ''
  if (digits.length > 0) result += digits.slice(0, 2)
  if (digits.length > 2) result += separator + digits.slice(2, 4)
  if (digits.length > 4) result += separator + digits.slice(4, 8)
  return result
}

export const stripToDigits = (value: string): string => {
  return value.replace(/\D/g, '').slice(0, 8)
}

export const parseDigits = (digits: string, order: DatePartType[]): Date | null => {
  if (digits.length !== 8) return null

  const segments: Record<string, number> = {}
  let offset = 0
  for (const part of order) {
    const len = part === 'year' ? 4 : 2
    segments[part] = parseInt(digits.slice(offset, offset + len), 10)
    offset += len
  }

  const { day, month, year } = segments
  if (month < 1 || month > 12) return null
  if (day < 1 || day > 31) return null
  if (year < 1 || year > 9999) return null

  const date = new Date(year, month - 1, day)
  if (!isValid(date)) return null
  if (date.getDate() !== day || date.getMonth() !== month - 1) return null

  return startOfDay(date)
}

export const clampDate = (date: Date, min?: Date, max?: Date): Date => {
  const normalized = startOfDay(date)
  if (min && normalized < startOfDay(min)) return startOfDay(min)
  if (max && normalized > startOfDay(max)) return startOfDay(max)
  return normalized
}

export const formatDateForInput = (date: Date, locale?: Intl.LocalesArgument): string => {
  const formatter = new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
  const parts = formatter.formatToParts(date)
  const separator = parts.find(p => p.type === 'literal')?.value?.trim() || '/'
  const values = parts
    .filter(p => ['day', 'month', 'year'].includes(p.type))
    .map(p => p.value)
  return values.join(separator)
}
