import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { options, optionsWithContent } from '../../../../../.storybook/helpers'
import ListBox from '.'
import { ListBoxProps } from './ListBox'

const meta: Meta<typeof ListBox> = {
  title: 'Atoms/Common/ListBox',
  component: ListBox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    options: {
      control: false,
    },
    checkboxProps: {
      control: false,
    },
  },
}

export default meta
type Story = StoryObj<typeof ListBox>

const ListBoxWithHooks = (args: ListBoxProps) => {
  const [value, setValue] = useState<string[]>([])

  const handleClick = (val: string) => {
    const isNew = !value.includes(val)
    setValue(prev => (isNew ? [...prev, val] : prev.filter(v => v !== val)))
  }

  return (
    <div className={`w-64 ${args.variant === 'contained' ? 'bg-primary-800' : ''}`}>
      <ListBox {...args} value={value} onClick={handleClick} />
    </div>
  )
}

export const PrimaryDefault: Story = {
  args: {
    className: '',
    name: 'listBoxStory',
    value: [],
    options: options,
    variant: 'outlined',
    color: 'primary',
    size: 'md',
    isLoading: false,
    noOptionLabel: 'No options found',
    hideCheckbox: false,
    checkboxProps: {},
    onClick: value => console.log(value),
  },
  render: args => <ListBoxWithHooks {...args} />,
}

export const HideCheckbox: Story = {
  args: { ...PrimaryDefault.args, hideCheckbox: true },
  render: args => <ListBoxWithHooks {...args} />,
}

export const OptionsWithContent: Story = {
  args: { ...PrimaryDefault.args, options: optionsWithContent },
  render: args => <ListBoxWithHooks {...args} />,
}
