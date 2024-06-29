import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { options } from '../../../../../../.storybook/helpers'
import { MultiSelect, MultiSelectProps } from './MultiSelect'

const meta: Meta<typeof MultiSelect> = {
  title: 'Molecules/Form/MultiSelect',
  component: MultiSelect,
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
    dropdownProps: {
      control: false,
    },
    listboxProps: {
      control: false,
    },
  },
}

const MultiSelectWithHooks = (args: MultiSelectProps) => {
  const [value, setValue] = useState<string[]>([])
  return (
    <div className={`flex h-80 justify-center ${args.placement === 'top' ? 'items-end' : ''}`}>
      <MultiSelect {...args} value={value} onChange={setValue} />
    </div>
  )
}

export default meta
type Story = StoryObj<typeof MultiSelect>

export const PrimaryDefault: Story = {
  args: {
    className: '',
    name: 'multiSelectStory',
    label: 'Label',
    placeholder: 'MultiSelect',
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
    dropdownProps: undefined,
    listboxProps: undefined,
    onChange: value => console.log(value),
  },
  render: args => <MultiSelectWithHooks {...args} />,
}

export const Top: Story = {
  args: {
    ...PrimaryDefault.args,
    placement: 'top',
    name: 'multiSelectStory2',
  },
  render: args => <MultiSelectWithHooks {...args} />,
}

export const Scroll: Story = {
  args: {
    ...PrimaryDefault.args,
    options: options,
    name: 'multiSelectStory3',
  },
  render: args => <MultiSelectWithHooks {...args} />,
}

export const Error: Story = {
  args: {
    ...PrimaryDefault.args,
    error: 'error',
    name: 'multiSelectStory4',
  },
  render: args => <MultiSelectWithHooks {...args} />,
}

export const Disabled: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'multiSelectStory5',
    disabled: true,
  },
  render: args => <MultiSelectWithHooks {...args} />,
}
