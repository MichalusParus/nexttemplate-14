import type { Meta, StoryObj } from '@storybook/react'

import { Nav } from '.'

const meta: Meta<typeof Nav> = {
  title: 'Templates/Common/Nav',
  component: Nav,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'primary',
    },
  },
}

export default meta
type Story = StoryObj<typeof Nav>

export const Default: Story = {
  parameters: {
    backgrounds: {
      default: 'primary',
    },
  },
  args: { className: '' },
}

export const Menu: Story = {
  parameters: {
    backgrounds: {
      default: 'bg',
    },
  },
  args: { ...Default.args, menu: true },
}
