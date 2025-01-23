'use client'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/atoms/common/Button'
import { Link } from '@/components/atoms/common/Link'
import { Form } from '@/components/molecules/form/Form'
import { TextField } from '@/components/molecules/form/inputs/TextField'

import { useLoginForm } from './useLoginForm'

export const LoginForm = () => {
  const t = useTranslations()

  const { form, onSubmit } = useLoginForm()

  return (
    <Form name="loginForm" form={form} onSubmit={onSubmit}>
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
      <Link className="ml-auto" size="inline" href="/reset-password">
        {t('Auth.forgotPassword')}
      </Link>
      <Button className="mt-8" type="submit">
        {t('Auth.loginSubmit')}
      </Button>
    </Form>
  )
}

LoginForm.displayName = 'LoginForm'
