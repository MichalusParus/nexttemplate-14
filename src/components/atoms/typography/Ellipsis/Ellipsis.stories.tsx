import type { Meta, StoryObj } from '@storybook/react'

import { textContent } from '../../../../../.storybook/helpers'
import { Ellipsis } from '.'

const meta: Meta<typeof Ellipsis> = {
  title: 'Atoms/Typography/Ellipsis',
  component: Ellipsis,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: {
      control: false,
    },
  },
  decorators: [
    Story => (
      <div className="relative h-72 w-96 overflow-hidden border p-4">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Ellipsis>

export const Default: Story = {
  args: {
    className: 'line-clamp-1',
    variant: 'none',
    color: 'none',
    tooltipProps: {},
    children: textContent.slice(0, 100),
  },
}

export const LineClamp: Story = {
  args: {
    ...Default.args,
    className: 'line-clamp-3',
  },
}

export const Overflow: Story = {
  args: {
    ...Default.args,
    className: 'block w-full h-full break-words overflow-hidden',
    children: textContent.slice(0, 500),
  },
}
