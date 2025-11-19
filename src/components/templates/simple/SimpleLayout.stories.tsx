import type { Meta, StoryObj } from '@storybook/nextjs'

import { Paper } from '@/components/atoms/containers/Paper'

import { SimpleHeader } from './SimpleHeader'
import { SimpleMain } from './SimpleMain'

const meta: Meta = {
  title: 'Templates/Simple/SimpleLayout',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'primary',
    },
  },
  argTypes: {
    children: {
      control: false,
    },
  },
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <>
      <SimpleHeader />
      <SimpleMain>
        <Paper className="h-96 w-full md:w-72" />
      </SimpleMain>
    </>
  ),
}
