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
}

export default meta
type Story = StoryObj<typeof Image>

export const Default: Story = {
  args: {
    className: '',
    src: 'https://picsum.photos/2000/3000',
    alt: 'story',
    width: '100%',
    ratio: 25,
    rounded: 'rounded-md',
  },
}

export const InText: Story = {
  args: { ...Default.args },
  render: args => (
    <div>
      <p className="p-4">{textContent.slice(0, 500)}</p>
      <Image {...args} alt="imageStory" />
      <p className="p-4">{textContent.slice(0, 500)}</p>
    </div>
  ),
}
