import type { Meta, StoryObj } from '@storybook/nextjs'
import { useState } from 'react'

import { textContent } from '../../../../../.storybook/helpers'
import { Image } from '.'

const meta: Meta<typeof Image> = {
  title: 'Atoms/Common/Image',
  component: Image,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    objectPosition: {
      control: { type: 'radio' },
    },
  },
}

const ImageWithErrorFallback = (args: React.ComponentProps<typeof Image>) => {
  const [hasError, setHasError] = useState(false)
  if (hasError) {
    return (
      <div className="flex aspect-video w-full items-center justify-center bg-dark-950/25">
        <p className="text-sm text-dark-500">Image failed to load</p>
      </div>
    )
  }
  return <Image {...args} alt={args.alt} onError={() => setHasError(true)} />
}

export default meta
type Story = StoryObj<typeof Image>

export const Default: Story = {
  args: {
    className: '',
    src: 'https://picsum.photos/2000/3000',
    alt: 'story',
    width: 'w-full',
    ratio: 'aspect-video',
    objectFit: 'object-contain',
    objectPosition: 'object-center',
  },
}

export const Cover: Story = {
  args: { ...Default.args, objectFit: 'object-cover' },
}

export const Fill: Story = {
  args: { ...Default.args, objectFit: 'object-fill' },
}

export const InText: Story = {
  args: { ...Default.args, objectFit: 'object-cover' },
  render: args => (
    <div>
      <p className="py-4">{textContent.slice(0, 490)}</p>
      <Image {...args} alt="imageStory" />
      <p className="py-4">{textContent.slice(0, 500)}</p>
    </div>
  ),
}

export const WithBlurPlaceholder: Story = {
  args: {
    ...Default.args,
    objectFit: 'object-cover',
    placeholder: 'blur',
    blurDataURL:
      'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91teleQzWrqdAQz5NuEOydP2x+K1dEoqSWWBH//2Q==',
  },
}

export const WithErrorFallback: Story = {
  args: { ...Default.args, src: '/broken-image-url.jpg', alt: 'broken image' },
  render: args => <ImageWithErrorFallback {...args} />,
}
