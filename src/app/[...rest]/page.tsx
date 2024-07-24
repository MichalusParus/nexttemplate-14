'use client'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import Alert from '@/components/atoms/common/Alert'
import Button from '@/components/atoms/common/Button'
import { PageProps } from '@/utils/types'
import { cn } from '@/utils/utils'

export default function NotFound({ params }: PageProps) {
  const router = useRouter()
  const t = useTranslations('Common')

  return (
    <div
      className={cn(
        'NotFoundWrap',
        'mx-auto mt-40 flex w-max max-w-80 flex-col items-center justify-center gap-4',
      )}
    >
      <Alert status="warning" title={t('pageNotFound', { name: String(params.rest) })} />
      <div className={cn('ActionWrap', 'ml-auto flex justify-end gap-4')}>
        <Button onClick={router.back}>{t('back')}</Button>
      </div>
    </div>
  )
}
