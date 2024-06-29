import type { Meta, StoryObj } from '@storybook/react'
import Image from 'next/image'

import ImageViewer from '.'

const meta: Meta<typeof ImageViewer> = {
  title: 'Molecules/Popovers/ImageViewer',
  component: ImageViewer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreened',
  },
}

export default meta
type Story = StoryObj<typeof ImageViewer>

export const Default: Story = {
  args: {
    alt: 'Example img',
    children: (
      <Image alt="imageStory" width={500} height={250} src="https://picsum.photos/500/250" />
    ),
  },
}
