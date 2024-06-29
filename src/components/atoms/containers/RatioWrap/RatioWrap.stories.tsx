import type { Meta, StoryObj } from '@storybook/react'

import RatioWrap from '.'

const meta: Meta<typeof RatioWrap> = {
  title: 'Atoms/Containers/RatioWrap',
  component: RatioWrap,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj<typeof RatioWrap>

export const Default: Story = {
  args: { className: '', ratio: 50, width: '100%', children: undefined },
}
