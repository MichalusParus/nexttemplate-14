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
  const parentRef = useRef<HTMLDivElement | null>(null)
  return (
    <div className="flex h-[50vh] w-full items-center justify-center">
      <div className="relative" ref={parentRef}>
        <Button
          variant="text"
          aria-haspopup="true"
          aria-expanded={isOpen}
          aria-controls="storybookDrawer"
          aria-owns="storybookDrawer"
          onClick={() => setIsOpen(prev => !prev)}
        >
          Button for Dropdown
        </Button>
        <Dropdown {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} parentRef={parentRef}>
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
    placement: 'bottom-start',
    offset: undefined,
    variant: 'text',
    color: 'primary',
    width: 'w-full',
    height: 'max-h-[40vh]',
    padding: 'p-0',
    modal: false,
    hideShadow: false,
    paperProps: undefined,
    scrollShadowProps: undefined,
    onClose: () => {},
  },
  render: args => <DropdownWithHooks {...args} />,
}
