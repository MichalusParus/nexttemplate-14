'use client'
import { createContext, FormHTMLAttributes } from 'react'
import { FieldValues, FormProvider, UseFormReturn } from 'react-hook-form'

import { StyleProps } from '@/components/types'
import { cn } from '@/utils/utils'

type NativeFormProps = Omit<
  FormHTMLAttributes<HTMLFormElement>,
  'onSubmit' | 'color' | 'name' | 'className'
>

export type FormProps<T extends FieldValues> = NativeFormProps &
  StyleProps & {
    /** for passing custom tailwind classes */
    className?: string
    /** form name for id and aria purposes */
    name: string
    /** useForm hook */
    form: UseFormReturn<T>
    /** onSubmit function */
    onSubmit: (values: T) => void
  }

export const FormStyleContext = createContext<{
  formVariant?: StyleProps['variant']
  formColor?: StyleProps['color']
  formSize?: StyleProps['size']
}>({
  formVariant: undefined,
  formColor: undefined,
  formSize: undefined,
})

/** Form with useForm and style context provider for form fields. Default FormHTMLAttributes props supported. USE CLIENT */
export const Form = <T extends FieldValues>({
  className,
  name,
  form,
  variant,
  color,
  size,
  children,
  onSubmit,
  ...rest
}: FormProps<T>) => {
  return (
    <FormProvider {...form}>
      <FormStyleContext.Provider
        value={{
          formVariant: variant,
          formColor: color,
          formSize: size,
        }}
      >
        <form
          id={name}
          className={cn(
            'Form',
            'flex w-full flex-col flex-wrap items-center justify-center',
            className,
          )}
          onSubmit={form.handleSubmit(onSubmit)}
          data-testid="Form"
          {...rest}
        >
          {children}
        </form>
      </FormStyleContext.Provider>
    </FormProvider>
  )
}
