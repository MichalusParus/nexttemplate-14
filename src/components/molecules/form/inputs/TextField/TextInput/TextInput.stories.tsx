import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { SettingIcon } from '@/components/atoms/icons'

import { TextInput, TextInputProps } from '.'

const meta: Meta<typeof TextInput> = {
  title: 'Molecules/Form/inputs/TextInput',
  component: TextInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

const InputWithHooks = (args: TextInputProps) => {
  const [value, setValue] = useState<string>('')
  return <TextInput {...args} value={value} onChange={v => setValue(String(v))} />
}

export default meta
type Story = StoryObj<typeof TextInput>

export const PrimaryDefault: Story = {
  args: {
    className: 'w-96',
    name: 'inputStory',
    value: '',
    placeholder: 'TextInput',
    variant: 'outlined',
    color: 'primary',
    size: 'md',
    startIcon: undefined,
    endIcon: undefined,
    error: '',
    disabled: false,
    onChange: v => console.log(v),
  },
  render: args => <InputWithHooks {...args} />,
}

export const StartIcon: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'inputStory2',
    startIcon: <SettingIcon />,
  },
  render: args => <InputWithHooks {...args} />,
}

export const EndIcon: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'inputStory3',
    endIcon: <SettingIcon />,
  },
  render: args => <InputWithHooks {...args} />,
}

export const Error: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'inputStory4',
    error: 'error',
  },
  render: args => <InputWithHooks {...args} />,
}

export const Disabled: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'inputStory5',
    disabled: true,
  },
}
