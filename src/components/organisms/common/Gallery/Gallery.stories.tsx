import type { Meta, StoryObj } from '@storybook/nextjs'

import { getGalleryItems } from '../../../../../.storybook/helpers'
import { Gallery } from '.'

const meta: Meta<typeof Gallery> = {
  title: 'Organisms/Common/Gallery',
  component: Gallery,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
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
    width: 'w-[900px]',
    ratio: 'aspect-video',
    variant: 'outlined',
    color: 'primary',
    paperProps: {},
    imageViewerProps: {},
    carouselProps: {},
  },
}
