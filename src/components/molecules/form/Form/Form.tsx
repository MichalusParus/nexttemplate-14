'use client'
import { cn } from '@/utils/utils'
import { yupResolver } from '@hookform/resolvers/yup'
import { createContext, FormHTMLAttributes } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { AnyObject, InferType, ObjectSchema } from 'yup'

export type FormProps = Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit' | 'color'> & {
  /** for passing custom tailwind classes */
  className?: string
  /** object with initial form values */
  initialValues: object
  /** yup validation object */
  validationSchema: ObjectSchema<object, AnyObject, object, ''>
  /** style variant of component */
  variant?: 'text' | 'outlined' | 'contained'
  /** theme color of component, none disable styles for custom styling via className */
  color?: 'primary' | 'secondary' | 'terciary' | 'none'
  /** size of component, none disable sizes for custom styling via className */
  size?: 'sm' | 'md' | 'lg' | 'none'
  /** set collapsed state of label. Default is "flex-col md:flex-row" */
  collapsed?: 'always' | 'never' | 'default'
  /** onSubmit function */
  onSubmit: (values: object) => void
}

export const FormStyleContext = createContext<{
  formVariant?: 'text' | 'outlined' | 'contained'
  formColor?: 'primary' | 'secondary' | 'terciary' | 'none'
  formSize?: 'sm' | 'md' | 'lg' | 'none'
  formCollapsed?: 'always' | 'never' | 'default'
}>({
  formVariant: undefined,
  formColor: undefined,
  formSize: undefined,
  formCollapsed: undefined,
})

/** Form with useForm and style context provider for form fields. Default FormHTMLAttributes props supported. USE CLIENT */
export const Form = ({
  className = '',
  initialValues,
  validationSchema,
  variant,
  color,
  size,
  collapsed,
  children,
  onSubmit,
  ...rest
}: FormProps) => {
  const methods = useForm<InferType<typeof validationSchema>>({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
  })

  return (
    <FormProvider {...methods}>
      <FormStyleContext.Provider
        value={{
          formVariant: variant,
          formColor: color,
          formSize: size,
          formCollapsed: collapsed,
        }}
      >
        <form
          className={cn('Form', 'flex w-full flex-wrap items-center justify-center', className)}
          onSubmit={methods.handleSubmit(onSubmit)}
          data-testid="Form"
          {...rest}
        >
          {children}
        </form>
      </FormStyleContext.Provider>
    </FormProvider>
  )
}
