import { cn } from '@/utils/utils'

type Props = {
  className?: string
  isOpen: boolean
}

export default function Hamburger({ className = '', isOpen }: Props) {
  return (
    <div className={cn('Hamburger', 'px-1', className)}>
      <div className="relative">
        <div
          className={`absolute left-0 h-1 w-full bg-current transition-dropdown ${
            isOpen ? 'top-[1.125rem] rotate-[135deg]' : 'left-0 top-1.5'
          }`}
        />
        <div
          className={`absolute left-0 top-4 h-1 w-full bg-current transition-dropdown ${
            isOpen ? '-left-8 opacity-0' : 'left-0'
          }`}
        />
        <div
          className={`absolute left-0 h-1 w-full bg-current transition-dropdown ${
            isOpen ? 'top-[1.125rem] rotate-[-135deg]' : 'left-0 top-[1.625rem]'
          }`}
        />
      </div>
    </div>
  )
}

Hamburger.displayName = 'Hamburger'
