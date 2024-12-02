import type { Meta, StoryObj } from '@storybook/react'

import { Paper } from '@/components/atoms/containers/Paper'

import { Main } from '.'

const meta: Meta<typeof Main> = {
  title: 'Templates/Main/Main',
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
  args: { className: '', children: <Paper className="h-96 w-full" /> },
}
