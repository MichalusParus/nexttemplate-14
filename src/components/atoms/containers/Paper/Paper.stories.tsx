import type { Meta, StoryObj } from '@storybook/react'

import { Paper } from '.'

const meta: Meta<typeof Paper> = {
  title: 'Atoms/Containers/Paper',
  component: Paper,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof Paper>

export const PrimaryDefault: Story = {
  args: {
    className: 'min-w-64 min-h-52',
    variant: 'text',
    color: 'primary',
    padding: 'py-2 px-2 md:pt-2 md:pb-3 md:px-5',
    rounded: 'rounded-md',
    hideShadow: false,
    children: undefined,
  },
}

export const Outlined: Story = {
  args: { ...PrimaryDefault.args, variant: 'outlined' },
}

export const Contained: Story = {
  args: { ...PrimaryDefault.args, variant: 'contained' },
}
