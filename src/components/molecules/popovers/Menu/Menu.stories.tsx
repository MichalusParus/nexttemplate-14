import type { Meta, StoryObj } from '@storybook/react'
import { PropsWithChildren, useRef, useState } from 'react'

import { Button } from '@/components/atoms/common/Button'
import { SettingIcon } from '@/components/atoms/icons'

import {
  getMenuOptions,
  menuButtonOptions,
  MenuValuesType,
} from '../../../../../.storybook/helpers'
import { Menu } from '.'
import { MenuItemButton } from './items'
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
  const [menuValues, setMenuValues] = useState<MenuValuesType>({
    checkbox1: null,
    checkbox2: null,
    checkbox3: null,
    switch1: null,
    switch2: null,
    switch3: null,
    radio: 'radio1',
  })

  const options = getMenuOptions(menuValues, {
    checkbox1: () =>
      setMenuValues(prev => ({ ...prev, checkbox1: prev.checkbox1 ? '' : 'checkbox1' })),
    checkbox2: () =>
      setMenuValues(prev => ({ ...prev, checkbox2: prev.checkbox2 ? '' : 'checkbox2' })),
    checkbox3: () =>
      setMenuValues(prev => ({ ...prev, checkbox3: prev.checkbox3 ? '' : 'checkbox3' })),
    switch1: () => setMenuValues(prev => ({ ...prev, switch1: prev.switch1 ? '' : 'switch1' })),
    switch2: () => setMenuValues(prev => ({ ...prev, switch2: prev.switch2 ? '' : 'switch2' })),
    switch3: () => setMenuValues(prev => ({ ...prev, switch3: prev.switch3 ? '' : 'switch3' })),
    radio: (v: string) => setMenuValues(prev => ({ ...prev, radio: v })),
  })
  return <Menu {...args} options={options} />
}

const ControlledMenu = (args: PropsWithChildren<MenuProps>) => {
  const [isOpen, setIsOpen] = useState(false)
  const anchorRef = useRef<HTMLDivElement | null>(null)
  const [menuValues, setMenuValues] = useState<MenuValuesType>({
    checkbox1: null,
    checkbox2: null,
    checkbox3: null,
    switch1: null,
    switch2: null,
    switch3: null,
    radio: 'radio1',
  })

  const options = getMenuOptions(menuValues, {
    checkbox1: () =>
      setMenuValues(prev => ({ ...prev, checkbox1: prev.checkbox1 ? '' : 'checkbox1' })),
    checkbox2: () =>
      setMenuValues(prev => ({ ...prev, checkbox2: prev.checkbox2 ? '' : 'checkbox2' })),
    checkbox3: () =>
      setMenuValues(prev => ({ ...prev, checkbox3: prev.checkbox3 ? '' : 'checkbox3' })),
    switch1: () => setMenuValues(prev => ({ ...prev, switch1: prev.switch1 ? '' : 'switch1' })),
    switch2: () => setMenuValues(prev => ({ ...prev, switch2: prev.switch2 ? '' : 'switch2' })),
    switch3: () => setMenuValues(prev => ({ ...prev, switch3: prev.switch3 ? '' : 'switch3' })),
    radio: (v: string) => setMenuValues(prev => ({ ...prev, radio: v })),
  })
  return (
    <div className="relative" ref={anchorRef}>
      <Button
        id={`${args.name}-menu-button`}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={`${args.name}-menu`}
        aria-owns={`${args.name}-menu`}
        onClick={() => setIsOpen(prev => !prev)}
      >
        Controled Button
      </Button>
      <Menu
        {...args}
        isOpen={isOpen}
        options={options}
        anchorRef={anchorRef}
        setIsOpen={setIsOpen}
      />
    </div>
  )
}

export const PrimaryDefault: Story = {
  args: {
    className: '',
    name: '',
    title: 'menuStory1',
    options: menuButtonOptions,
    isOpen: undefined,
    placement: 'bottom',
    variant: 'outlined',
    color: 'primary',
    width: 'w-40',
    isModal: true,
    onHoverOpen: false,
    anchorRef: undefined,
    buttonProps: undefined,
    dropdownProps: undefined,
    setIsOpen: undefined,
  },
  render: args => <Menu {...args} />,
}

export const StartIcon: Story = {
  args: {
    ...PrimaryDefault.args,
    title: 'menuStory2',
    buttonProps: { startIcon: <SettingIcon /> },
  },
  render: args => <UnControlledMenu {...args} />,
}

export const Placement: Story = {
  args: {
    ...PrimaryDefault.args,
    title: 'menuStory3',
    placement: 'left-start',
  },
  render: args => <UnControlledMenu {...args} />,
}

export const Controled: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'menuStory4',
    title: 'menuStory4',
    buttonProps: { startIcon: <SettingIcon /> },
  },
  render: args => <ControlledMenu {...args} />,
}

export const Children: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'menuStory5',
    title: 'menuStory5',
    options: [],
  },
  render: args => (
    <Menu {...args}>
      <MenuItemButton
        className="rounded-none"
        variant={args.variant}
        color={args.color}
        size={args.size}
      >
        MenuItemButton
      </MenuItemButton>
      <MenuItemButton
        className="rounded-none"
        variant={args.variant}
        color={args.color}
        size={args.size}
      >
        MenuItemButton
      </MenuItemButton>
      <MenuItemButton
        className="rounded-none"
        variant={args.variant}
        color={args.color}
        size={args.size}
      >
        MenuItemButton
      </MenuItemButton>
      <MenuItemButton
        className="rounded-none"
        variant={args.variant}
        color={args.color}
        size={args.size}
      >
        MenuItemButton
      </MenuItemButton>
    </Menu>
  ),
}
