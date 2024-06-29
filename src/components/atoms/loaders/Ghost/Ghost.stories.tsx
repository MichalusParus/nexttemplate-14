import type { Meta, StoryObj } from '@storybook/react'

import Ghost from '.'

const meta: Meta<typeof Ghost> = {
  title: 'Atoms/Loaders/Ghost',
  component: Ghost,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof Ghost>

export const Default: Story = {
  args: { className: 'h-8 w-20', size: 'none' },
}

export const Inline: Story = {
  args: { className: 'h-sm w-60', size: 'none' },
}

export const Box: Story = {
  args: { className: 'h-52 w-52', size: 'none' },
}
