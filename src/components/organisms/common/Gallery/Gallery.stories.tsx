import type { Meta, StoryObj } from '@storybook/nextjs'

import { getGalleryItems } from '../../../../../.storybook/helpers'
import { Gallery } from '.'

const meta: Meta<typeof Gallery> = {
  title: 'Organisms/Common/Gallery',
  component: Gallery,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    items: { control: false },
  },
}

export default meta
type Story = StoryObj<typeof Gallery>

export const Default: Story = {
  args: {
    className: '',
    items: getGalleryItems(18),
    label: 'Gallery',
    variant: 'outlined',
    color: 'primary',
    width: 'w-full',
    ratio: 'aspect-video',
    paperProps: {},
    imageViewerProps: {},
    carouselProps: {},
  },
}
