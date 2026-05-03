import type { CSSProperties } from 'react'

/** Deterministic string-to-hue mapping (djb2 hash -> 0-360 oklch hue angle). */
export const stringToHue = (str: string): number => {
  let hash = 5381
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i)
  }
  return ((hash % 360) + 360) % 360
}

type Variant = 'text' | 'outlined' | 'contained'

export const getHueStyle = (variant: Variant, hue: number): CSSProperties => {
  switch (variant) {
    case 'contained':
      return {
        '--av-bg': `oklch(55% 0.15 ${hue})`,
        '--av-bg-dark': `oklch(45% 0.13 ${hue})`,
        '--av-border': `oklch(45% 0.15 ${hue})`,
        '--av-border-dark': `oklch(35% 0.13 ${hue})`,
        '--av-text': `oklch(97% 0.02 ${hue})`,
        '--av-text-dark': `oklch(95% 0.02 ${hue})`,
      } as CSSProperties
    case 'outlined':
      return {
        '--av-border': `oklch(50% 0.15 ${hue})`,
        '--av-border-dark': `oklch(65% 0.15 ${hue})`,
        '--av-text': `oklch(40% 0.15 ${hue})`,
        '--av-text-dark': `oklch(80% 0.12 ${hue})`,
      } as CSSProperties
    case 'text':
      return {
        '--av-text': `oklch(40% 0.15 ${hue})`,
        '--av-text-dark': `oklch(80% 0.12 ${hue})`,
      } as CSSProperties
  }
}
