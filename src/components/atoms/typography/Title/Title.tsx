import { forwardRef, HTMLAttributes } from 'react'

import Ghost from '../../loaders/Ghost'
import { ghostAligment, titleColor, titleSize } from './Title.style'

export type TitleProps = Omit<HTMLAttributes<HTMLHeadingElement>, 'color' | 'className'> & {
  /** for passing custom tailwind classes */
  className?: string
  /** for choosing heading type */
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  /** theme color of component, none disable styles for custom styling via className */
  color?: 'primary' | 'secondary' | 'terciary' | 'none'
  /** font size of component, none disable sizes for custom styling via className */
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'none'
  /** align tailwind class enum */
  align?: 'text-left' | 'text-center' | 'text-right'
  /** ghost loading state for heading */
  isLoading?: boolean
}

/** Heading component H1-6 with ghost loading. Default HTMLAttributes props supported. */
export const Title = forwardRef<HTMLHeadingElement, TitleProps>(
  (
    {
      className = '',
      variant = 'h2',
      color = 'none',
      size = 'lg',
      align = 'text-left',
      isLoading,
      children,
      ...rest
    },
    ref,
  ) => {
    const ghostAlign = align?.split('-')[1] as 'left' | 'center' | 'right'

    switch (variant) {
      case 'h1':
        return (
          <h1
            className={`${className} ${titleColor[color]} ${titleSize[size]} ${align}`}
            ref={ref}
            {...rest}
          >
            {isLoading ? (
              <Ghost className={`${ghostAligment[ghostAlign]} w-40`} size={size} />
            ) : (
              children
            )}
          </h1>
        )
      case 'h2':
        return (
          <h2
            className={`${className} ${titleColor[color]} ${titleSize[size]} ${align}`}
            ref={ref}
            {...rest}
          >
            {isLoading ? (
              <Ghost className={`${ghostAligment[ghostAlign]} w-40`} size={size} />
            ) : (
              children
            )}
          </h2>
        )
      case 'h3':
        return (
          <h3
            className={`${className} ${titleColor[color]} ${titleSize[size]} ${align}`}
            ref={ref}
            {...rest}
          >
            {isLoading ? (
              <Ghost className={`${ghostAligment[ghostAlign]} w-40`} size={size} />
            ) : (
              children
            )}
          </h3>
        )
      case 'h4':
        return (
          <h4
            className={`${className} ${titleColor[color]} ${titleSize[size]} ${align}`}
            ref={ref}
            {...rest}
          >
            {isLoading ? (
              <Ghost className={`${ghostAligment[ghostAlign]} w-40`} size={size} />
            ) : (
              children
            )}
          </h4>
        )
      case 'h5':
        return (
          <h5
            className={`${className} ${titleColor[color]} ${titleSize[size]} ${align}`}
            ref={ref}
            {...rest}
          >
            {isLoading ? (
              <Ghost className={`${ghostAligment[ghostAlign]} w-40`} size={size} />
            ) : (
              children
            )}
          </h5>
        )
      case 'h6':
        return (
          <h6
            className={`${className} ${titleColor[color]} ${titleSize[size]} ${align}`}
            ref={ref}
            {...rest}
          >
            {isLoading ? (
              <Ghost className={`${ghostAligment[ghostAlign]} w-40`} size={size} />
            ) : (
              children
            )}
          </h6>
        )
      default:
        return null
    }
  },
)

Title.displayName = 'Title'
