import { forwardRef, HTMLAttributes } from 'react'

import { StyleProps } from '@/components/utils/types'
import { cn } from '@/utils/utils'

import { Ghost } from '../../loaders/Ghost'
import { ghostAligment, titleColor, titleSize } from './Title.style'

type NativeHeadingProps = Omit<HTMLAttributes<HTMLHeadingElement>, 'color' | 'className'>

export type TitleProps = NativeHeadingProps & {
  /** for passing custom tailwind classes */
  className?: string
  /** for choosing heading type */
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  /** theme color of component, none disable styles for custom styling via className */
  color?: StyleProps['color']
  /** font size of component, none disable sizes for custom styling via className */
  size?: StyleProps['size'] | 'xl' | '2xl' | '3xl'
  /** align tailwind class enum */
  align?: 'text-left' | 'text-center' | 'text-right'
  /** ghost loading state for heading */
  isLoading?: boolean
}

/** Heading component H1-6 with ghost loading. Native HTMLAttributes props supported. */
export const Title = forwardRef<HTMLHeadingElement | null, TitleProps>(
  (
    {
      className,
      variant,
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

    const Element = variant

    return (
      <Element
        className={cn('w-full font-semibold', titleColor[color], titleSize[size], align, className)}
        ref={ref}
        {...rest}
      >
        {isLoading ? (
          <Ghost className={`${ghostAligment[ghostAlign]} w-40`} size={size} />
        ) : (
          children
        )}
      </Element>
    )
  },
)

Title.displayName = 'Title'
