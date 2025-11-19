import type { Meta, StoryObj } from '@storybook/nextjs'

import { InlineLoader } from '.'

const meta: Meta<typeof InlineLoader> = {
  title: 'Atoms/Loaders/InlineLoader',
  component: InlineLoader,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof InlineLoader>

export const Default: Story = {
  args: { className: '', size: 'md' },
}
