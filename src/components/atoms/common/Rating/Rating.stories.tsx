import type { Meta, StoryObj } from '@storybook/nextjs'

import { StarIcon } from '../../icons/StarIcon'
import { Rating } from '.'

const meta: Meta<typeof Rating> = {
  title: 'Atoms/Common/Rating',
  component: Rating,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    icon: { control: false },
    hue: { control: { type: 'range', min: 0, max: 360, step: 1 } },
  },
}

export default meta
type Story = StoryObj<typeof Rating>

export const Default: Story = {
  args: {
    value: 3,
    max: 5,
    icon: <StarIcon />,
    hue: 85,
    size: 'md',
  },
}

export const FractionalFill: Story = {
  args: {
    value: 3.5,
    max: 5,
    icon: <StarIcon />,
    hue: 85,
    size: 'md',
  },
}

const HueGradientTemplate = ({
  value,
  max,
  hueFrom,
  hueTo,
  size,
}: {
  value: number
  max: number
  hueFrom: number
  hueTo: number
  size: 'sm' | 'md' | 'lg' | 'none'
}) => <Rating value={value} max={max} hue={[hueFrom, hueTo]} size={size} />

export const HueGradient: StoryObj<typeof HueGradientTemplate> = {
  render: args => <HueGradientTemplate {...args} />,
  args: {
    value: 5,
    max: 5,
    hueFrom: 0,
    hueTo: 145,
    size: 'md',
  },
}

export const Compact: Story = {
  args: {
    value: 3,
    max: 5,
    icon: <StarIcon />,
    hue: 85,
    compact: true,
    size: 'md',
  },
}
