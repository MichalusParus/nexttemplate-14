import type { Meta, StoryObj } from '@storybook/react'

import { accordionOptions } from '../../../../../.storybook/helpers'
import Accordion from '.'

const meta: Meta<typeof Accordion> = {
  title: 'Molecules/Common/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    options: { control: false },
  },
}

export default meta
type Story = StoryObj<typeof Accordion>

export const Default: Story = {
  args: {
    className: 'className',
    options: accordionOptions,
  },
}

export const ChevronFirst: Story = {
  args: {
    className: 'className',
    options: accordionOptions,
    chevronPosition: 'start',
  },
}
