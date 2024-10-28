import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { Button } from '@/components/atoms/common/Button'
import { Combobox } from '@/components/atoms/common/Combobox'

import { textContent } from '../../../../../.storybook/helpers'
import { Menu } from '../Menu'
import { Tooltip } from '../Tooltip'
import { Modal, ModalProps } from './Modal'

const meta: Meta<typeof Modal> = {
  title: 'Molecules/Popovers/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    modalActions: {
      control: false,
    },
    comboboxProps: {
      control: false,
    },
    titleProps: {
      control: false,
    },
    paperProps: {
      control: false,
    },
    buttonProps: {
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

const ControlledModal = (args: ModalProps) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Combobox
        name="storybookModal"
        hasPopup="dialog"
        isOpen={isOpen}
        onClick={() => setIsOpen(prev => !prev)}
      >
        Controlled Combobox
      </Combobox>
      <Modal {...args} isOpen={isOpen} setIsOpen={() => setIsOpen(false)}>
        {textContent.slice(0, 600)}
      </Modal>
    </>
  )
}

export default meta
type Story = StoryObj<typeof Modal>

export const PrimaryDefault: Story = {
  args: {
    className: '',
    name: 'modalStory',
    isOpen: undefined,
    variant: 'outlined',
    color: 'primary',
    title: '',
    width: 'w-full md:w-auto min-w-64',
    padding: 'py-2 px-2 md:pb-3 md:px-5',
    modalActions: <Button>Action</Button>,
    closeButton: false,
    hideXButton: false,
    comboboxProps: undefined,
    paperProps: undefined,
    titleProps: undefined,
    buttonProps: undefined,
    setIsOpen: undefined,
    children: textContent.slice(0, 600),
  },
}

export const Title: Story = {
  args: {
    ...PrimaryDefault.args,
    title: 'Modal Title',
  },
}

export const CloseButton: Story = {
  args: {
    ...PrimaryDefault.args,
    title: 'Modal Title',
    closeButton: true,
  },
}

export const HideXButton: Story = {
  args: {
    ...PrimaryDefault.args,
    title: 'Modal Title',
    closeButton: true,
    hideXButton: true,
  },
}

export const Controled: Story = {
  args: {
    ...PrimaryDefault.args,
    title: 'Modal Title',
  },
  render: args => <ControlledModal {...args} />,
}

export const Scroll: Story = {
  args: {
    ...PrimaryDefault.args,
    title: 'Modal Title',
    children: textContent,
  },
}
