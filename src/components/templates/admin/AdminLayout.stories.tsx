import type { Meta, StoryObj } from '@storybook/react'

import { Paper } from '@/components/atoms/containers/Paper'

import { AdminMain } from './AdminMain'
import { SideBar } from './SideBar'

const meta: Meta = {
  title: 'Templates/Admin/Layout',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    children: {
      control: false,
    },
  },
  decorators: [
    Story => (
      <div id="sideBarContainer" className="relative h-[60vh] overflow-hidden">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <div className="relative">
      <SideBar />
      <AdminMain>
        <Paper className="h-96 w-full" />
      </AdminMain>
    </div>
  ),
}
