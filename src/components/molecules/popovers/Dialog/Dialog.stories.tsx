import type { Meta, StoryObj } from '@storybook/nextjs'
import { useState } from 'react'

import { Button } from '@/components/atoms/common/Button'

import { textContent } from '../../../../../.storybook/helpers'
import { Dialog, DialogProps } from './Dialog'

const meta: Meta<typeof Dialog> = {
  title: 'Molecules/Popovers/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    dialogActions: {
      control: false,
    },
    children: {
      control: false,
    },
  },
  decorators: [
    Story => (
      <div className="flex h-[95vh] items-center justify-center">
        <Story />
      </div>
    ),
  ],
}

const DialogWithHooks = (args: DialogProps) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Button
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={args.name}
        onClick={() => setIsOpen(prev => !prev)}
      >
        Dialog Button
      </Button>
      <Dialog {...args} isOpen={isOpen} setIsOpen={() => setIsOpen(false)}>
        {args.children}
      </Dialog>
    </>
  )
}

export default meta
type Story = StoryObj<typeof Dialog>

export const PrimaryDefault: Story = {
  args: {
    className: '',
    name: 'dialogStory',
    isOpen: undefined,
    title: 'Dialog title',
    label: 'dialog label',
    variant: 'outlined',
    color: 'primary',
    width: 'w-full md:w-auto min-w-64',
    paddingX: 'px-2 md:px-5',
    paddingY: 'py-2 md:pb-3',
    dialogActions: <Button onClick={() => console.log('action')}>Action</Button>,
    closeButton: false,
    hideXButton: false,
    portalContainerId: undefined,
    paperProps: undefined,
    titleProps: undefined,
    setIsOpen: undefined,
    children: textContent.slice(0, 600),
  },
  render: args => <DialogWithHooks {...args} />,
}

export const CloseButton: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'dialogStory1',
    closeButton: true,
  },
  render: args => <DialogWithHooks {...args} />,
}

export const HideXButton: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'dialogStory2',
    hideXButton: true,
  },
  render: args => <DialogWithHooks {...args} />,
}

export const Scroll: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'dialogStory3',
    closeButton: true,
    children: textContent,
  },
  render: args => <DialogWithHooks {...args} />,
}
