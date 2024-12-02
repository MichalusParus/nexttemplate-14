import type { Meta, StoryObj } from '@storybook/react'

import { Header } from '.'

const meta: Meta<typeof Header> = {
  title: 'Templates/Main/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    Story => (
      <div className="h-96">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Header>

export const Default: Story = {
  args: { className: '' },
}
