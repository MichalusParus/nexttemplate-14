import type { Meta, StoryObj } from '@storybook/react'
import { useRef, useState } from 'react'

import { Button } from '@/components/atoms/common/Button'

import { textContent } from '../../../../../.storybook/helpers'
import { Dropdown, DropdownProps } from './Dropdown'

const meta: Meta<typeof Dropdown> = {
  title: 'Molecules/Popovers/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    placement: {
      control: { type: 'radio' },
    },
  },
}

const DropdownWithHooks = (args: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const anchorRef = useRef<HTMLDivElement | null>(null)
  return (
    <div className="flex h-[50vh] w-full items-center justify-center">
      <div className="relative w-64" ref={anchorRef}>
        <Button
          className="w-full"
          variant="text"
          aria-haspopup="true"
          aria-expanded={isOpen}
          aria-controls="storybookDrawer"
          aria-owns="storybookDrawer"
          onClick={() => setIsOpen(prev => !prev)}
        >
          Button for Dropdown
        </Button>
        <Dropdown
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          anchorRef={anchorRef}
        >
          <div id="storybookDrawer" aria-hidden={!isOpen}>
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
    anchorRef: undefined,
    placement: 'bottom-start',
    offset: undefined,
    variant: 'text',
    color: 'primary',
    width: undefined,
    height: 'max-h-[40vh]',
    padding: undefined,
    modal: false,
    portalContainerId: undefined,
    disablePortal: false,
    paperProps: undefined,
    scrollShadowProps: undefined,
    onClose: () => {},
  },
  render: args => <DropdownWithHooks {...args} />,
}

export const Dialog: Story = {
  args: {
    ...PrimaryDefault.args,
    modal: true,
  },
  render: args => <DropdownWithHooks {...args} />,
}

export const Offset: Story = {
  args: {
    ...PrimaryDefault.args,
    offset: [0, 30],
  },
  render: args => <DropdownWithHooks {...args} />,
}

export const WidthHeight: Story = {
  args: {
    ...PrimaryDefault.args,
    width: 650,
    height: 'max-h-[15vh]',
    placement: 'bottom',
  },
  render: args => <DropdownWithHooks {...args} />,
}

export const Scroll: Story = {
  args: {
    ...PrimaryDefault.args,
    height: 'max-h-[15vh]',
  },
  render: args => <DropdownWithHooks {...args} />,
}
