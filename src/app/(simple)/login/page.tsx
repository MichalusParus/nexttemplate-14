import { getTranslations } from 'next-intl/server'

import { Link } from '@/components/atoms/common/Link'
import { Paper } from '@/components/atoms/containers/Paper'
import { P } from '@/components/atoms/typography/P'
import { Title } from '@/components/atoms/typography/Title'

import { LoginForm } from './_components/LoginForm/LoginForm'

export default async function Login() {
  const t = await getTranslations('Auth')

  return (
    <Paper
      className="flex min-w-full flex-col gap-8 md:min-w-[30rem]"
      padding="py-4 px-2 md:py-8 md:px-12"
    >
      <Title variant="h1" size="2xl" align="text-center">
        {t('login')}
      </Title>
      <LoginForm />
      <P align="text-center">
        {t('dontHaveAccount')}{' '}
        <Link size="inline" href="/register">
          {t('register')}
        </Link>
      </P>
    </Paper>
  )
}
