import type { Meta, StoryObj } from '@storybook/react'

import { textContent } from '../../../../../.storybook/helpers'
import Disclosure from '.'

const meta: Meta<typeof Disclosure> = {
  title: 'Molecules/Common/Disclosure',
  component: Disclosure,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    children: { control: false },
  },
}

export default meta
type Story = StoryObj<typeof Disclosure>

export const Default: Story = {
  args: {
    children: <div className="p-4">{textContent.slice(0, 500)}</div>,
    className: 'className',
    title: 'Disclosure button',
  },
  render: args => (
    <div className="mx-auto h-[30vh] w-[50vw]">
      <Disclosure {...args} />
    </div>
  ),
}

export const Expanded: Story = {
  args: {
    className: 'className',
    title: 'Disclosure button',
    expanded: true,
    children: <div className="p-4">{textContent.slice(0, 500)}</div>,
  },
  render: args => (
    <div className="mx-auto h-[30vh] w-[50vw]">
      <Disclosure {...args} />
    </div>
  ),
}

export const ChevronFirst: Story = {
  args: {
    className: 'className',
    title: 'Disclosure button',
    chevronPosition: 'start',
    children: <div className="p-4">{textContent.slice(0, 500)}</div>,
  },
  render: args => (
    <div className="mx-auto h-[30vh] w-[50vw]">
      <Disclosure {...args} />
    </div>
  ),
}

export const Scroll: Story = {
  args: {
    className: 'className',
    title: 'Disclosure button',
    children: <div className="p-4">{textContent}</div>,
  },
  render: args => (
    <div className="mx-auto h-[45vh] w-[50vw]">
      <Disclosure {...args} />
    </div>
  ),
}
