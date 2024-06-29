import type { Preview } from '@storybook/react'
import '../src/app/globals.css'

const preview: Preview = {
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
}

export default preview
