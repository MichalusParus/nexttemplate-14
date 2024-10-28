'use client'
import { createContext, FormHTMLAttributes } from 'react'
import { FieldValues, FormProvider, UseFormReturn } from 'react-hook-form'

import { StyleProps } from '@/components/types'
import { cn } from '@/utils/utils'

type NativeFormProps = Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit' | 'color' | 'name'>

export type FormProps<T extends FieldValues> = NativeFormProps &
  StyleProps & {
    /** for passing custom tailwind classes */
    className?: string
    /** form name for id and aria purposes */
    name: string
    /** useForm hook */
    form: UseFormReturn<T>
    /** set collapsed state of label. Default is "flex-col md:flex-row" */
    collapsed?: 'always' | 'never' | 'default'
    /** onSubmit function */
    onSubmit: (values: object) => void
  }

export const FormStyleContext = createContext<{
  formVariant?: StyleProps['variant']
  formColor?: StyleProps['color']
  formSize?: StyleProps['size']
  formCollapsed?: 'always' | 'never' | 'default'
}>({
  formVariant: undefined,
  formColor: undefined,
  formSize: undefined,
  formCollapsed: undefined,
})

/** Form with useForm and style context provider for form fields. Default FormHTMLAttributes props supported. USE CLIENT */
export const Form = <T extends FieldValues>({
  className,
  name,
  form,
  variant,
  color,
  size,
  collapsed,
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
          formCollapsed: collapsed,
        }}
      >
        <form
          id={name}
          className={cn('Form', 'flex w-full flex-wrap items-center justify-center', className)}
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
