import type { Meta, StoryObj } from '@storybook/react'

import { CircularLoader } from '.'

const meta: Meta<typeof CircularLoader> = {
  title: 'Atoms/Loaders/CircularLoader',
  component: CircularLoader,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof CircularLoader>

export const PrimaryDefault: Story = {
  args: {
    className: '',
    color: 'primary',
    size: 'md',
    label: 'Loading...',
    hideLabel: false,
  },
}

export const Label: Story = {
  args: {
    ...PrimaryDefault.args,
    label: 'Custom Label...',
  },
}

export const HideLabel: Story = {
  args: {
    ...PrimaryDefault.args,
    hideLabel: true,
  },
}

export const CenteredScreen: Story = {
  args: {
    ...PrimaryDefault.args,
    className: 'h-96 pt-32',
  },
}
