import type { Meta, StoryObj } from '@storybook/react'

import Header from '.'

const meta: Meta<typeof Header> = {
  title: 'Templates/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj<typeof Header>

export const Default: Story = {
  args: { className: '' },
}
