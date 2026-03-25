import type { Meta, StoryObj } from '@storybook/nextjs'

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
    args: { className: '', progress: undefined, height: 'h-3', color: 'primary' },
}

export const Determinate: Story = {
  args: { progress: 60 },
}
