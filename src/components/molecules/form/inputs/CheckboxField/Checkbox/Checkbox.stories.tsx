import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { optionsWithContent } from '../../../../../../../.storybook/helpers'
import { Checkbox } from '.'
import { CheckboxProps } from './Checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'Molecules/Form/inputs/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

const CheckboxWithHooks = (args: CheckboxProps) => {
  const [value, setValue] = useState<string>()
  return (
    <Checkbox
      {...args}
      value={value}
      isChecked={Boolean(value)}
      onChange={v => setValue(prev => (prev ? undefined : v))}
    />
  )
}

export default meta
type Story = StoryObj<typeof Checkbox>

export const PrimaryDefault: Story = {
  args: {
    className: '',
    name: 'checkboxStory',
    label: 'Label',
    value: 'value',
    content: undefined,
    variant: 'outlined',
    color: 'primary',
    size: 'md',
    isChecked: false,
    error: '',
    fake: false,
    onChange: undefined,
  },
  render: args => <CheckboxWithHooks {...args} />,
}

export const OptionsWithContent: Story = {
  args: {
    ...PrimaryDefault.args,
    className: 'min-w-40',
    name: 'checkboxStory3',
    content: optionsWithContent[0].content,
  },
  render: args => <CheckboxWithHooks {...args} />,
}

export const Error: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'checkboxStory4',
    error: 'error',
  },
  render: args => <CheckboxWithHooks {...args} />,
}

export const Disabled: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'checkboxStory5',
    disabled: true,
  },
  render: args => <CheckboxWithHooks {...args} />,
}
