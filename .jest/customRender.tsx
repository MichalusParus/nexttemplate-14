import React, { ReactElement, ReactNode, PropsWithChildren, useEffect } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { Form } from '../src/components/molecules/form/forms/Form'

const JestMockProvider = ({ children }: PropsWithChildren) => {
  const messages = require(`../messages/en.json`)
  return (
    <NextIntlClientProvider messages={messages} locale={'en'}>
      {children}
    </NextIntlClientProvider>
  )
}

const JestFormProvider = ({
  className,
  fields,
  values,
  errors,
  onSubmit = () => {},
  children,
}: PropsWithChildren<{
  className?: string
  fields: string[]
  values?: any[]
  errors?: string[]
  onSubmit?: (v: any) => void
}>) => {
  const zodFields = Object.fromEntries(fields.map(field => [field, z.unknown()]))
  const schema = z.object(zodFields)
  const formValues = Object.fromEntries(fields.map((field, i) => [field, values?.[i]]))
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: formValues,
  })

  useEffect(() => {
    if (errors) {
      errors.forEach((error, i) => {
        form.setError(fields[i], { type: 'manual', message: error })
      })
    }
  }, [form, errors])

  return (
    <Form className={className} name="jestForm" form={form} onSubmit={onSubmit}>
      {children}
    </Form>
  )
}

type UseFormProviderProps = {
  fields: string[]
  values?: any[]
  errors?: string[]
  onSubmit?: (v: any) => void
}

type ProvidersProps = {
  useFormProvider?: UseFormProviderProps
  children?: ReactNode
}

const AllProviders = ({ useFormProvider, children }: ProvidersProps) => {
  let content = <JestMockProvider>{children}</JestMockProvider>

  if (useFormProvider) {
    content = (
      <JestMockProvider>
        <JestFormProvider {...useFormProvider}>{children}</JestFormProvider>
      </JestMockProvider>
    )
  }

  return content
}

type CustomRenderOptions = Omit<RenderOptions, 'wrapper'> & {
  useFormProvider?: UseFormProviderProps
}

const customRender = (
  ui: ReactElement,
  { useFormProvider, ...options }: CustomRenderOptions = {},
) =>
  render(ui, {
    wrapper: props => AllProviders({ useFormProvider, ...props }),
    ...options,
  })

export * from '@testing-library/react'
export { customRender as render }
