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
    variant: 'outlined',
    color: 'primary',
    gap: 'gap-4',
    disclosuresProps: undefined,
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
    disclosuresProps: { chevronPosition: 'start' },
  },
}

export const Nested: Story = {
  args: {
    variant: 'text',
    disclosuresProps: { chevronPosition: 'start' },
  },
  render: args => {
    return (
      <div className="flex flex-col gap-2">
        <Disclosure
          title="Main Disclosure 1"
          variant={args.variant}
          color={args.color}
          chevronPosition={args.disclosuresProps?.chevronPosition}
          height="h-max"
        >
          <Accordion className="pl-4" {...args} options={accordionOptions} />
        </Disclosure>
        <Disclosure
          title="Main Disclosure 2"
          variant={args.variant}
          color={args.color}
          chevronPosition={args.disclosuresProps?.chevronPosition}
          height="h-max"
        >
          <Accordion className="pl-4" {...args} options={accordionOptions} />
        </Disclosure>
        <Disclosure
          title="Main Disclosure 3"
          variant={args.variant}
          color={args.color}
          chevronPosition={args.disclosuresProps?.chevronPosition}
          height="h-max"
        >
          <Accordion className="pl-4" {...args} options={accordionOptions} />
        </Disclosure>
      </div>
    )
  },
}
