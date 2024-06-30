import { ClassValue, clsx } from 'clsx'
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

export const filterOutKeys = (object: object, keys: string[]) => {
  const newObject = Object.fromEntries(
    Object.entries(object).filter(([key]) => !keys.includes(key)),
  )
  return newObject
}
