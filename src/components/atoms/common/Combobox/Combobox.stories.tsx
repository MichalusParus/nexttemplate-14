import type { Meta, StoryObj } from '@storybook/react'

import Combobox from '.'

const meta: Meta<typeof Combobox> = {
  title: 'Atoms/Common/Combobox',
  component: Combobox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof Combobox>

export const PrimaryDefault: Story = {
  args: {
    className: '',
    name: 'name',
    hasPopup: 'dialog',
    isOpen: false,
    variant: 'contained',
    color: 'primary',
    size: 'md',
    startIcon: undefined,
    endIcon: undefined,
    isLoading: false,
    fullWidth: false,
    hideShadow: false,
    disableUpperCase: false,
    onClick: () => console.log('Click'),
    children: 'Combobox',
  },
}
