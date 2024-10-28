import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { options, optionsWithContent } from '../../../../../../.storybook/helpers'
import { CheckboxGroup, CheckboxGroupProps } from './CheckboxGroup'

const meta: Meta<typeof CheckboxGroup> = {
  title: 'Molecules/Form/CheckboxGroup',
  component: CheckboxGroup,
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

const CheckboxGroupWithHooks = (args: CheckboxGroupProps) => {
  const [value, setValue] = useState<string[]>([])
  return <CheckboxGroup {...args} value={value} onChange={setValue} />
}

export default meta
type Story = StoryObj<typeof CheckboxGroup>

export const PrimaryDefault: Story = {
  args: {
    className: '',
    name: 'checkboxGroupStory',
    label: 'Label',
    content: undefined,
    value: [],
    options: options.slice(0, 5),
    column: false,
    variant: 'outlined',
    color: 'primary',
    size: 'md',
    error: '',
    labelProps: undefined,
    onChange: value => console.log(value),
  },
  render: args => <CheckboxGroupWithHooks {...args} />,
}

export const Column: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'checkboxGroupStory2',
    column: true,
  },
  render: args => <CheckboxGroupWithHooks {...args} />,
}

export const OptionsWithContent: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'checkboxGroupStory3',
    options: optionsWithContent.slice(0, 5),
    column: true,
  },
  render: args => <CheckboxGroupWithHooks {...args} />,
}

export const Error: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'checkboxGroupStory4',
    error: 'error',
  },
  render: args => <CheckboxGroupWithHooks {...args} />,
}

export const Disabled: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'checkboxGroupStory5',
    disabled: true,
  },
  render: args => <CheckboxGroupWithHooks {...args} />,
}
