import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { Combobox } from '../Combobox'
import { Overlay } from '.'

const meta: Meta<typeof Overlay> = {
  title: 'Atoms/Common/Overlay',
  component: Overlay,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj<typeof Overlay>

const OverlayWithHooks = ({ dark }: { dark?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="h-96">
      <Combobox
        name="overlayStory"
        isOpen={isOpen}
        hasPopup="dialog"
        onClick={() => setIsOpen(true)}
      >
        Overlay {isOpen ? 'open' : 'closed'}
      </Combobox>
      <Overlay isOpen={isOpen} onClose={() => setIsOpen(false)} dark={dark} />
    </div>
  )
}

export const Default: Story = {
  render: () => <OverlayWithHooks />,
}

export const Dark: Story = {
  render: () => <OverlayWithHooks dark />,
}
