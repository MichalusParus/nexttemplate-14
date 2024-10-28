import type { Meta, StoryObj } from '@storybook/react'

import { Logo } from '.'

const meta: Meta<typeof Logo> = {
  title: 'Templates/Logo',
  component: Logo,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'primary',
    },
  },
}

export default meta
type Story = StoryObj<typeof Logo>

export const Default: Story = {
  args: { className: '' },
}
