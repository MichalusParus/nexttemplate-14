import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { SearchIcon, SettingIcon } from '@/components/atoms/icons'

import { Input, InputProps } from '.'

const meta: Meta<typeof Input> = {
  title: 'Molecules/Form/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

const InputWithHooks = (args: InputProps) => {
  const [value, setValue] = useState<string>('')
  return <Input {...args} value={value} onChange={v => setValue(String(v))} />
}

export default meta
type Story = StoryObj<typeof Input>

export const PrimaryDefault: Story = {
  args: {
    className: '',
    type: 'text',
    name: 'inputStory',
    label: 'Label:',
    placeholder: 'Input',
    value: '',
    variant: 'outlined',
    color: 'primary',
    size: 'md',
    error: '',
    startIcon: undefined,
    labelProps: undefined,
    onChange: v => console.log(v),
  },
  render: args => <InputWithHooks {...args} />,
}

export const Password: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'inputStory2',
    type: 'password',
  },
  render: args => <InputWithHooks {...args} />,
}

export const Number: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'inputStory3',
    type: 'number',
  },
  render: args => <InputWithHooks {...args} />,
}

export const Search: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'inputStory4',
    type: 'search',
    startIcon: <SearchIcon />,
  },
  render: args => <InputWithHooks {...args} />,
}

export const StartIcon: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'inputStory6',
    startIcon: <SettingIcon />,
  },
  render: args => <InputWithHooks {...args} />,
}

export const Error: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'inputStory7',
    error: 'error',
  },
  render: args => <InputWithHooks {...args} />,
}

export const Disabled: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'inputStory8',
    disabled: true,
  },
}
