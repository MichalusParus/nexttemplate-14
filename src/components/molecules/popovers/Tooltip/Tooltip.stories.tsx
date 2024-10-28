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
  argTypes: {
    placement: {
      control: 'radio',
    },
  },
}

export default meta
type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
  args: {
    className: '',
    placement: 'top',
    offset: undefined,
    title: 'tooltip',
    delay: 'delay-500',
    children: 'HoverMe',
  },
}

export const Element: Story = {
  args: {
    ...Default.args,
    className: '!p-0',
    title: (
      <Alert status="info" variant="contained">
        info
      </Alert>
    ) as ReactNode,
  },
}
