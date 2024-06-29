import type { Meta, StoryObj } from '@storybook/react'

import ImageViewer from '.'
import Image from '@/components/atoms/common/Image'

const meta: Meta<typeof ImageViewer> = {
  title: 'Molecules/Popovers/ImageViewer',
  component: ImageViewer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof ImageViewer>

export const Default: Story = {
  args: {
    alt: 'Example img',
    children: (
      <Image
        src="https://picsum.photos/2000/1250"
        alt="imageStory"
        ratio={75}
        objectFit="object-cover"
      />
    ),
  },
}
