export const ghostStyle =
  'relative block overflow-hidden rounded-lg bg-dark-950 bg-opacity-20 ' +
  'after:content=[""] after:animate-ghostAnim after:bg-gradient-to-r after:from-transparent after:via-dark-900 after:opacity-10 after:-skew-x-12 after:to-transparent ' +
  'after:absolute after:bottom-0 after:left-0 after:right-0 after:top-0 after:translate-x-[-100%]'

export const ghostSize = {
  sm: 'mx-smPX my-[3px] h-sm',
  md: 'mx-mdPX my-1 h-md',
  lg: 'mx-lgPX my-[5px] h-lg',
  xl: 'mx-lgPX my-1 h-xl',
  '2xl': 'mx-lgPX my-1 h-2xl',
  '3xl': 'mx-lgPX my-[3px] h-3xl',
  none: '',
}
