import type { Meta, StoryObj } from '@storybook/nextjs'

import { Footer } from '.'

const meta: Meta<typeof Footer> = {
  title: 'Templates/Main/Footer',
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
