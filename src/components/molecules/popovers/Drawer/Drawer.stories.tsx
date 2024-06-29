import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import Combobox from '@/components/atoms/common/Combobox'

import { MenuLinks } from '../../../../../.storybook/helpers'
import { Drawer, DrawerProps } from './Drawer'

const meta: Meta<typeof Drawer> = {
  title: 'Molecules/Popovers/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreened',
  },
}

const DrawerWithHooks = ({ args }: { args: DrawerProps }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="flex h-[50vh] items-center justify-center">
      <Combobox
        name="storybookDrawer"
        hasPopup="menu"
        isOpen={isOpen}
        onClick={() => setIsOpen(prev => !prev)}
      >
        Drawer Combobox
      </Combobox>
      <Drawer {...args} name="storybookDrawer" isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {args.children}
      </Drawer>
    </div>
  )
}

export default meta
type Story = StoryObj<typeof Drawer>

export const Default: Story = {
  args: { children: <MenuLinks /> },
  render: args => <DrawerWithHooks args={args} />,
}

export const Scroll: Story = {
  args: { children: <MenuLinks length={30} /> },
  render: args => <DrawerWithHooks args={args} />,
}

export const Right: Story = {
  args: { placement: 'right', children: <MenuLinks /> },
  render: args => <DrawerWithHooks args={args} />,
}
