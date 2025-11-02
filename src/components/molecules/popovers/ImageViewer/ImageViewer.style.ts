import { cn } from '@/utils/utils'

export const viewerDialogClass = cn(
  'fixed left-0 top-0 z-modal block h-[100vh] w-[100vw] scale-90 opacity-0 transition-position',
)

export const viewerInnerWrapClass = cn(
  'flex h-full min-w-full flex-col items-center justify-center bg-dark-800 from-dark-800',
)

export const viewerButtonClass = cn(
  'w-full cursor-zoom-in overflow-hidden rounded-md border-none focus-visible:outline-1 focus-visible:outline-dark-950',
)

export const closeButtonClass = cn(
  'fixed right-0 top-0 z-modal border-0 bg-dark-950/25 transition-colors',
)
