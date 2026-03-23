'use client'
import { useTranslations } from 'next-intl'
import { forwardRef, useEffect, useMemo, useRef, useState } from 'react'
import { FileRejection, useDropzone } from 'react-dropzone'

import { SignOutIcon } from '@/components/atoms/icons'
import { Span } from '@/components/atoms/typography/Span'
import { useToast } from '@/components/molecules/popovers/ToastProvider'
import { childrenIconSize, disabledVariant } from '@/components/utils/common.style'
import { devWarning } from '@/components/utils/devWarning'
import { InputProps, NativeInputProps } from '@/components/utils/types'
import { cn } from '@/utils/utils'

import { inputSize } from '../../TextField/TextInput/TextInput.style'
import { FileDetail, FileDetailProps } from './FileDetail'
import { fileInputVariant, fileInputWrapClass } from './FileInput.style'

const defaultAllowedFileTypes = ['application/pdf', 'image/jpeg', 'image/png']

interface BaseFile {
  name: string
  size: number
  lastModified: number
}

export const generateFileId = (file: BaseFile) => `${file.name}-${file.size}-${file.lastModified}`

type FileState<T extends BaseFile = File> = {
  file: T
  isLoading: boolean
  progress?: number
}

export type FileInputProps<T = File> = NativeInputProps &
  Omit<InputProps, 'placeholder' | 'onChange'> &
  Omit<FileDetailProps, 'file' | 'isLoading' | 'progress'> & {
    /** value of input */
    value?: T[]
    /** array of allowed file types */
    allowedFileTypes?: string[]
    /** maximal number of selected files on one upload */
    maxFileCount?: number
    /** maximal file size in bytes */
    maxFileSize?: number
    /** onDrop function — receives file and optional onProgress callback for upload progress (0-100) */
    onDrop: (value: File, onProgress: (percent: number) => void) => Promise<T>
    /** optional onDropAccepted function */
    onDropAccepted?: (value: File[]) => void
    /** optional onDropRejected function */
    onDropRejected?: (value: FileRejection[]) => void
  }

/** Basic styled FileInput with internal value. For form purposes use FileField. Native InputHTMLAttributes props supported. USE CLIENT */
export const FileInput = forwardRef<HTMLDivElement | null, FileInputProps>(
  (
    {
      className,
      allowedFileTypes = defaultAllowedFileTypes,
      maxFileCount = 5,
      maxFileSize = 5 * 1024 * 1024,
      name,
      value,
      variant = 'outlined',
      color = 'primary',
      size = 'md',
      error,
      disabled,
      onDrop,
      onDelete,
      onDropAccepted,
      onDropRejected,
      ...rest
    },
    ref,
  ) => {
    devWarning(maxFileCount <= 0, 'FileInput: maxFileCount is zero or negative — no files can be uploaded.')

    const t = useTranslations()
    const { addToast } = useToast()
    const defaultValue = (Array.isArray(value) ? value : []).map(f => ({
      file: f,
      isLoading: false,
    }))
    const [fileList, setFileList] = useState<FileState[]>(defaultValue)
    const fileListRef = useRef(fileList)

    const updateFileList = (updater: FileState[] | ((prev: FileState[]) => FileState[])) => {
      setFileList(prev => {
        const next = typeof updater === 'function' ? updater(prev) : updater
        fileListRef.current = next
        return next
      })
    }

    useEffect(() => {
      updateFileList(
        value ? value.map(f => ({ file: f, isLoading: false })) : [],
      )
    }, [value])

    const isUploading = fileList.some(f => f.isLoading)

    const isValidFile = (file: File): boolean => {
      if (fileListRef.current.some(f => generateFileId(f.file) === generateFileId(file))) {
        addToast('error', t('Common.formErrors.fileAlreadySelected', { fileName: file.name }))
        return false
      }
      if (file.size > maxFileSize) {
        addToast(
          'error',
          t('Common.formErrors.maxFileSize', {
            fileName: file.name,
            maxFileSize: (maxFileSize / 1024 / 1024).toFixed(2),
          }),
        )
        return false
      }
      return true
    }

    const handleDrop = async (acceptedFiles: File[]) => {
      if (fileListRef.current.length + acceptedFiles.length > maxFileCount) {
        addToast('error', t('Common.formErrors.maxFileCount', { maxFileCount }))
        return
      }

      const validFiles = acceptedFiles.filter(file => isValidFile(file))

      updateFileList(prev => [...prev, ...validFiles.map(file => ({ file, isLoading: true }))])

      const promises = validFiles.map(async file => {
        const onProgress = (percent: number) => {
          updateFileList(prev =>
            prev.map(item =>
              generateFileId(item.file) === generateFileId(file)
                ? { ...item, progress: Math.min(100, Math.max(0, percent)) }
                : item,
            ),
          )
        }
        try {
          const uploadedFile = await onDrop(file, onProgress)
          updateFileList(prev =>
            prev.map(item =>
              generateFileId(item.file) === generateFileId(file)
                ? { file: uploadedFile, isLoading: false }
                : item,
            ),
          )
        } catch (error) {
          updateFileList(prev => prev.filter(item => generateFileId(item.file) !== generateFileId(file)))
          addToast('error', t('Common.formErrors.uploadFailed', { fileName: file.name }))
        }
      })
      await Promise.all(promises)
    }

    const handleDelete = async (file: File) => {
      updateFileList(prev =>
        prev.map(item =>
          generateFileId(item.file) === generateFileId(file) ? { ...item, isLoading: true } : item,
        ),
      )
      if (onDelete) {
        await onDelete(file)
      }
      updateFileList(prev => prev.filter(item => generateFileId(item.file) !== generateFileId(file)))
    }

    const acceptObj = useMemo(
      () => Object.fromEntries(allowedFileTypes.map(type => [type, []])),
      [allowedFileTypes],
    )

    const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
      onDrop: handleDrop,
      onDropAccepted: onDropAccepted,
      onDropRejected: onDropRejected,
      accept: acceptObj,
      noClick: isUploading,
      noDrag: isUploading,
      disabled,
    })

    const inputPropsObj = getInputProps({
      id: name,
      name,
      ...rest,
    })

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled || isUploading) return
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        open()
      }
    }

    return (
      <div className="flex w-full flex-col gap-2">
        <div
          {...getRootProps({
            className: cn(
              'InputWrap',
              fileInputWrapClass,
              fileInputVariant[variant][color],
              inputSize[size],
              error && 'error',
              disabled && 'disabled ' + disabledVariant[variant],
              childrenIconSize[size],
              className,
            ),
            'aria-disabled': disabled,
            ref,
            'data-testid': 'InputWrap',
            role: 'presentation',
            onKeyDown: handleKeyDown,
          })}
        >
          <SignOutIcon className="-rotate-90" />
          <input
            {...inputPropsObj}
            data-testid="FileInput"
          />
          {isDragActive ? (
            <Span className="text-center" variant="none">
              {t('Components.fileDropMessage')}
            </Span>
          ) : (
            <Span className="text-center" variant="none">
              {t('Components.fileMessage')}
            </Span>
          )}
        </div>
        <div className={cn('FileDetailList', 'flex flex-col gap-2')}>
          {fileList.map(({ file, isLoading, progress }) => (
            <FileDetail
              key={generateFileId(file)}
              file={file}
              variant={variant}
              color={color}
              size={size}
              isLoading={isLoading}
              progress={progress}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    )
  },
)

FileInput.displayName = 'FileInput'
