import type { Meta, StoryObj } from '@storybook/react'

import {
  inputClass,
  inputSize,
  inputVariant,
} from '@/components/molecules/form/inputs/TextField/TextInput/TextInput.style'

import { Label } from '.'

const meta: Meta<typeof Label> = {
  title: 'Atoms/Common/Label',
  component: Label,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: {
      control: false,
    },
  },
}

export default meta
type Story = StoryObj<typeof Label>

export const Default: Story = {
  args: {
    className: '',
    name: 'labelStory',
    label: 'Label:',
    size: 'md',
    width: 'w-full',
    error: undefined,
    description: '',
    fakeLabel: false,
    legend: false,
    hideLabel: false,
    hideError: false,
    children: (
      <input
        className={`${inputClass} ${inputVariant['outlined']['primary']} ${inputSize['md']}`}
        id="labelStory"
        name="labelStory"
        placeholder="Random TextInput"
      />
    ),
  },
}

export const Description: Story = {
  args: {
    ...Default.args,
    description: 'additional info',
  },
}

export const Error: Story = {
  args: {
    ...Default.args,
    error: 'error',
  },
}

export const Clean: Story = {
  args: {
    ...Default.args,
    hideLabel: true,
    hideError: true,
  },
}
