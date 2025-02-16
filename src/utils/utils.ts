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

// eslint-disable-next-line
export const debounce = <F extends (...args: any[]) => void>(
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
