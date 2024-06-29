import type { Meta, StoryObj } from '@storybook/react'

import { options } from '../../../../../.storybook/helpers'
import ListBox from '.'

const meta: Meta<typeof ListBox> = {
  title: 'Atoms/Common/ListBox',
  component: ListBox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    options: {
      control: false,
    },
  },
}

export default meta
type Story = StoryObj<typeof ListBox>

export const PrimaryDefault: Story = {
  args: {
    className: '',
    name: 'listBoxStory',
    value: [],
    options: options,
    variant: 'text',
    color: 'primary',
    size: 'md',
    hideCHeckbox: false,
    onClick: value => console.log(value),
  },
}

export const HideCheckbox: Story = {
  args: { ...PrimaryDefault.args, hideCHeckbox: true },
}
