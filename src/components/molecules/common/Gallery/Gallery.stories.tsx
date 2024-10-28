import type { Meta, StoryObj } from '@storybook/react'

import { getGalleryItems } from '../../../../../.storybook/helpers'
import Gallery from '.'

const meta: Meta<typeof Gallery> = {
  title: 'Molecules/Common/Gallery',
  component: Gallery,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj<typeof Gallery>

export const Default: Story = {
  args: {
    className: '',
    name: 'galleryStory',
    items: getGalleryItems(18),
    width: 'w-full',
    ratio: 'aspect-w-16 aspect-h-9',
  },
}
