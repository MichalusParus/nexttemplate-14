import type { Meta, StoryObj } from '@storybook/react'

import { SideBar } from '.'

const meta: Meta<typeof SideBar> = {
  title: 'Templates/Admin/SideBar',
  component: SideBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    Story => (
      <div id="sideBarContainer" className="relative h-96 overflow-hidden">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof SideBar>

export const Default: Story = {
  args: { className: '' },
}
