import type { Meta, StoryObj } from '@storybook/nextjs'

import { Avatar } from '../Avatar'
import { Badge } from '.'

const meta: Meta<typeof Badge> = {
  title: 'Atoms/Common/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof Badge>

export const DotDefault: Story = {
  args: {
    className: '',
    value: undefined,
    show: undefined,
    position: undefined,
    size: 'md',
    max: 99,
    children: <Avatar username="John Doe" size="lg" />,
  },
}

export const NumericValue: Story = {
  args: { ...DotDefault.args, value: 5 },
}

export const StringValue: Story = {
  args: { ...DotDefault.args, value: 'NEW' },
}
