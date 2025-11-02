'use client'
import { useTranslations } from 'next-intl'
import { forwardRef, useEffect, useState } from 'react'
import { FileRejection, useDropzone } from 'react-dropzone'

import { buttonIconSize as inputIconSize } from '@/components/atoms/common/Button/Button.style'
import { SignOutIcon } from '@/components/atoms/icons'
import { Span } from '@/components/atoms/typography/Span'
import { useToast } from '@/components/molecules/popovers/ToastProvider'
import { InputProps, NativeInputProps } from '@/components/utils/types'
import { cn } from '@/utils/utils'

import {
  disabledVariant,
  inputErrorClass,
  inputSize,
  inputVariant,
} from '../../TextField/TextInput/TextInput.style'
import { FileDetail, FileDetailProps } from './FileDetail'
import { fileInputWrapClass } from './FileInput.style'

const defaultAllowedFileTypes = ['application/pdf', 'image/jpeg', 'image/png']

interface BaseFile {
  name: string
  size: number
  lastModified: number
}

type FileState<T extends BaseFile = File> = {
  file: T
  isLoading: boolean
}

export type FileInputProps<T = File> = NativeInputProps &
  Omit<InputProps, 'placeholder' | 'onChange'> &
  Omit<FileDetailProps, 'file' | 'isLoading'> & {
    /** value of input */
    value?: T[]
    /** array of allowed file types */
    allowedFileTypes?: string[]
    /** maximal number of selected files on one upload */
    maxFileCount?: number
    /** maximal file size in bytes */
    maxFileSize?: number
    /** onDrop function */
    onDrop: (value: File) => Promise<T>
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
    const t = useTranslations('')
    const { addToast } = useToast()
    const defaultValue = (Array.isArray(value) ? value : []).map(f => ({
      file: f,
      isLoading: false,
    }))
    const [fileList, setFileList] = useState<FileState[]>(defaultValue)

    const generateFileId = (file: File) => `${file.name}-${file.size}-${file.lastModified}`

    const isValidFile = (file: File): boolean => {
      if (value?.some(f => generateFileId(f) === generateFileId(file))) {
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
      if (acceptedFiles.length > maxFileCount) {
        addToast('error', t('Common.formErrors.maxFileCount', { maxFileCount }))
        return
      }

      const validFiles = acceptedFiles.filter(file => isValidFile(file))

      setFileList(prev => [...prev, ...validFiles.map(file => ({ file, isLoading: true }))])

      const promises = validFiles.map(async file => {
        try {
          const uploadedFile = await onDrop(file)
          setFileList(prev =>
            prev.map(item =>
              generateFileId(item.file) === generateFileId(file)
                ? { file: uploadedFile, isLoading: false }
                : item,
            ),
          )
        } catch (error) {
          setFileList(prev => prev.filter(item => item.file.name !== file.name))
          addToast('error', t('Common.formErrors.uploadFailed', { fileName: file.name }))
        }
      })
      await Promise.all(promises)
    }

    const handleDelete = async (file: File) => {
      setFileList(prev =>
        prev.map(item =>
          generateFileId(item.file) === generateFileId(file) ? { ...item, isLoading: true } : item,
        ),
      )
      if (onDelete) {
        await onDelete(file)
      }
      setFileList(prev => prev.filter(item => item.file.name !== file.name))
    }

    useEffect(() => {
      const abortController = new AbortController()

      return () => {
        abortController.abort()
      }
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop: handleDrop,
      noKeyboard: true,
      onDropAccepted: onDropAccepted,
      onDropRejected: onDropRejected,
    })

    return (
      <div className="flex w-full flex-col gap-2">
        <div
          className={cn(
            'InputWrap',
            fileInputWrapClass,
            inputVariant[variant][color],
            inputSize[size],
            error && !disabled && 'error ' + inputErrorClass,
            disabled && 'disabled ' + disabledVariant[variant],
            inputIconSize[size],
            className,
          )}
          {...getRootProps()}
          ref={ref}
          data-testid="InputWrap"
        >
          <SignOutIcon className="-rotate-90" />
          <input
            {...getInputProps({
              id: name,
              name,
              disabled,
              accept: allowedFileTypes.join(','),
              ...rest,
            })}
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
          {fileList.map(({ file, isLoading }) => (
            <FileDetail
              key={file.name}
              file={file}
              variant={variant}
              color={color}
              size={size}
              isLoading={isLoading}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    )
  },
)

FileInput.displayName = 'FileInput'
