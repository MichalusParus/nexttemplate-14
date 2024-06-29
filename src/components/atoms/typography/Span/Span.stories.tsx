import type { Meta, StoryObj } from '@storybook/react'

import Span from '.'

const meta: Meta<typeof Span> = {
  title: 'Atoms/Typography/Span',
  component: Span,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof Span>

export const BoldDefault: Story = {
  args: {
    className: '',
    variant: 'bold',
    color: 'none',
    children: 'span text',
  },
  render: args => (
    <p>
      vhcgcjgvbnbvhgfhjg <Span {...args} /> bvhgvjgfcfdxcvkbkbjg
    </p>
  ),
}

export const TextSize: Story = {
  args: {
    ...BoldDefault.args,
  },
  render: args => (
    <>
      <p className="text-sm">
        vhcgcjgvbnbvhgfhjg <Span {...args} /> bvhgvjgfcfdxcvkbkbjg
      </p>
      <p className="text-md">
        vhcgcjgvbnbvhgfhjg <Span {...args} /> bvhgvjgfcfdxcvkbkbjg
      </p>
      <p className="text-lg">
        vhcgcjgvbnbvhgfhjg <Span {...args} /> bvhgvjgfcfdxcvkbkbjg
      </p>
      <p className="text-xl">
        vhcgcjgvbnbvhgfhjg <Span {...args} /> bvhgvjgfcfdxcvkbkbjg
      </p>
    </>
  ),
}

export const Italic: Story = {
  args: {
    ...BoldDefault.args,
    variant: 'italic',
  },
  render: args => (
    <>
      <p className="text-sm">
        vhcgcjgvbnbvhgfhjg <Span {...args} /> bvhgvjgfcfdxcvkbkbjg
      </p>
      <p className="text-md">
        vhcgcjgvbnbvhgfhjg <Span {...args} /> bvhgvjgfcfdxcvkbkbjg
      </p>
      <p className="text-lg">
        vhcgcjgvbnbvhgfhjg <Span {...args} /> bvhgvjgfcfdxcvkbkbjg
      </p>
      <p className="text-xl">
        vhcgcjgvbnbvhgfhjg <Span {...args} /> bvhgvjgfcfdxcvkbkbjg
      </p>
    </>
  ),
}

export const Underline: Story = {
  args: {
    ...BoldDefault.args,
    variant: 'underline',
  },
  render: args => (
    <>
      <p className="text-sm">
        vhcgcjgvbnbvhgfhjg <Span {...args} /> bvhgvjgfcfdxcvkbkbjg
      </p>
      <p className="text-md">
        vhcgcjgvbnbvhgfhjg <Span {...args} /> bvhgvjgfcfdxcvkbkbjg
      </p>
      <p className="text-lg">
        vhcgcjgvbnbvhgfhjg <Span {...args} /> bvhgvjgfcfdxcvkbkbjg
      </p>
      <p className="text-xl">
        vhcgcjgvbnbvhgfhjg <Span {...args} /> bvhgvjgfcfdxcvkbkbjg
      </p>
    </>
  ),
}

export const Colored: Story = {
  args: {
    ...BoldDefault.args,
  },
  render: args => (
    <>
      <p className="text-sm">
        vhcgcjgvbnbvhgfhjg <Span {...args} /> bvhgvjgfcfdxcvkbkbjg
      </p>
      <p className="text-md">
        vhcgcjgvbnbvhgfhjg <Span {...args} color="primary" /> bvhgvjgfcfdxcvkbkbjg
      </p>
      <p className="text-lg">
        vhcgcjgvbnbvhgfhjg <Span {...args} color="secondary" /> bvhgvjgfcfdxcvkbkbjg
      </p>
      <p className="text-xl">
        vhcgcjgvbnbvhgfhjg <Span {...args} color="terciary" /> bvhgvjgfcfdxcvkbkbjg
      </p>
    </>
  ),
}
