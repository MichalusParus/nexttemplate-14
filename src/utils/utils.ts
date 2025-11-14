import { ClassValue, clsx } from 'clsx'
import { isValid, parseISO } from 'date-fns'
import { isDate, isNumber, isString } from 'lodash'
import { twMerge } from 'tailwind-merge'

export const slugify = (title: string) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const debounce = <F extends (...args: never[]) => unknown>(
  fn: F,
  delay: number,
): ((...args: Parameters<F>) => void) => {
  let timer: ReturnType<typeof setTimeout> | null

  return (...args: Parameters<F>) => {
    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}

export const normalizeDate = (value: unknown): string | number | boolean | null => {
  if (isDate(value)) {
    if (isValid(value)) return value.getTime()
    return null
  }
  if (isString(value)) {
    const parsed = parseISO(value)
    if (isValid(parsed)) return parsed.getTime()
  }
  return value as string | number | boolean | null
}

export const normalizeDateValue = (value?: Date | string | number | null): Date | undefined => {
  if (!value) return undefined
  if (isDate(value) && isValid(value)) return value
  if (isString(value)) {
    const parsed = parseISO(value)
    if (isValid(parsed)) return parsed
    return undefined
  }
  if (isNumber(value)) return new Date(value)
  return value
}
