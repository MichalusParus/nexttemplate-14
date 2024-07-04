import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { PropsWithChildren } from 'react'

import Footer from '@/components/templates/Footer'
import Header from '@/components/templates/Header'
import Main from '@/components/templates/Main'
import { cn } from '@/utils/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NextTemplate 14',
  description: 'NextTemplate 14 made with Typescript and TailwindCss',
  icons: {
    icon: [
      {
        url: '/images/favicon.ico',
        href: '/images/favicon.ico',
      },
    ],
  },
}

export default async function RootLayout({ children }: PropsWithChildren<object>) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body className={cn('flex min-h-[100vh] flex-col bg-primary-800', inter.className)}>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <Main>{children}</Main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
