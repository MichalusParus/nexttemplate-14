import type { Meta, StoryObj } from '@storybook/nextjs'

import { HamburgerMenu } from '.'

const meta: Meta<typeof HamburgerMenu> = {
  title: 'Templates/Main/HamburgerMenu',
  component: HamburgerMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'primary',
    },
  },
  decorators: [
    Story => (
      <div className="h-96 w-14 p-2">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof HamburgerMenu>

export const Default: Story = {
  args: { className: '' },
}
