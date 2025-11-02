import { PropsWithChildren, ReactNode } from 'react'

import { buttonIconSize } from '@/components/atoms/common/Button/Button.style'
import { Ghost } from '@/components/atoms/loaders/Ghost'
import { StyleProps } from '@/components/utils/types'
import { cn } from '@/utils/utils'

import { liIconClass, listColor, listSize } from './Li.style'

export type LiProps = Omit<StyleProps, 'variant'> & {
  /** for passing custom tailwind classes */
  className?: string
  /** optional icon for li */
  icon?: ReactNode
  /** ghost loading state for list as tailwind class */
  isLoading?: boolean
}

export const Li = ({
  className = '',
  color = 'none',
  size = 'md',
  icon,
  isLoading,
  children,
}: PropsWithChildren<LiProps>) => {
  return (
    <li
      className={cn(
        'Li',
        liIconClass,
        listColor[color],
        listSize[size],
        buttonIconSize[size],
        className,
      )}
    >
      {icon}
      {isLoading ? <Ghost className="float-left w-2/3" size={size} /> : children}
    </li>
  )
}

Li.displayName = 'Li'
