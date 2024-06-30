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
    layout: 'padded',
  },
}

const DropdownWithHooks = (args: DropdownProps) => {
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
          <div role="menu" aria-hidden={!isOpen}>
            {textContent.slice(0, 300)}
          </div>
        </Dropdown>
      </div>
    </div>
  )
}

export default meta
type Story = StoryObj<typeof Dropdown>

export const PrimaryDefault: Story = {
  args: {
    className: '',
    isOpen: false,
    placement: 'relative',
    variant: 'text',
    color: 'primary',
    width: 'w-full',
    height: 'max-h-[40vh]',
    padding: 'p-0',
    hideOverlay: false,
    hideShadow: false,
    paperProps: undefined,
    scrollShadowProps: undefined,
    onClose: () => {},
  },
  render: args => <DropdownWithHooks {...args} />,
}

export const Left: Story = {
  args: {
    ...PrimaryDefault.args,
    placement: 'left',
    width: 'w-96',
  },
  render: args => <DropdownWithHooks {...args} />,
}

export const Right: Story = {
  args: {
    ...PrimaryDefault.args,
    placement: 'right',
    width: 'w-96',
  },
  render: args => <DropdownWithHooks {...args} />,
}

export const Top: Story = {
  args: {
    ...PrimaryDefault.args,
    placement: 'top',
  },
  render: args => <DropdownWithHooks {...args} />,
}
