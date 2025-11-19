import type { Meta, StoryObj } from '@storybook/nextjs'

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
  args: { className: '' },
  globals: {
    backgrounds: {
      value: 'primary'
    }
  },
}

export const Menu: Story = {
  args: { ...Default.args, menu: true },
  globals: {
    backgrounds: {
      value: 'bg'
    }
  },
}
