import type { Meta, StoryObj } from '@storybook/nextjs'
import { useState } from 'react'

import { Image } from '@/components/atoms/common/Image'

import { ImageViewer, ImageViewerProps } from '.'

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
      <div className="flex min-h-screen items-center justify-center">
        <Story />
      </div>
    ),
  ],
}

const ImageViewerWithHooks = (args: ImageViewerProps) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <ImageViewer {...args} isOpen={isOpen} setIsOpen={setIsOpen}>
      {args.children}
    </ImageViewer>
  )
}

export default meta
type Story = StoryObj<typeof ImageViewer>

export const Default: Story = {
  args: {
    className: '',
    name: 'Example img',
    label: 'Example img',
    portalContainerId: undefined,
    isOpen: undefined,
    setIsOpen: undefined,
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

export const Controlled: Story = {
  args: {
    ...Default.args,
    isOpen: false,
  },
  render: args => <ImageViewerWithHooks {...args} />,
}
