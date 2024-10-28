import '../src/app/globals.css'
import React from 'react'
import type { Preview } from '@storybook/react'
import { NextIntlClientProvider } from 'next-intl'
import messages from '../messages/en.json'
import { withThemeByClassName } from '@storybook/addon-themes'
// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })

const preview: Preview = {
  tags: ['autodocs'],

  parameters: {
    backgrounds: {
      default: 'bg',
      values: [
        {
          name: 'bg',
          value: 'rgb(var(--color-bg))',
        },
        {
          name: 'primary',
          value: 'rgb(var(--color-prim-800))',
        },
        {
          name: 'secondary',
          value: 'rgb(var(--color-second-800))',
        },
        {
          name: 'terciary',
          value: 'rgb(var(--color-terc-800))',
        },
        {
          name: 'dark',
          value: 'rgb(var(--color-dark-800))',
        },
      ],
    },
  },
  decorators: [
    withThemeByClassName({
      themes: {
        light: '',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
    Story => (
      <NextIntlClientProvider messages={messages} locale="en">
        {/* <div className={inter.className}> */}
        <Story />
        {/* </div> */}
      </NextIntlClientProvider>
    ),
  ],
}

export default preview
