import type { Meta, StoryObj } from '@storybook/react'

import { SimpleHeader } from '.'

const meta: Meta<typeof SimpleHeader> = {
  title: 'Templates/Simple/SimpleHeader',
  component: SimpleHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'primary',
    },
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
type Story = StoryObj<typeof SimpleHeader>

export const Default: Story = {
  args: { className: '' },
}
