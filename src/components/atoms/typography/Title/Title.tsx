import { forwardRef, HTMLAttributes } from 'react'

import { textSize } from '@/components/utils/common.style'
import { StyleProps } from '@/components/utils/types'
import { cn } from '@/utils/utils'

import { Ghost, GhostProps } from '../../loaders/Ghost'
import { ghostAligment, titleColor } from './Title.style'

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
  /** optional ghost props for loading skeleton customization */
  ghostProps?: Partial<GhostProps>
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
      ghostProps = {},
      children,
      ...rest
    },
    ref,
  ) => {
    const { className: ghostClassName, ...restGhostProps } = ghostProps

    const Element = variant

    return (
      <Element
        className={cn('w-full font-semibold', titleColor[color], textSize[size], align, className)}
        ref={ref}
        {...rest}
      >
        {isLoading ? (
          <Ghost className={cn(ghostAligment[align], 'w-2/3 max-w-40', ghostClassName)} size={size} {...restGhostProps} />
        ) : (
          children
        )}
      </Element>
    )
  },
)

Title.displayName = 'Title'
