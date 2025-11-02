import type { Meta, StoryObj } from '@storybook/react'
import { PropsWithChildren, useState } from 'react'

import { Image } from '@/components/atoms/common/Image'
import { Paper } from '@/components/atoms/containers/Paper'

import { getGalleryItems } from '../../../../../.storybook/helpers'
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

const ControlledCarousel = (args: PropsWithChildren<CarouselProps>) => {
  const [currentPage, setCurrentPage] = useState(1)
  return (
    <Carousel {...args} currentPage={currentPage} setCurrentPage={setCurrentPage}>
      {getGalleryItems(8).map((img, index) => (
        <CarouselItem key={index}>
          <Image src={img.src} alt={img.alt} ratio="aspect-video" width="w-full" />
        </CarouselItem>
      ))}
    </Carousel>
  )
}

export const Default: Story = {
  args: {
    className: 'className',
    pages: 8,
    label: undefined,
    width: 'w-full',
    ratio: 'aspect-video',
    currentPage: undefined,
    autoplay: undefined,
    autoplayInterval: undefined,
    hideArrows: false,
    hideControlDotts: false,
    setCurrentPage: undefined,
  },
  render: args => (
    <Carousel {...args}>
      {getGalleryItems(8).map((img, index) => (
        <CarouselItem key={index}>
          <Image src={img.src} alt={img.alt} width="w-full" />
        </CarouselItem>
      ))}
    </Carousel>
  ),
}

export const Controled: Story = {
  args: { ...Default.args },
  render: args => <ControlledCarousel {...args} />,
}

export const Autoplay: Story = {
  args: {
    ...Default.args,
    autoplay: 'on',
    autoplayInterval: 3000,
  },
  render: args => (
    <Carousel {...args}>
      {getGalleryItems(8).map((img, index) => (
        <CarouselItem key={index}>
          <Image
            src={img.src}
            alt={img.alt}
            ratio="aspect-video"
            width="w-full"
            role="group"
            aria-roledescription="slide"
          />
        </CarouselItem>
      ))}
    </Carousel>
  ),
}

export const HideControls: Story = {
  args: { ...Default.args, autoplay: 'on', hideControlDotts: true, hideArrows: true },
  render: args => <ControlledCarousel {...args} />,
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
          <CarouselItem key={index}>
            <div
              key={index}
              className="Panel relative flex h-full w-full flex-wrap justify-center gap-2"
            >
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
          </CarouselItem>
        ))}
    </Carousel>
  ),
}
