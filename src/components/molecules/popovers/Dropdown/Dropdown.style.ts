export const dropdownClass = 'transition-dropdown'

export const openClass = {
  relative: 'visible opacity-100 -translate-y-1 z-[35]',
  left: 'absolute left-0 visible top-full opacity-100 -translate-y-1 z-[35]',
  right: 'absolute right-0 visible top-full opacity-100 -translate-y-1 z-[35]',
  top: 'absolute visible bottom-full opacity-100 left-1/2 -translate-x-1/2 translate-y-1 z-[35]',
}

export const closeClass = {
  relative: 'invisible max-h-0 -translate-y-8 opacity-0',
  left: 'absolute invisible top-0 left-0 opacity-0',
  right: 'absolute invisible top-0 right-0 opacity-0',
  top: 'absolute invisible bottom-0 opacity-0 left-1/2 -translate-x-1/2',
}
