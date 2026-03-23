'use client'
import { get } from 'lodash'
import { useContext } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { Label } from '@/components/atoms/common/Label'
import { FieldProps } from '@/components/utils/types'

import { FormStyleContext } from '../../forms/Form/Form'
import { FileInput, FileInputProps, generateFileId } from './FileInput/FileInput'

export type FileFieldProps = Omit<FileInputProps, 'value' | 'error' | 'onChange'> & FieldProps

/** Form and style context wrapper for FileInput inside Label component. Native InputHTMLAttributes and Label props supported. USE CLIENT  */
export const FileField = ({
  className,
  name,
  label,
  variant,
  color,
  size,
  labelProps = {},
  onDrop,
  onDelete,
  ...rest
}: FileFieldProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext()
  const { formVariant, formColor, formSize } = useContext(FormStyleContext)
  const errorMessage = get(errors, name)?.message as string | undefined

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Label
          name={name}
          label={label}
          size={size || formSize}
          error={errorMessage}
          {...labelProps}
        >
          <FileInput
            className={className}
            variant={variant || formVariant}
            color={color || formColor}
            size={size || formSize}
            error={errorMessage}
            aria-describedby={
              errorMessage || labelProps.description ? `${name}-description` : undefined
            }
            aria-invalid={!!errorMessage}
            {...field}
            onDrop={async (file, onProgress) => {
              const uploadResult = await onDrop(file, onProgress)
              field.onChange([...(field.value || []), uploadResult])
              return uploadResult
            }}
            onDelete={async file => {
              await onDelete?.(file)
              field.onChange(field.value.filter((f: File) => generateFileId(f) !== generateFileId(file)))
            }}
            {...rest}
          />
        </Label>
      )}
    />
  )
}

FileField.displayName = 'FileField'
