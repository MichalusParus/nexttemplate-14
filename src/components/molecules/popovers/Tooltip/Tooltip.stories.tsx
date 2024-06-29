import type { Meta, StoryObj } from '@storybook/react'

import Tooltip from '.'

const meta: Meta<typeof Tooltip> = {
  title: 'Molecules/Popovers/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
  args: { children: 'HoverMe', title: 'tooltip' },
}

export const Right: Story = {
  args: { children: 'HoverMe', title: 'tooltip', placement: 'right' },
}

export const Bottom: Story = {
  args: { children: 'HoverMe', title: 'tooltip', placement: 'bottom' },
}

export const Left: Story = {
  args: { children: 'HoverMe', title: 'tooltip', placement: 'left' },
}
