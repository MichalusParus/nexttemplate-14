import type { Meta, StoryObj } from '@storybook/react'

import { accordionOptions } from '../../../../../.storybook/helpers'
import { Disclosure } from '../Disclosure'
import { Accordion } from '.'

const meta: Meta<typeof Accordion> = {
  title: 'Molecules/Common/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className="min-h-[32rem]">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    options: { control: false },
  },
}

export default meta
type Story = StoryObj<typeof Accordion>

export const PrimaryDefault: Story = {
  args: {
    className: '',
    options: accordionOptions,
    exclusive: false,
    gap: 'gap-2',
    chevronPosition: 'end',
    variant: 'outlined',
    color: 'primary',
    buttonProps: undefined,
    paperProps: undefined,
  },
}

export const Exclusive: Story = {
  args: {
    ...PrimaryDefault.args,
    exclusive: true,
  },
}

export const ChevronFirst: Story = {
  args: {
    ...PrimaryDefault.args,
    chevronPosition: 'start',
  },
}

export const Nested: Story = {
  args: {
    variant: 'text',
  },
  render: args => {
    return (
      <div className="flex flex-col gap-2">
        <Disclosure
          variant={args.variant}
          color={args.color}
          chevronPosition={args.chevronPosition}
          title="Main Disclosure 1"
          paperProps={undefined}
        >
          <div className="pl-4">
            <Accordion {...args} ariaLevel={2} options={accordionOptions} />
          </div>
        </Disclosure>
        <Disclosure
          variant={args.variant}
          color={args.color}
          chevronPosition={args.chevronPosition}
          title="Main Disclosure 2"
          paperProps={undefined}
        >
          <div className="pl-4">
            <Accordion {...args} ariaLevel={2} options={accordionOptions} />
          </div>
        </Disclosure>
        <Disclosure
          variant={args.variant}
          color={args.color}
          chevronPosition={args.chevronPosition}
          title="Main Disclosure 3"
          paperProps={undefined}
        >
          <div className="pl-4">
            <Accordion {...args} ariaLevel={2} options={accordionOptions} />
          </div>
        </Disclosure>
      </div>
    )
  },
}
