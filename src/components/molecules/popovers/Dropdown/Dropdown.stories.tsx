import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import Combobox from '@/components/atoms/common/Combobox'

import { textContent } from '../../../../../.storybook/helpers'
import { Dropdown, DropdownProps } from './Dropdown'

const meta: Meta<typeof Dropdown> = {
  title: 'Molecules/Popovers/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

const DropdownWithHooks = ({ args }: { args: DropdownProps }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="flex h-[50vh] w-full items-center justify-center">
      <div className="relative">
        <Combobox
          name="storybookDrawer"
          variant="text"
          hasPopup="menu"
          isOpen={isOpen}
          onClick={() => setIsOpen(prev => !prev)}
        >
          Combobox for Dropdown
        </Combobox>
        <Dropdown {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
          {args.children}
        </Dropdown>
      </div>
    </div>
  )
}

export default meta
type Story = StoryObj<typeof Dropdown>

export const Default: Story = {
  args: { children: textContent.slice(0, 300) },
  render: args => <DropdownWithHooks args={args} />,
}

export const Left: Story = {
  args: {
    children: textContent.slice(0, 300),
    placement: 'left',
    width: 'w-96',
  },
  render: args => <DropdownWithHooks args={args} />,
}

export const Right: Story = {
  args: {
    children: <div className="pt-1">{textContent.slice(0, 300)}</div>,
    placement: 'right',
    width: 'w-96',
  },
  render: args => <DropdownWithHooks args={args} />,
}

export const Top: Story = {
  args: {
    children: <div className="pb-1">{textContent.slice(0, 300)}</div>,
    placement: 'top',
  },
  render: args => <DropdownWithHooks args={args} />,
}
