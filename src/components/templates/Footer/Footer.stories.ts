import type { Meta, StoryObj } from '@storybook/react'

import { Footer } from '.'

const meta: Meta<typeof Footer> = {
  title: 'Templates/Footer',
  component: Footer,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj<typeof Footer>

export const Default: Story = {
  args: { className: '' },
}
