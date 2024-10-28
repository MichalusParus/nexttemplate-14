import type { Meta, StoryObj } from '@storybook/react'

import { ComponentTemplate } from '.'

const meta: Meta<typeof ComponentTemplate> = {
  title: 'Templates/ComponentTemplate',
  component: ComponentTemplate,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof ComponentTemplate>

export const Default: Story = {
  args: { className: 'className' },
}
