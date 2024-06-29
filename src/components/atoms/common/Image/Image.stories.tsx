import type { Meta, StoryObj } from '@storybook/react'

import { textContent } from '../../../../../.storybook/helpers'
import Image from '.'

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

export default meta
type Story = StoryObj<typeof Image>

export const Default: Story = {
  args: {
    className: '',
    src: 'https://picsum.photos/2000/3000',
    alt: 'story',
    width: '100%',
    ratio: 75,
    objectFit: 'object-contain',
    objectPosition: 'object-center',
    rounded: 'rounded-md',
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
