import type { Meta, StoryObj } from '@storybook/react'

import { Main } from '.'

const meta: Meta<typeof Main> = {
  title: 'Templates/Main',
  component: Main,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    children: {
      control: false,
    },
  },
}

export default meta
type Story = StoryObj<typeof Main>

export const Default: Story = {
  args: { className: '', children: <div>Content</div> },
}
