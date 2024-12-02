import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import z from 'zod'

export const useLoginForm = () => {
  const t = useTranslations()

  const loginSchema = z.object({
    email: z.string().email({ message: t('Common.formErrors.emailFormat') }),
    password: z
      .string()
      .min(8, { message: t('Common.formErrors.minLength', { field: t('Auth.password'), min: 8 }) })
      .max(32, {
        message: t('Common.formErrors.maxLength', { field: t('Auth.password'), max: 32 }),
      })
      .regex(/^(?=.*[a-z]).+$/, {
        message: t('Common.formErrors.minOneLowerCase', { field: t('Auth.password') }),
      })
      .regex(/^(?=.*[A-Z]).+$/, {
        message: t('Common.formErrors.minOneUpperCase', { field: t('Auth.password') }),
      })
      .regex(/^\S+$/, { message: t('Common.formErrors.noSpaces', { field: t('Auth.password') }) }),
  })

  const defaultValues = {
    email: '',
    password: '',
  }

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    console.log(values)
  }

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: defaultValues,
  })

  return {
    form: form,
    onSubmit: onSubmit,
  }
}
