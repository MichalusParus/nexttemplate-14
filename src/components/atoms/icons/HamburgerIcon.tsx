import { HTMLAttributes } from 'react'

import { cn } from '@/utils/utils'

type Props = HTMLAttributes<HTMLDivElement> & { isOpen: boolean }

export const HamburgerIcon = ({ className, isOpen, ...rest }: Props) => {
  return (
    <div className={cn('Hamburger', 'px-px', className)} {...rest}>
      <div className="relative">
        <div
          className={`absolute left-0 h-1 w-full bg-current transition-position ${
            isOpen ? 'top-4 rotate-135' : 'left-0 top-1.5'
          }`}
        />
        <div
          className={`absolute left-0 top-4 h-1 w-full bg-current transition-position ${
            isOpen ? '-left-8 opacity-0' : 'left-0'
          }`}
        />
        <div
          className={`absolute left-0 h-1 w-full bg-current transition-position ${
            isOpen ? 'top-4 rotate-[-135deg]' : 'left-0 top-6.5'
          }`}
        />
      </div>
    </div>
  )
}

HamburgerIcon.displayName = 'HamburgerIcon'
