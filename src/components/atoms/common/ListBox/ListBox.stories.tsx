import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { getOptions, optionsWithContent } from '../../../../../.storybook/helpers'
import { Button } from '../Button'
import { ListBox } from '.'
import { ListBoxProps } from './ListBox'

const meta: Meta<typeof ListBox> = {
  title: 'Atoms/Common/ListBox',
  component: ListBox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    options: {
      control: false,
    },
    buttonProps: {
      control: false,
    },
    checkboxProps: {
      control: false,
    },
  },
}

export default meta
type Story = StoryObj<typeof ListBox<string>>

const ListBoxWithHooks = (args: ListBoxProps) => {
  const [value, setValue] = useState<string[]>([])

  const handleClick = (val: string) => {
    const isNew = !value.includes(val)
    setValue(prev => (isNew ? [...prev, val] : prev.filter(v => v !== val)))
  }

  return (
    <div className={`w-64 ${args.variant === 'contained' ? 'bg-primary-800' : ''}`}>
      <ListBox {...args} value={value} onClick={handleClick} />
    </div>
  )
}

export const PrimaryDefault: Story = {
  args: {
    className: '',
    name: 'listBoxStory',
    value: [],
    options: getOptions('listBoxStory', 10),
    variant: 'outlined',
    color: 'primary',
    size: 'md',
    isLoading: false,
    noOptionLabel: 'No options found',
    hideCheckbox: false,
    buttonProps: {},
    checkboxProps: {},
    onClick: value => console.log(value),
  },
  render: args => <ListBoxWithHooks {...args} />,
}

export const HideCheckbox: Story = {
  args: {
    ...PrimaryDefault.args,
    hideCheckbox: true,
    name: 'listBoxStory2',
    options: getOptions('listBoxStory2', 10),
  },
  render: args => <ListBoxWithHooks {...args} />,
}

export const OptionsWithContent: Story = {
  args: { ...PrimaryDefault.args, name: 'listBoxStory3', options: optionsWithContent },
  render: args => <ListBoxWithHooks {...args} />,
}

export const Children: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'listBoxStory4',
    children: (
      <li>
        <Button
          className="w-full rounded-none border-none"
          variant={PrimaryDefault.args?.variant}
          color={PrimaryDefault.args?.color}
          size={PrimaryDefault.args?.size}
          onClick={() => console.log('create new')}
        >
          Create new
        </Button>
      </li>
    ),
  },
  render: args => <ListBoxWithHooks {...args} />,
}
