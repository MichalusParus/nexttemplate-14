import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { TextArea, TextAreaProps } from '.'

const meta: Meta<typeof TextArea> = {
  title: 'Molecules/Form/inputs/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

const TextAreaWithHooks = (args: TextAreaProps) => {
  const [value, setValue] = useState<string>('')
  return <TextArea {...args} value={value} onChange={v => setValue(String(v))} />
}

export default meta
type Story = StoryObj<typeof TextArea>

export const PrimaryDefault: Story = {
  args: {
    className: 'w-96',
    name: 'textAreaStory',
    value: '',
    placeholder: 'TextArea',
    variant: 'outlined',
    color: 'primary',
    size: 'md',
    error: '',
    disabled: false,
    onChange: v => console.log(v),
  },
  render: args => <TextAreaWithHooks {...args} />,
}

export const Error: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'textAreaStory1',
    error: 'error',
  },
  render: args => <TextAreaWithHooks {...args} />,
}

export const Disabled: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'textAreaStory2',
    disabled: true,
  },
}
