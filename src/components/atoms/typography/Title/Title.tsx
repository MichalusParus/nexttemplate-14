import { forwardRef, HTMLAttributes } from 'react'

import { StyleProps } from '@/components/types'
import { cn } from '@/utils/utils'

import Ghost from '../../loaders/Ghost'
import { ghostAligment, titleColor, titleSize } from './Title.style'

type NativeHeadingProps = Omit<HTMLAttributes<HTMLHeadingElement>, 'color' | 'className'>

export type TitleProps = NativeHeadingProps & {
  /** for passing custom tailwind classes */
  className?: string
  /** for choosing heading type */
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  /** theme color of component, none disable styles for custom styling via className */
  color?: StyleProps['color']
  /** font size of component, none disable sizes for custom styling via className */
  size?: StyleProps['size'] | 'xl' | '2xl' | '3xl'
  /** align tailwind class enum */
  align?: 'text-left' | 'text-center' | 'text-right'
  /** ghost loading state for heading */
  isLoading?: boolean
}

/** Heading component H1-6 with ghost loading. Default HTMLAttributes props supported. */
export const Title = forwardRef<HTMLHeadingElement, TitleProps>(
  (
    {
      className,
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
            className={cn(titleColor[color], titleSize[size], align, className)}
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
            className={cn(titleColor[color], titleSize[size], align, className)}
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
            className={cn(titleColor[color], titleSize[size], align, className)}
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
            className={cn(titleColor[color], titleSize[size], align, className)}
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
            className={cn(titleColor[color], titleSize[size], align, className)}
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
            className={cn(titleColor[color], titleSize[size], align, className)}
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
