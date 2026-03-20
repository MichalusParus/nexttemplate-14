import '../src/app/globals.css'
import type { Preview } from '@storybook/nextjs'
import { withThemeByClassName } from '@storybook/addon-themes'
import { Inter } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import React from 'react'
import messages from '../messages/en.json'

const inter = Inter({ subsets: ['latin'] })

const preview: Preview = {
  tags: ['autodocs'],

  initialGlobals: {
    locale: 'en',
    locales: {
      en: 'English',
    },
    backgrounds: {
      value: 'bg'
    }
  },

  parameters: {
    docs: {
      toc: {
        headingSelector: 'h2',
        title: 'Contents',
      },
    },
    backgrounds: {
      options: {
        bg: {
          name: 'bg',
          value: 'var(--color-bg)',
        },

        primary: {
          name: 'primary',
          value: 'var(--color-primary-700)',
        },

        secondary: {
          name: 'secondary',
          value: 'var(--color-secondary-700)',
        },

        terciary: {
          name: 'terciary',
          value: 'var(--color-terciary-700)',
        },

        dark: {
          name: 'dark',
          value: 'var(--color-dark-700)',
        }
      }
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
    (Story) => (
      <NextIntlClientProvider locale="en" messages={messages}>
        <div className={inter.className}>
          <div className="text-dark-950 dark:text-contrast">
            <Story />
          </div>
        </div>
      </NextIntlClientProvider>
    ),
  ]
}

export default preview
