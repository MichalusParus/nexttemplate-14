import type { Meta, StoryObj } from '@storybook/react'

import Nav from '.'

const meta: Meta<typeof Nav> = {
  title: 'Templates/Nav',
  component: Nav,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'primary',
    },
  },
}

export default meta
type Story = StoryObj<typeof Nav>

export const Default: Story = {
  args: { className: '' },
}
