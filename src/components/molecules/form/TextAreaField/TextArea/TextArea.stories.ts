import type { Meta, StoryObj } from '@storybook/react'

import { TextArea } from '.'

const meta: Meta<typeof TextArea> = {
  title: 'Molecules/Form/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof TextArea>

export const PrimaryDefault: Story = {
  args: {
    className: '',
    name: 'textareaStory',
    label: 'Label:',
    placeholder: 'TextArea',
    value: '',
    variant: 'outlined',
    color: 'primary',
    size: 'md',
    error: '',
    labelProps: undefined,
    onChange: v => console.log(v),
  },
}

export const Error: Story = {
  args: {
    ...PrimaryDefault.args,
    error: 'error',
  },
}

export const Disabled: Story = {
  args: {
    ...PrimaryDefault.args,
    disabled: true,
  },
}
