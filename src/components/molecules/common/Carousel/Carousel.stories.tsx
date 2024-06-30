import type { Meta, StoryObj } from '@storybook/react'

import Image from '@/components/atoms/common/Image'
import Paper from '@/components/atoms/containers/Paper'

import Carousel from '.'

const meta: Meta<typeof Carousel> = {
  title: 'Molecules/Common/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
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
        <Image
          src="https://picsum.photos/500/300"
          key={index}
          alt="img"
          width="100%"
          ratio={75}
          fill
        />
      ))}
    </Carousel>
  ),
}

export const Panels: Story = {
  args: {
    ...Default.args,
    pages: cardsArray.filter((_, index) => index % 4 === 0).length,
  },
  render: args => (
    <Carousel {...args}>
      {cardsArray
        .filter((_, index) => index % 4 === 0)
        .map((_, index) => (
          <div key={index} className="Panel flex flex-wrap justify-center gap-4">
            {cardsArray.slice(index * 4, index * 4 + 4).map(item => (
              <Paper key={item} className="flex h-28 w-48 items-center justify-center">
                {'Card ' + (item + 1)}
              </Paper>
            ))}
          </div>
        ))}
    </Carousel>
  ),
}
