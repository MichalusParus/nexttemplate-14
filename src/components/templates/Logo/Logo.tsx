import Image from 'next/image'

import Link from '@/components/atoms/common/Link'
import Title from '@/components/atoms/typography/Title'
import { cn } from '@/utils/utils'

export type LogoProps = {
  /** for passing custom tailwind classes */
  className?: string
}

/** Main Logo component */
export const Logo = ({ className }: LogoProps) => {
  return (
    <Link
      className={cn('Logo', 'flex w-max items-center gap-2 border-none', className)}
      color="none"
      size="none"
      href="/"
      disableUpperCase
      data-testid="Logo"
    >
      <div
        className={cn(
          'LogoImageWrap',
          'relative flex h-lgIcon w-lgIcon md:h-xlIcon md:w-xlIcon lg:h-2xlIcon lg:w-2xlIcon',
        )}
      >
        <Image src="/images/favicon.ico" alt="Logo" fill />
      </div>
      <Title variant="h1" size="none" className={cn('text-lg text-dark-50 md:text-xl lg:text-2xl')}>
        NextTemplate14
      </Title>
    </Link>
  )
}

Logo.displayName = 'Logo'
