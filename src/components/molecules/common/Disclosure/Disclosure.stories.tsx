import type { Meta, StoryObj } from '@storybook/react'
import { PropsWithChildren, useState } from 'react'

import { textContent } from '../../../../../.storybook/helpers'
import { Disclosure, DisclosureProps } from '.'

const meta: Meta<typeof Disclosure> = {
  title: 'Molecules/Common/Disclosure',
  component: Disclosure,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className="min-h-[20rem]">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    children: { control: false },
  },
}

const DisclosureWithHooks = ({ children, ...props }: PropsWithChildren<DisclosureProps>) => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <Disclosure {...props} expanded={isOpen} setIsOpen={setIsOpen}>
      {children}
    </Disclosure>
  )
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
    height: 'max-h-[40vh]',
    expanded: false,
    buttonProps: undefined,
    paperProps: undefined,
    scrollShadowProps: undefined,
    setIsOpen: undefined,
    children: textContent.slice(0, 500),
  },
}

export const Controlled: Story = {
  args: {
    ...PrimaryDefault.args,
  },
  render: args => <DisclosureWithHooks {...args} />,
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
