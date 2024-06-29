import type { Meta, StoryObj } from '@storybook/react'
import Image from 'next/image'

import Paper from '@/components/atoms/containers/Paper'

import Carousel from '.'

const meta: Meta<typeof Carousel> = {
  title: 'Molecules/Common/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
}

const imgArray = new Array(10).fill(null)
const cardsArray = new Array(20).fill(null).map((item, index) => index)

export default meta
type Story = StoryObj<typeof Carousel>

export const Default: Story = {
  args: { className: 'className', pages: 10, width: '600px', ratio: 50 },
  render: args => (
    <Carousel {...args}>
      {imgArray.map((img, index) => (
        <Image src="https://picsum.photos/500/300" key={index} alt="img" width={600} height={300} />
      ))}
    </Carousel>
  ),
}

export const Panels: Story = {
  args: {
    className: 'className',
    pages: cardsArray.filter((item, index) => index % 4 === 0).length,
    width: '50%',
    ratio: 70,
  },
  render: args => (
    <Carousel {...args}>
      {cardsArray
        .filter((item, index) => index % 4 === 0)
        .map((img, index) => (
          <div key={index} className="Panel flex w-full flex-wrap justify-center gap-4">
            {cardsArray.slice(index * 4, index * 4 + 4).map(item => (
              <Paper key={item} className="flex h-36 w-[40%] items-center justify-center">
                {'Card ' + (item + 1)}
              </Paper>
            ))}
          </div>
        ))}
    </Carousel>
  ),
}
