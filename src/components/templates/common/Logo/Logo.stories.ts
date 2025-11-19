import type { Meta, StoryObj } from '@storybook/nextjs'

import { Logo } from '.'

const meta: Meta<typeof Logo> = {
  title: 'Templates/Common/Logo',
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
