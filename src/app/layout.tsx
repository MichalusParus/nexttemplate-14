import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { PropsWithChildren } from 'react'

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

export default function RootLayout({ children }: PropsWithChildren<object>) {
  const layoutSizes = 'mx-auto w-full max-w-screen-2xl px-4'

  return (
    <html lang="en">
      <body className={inter.className}>
        <header className={`h-headerHeight py-4 text-center text-xl ${layoutSizes}`}>
          <h1>Header</h1>
        </header>
        <main className={`h-mainHeight py-12 text-center ${layoutSizes}`}>{children}</main>
        <footer className={`h-footerHeight text-center ${layoutSizes}`}>Footer</footer>
      </body>
    </html>
  )
}
