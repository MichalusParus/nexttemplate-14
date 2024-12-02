import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { getOptions, optionsWithContent } from '../../../../../../.storybook/helpers'
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
  },
}

const SelectWithHooks = (args: SelectProps) => {
  const [value, setValue] = useState<string>('')
  return (
    <div
      className={`flex h-80 items-center justify-center ${args.placement === 'top' ? 'items-end' : ''}`}
    >
      <Select {...args} value={value} onChange={setValue} />
    </div>
  )
}

export default meta
type Story = StoryObj<typeof Select>

export const PrimaryDefault: Story = {
  args: {
    className: 'w-96',
    name: 'selectStory',
    placeholder: 'Select',
    value: '',
    multiValue: undefined,
    options: getOptions('selectStory', 5),
    variant: 'outlined',
    color: 'primary',
    size: 'md',
    placement: 'bottom',
    error: '',
    buttonProps: undefined,
    dropdownProps: undefined,
    listboxProps: undefined,
    onChange: value => console.log(value),
  },
  render: args => <SelectWithHooks {...args} />,
}

export const Top: Story = {
  args: {
    ...PrimaryDefault.args,
    placement: 'top',
    name: 'selectStory2',
    options: getOptions('selectStory2', 5),
  },
  render: args => <SelectWithHooks {...args} />,
}

export const Scroll: Story = {
  args: {
    ...PrimaryDefault.args,
    options: getOptions('selectStory3', 20),
    name: 'selectStory3',
  },
  render: args => <SelectWithHooks {...args} />,
}

export const OptionsWithContent: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'selectStory4',
    options: optionsWithContent.slice(0, 5),
  },
  render: args => <SelectWithHooks {...args} />,
}

export const Error: Story = {
  args: {
    ...PrimaryDefault.args,
    error: 'error',
    name: 'selectStory5',
    options: getOptions('selectStory5', 5),
  },
  render: args => <SelectWithHooks {...args} />,
}

export const Disabled: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'selectStory6',
    options: getOptions('selectStory6', 5),
    disabled: true,
  },
  render: args => <SelectWithHooks {...args} />,
}
