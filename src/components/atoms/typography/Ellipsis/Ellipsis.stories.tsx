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
      <div className="h-72 w-96 border p-4">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Ellipsis>

export const Default: Story = {
  args: {
    className: '',
    lineClamp: '',
    variant: 'none',
    color: 'none',
    tooltipProps: {},
    children: textContent.slice(0, 100),
  },
}

export const MultiLine: Story = {
  args: {
    ...Default.args,
    className: 'line-clamp-3',
    children: textContent.slice(0, 500),
  },
}
