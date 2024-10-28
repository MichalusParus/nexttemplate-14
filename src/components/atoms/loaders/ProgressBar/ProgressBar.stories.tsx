import type { Meta, StoryObj } from '@storybook/react'

import { ProgressBar } from '.'

const meta: Meta<typeof ProgressBar> = {
  title: 'Atoms/Loaders/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj<typeof ProgressBar>

export const Default: Story = {
  args: { className: '', progress: 20, color: 'primary', height: 'h-3' },
}
