import type { Meta, StoryObj } from '@storybook/react'

import { textContent } from '../../../../../.storybook/helpers'
import { Divider } from '.'

const meta: Meta<typeof Divider> = {
  title: 'Atoms/Common/Divider',
  component: Divider,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj<typeof Divider>

export const PrimaryDefault: Story = {
  args: {
    className: '',
    label: '',
    color: 'primary',
    width: 2,
    vertical: false,
  },
  render: args => (
    <div className="w-full">
      <p className="p-4">{textContent.slice(0, 500)}</p>
      <Divider {...args} />
      <p className="p-4">{textContent.slice(0, 500)}</p>
    </div>
  ),
}

export const Padding: Story = {
  args: {
    ...PrimaryDefault.args,
    className: 'px-20',
  },
  render: args => (
    <div className="w-full">
      <p className="p-4">{textContent.slice(0, 500)}</p>
      <Divider {...args} />
      <p className="p-4">{textContent.slice(0, 500)}</p>
    </div>
  ),
}

export const Label: Story = {
  args: {
    ...PrimaryDefault.args,
    label: 'OR',
  },
  render: args => (
    <div className="w-full">
      <p className="p-4">{textContent.slice(0, 500)}</p>
      <Divider {...args} />
      <p className="p-4">{textContent.slice(0, 500)}</p>
    </div>
  ),
}

export const Vertical: Story = {
  args: {
    ...PrimaryDefault.args,
    vertical: true,
  },
  render: args => (
    <div className="flex">
      <p className="p-4">{textContent.slice(0, 500)}</p>
      <Divider {...args} />
      <p className="p-4">{textContent.slice(0, 500)}</p>
    </div>
  ),
}

export const VerticalTitle: Story = {
  args: {
    ...PrimaryDefault.args,
    label: 'OR',
    vertical: true,
  },
  render: args => (
    <div className="flex">
      <p className="p-4">{textContent.slice(0, 500)}</p>
      <Divider {...args} />
      <p className="p-4">{textContent.slice(0, 500)}</p>
    </div>
  ),
}
