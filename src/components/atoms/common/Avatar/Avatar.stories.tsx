import type { Meta, StoryObj } from '@storybook/react'

import { Avatar } from '.'

const meta: Meta<typeof Avatar> = {
  title: 'Atoms/Common/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof Avatar>

export const IconDefault: Story = {
  args: {
    className: '',
    src: undefined,
    username: undefined,
    variant: 'outlined',
    color: 'primary',
    size: 'md',
  },
}

export const Username: Story = {
  args: { ...IconDefault.args, username: 'User name' },
}

export const ProfilePic: Story = {
  args: {
    ...IconDefault.args,
    username: 'User name',
    src: 'https://xsgames.co/randomusers/avatar.php?g=male',
  },
}
