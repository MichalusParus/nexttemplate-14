'use client'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/atoms/common/Button'
import { Form } from '@/components/molecules/form/Form'
import { TextField } from '@/components/molecules/form/inputs/TextField'

import { useResetPasswordForm } from './useResetPasswordForm'

export const ResetPasswordForm = () => {
  const t = useTranslations()

  const { form, onSubmit } = useResetPasswordForm()

  return (
    <Form name="resetPasswordForm" form={form} onSubmit={onSubmit}>
      <TextField
        name="email"
        label={t('Auth.email')}
        placeholder={t('Auth.emailPlaceholder')}
        autoComplete="email"
        labelProps={{ description: t('Auth.resetPasswordDescription') }}
      />
      <Button className="mt-8" type="submit">
        {t('Auth.resetPasswordSubmit')}
      </Button>
    </Form>
  )
}

ResetPasswordForm.displayName = 'ResetPasswordForm'
