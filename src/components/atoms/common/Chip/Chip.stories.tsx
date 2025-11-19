import type { Meta, StoryObj } from '@storybook/nextjs'

import { ProfileIcon, XIcon } from '../../icons'
import { Avatar } from '../Avatar'
import { Button } from '../Button'
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
    endIcon: { control: false },
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
    endIcon: undefined,
    children: 'Chip',
  },
}

export const Title: Story = {
  args: {
    ...PrimaryDefault.args,
    className: 'px-3',
    title: 'Title',
    children: 'Description',
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
    className: 'pl-0',
    startIcon: <ProfileIcon />,
  },
}

export const EndIconButton: Story = {
  args: {
    ...PrimaryDefault.args,
    className: 'pr-0',
    endIcon: (
      <Button
        className="rounded-full border-0 text-current"
        startIcon={<XIcon />}
        variant="text"
        color="none"
        size="none"
        hideShadow
        onClick={() => console.log('click')}
      />
    ),
  },
}

export const AvatarTitleChip: Story = {
  args: {
    ...PrimaryDefault.args,
    className: 'pl-0',
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

export const AvatarOnClickChip: Story = {
  args: {
    ...PrimaryDefault.args,
    className: 'px-0',
    title: 'Jack Black',
    children: 'some info',
    endIcon: (
      <Button
        className="rounded-full border-0 text-current"
        startIcon={<XIcon />}
        variant="text"
        color="none"
        size="none"
        hideShadow
        onClick={() => console.log('click')}
      />
    ),
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
