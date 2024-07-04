import P from '@/components/atoms/typography/P'
import { cn } from '@/utils/utils'

import { containerSize, mainXPadding } from '../Header/Header.style'

export type FooterProps = {
  /** for passing custom tailwind classes */
  className?: string
}

/** Footer component, semantic with layout container and basic styling. */
export const Footer = ({ className = '' }: FooterProps) => {
  return (
    <footer
      className={cn('Footer', ' bg-primary-800', mainXPadding, className)}
      data-testid="Footer"
    >
      <div className={cn('FooterContent', containerSize)}>
        <P className="text-primary-50">Footer</P>
      </div>
    </footer>
  )
}

Footer.displayName = 'Footer'
