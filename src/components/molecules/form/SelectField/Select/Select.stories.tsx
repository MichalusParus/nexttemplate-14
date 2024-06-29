import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { options } from '../../../../../../.storybook/helpers'
import { Select, SelectProps } from './Select'

const meta: Meta<typeof Select> = {
  title: 'Molecules/Form/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    options: {
      control: false,
    },
    comboboxProps: {
      control: false,
    },
  },
}

const SelectWithHooks = (args: SelectProps) => {
  const [value, setValue] = useState<string>('')
  return (
    <div className={`flex h-80 justify-center ${args.placement === 'top' ? 'items-end' : ''}`}>
      <Select {...args} value={value} onChange={setValue} />
    </div>
  )
}

export default meta
type Story = StoryObj<typeof Select>

export const PrimaryDefault: Story = {
  args: {
    className: '',
    name: 'selectStory',
    label: 'Label',
    placeholder: 'Select',
    options: options.slice(0, 5),
    variant: 'outlined',
    color: 'primary',
    size: 'md',
    placement: 'left',
    width: 'w-96',
    description: '',
    hideLabel: false,
    hideError: false,
    collapsed: 'default',
    error: '',
    comboboxProps: undefined,
    onChange: value => console.log(value),
  },
  render: args => <SelectWithHooks {...args} />,
}

export const Top: Story = {
  args: {
    ...PrimaryDefault.args,
    placement: 'top',
    name: 'selectStory2',
  },
  render: args => <SelectWithHooks {...args} />,
}

export const Scroll: Story = {
  args: {
    ...PrimaryDefault.args,
    options: options,
    name: 'selectStory3',
  },
  render: args => <SelectWithHooks {...args} />,
}

export const Error: Story = {
  args: {
    ...PrimaryDefault.args,
    error: 'error',
    name: 'selectStory4',
  },
  render: args => <SelectWithHooks {...args} />,
}

export const Disabled: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'selectStory5',
    disabled: true,
  },
  render: args => <SelectWithHooks {...args} />,
}
