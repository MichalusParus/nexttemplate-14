import type { Meta, StoryObj } from '@storybook/react'
import { PropsWithChildren, useState } from 'react'

import Combobox from '@/components/atoms/common/Combobox'
import SettingIcon from '@/components/atoms/icons/SettingIcon'

import { MenuLinks } from '../../../../../.storybook/helpers'
import Menu from '.'
import { MenuProps } from './Menu'

const meta: Meta<typeof Menu> = {
  title: 'Molecules/Popovers/Menu',
  component: Menu,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: { control: false },
    comboboxProps: { control: false },
    dropdownProps: { control: false },
  },
}

export default meta
type Story = StoryObj<typeof Menu>

const UnControlledMenu = (args: PropsWithChildren<MenuProps>) => {
  return (
    <Menu {...args}>
      <MenuLinks
        length={args.className?.split(' ').includes('scroll') ? 20 : undefined}
        variant={args.variant}
        color={args.color}
      />
    </Menu>
  )
}

const ControlledMenu = (args: PropsWithChildren<MenuProps>) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="relative">
      <Combobox
        name="menuStory"
        hasPopup="menu"
        isOpen={isOpen}
        onClick={() => setIsOpen(prev => !prev)}
      >
        Controled Combobox
      </Combobox>
      <Menu {...args} isOpen={isOpen} setIsOpen={setIsOpen}>
        <MenuLinks variant={args.variant} color={args.color} />
      </Menu>
    </div>
  )
}

export const PrimaryDefault: Story = {
  args: {
    className: 'my-48',
    name: 'menuStory',
    isOpen: undefined,
    placement: 'left',
    variant: 'outlined',
    color: 'primary',
    width: 'min-w-96',
    comboboxProps: undefined,
    dropdownProps: undefined,
    setIsOpen: undefined,
  },
  render: args => <UnControlledMenu {...args} />,
}

export const IconLeft: Story = {
  args: {
    ...PrimaryDefault.args,
    className: 'mb-48',
    comboboxProps: { startIcon: <SettingIcon /> },
  },
  render: args => <UnControlledMenu {...args} />,
}

export const DefaultOpen: Story = {
  args: {
    ...PrimaryDefault.args,
    className: 'mb-48',
    isOpen: true,
    comboboxProps: { startIcon: <SettingIcon /> },
  },
  render: args => <UnControlledMenu {...args} />,
}

export const Right: Story = {
  args: {
    ...PrimaryDefault.args,
    className: 'mb-48',
    comboboxProps: { startIcon: <SettingIcon /> },
    placement: 'right',
  },
  render: args => <UnControlledMenu {...args} />,
}

export const Top: Story = {
  args: {
    ...PrimaryDefault.args,
    className: 'mt-48',
    comboboxProps: { startIcon: <SettingIcon /> },
    placement: 'top',
  },
  render: args => <UnControlledMenu {...args} />,
}

export const Controled: Story = {
  args: {
    ...PrimaryDefault.args,
    className: 'mb-48',
    comboboxProps: { startIcon: <SettingIcon /> },
  },
  render: args => <ControlledMenu {...args} />,
}

export const Scroll: Story = {
  args: {
    ...PrimaryDefault.args,
    className: 'mb-80 scroll',
    children: <MenuLinks length={30} />,
  },
  render: args => <UnControlledMenu {...args} />,
}
