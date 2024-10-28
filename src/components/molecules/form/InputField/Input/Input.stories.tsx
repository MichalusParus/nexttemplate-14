import type { Meta, StoryObj } from '@storybook/react'

import { SearchIcon } from '@/components/atoms/icons'

import { Input } from '.'

const meta: Meta<typeof Input> = {
  title: 'Molecules/Form/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
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
}

export const Password: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'inputStory2',
    type: 'password',
  },
}

export const Number: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'inputStory3',
    type: 'number',
  },
}

export const Search: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'inputStory4',
    type: 'search',
    value: 'fixed value',
  },
}

export const Date: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'inputStory5',
    type: 'date',
  },
}

export const StartIcon: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'inputStory6',
    startIcon: <SearchIcon />,
  },
}

export const Error: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'inputStory7',
    error: 'error',
  },
}

export const Disabled: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'inputStory8',
    disabled: true,
  },
}
