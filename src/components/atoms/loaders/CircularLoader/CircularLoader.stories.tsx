import type { Meta, StoryObj } from '@storybook/nextjs'

import { CircularLoader } from '.'

const meta: Meta<typeof CircularLoader> = {
  title: 'Atoms/Loaders/CircularLoader',
  component: CircularLoader,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof CircularLoader>

export const Default: Story = {
  args: { className: '', label: 'Loading...', color: 'primary', size: 'md', hideLabel: false },
}
