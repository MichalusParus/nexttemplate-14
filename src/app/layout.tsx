import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { PropsWithChildren } from 'react'

import { ToastProvider } from '@/components/molecules/popovers/ToastProvider'
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

export default async function RootLayout({ children }: PropsWithChildren) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body
        className={cn(
          'flex min-h-[100vh] flex-col bg-bg text-dark-950 dark:bg-darkBg dark:text-contrast',
          inter.className,
        )}
      >
        <NextIntlClientProvider messages={messages}>
          <ToastProvider>{children}</ToastProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
