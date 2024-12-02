import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { getOptions, optionsWithContent } from '../../../../../../.storybook/helpers'
import { RadioGroup, RadioGroupProps } from './RadioGroup'

const meta: Meta<typeof RadioGroup> = {
  title: 'Molecules/Form/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    options: {
      control: false,
    },
  },
}

const RadioGroupWithHooks = (args: RadioGroupProps) => {
  const [value, setValue] = useState<string>('')
  return <RadioGroup {...args} value={value} onChange={setValue} />
}

export default meta
type Story = StoryObj<typeof RadioGroup>

export const PrimaryDefault: Story = {
  args: {
    className: '',
    name: 'radioGroupStory',
    value: '',
    options: getOptions('radioGroupStory', 5),
    column: false,
    variant: 'outlined',
    color: 'primary',
    size: 'md',
    error: '',
    disabled: false,
    onChange: () => {},
  },
  render: args => <RadioGroupWithHooks {...args} />,
}

export const Column: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'radioGroupStory2',
    options: getOptions('radioGroupStory2', 5),

    column: true,
  },
  render: args => <RadioGroupWithHooks {...args} />,
}

export const OptionsWithContent: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'radioGroupStory3',
    options: optionsWithContent.slice(0, 5),
    column: true,
  },
  render: args => <RadioGroupWithHooks {...args} />,
}

export const Error: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'radioGroupStory4',
    options: getOptions('radioGroupStory4', 5),
    error: 'error',
  },
  render: args => <RadioGroupWithHooks {...args} />,
}

export const Disabled: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'radioGroupStory5',
    options: getOptions('radioGroupStory5', 5),
    disabled: true,
  },
  render: args => <RadioGroupWithHooks {...args} />,
}
