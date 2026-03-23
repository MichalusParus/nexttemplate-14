import type { Meta, StoryObj } from '@storybook/nextjs'
import { useState } from 'react'

import { getOptions, optionsWithContent } from '../../../../../../../.storybook/helpers'
import { CheckboxGroup, CheckboxGroupProps } from './CheckboxGroup'

const meta: Meta<typeof CheckboxGroup<string>> = {
  title: 'Molecules/Form/toggles/CheckboxGroup',
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
type Story = StoryObj<typeof CheckboxGroup<string>>

export const PrimaryDefault: Story = {
  args: {
    className: '',
    name: 'checkboxGroupStory',
    value: [],
    options: getOptions('checkboxGroupStory', 5),
    column: false,
    switchType: false,
    variant: 'outlined',
    color: 'primary',
    size: 'md',
    error: '',
    disabled: false,
    checkboxProps: {},
    onChange: value => console.log(value),
  },
  render: args => <CheckboxGroupWithHooks {...args} />,
}

export const Column: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'checkboxGroupStory2',
    options: getOptions('checkboxGroupStory2', 5),
    column: true,
  },
  render: args => <CheckboxGroupWithHooks {...args} />,
}

export const SwitchType: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'checkboxGroupStory3',
    options: getOptions('checkboxGroupStory3', 5),
    column: true,
    switchType: true,
  },
  render: args => <CheckboxGroupWithHooks {...args} />,
}

export const OptionsWithContent: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'checkboxGroupStory4',
    options: optionsWithContent.slice(0, 5),
    column: true,
  },
  render: args => <CheckboxGroupWithHooks {...args} />,
}

export const Error: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'checkboxGroupStory5',
    options: getOptions('checkboxGroupStory4', 5),

    error: 'error',
  },
  render: args => <CheckboxGroupWithHooks {...args} />,
}

export const Disabled: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'checkboxGroupStory6',
    options: getOptions('checkboxGroupStory5', 5),
    disabled: true,
  },
  render: args => <CheckboxGroupWithHooks {...args} />,
}
