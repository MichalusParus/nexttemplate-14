import { getTranslations } from 'next-intl/server'

import { Link } from '@/components/atoms/common/Link'
import { Paper } from '@/components/atoms/containers/Paper'
import { P } from '@/components/atoms/typography/P'
import { Title } from '@/components/atoms/typography/Title'

import { RegisterForm } from './_components/RegisterForm/RegisterForm'

export default async function Register() {
  const t = await getTranslations('Auth')

  return (
    <Paper
      className="flex min-w-full flex-col gap-8 md:min-w-[30rem]"
      padding="py-4 px-2 md:py-8 md:px-12"
    >
      <Title variant="h1" size="2xl" align="text-center">
        {t('register')}
      </Title>
      <RegisterForm />
      <P align="text-center">
        {t('alreadyHaveAccount')}
        <Link size="inline" disableUpperCase href="/login">
          {t('login')}
        </Link>
      </P>
    </Paper>
  )
}
