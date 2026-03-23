import type { Meta, StoryObj } from '@storybook/nextjs'
import { useState } from 'react'

import { Image } from '@/components/atoms/common/Image'
import { Paper } from '@/components/atoms/containers/Paper'

import { getCarouselItems, getGalleryItems } from '../../../../../.storybook/helpers'
import { Carousel } from '.'
import { CarouselProps } from './Carousel'
import { CarouselItem } from './CarouselItem'

const meta: Meta<typeof Carousel> = {
  title: 'Molecules/Common/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
}

const cardsArray = Array.from({ length: 20 }, (_, i) => i)

export default meta
type Story = StoryObj<typeof Carousel>

const ControlledCarousel = (args: CarouselProps) => {
  const [currentPage, setCurrentPage] = useState(1)
  return (
    <Carousel
      {...args}
      items={getCarouselItems(8)}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
    />
  )
}

export const Default: Story = {
  args: {
    className: 'className',
    items: getCarouselItems(8),
    label: undefined,
    width: 'w-full',
    ratio: 'aspect-video',
    currentPage: undefined,
    noItemsLabel: '',
    autoplay: undefined,
    autoplayInterval: undefined,
    hideArrows: false,
    hideControlDots: false,
    setCurrentPage: undefined,
    onPageChange: undefined,
  },
}

export const Controled: Story = {
  args: { ...Default.args },
  render: args => <ControlledCarousel {...args} />,
}

export const Autoplay: Story = {
  args: {
    ...Default.args,
    items: getCarouselItems(8),
    autoplay: 'on',
    autoplayInterval: 3000,
  },
}

export const HideControls: Story = {
  args: {
    ...Default.args,
    items: getCarouselItems(8),
    autoplay: 'on',
    hideControlDots: true,
    hideArrows: true,
  },
  render: args => <ControlledCarousel {...args} />,
}

export const Panels: Story = {
  args: {
    ...Default.args,
    items: cardsArray
      .filter((_, index) => index % 4 === 0)
      .map((_, index) => ({
        label: `Panel ${index + 1}`,
        content: (
          <div className="Panel relative flex h-full w-full flex-wrap justify-center gap-2">
            {cardsArray.slice(index * 4, index * 4 + 4).map(item => (
              <Paper
                key={item}
                variant="contained"
                className="flex h-28 w-1/3 shrink-0 items-center justify-center"
              >
                {'Card ' + (item + 1)}
              </Paper>
            ))}
          </div>
        ),
      })),
  },
}

export const WithChildren: Story = {
  args: {
    className: 'className',
    pagesCount: 8,
    label: undefined,
    width: 'w-full',
    ratio: 'aspect-video',
    autoplay: undefined,
    hideArrows: false,
    hideControlDots: false,
  },
  render: args => (
    <Carousel {...args}>
      {getGalleryItems(8).map((img, index) => (
        <CarouselItem key={index}>
          <Image src={img.src} alt={img.label} width="w-full" />
        </CarouselItem>
      ))}
    </Carousel>
  ),
}
