import { cn } from '@/utils/utils'

type Props = {
  className?: string
  isOpen: boolean
}

export function HamburgerIcon({ className, isOpen }: Props) {
  return (
    <div className={cn('Hamburger', 'px-px', className)}>
      <div className="relative">
        <div
          className={`transition-position absolute left-0 h-1 w-full bg-current ${
            isOpen ? 'top-[1rem] rotate-[135deg]' : 'left-0 top-1.5'
          }`}
        />
        <div
          className={`transition-position absolute left-0 top-4 h-1 w-full bg-current ${
            isOpen ? '-left-8 opacity-0' : 'left-0'
          }`}
        />
        <div
          className={`transition-position absolute left-0 h-1 w-full bg-current ${
            isOpen ? 'top-[1rem] rotate-[-135deg]' : 'left-0 top-[1.625rem]'
          }`}
        />
      </div>
    </div>
  )
}

HamburgerIcon.displayName = 'HamburgerIcon'
