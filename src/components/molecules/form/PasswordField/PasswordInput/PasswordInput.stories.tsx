import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { PasswordInput, PasswordInputProps } from '.'

const meta: Meta<typeof PasswordInput> = {
  title: 'Molecules/Form/PasswordInput',
  component: PasswordInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

const InputWithHooks = (args: PasswordInputProps) => {
  const [value, setValue] = useState<string>('')
  return <PasswordInput {...args} value={value} onChange={v => setValue(String(v))} />
}

export default meta
type Story = StoryObj<typeof PasswordInput>

export const PrimaryDefault: Story = {
  args: {
    className: 'w-96',
    name: 'inputStory',
    value: '',
    placeholder: 'PasswordInput',
    variant: 'outlined',
    color: 'primary',
    size: 'md',
    error: '',
    disabled: false,
    onChange: v => console.log(v),
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
