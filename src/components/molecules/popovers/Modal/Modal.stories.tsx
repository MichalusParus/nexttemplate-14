import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import Button from '@/components/atoms/common/Button'
import Combobox from '@/components/atoms/common/Combobox'

import { textContent } from '../../../../../.storybook/helpers'
import { Modal, ModalProps } from './Modal'

const meta: Meta<typeof Modal> = {
  title: 'Molecules/Popovers/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreened',
  },
}

const ModalWithHooks = ({ args }: { args: ModalProps }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="flex h-[95vh] items-center justify-center">
      <Combobox
        name="storybookModal"
        hasPopup="dialog"
        isOpen={isOpen}
        onClick={() => setIsOpen(prev => !prev)}
      >
        Modal Combobox
      </Combobox>
      <Modal {...args} name="storybookModal" isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {args.children}
      </Modal>
    </div>
  )
}

export default meta
type Story = StoryObj<typeof Modal>

export const Default: Story = {
  args: { className: 'className' },
  render: args => <ModalWithHooks args={args} />,
}

export const Content: Story = {
  args: {
    title: 'Modal Title',
    children: textContent.slice(0, 600),
    closeButton: true,
    modalActions: <Button>Action</Button>,
  },
  render: args => <ModalWithHooks args={args} />,
}

export const Scroll: Story = {
  args: {
    title: 'Modal Title',
    children: textContent,
    closeButton: true,
    modalActions: <Button>Action</Button>,
  },
  render: args => <ModalWithHooks args={args} />,
}
