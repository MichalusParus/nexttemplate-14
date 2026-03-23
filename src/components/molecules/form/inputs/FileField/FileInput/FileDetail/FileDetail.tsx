'use client'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/atoms/common/Button'
import { Paper } from '@/components/atoms/containers/Paper'
import { DeleteIcon } from '@/components/atoms/icons'
import { ProgressBar } from '@/components/atoms/loaders/ProgressBar'
import { Ellipsis } from '@/components/atoms/typography/Ellipsis'
import { P } from '@/components/atoms/typography/P'
import { StyleProps } from '@/components/utils/types'
import { cn } from '@/utils/utils'

import { inputSize } from '../../../TextField/TextInput/TextInput.style'

export type FileDetailProps<T = File> = StyleProps & {
  file: T
  /** boolean for pending state*/
  isLoading?: boolean
  /** upload progress 0-100, renders ProgressBar when defined during loading */
  progress?: number
  /** optional async onDelete function */
  onDelete?: (value: File) => Promise<void>
}

/** FileDetail for FileInput. USE CLIENT */
export const FileDetail = ({
  file,
  variant = 'outlined',
  color = 'primary',
  size = 'md',
  isLoading,
  progress,
  onDelete,
}: FileDetailProps) => {
  const t = useTranslations('Components')

  return (
    <Paper
      className={cn('FileDetail', 'flex max-w-full justify-between gap-2', inputSize[size])}
      variant={variant}
      color={color}
      padding="p-0"
      hideShadow
      data-testid="FileDetail"
    >
      {isLoading && progress !== undefined ? (
        <ProgressBar className="mx-4 my-auto w-full" progress={progress} color={color} height="h-1" />
      ) : (
        <Ellipsis className="w-full" variant="none">
          <P className="w-full" isLoading={isLoading}>
            {`${file.name}  (${(file.size / 1024 / 1024).toFixed(2)} MB)`}
          </P>
        </Ellipsis>
      )}
      <Button
        className="shrink-0 px-0 py-0"
        variant="text"
        color="error"
        size={size}
        startIcon={<DeleteIcon />}
        isLoading={isLoading}
        aria-label={t('delete', { label: file.name || '' })}
        onClick={() => {
          onDelete?.(file)
        }}
        data-testid="DeleteButton"
      />
    </Paper>
  )
}

FileDetail.displayName = 'FileDetail'
