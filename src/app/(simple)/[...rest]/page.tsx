'use client'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { Alert } from '@/components/atoms/common/Alert'
import { Button } from '@/components/atoms/common/Button'
import { Paper } from '@/components/atoms/containers/Paper'
import { PageProps } from '@/utils/types'
import { cn } from '@/utils/utils'

export default function NotFound({ params }: PageProps) {
  const router = useRouter()
  const t = useTranslations('Common')

  return (
    <Paper
      className={cn(
        'NotFoundWrap',
        'm-auto flex max-w-max flex-col items-center justify-center gap-4',
      )}
    >
      <Alert
        status="error"
        title={t('pageNotFound', { name: String(params.rest) })}
        variant="text"
      />
      <div className={cn('ActionWrap', 'ml-auto flex justify-end gap-4')}>
        <Button onClick={router.back}>{t('back')}</Button>
      </div>
    </Paper>
  )
}
