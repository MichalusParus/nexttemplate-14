import type { Meta, StoryObj } from '@storybook/react'
import { PropsWithChildren, useRef, useState } from 'react'

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
    placement: {
      control: { type: 'radio' },
    },
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
  const parentRef = useRef<HTMLDivElement | null>(null)
  return (
    <div className="relative" ref={parentRef}>
      <Combobox
        className=""
        name={args.name}
        hasPopup="menu"
        isOpen={isOpen}
        onClick={() => setIsOpen(prev => !prev)}
      >
        Controled Combobox
      </Combobox>
      <Menu {...args} isOpen={isOpen} parentRef={parentRef} setIsOpen={setIsOpen}>
        <MenuLinks variant={args.variant} color={args.color} />
      </Menu>
    </div>
  )
}

export const PrimaryDefault: Story = {
  args: {
    className: '',
    name: 'menuStory',
    isOpen: undefined,
    placement: 'bottom-start',
    variant: 'outlined',
    color: 'primary',
    width: 'min-w-96',
    parentRef: undefined,
    comboboxProps: undefined,
    dropdownProps: undefined,
    setIsOpen: undefined,
  },
  render: args => <UnControlledMenu {...args} />,
}

export const IconLeft: Story = {
  args: {
    ...PrimaryDefault.args,
    className: '',
    name: 'menuStory2',
    comboboxProps: { startIcon: <SettingIcon /> },
  },
  render: args => <UnControlledMenu {...args} />,
}

export const DefaultOpen: Story = {
  args: {
    ...PrimaryDefault.args,
    className: '',
    name: 'menuStory3',
    isOpen: true,
    comboboxProps: { startIcon: <SettingIcon /> },
  },
  render: args => <UnControlledMenu {...args} />,
}

export const Right: Story = {
  args: {
    ...PrimaryDefault.args,
    className: '',
    name: 'menuStory4',
    comboboxProps: { startIcon: <SettingIcon /> },
    placement: 'bottom-end',
  },
  render: args => <UnControlledMenu {...args} />,
}

export const Top: Story = {
  args: {
    ...PrimaryDefault.args,
    className: '',
    name: 'menuStory5',
    comboboxProps: { startIcon: <SettingIcon /> },
    placement: 'top',
  },
  render: args => <UnControlledMenu {...args} />,
}

export const Controled: Story = {
  args: {
    ...PrimaryDefault.args,
    className: '',
    name: 'menuStory6',
    comboboxProps: { startIcon: <SettingIcon /> },
  },
  render: args => <ControlledMenu {...args} />,
}

export const Scroll: Story = {
  args: {
    ...PrimaryDefault.args,
    className: 'scroll',
    name: 'menuStory7',
    children: <MenuLinks length={30} />,
  },
  render: args => <UnControlledMenu {...args} />,
}
