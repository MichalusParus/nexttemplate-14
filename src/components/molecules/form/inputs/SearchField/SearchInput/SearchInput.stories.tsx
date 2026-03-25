import type { Meta, StoryObj } from '@storybook/nextjs'
import { useState } from 'react'

import { SearchInput, SearchInputProps } from '.'

const meta: Meta<typeof SearchInput> = {
  title: 'Molecules/Form/inputs/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

const InputWithHooks = (args: SearchInputProps) => {
  const [value, setValue] = useState<string>(args.value || '')
  return <SearchInput {...args} value={value} onChange={setValue} />
}

export default meta
type Story = StoryObj<typeof SearchInput>

export const PrimaryDefault: Story = {
  args: {
    className: 'w-96',
    name: 'searchStory',
    value: '',
    placeholder: 'SearchInput',
    variant: 'outlined',
    color: 'primary',
    size: 'md',
    error: '',
    disabled: false,
    onChange: v => console.log(v),
    onClear: undefined,
  },
  render: args => <InputWithHooks {...args} />,
}

export const Value: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'searchStory1',
    value: 'defaultValue',
  },
  render: args => <InputWithHooks {...args} />,
}

export const Error: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'searchStory2',
    error: 'error',
  },
  render: args => <InputWithHooks {...args} />,
}

export const Disabled: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'searchStory3',
    disabled: true,
  },
}
