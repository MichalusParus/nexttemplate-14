import type { Meta, StoryObj } from '@storybook/react'

import { PlusIcon, ProfileIcon } from '../../icons'
import { Avatar } from '../Avatar'
import { Chip } from '.'

const meta: Meta<typeof Chip> = {
  title: 'Atoms/Common/Chip',
  component: Chip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    startIcon: { control: false },
  },
}

export default meta
type Story = StoryObj<typeof Chip>

export const PrimaryDefault: Story = {
  args: {
    className: '',
    variant: 'contained',
    color: 'primary',
    size: 'md',
    startIcon: undefined,
    onClick: undefined,
    buttonProps: undefined,
    children: 'Chip',
  },
}

export const TitleOnly: Story = {
  args: {
    ...PrimaryDefault.args,
    title: 'Jack Black',
    children: undefined,
  },
}

export const StartIcon: Story = {
  args: {
    ...PrimaryDefault.args,
    startIcon: <ProfileIcon />,
  },
}

export const OnClick: Story = {
  args: { ...PrimaryDefault.args, onClick: () => console.log('click') },
}

export const CustomIcon: Story = {
  args: {
    ...PrimaryDefault.args,
    buttonProps: { startIcon: <PlusIcon /> },
    onClick: () => console.log('click'),
  },
}

export const AvatarTitleChip: Story = {
  args: {
    ...PrimaryDefault.args,
    title: 'Jack Black',
    children: 'some info',
  },
  render: args => (
    <Chip
      {...args}
      startIcon={
        <Avatar variant={args.variant} color={args.color} size={args.size} username="Jack Black" />
      }
    />
  ),
}

export const AvatarOnclickChip: Story = {
  args: {
    ...PrimaryDefault.args,
    title: 'Jack Black',
    onClick: () => console.log('click'),
    children: 'some info',
  },
  render: args => (
    <Chip
      {...args}
      startIcon={
        <Avatar
          color={args.color}
          size={args.size}
          username="Jack Black"
          src="https://xsgames.co/randomusers/avatar.php?g=male"
        />
      }
    />
  ),
}
