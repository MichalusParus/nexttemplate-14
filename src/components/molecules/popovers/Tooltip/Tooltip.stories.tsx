import type { Meta, StoryObj } from '@storybook/react'
import { ReactNode } from 'react'

import Alert from '@/components/atoms/common/Alert'

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
  args: {
    className: '',
    placement: 'top',
    title: 'tooltip',
    delay: 'delay-500',
    children: 'HoverMe',
  },
}

export const Element: Story = {
  args: {
    ...Default.args,
    className: '[&>.Tooltip]:p-0',
    title: (<Alert status="info">info</Alert>) as ReactNode,
  },
}

export const Right: Story = {
  args: { ...Default.args, placement: 'right' },
}

export const Bottom: Story = {
  args: { ...Default.args, placement: 'bottom' },
}

export const Left: Story = {
  args: { ...Default.args, placement: 'left' },
}
