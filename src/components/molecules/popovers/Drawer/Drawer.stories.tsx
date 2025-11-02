import type { Meta, StoryObj } from '@storybook/react'
import { PropsWithChildren, useRef, useState } from 'react'

import { Button } from '@/components/atoms/common/Button'
import { cn } from '@/utils/utils'

import { MenuLinks } from '../../../../../.storybook/helpers'
import { Drawer, DrawerProps } from './Drawer'

const meta: Meta<typeof Drawer> = {
  title: 'Molecules/Popovers/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    children: { control: false },
    paperProps: { control: false },
    scrollShadowProps: { control: false },
  },
  decorators: [
    Story => (
      <div id="storyContainer" className="max-w-full overflow-hidden">
        <Story />
      </div>
    ),
  ],
}

const DrawerWithHooks = (args: PropsWithChildren<DrawerProps>) => {
  const anchorRef = useRef<HTMLButtonElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div
      id={args.portalContainerId}
      className="relative flex h-[50vh] items-center justify-center overflow-hidden"
    >
      <Button
        className={cn(isOpen && 'z-combobox')}
        name="drawerStory"
        aria-haspopup="true"
        aria-controls="drawerStory"
        aria-expanded={isOpen}
        aria-owns="drawerStory"
        onClick={() => setIsOpen(prev => !prev)}
        ref={anchorRef}
      >
        Drawer button
      </Button>
      <Drawer {...args} isOpen={isOpen} anchorRef={anchorRef} onClose={() => setIsOpen(false)}>
        <ul id="drawerStory">
          <MenuLinks
            length={args.className === 'scroll' ? 20 : undefined}
            variant={args.variant}
            color={args.color}
          />
        </ul>
      </Drawer>
    </div>
  )
}

export default meta
type Story = StoryObj<typeof Drawer>

export const PrimaryDefault: Story = {
  args: {
    className: '',
    name: 'drawerStory',
    isOpen: false,
    anchorRef: undefined,
    label: undefined,
    placement: 'left',
    offsetY: 'top-0 bottom-0',
    variant: 'outlined',
    color: 'primary',
    width: 'w-56',
    padding: 'p-0',
    modal: false,
    portalContainerId: 'storyContainer',
    paperProps: {},
    scrollShadowProps: {},
    onClose: () => {},
  },
  render: args => <DrawerWithHooks {...args} />,
}

export const Dialog: Story = {
  args: {
    ...PrimaryDefault.args,
    modal: true,
    portalContainerId: 'storyContainer1',
  },
  render: args => <DrawerWithHooks {...args} />,
}

export const Offset: Story = {
  args: {
    ...PrimaryDefault.args,
    offsetY: 'top-8 bottom-0',
    portalContainerId: 'storyContainer2',
  },
  render: args => <DrawerWithHooks {...args} />,
}

export const Right: Story = {
  args: { ...PrimaryDefault.args, placement: 'right', portalContainerId: 'storyContainer3' },
  render: args => <DrawerWithHooks {...args} />,
}

export const Scroll: Story = {
  args: { ...PrimaryDefault.args, portalContainerId: 'storyContainer4' },
  render: args => <DrawerWithHooks {...args} />,
}
