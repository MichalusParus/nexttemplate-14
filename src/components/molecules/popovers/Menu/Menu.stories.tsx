import type { Meta, StoryObj } from '@storybook/react'

import SettingIcon from '@/components/atoms/icons/SettingIcon'

import { MenuLinks } from '../../../../../.storybook/helpers'
import Menu from '.'

const meta: Meta<typeof Menu> = {
  title: 'Molecules/Popovers/Menu',
  component: Menu,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj<typeof Menu>

export const Default: Story = {
  args: {
    children: <MenuLinks />,
    className: 'className',
    name: 'menuStory',
    title: 'Menu button',
  },
  render: args => (
    <div className="h-[30vh]">
      <Menu {...args} />
    </div>
  ),
}

export const Right: Story = {
  args: {
    children: <MenuLinks />,
    className: 'className',
    name: 'menuStory',
    icon: <SettingIcon />,
    placement: 'right',
  },
  render: args => (
    <div className="h-[30vh]">
      <Menu {...args} />
    </div>
  ),
}

export const Top: Story = {
  args: {
    children: <MenuLinks />,
    className: 'className',
    name: 'menuStory',
    title: 'Menu button',
    placement: 'top',
  },
  render: args => (
    <div className="h-[30vh] pt-32">
      <Menu {...args} />
    </div>
  ),
}

export const Scroll: Story = {
  args: {
    children: <MenuLinks />,
    className: 'className',
    name: 'menuStory',
    title: 'Menu button',
  },
  render: args => (
    <div className="h-[45vh]">
      <Menu {...args} />
    </div>
  ),
}
