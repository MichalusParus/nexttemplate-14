import { PropsWithChildren, ReactNode } from 'react'

import { Ghost, GhostProps } from '@/components/atoms/loaders/Ghost'
import { childrenIconSize, textSize } from '@/components/utils/common.style'
import { StyleProps } from '@/components/utils/types'
import { cn } from '@/utils/utils'

import { liIconClass, listColor } from './Li.style'

export type LiProps = Omit<StyleProps, 'variant'> & {
  /** for passing custom tailwind classes */
  className?: string
  /** optional icon for li */
  icon?: ReactNode
  /** ghost loading state for list as tailwind class */
  isLoading?: boolean
  /** optional ghost props for loading skeleton customization */
  ghostProps?: Partial<GhostProps>
}

export const Li = ({
  className = '',
  color = 'none',
  size = 'md',
  icon,
  isLoading,
  ghostProps = {},
  children,
}: PropsWithChildren<LiProps>) => {
  const { className: ghostClassName, ...restGhostProps } = ghostProps
  return (
    <li
      className={cn(
        'Li',
        liIconClass,
        listColor[color],
        textSize[size],
        childrenIconSize[size],
        className,
      )}
    >
      {icon}
      {isLoading ? <Ghost className={cn('float-left w-2/3', ghostClassName)} size={size} {...restGhostProps} /> : children}
    </li>
  )
}

Li.displayName = 'Li'
