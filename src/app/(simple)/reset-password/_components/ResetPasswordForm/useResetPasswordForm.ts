import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import z from 'zod'

export const useResetPasswordForm = () => {
  const t = useTranslations()

  const resetPasswordSchema = z.object({
    email: z.string().email({ message: t('Common.formErrors.emailFormat') }),
  })

  const defaultValues = {
    email: '',
  }

  const onSubmit = (values: z.infer<typeof resetPasswordSchema>) => {
    console.log(values)
  }

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: defaultValues,
  })

  return {
    form: form,
    onSubmit: onSubmit,
  }
}
