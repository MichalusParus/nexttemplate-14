import type { Meta, StoryObj } from '@storybook/react'

import { Image } from '@/components/atoms/common/Image'

import { ImageViewer } from '.'

const meta: Meta<typeof ImageViewer> = {
  title: 'Molecules/Popovers/ImageViewer',
  component: ImageViewer,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    children: {
      control: false,
    },
  },
  decorators: [
    Story => (
      <div className="flex h-screen items-center justify-center">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ImageViewer>

export const Default: Story = {
  args: {
    className: '',
    name: 'Example img',
    children: (
      <Image
        src="https://picsum.photos/2000/1250"
        alt="imageStory"
        ratio="aspect-video"
        objectFit="object-cover"
      />
    ),
  },
}
