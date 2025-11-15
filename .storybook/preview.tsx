import '../src/app/globals.css'
import type { Preview } from '@storybook/react'
import { NextIntlClientProvider } from 'next-intl'
import messages from '../messages/en.json'
import { withThemeByClassName } from '@storybook/addon-themes'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const preview: Preview = {
  tags: ['autodocs'],

  parameters: {
    backgrounds: {
      default: 'bg',
      values: [
        {
          name: 'bg',
          value: 'var(--color-bg)',
        },
        {
          name: 'primary',
          value: 'var(--color-primary-800)',
        },
        {
          name: 'secondary',
          value: 'var(--color-secondary-800)',
        },
        {
          name: 'terciary',
          value: 'var(--color-terciary-800)',
        },
        {
          name: 'dark',
          value: 'var(--color-dark-800)',
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
        <div className={inter.className}>
          <div className="text-dark-950 dark:text-contrast">
            <Story />
          </div>
        </div>
      </NextIntlClientProvider>
    ),
  ],
}

export default preview
