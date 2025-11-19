import type { Meta, StoryObj } from '@storybook/nextjs'

import { Paper } from '@/components/atoms/containers/Paper'

import { SimpleMain } from '.'

const meta: Meta<typeof SimpleMain> = {
  title: 'Templates/Simple/SimpleMain',
  component: SimpleMain,
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
type Story = StoryObj<typeof SimpleMain>

export const Default: Story = {
  args: { className: '', children: <Paper className="h-96 w-full" /> },
}
