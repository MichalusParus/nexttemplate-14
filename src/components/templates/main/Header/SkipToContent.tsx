import { useTranslations } from 'next-intl'

import { Link } from '@/components/atoms/common/Link'

export const SkipToContent = () => {
  const t = useTranslations('Components')

  return (
    <Link
      href="#main"
      variant="text"
      size="none"
      color="none"
      className="dark:focus:bg-dark-bg sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:shadow"
    >
      {t('skipToContent')}
    </Link>
  )
}

SkipToContent.displayName = 'SkipToContent'
