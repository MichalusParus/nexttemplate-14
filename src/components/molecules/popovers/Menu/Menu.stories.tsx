import type { Meta, StoryObj } from '@storybook/react'
import { PropsWithChildren, useRef, useState } from 'react'

import { Button } from '@/components/atoms/common/Button'
import { ChevronIcon, SettingIcon } from '@/components/atoms/icons'

import { MenuLinks } from '../../../../../.storybook/helpers'
import { Menu } from '.'
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
    buttonProps: { control: false },
    dropdownProps: { control: false },
    width: { control: 'text' },
    placement: {
      control: { type: 'radio' },
    },
  },
}

export default meta
type Story = StoryObj<typeof Menu>

const UnControlledMenu = (args: PropsWithChildren<MenuProps> & { index?: number }) => {
  return (
    <Menu {...args}>
      <MenuLinks
        length={args.className?.split(' ').includes('scroll') ? 20 : undefined}
        variant={args.variant}
        color={args.color}
        index={args.index}
      />
    </Menu>
  )
}

const ControlledMenu = (args: PropsWithChildren<MenuProps>) => {
  const [isOpen, setIsOpen] = useState(false)
  const parentRef = useRef<HTMLDivElement | null>(null)
  return (
    <div className="relative" ref={parentRef}>
      <Button
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={args.name}
        aria-owns={args.name}
        onClick={() => setIsOpen(prev => !prev)}
      >
        Controled Button
      </Button>
      <Menu {...args} isOpen={isOpen} parentRef={parentRef} setIsOpen={setIsOpen}>
        <MenuLinks variant={args.variant} color={args.color} />
      </Menu>
    </div>
  )
}

const NestedMenu = (args: PropsWithChildren<MenuProps>) => {
  return (
    <Menu {...args} dropdownProps={{ modal: true }}>
      <UnControlledMenu
        index={1}
        name="menuStory1"
        placement="right-start"
        variant={args.variant}
        color={args.color}
        width="min-w-max"
        buttonProps={{
          className: 'border-none w-full justify-between',
          endIcon: <ChevronIcon className="-rotate-90" />,
          role: 'menuitem',
          children: 'Submenu',
        }}
      />
      <UnControlledMenu
        index={2}
        name="menuStory2"
        placement="right-start"
        variant={args.variant}
        color={args.color}
        width="min-w-max"
        buttonProps={{
          className: 'border-none w-full justify-between',
          endIcon: <ChevronIcon className="-rotate-90" />,
          role: 'menuitem',
          children: 'Submenu',
        }}
      />
      <UnControlledMenu
        index={3}
        name="menuStory3"
        placement="right-start"
        variant={args.variant}
        color={args.color}
        width="min-w-max"
        buttonProps={{
          className: 'border-none w-full justify-between',
          endIcon: <ChevronIcon className="-rotate-90" />,
          role: 'menuitem',
          children: 'Submenu',
        }}
      />
      <UnControlledMenu
        index={4}
        name="menuStory4"
        placement="right-start"
        variant={args.variant}
        color={args.color}
        width="min-w-max"
        buttonProps={{
          className: 'border-none w-full justify-between',
          endIcon: <ChevronIcon className="-rotate-90" />,
          role: 'menuitem',
          children: 'Submenu',
        }}
      />
    </Menu>
  )
}

export const PrimaryDefault: Story = {
  args: {
    className: '',
    name: 'menuStory',
    isOpen: undefined,
    placement: 'bottom',
    variant: 'outlined',
    color: 'primary',
    width: undefined,
    parentRef: undefined,
    buttonProps: undefined,
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
    buttonProps: { startIcon: <SettingIcon /> },
  },
  render: args => <UnControlledMenu {...args} />,
}

export const Right: Story = {
  args: {
    ...PrimaryDefault.args,
    className: '',
    name: 'menuStory4',
    buttonProps: { startIcon: <SettingIcon /> },
    placement: 'bottom-end',
  },
  render: args => <UnControlledMenu {...args} />,
}

export const Top: Story = {
  args: {
    ...PrimaryDefault.args,
    className: '',
    name: 'menuStory5',
    buttonProps: { startIcon: <SettingIcon /> },
    placement: 'top',
  },
  render: args => <UnControlledMenu {...args} />,
}

export const Controled: Story = {
  args: {
    ...PrimaryDefault.args,
    className: '',
    name: 'menuStory6',
    buttonProps: { startIcon: <SettingIcon /> },
  },
  render: args => <ControlledMenu {...args} />,
}

export const Scroll: Story = {
  args: {
    ...PrimaryDefault.args,
    className: 'scroll',
    name: 'menuStory7',
  },
  render: args => <UnControlledMenu {...args} />,
}

export const Nested: Story = {
  args: {
    ...PrimaryDefault.args,
    className: 'scroll',
    name: 'menuStory7',
    dropdownProps: { width: 'min-w-96' },
  },
  render: args => <NestedMenu {...args} />,
}
