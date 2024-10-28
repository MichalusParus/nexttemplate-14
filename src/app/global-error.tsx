'use client'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { Alert } from '@/components/atoms/common/Alert'
import { Button } from '@/components/atoms/common/Button'
import { ErrorPageProps } from '@/utils/types'
import { cn } from '@/utils/utils'

export default function GlobalError({ error, reset }: ErrorPageProps) {
  const router = useRouter()
  const t = useTranslations('Common')
  console.error(error)

  return (
    <div
      className={cn(
        'GlobalErrorPageWrap',
        'mx-auto mt-40 flex max-w-80 flex-col items-center justify-center gap-4',
      )}
    >
      <Alert status="error" title={t('errorPageTitle')}>
        {t('errorPageMessage', { message: error.message })}
      </Alert>
      <div className={cn('ActionWrap', 'flex w-full justify-end gap-4')}>
        <Button variant="text" onClick={reset}>
          {t('reset')}
        </Button>
        <Button onClick={router.back}>{t('back')}</Button>
      </div>
    </div>
  )
}
