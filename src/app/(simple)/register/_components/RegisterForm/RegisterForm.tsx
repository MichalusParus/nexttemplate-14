'use client'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/atoms/common/Button'
import { Form } from '@/components/molecules/form/Form'
import { TextField } from '@/components/molecules/form/TextField'

import { useRegisterForm } from './useRegisterForm'

export const RegisterForm = () => {
  const t = useTranslations()

  const { form, onSubmit } = useRegisterForm()

  return (
    <Form name="registerForm" form={form} collapsed="always" onSubmit={onSubmit}>
      <TextField
        name="email"
        label={t('Auth.email')}
        placeholder={t('Auth.emailPlaceholder')}
        autoComplete="email"
      />
      <TextField
        name="password"
        type="password"
        label={t('Auth.password')}
        placeholder={t('Auth.passwordPlaceholder')}
        autoComplete="current-password"
      />
      <TextField
        name="confirmPassword"
        type="password"
        label={t('Auth.confirmPassword')}
        placeholder={t('Auth.confirmPasswordPlaceholder')}
        autoComplete="confirm-password"
      />
      <Button className="mt-8" type="submit">
        {t('Auth.registerSubmit')}
      </Button>
    </Form>
  )
}

RegisterForm.displayName = 'RegisterForm'
