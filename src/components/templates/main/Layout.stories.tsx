import type { Meta, StoryObj } from '@storybook/nextjs'

import { Paper } from '@/components/atoms/containers/Paper'

import { Footer } from './Footer'
import { Header } from './Header'
import { Main } from './Main'

const meta: Meta<typeof Main> = {
  title: 'Templates/Main/Layout',
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
  render: () => (
    <>
      <Header />
      <Main>
        <Paper className="h-[50vh] w-full" />
      </Main>
      <Footer />
    </>
  ),
}
