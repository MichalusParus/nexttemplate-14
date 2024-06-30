import React from 'react'
import type { Preview } from '@storybook/react'
import '../src/app/globals.css'
import { NextIntlClientProvider } from 'next-intl'
import messages from '../messages/en.json'

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'bg',
      values: [
        {
          name: 'bg',
          value: '#f3f8f3',
        },
        {
          name: 'primary',
          value: '#155e75',
        },
        {
          name: 'secondary',
          value: '#065f46',
        },
      ],
    },
  },
  decorators: [
    Story => (
      <NextIntlClientProvider messages={messages} locale="en">
        <Story />
      </NextIntlClientProvider>
    ),
  ],
}

export default preview
