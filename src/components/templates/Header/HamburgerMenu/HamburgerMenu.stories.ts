import type { Meta, StoryObj } from '@storybook/react'

import HamburgerMenu from '.'

const meta: Meta<typeof HamburgerMenu> = {
  title: 'Templates/HamburgerMenu',
  component: HamburgerMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj<typeof HamburgerMenu>

export const Default: Story = {
  args: { className: '' },
}
