import P from '@/components/atoms/typography/P'
import { cn } from '@/utils/utils'

import { containerSize, mainXPadding } from '../Header/Header.style'
import { footerClass } from './Footer.style'

export type FooterProps = {
  /** for passing custom tailwind classes */
  className?: string
}

/** Footer component, semantic with layout container and basic styling. */
export const Footer = ({ className = '' }: FooterProps) => {
  return (
    <footer className={cn('Footer', footerClass, mainXPadding, className)} data-testid="Footer">
      <div className={cn('FooterContent', 'py-1 md:py-2', containerSize)}>
        <P size="sm" className="text-primary-100 dark:text-inherit">
          Footer
        </P>
      </div>
    </footer>
  )
}

Footer.displayName = 'Footer'
