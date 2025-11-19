import type { Meta, StoryObj } from '@storybook/nextjs'

import { Paper } from '@/components/atoms/containers/Paper'

import { AdminMain } from '.'

const meta: Meta<typeof AdminMain> = {
  title: 'Templates/Admin/AdminMain',
  component: AdminMain,
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
type Story = StoryObj<typeof AdminMain>

export const Default: Story = {
  args: { className: '', children: <Paper className="h-96 w-full" /> },
}
