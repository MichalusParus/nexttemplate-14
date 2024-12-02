import type { Meta, StoryObj } from '@storybook/react'

import { textContent } from '../../../../../.storybook/helpers'
import { Disclosure } from '.'

const meta: Meta<typeof Disclosure> = {
  title: 'Molecules/Common/Disclosure',
  component: Disclosure,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className="min-h-96">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    children: { control: false },
  },
}

export default meta
type Story = StoryObj<typeof Disclosure>

export const PrimaryDefault: Story = {
  args: {
    className: '',
    title: 'Disclosure button',
    chevronPosition: 'end',
    variant: 'outlined',
    color: 'primary',
    expanded: false,
    buttonProps: undefined,
    paperProps: undefined,
    children: <div className="p-4">{textContent.slice(0, 500)}</div>,
  },
}

export const Expanded: Story = {
  args: {
    ...PrimaryDefault.args,
    expanded: true,
  },
}

export const ChevronFirst: Story = {
  args: {
    ...PrimaryDefault.args,
    chevronPosition: 'start',
  },
}

export const Scroll: Story = {
  args: {
    ...PrimaryDefault.args,
    children: <div className="p-4">{textContent}</div>,
  },
}
