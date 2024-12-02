import { cn } from '@/utils/utils'

export const tooltipClass = cn(
  'z-modal absolute rounded-md bg-dark-500 px-smPX py-smPY text-sm text-dark-100 shadow-paper transition-opacity',
)

const topAfter = cn(
  'after:absolute after:left-1/2 after:top-full after:-translate-x-1/2 after:border-8 after:border-b-transparent after:border-l-transparent after:border-r-transparent after:border-t-dark-500 after:content-[""]',
)
const rightAfter = cn(
  'after:absolute after:right-full after:top-1/2 after:-translate-y-1/2 after:border-8 after:border-b-transparent after:border-l-transparent after:border-r-dark-500 after:border-t-transparent after:content-[""]',
)
const bottomAfter = cn(
  'after:absolute after:bottom-full after:left-1/2 after:-translate-x-1/2 after:border-8 after:border-b-dark-500 after:border-l-transparent after:border-r-transparent after:border-t-transparent after:content-[""]',
)
const leftAfter = cn(
  'after:absolute after:left-full after:top-1/2 after:-translate-y-1/2 after:border-8 after:border-b-transparent after:border-l-dark-500 after:border-r-transparent after:border-t-transparent after:content-[""]',
)

export const tooltipPointer = {
  top: topAfter,
  'top-start': topAfter,
  'top-end': topAfter,
  right: rightAfter,
  'right-start': rightAfter,
  'right-end': rightAfter,
  bottom: bottomAfter,
  'bottom-start': bottomAfter,
  'bottom-end': bottomAfter,
  left: leftAfter,
  'left-start': leftAfter,
  'left-end': leftAfter,
  auto: '',
  'auto-start': '',
  'auto-end': '',
}

export const tooltipVisibility = cn('invisible opacity-0')
