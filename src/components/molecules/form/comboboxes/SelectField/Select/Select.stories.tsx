import type { Meta, StoryObj } from '@storybook/nextjs'
import { useState } from 'react'

import { Button } from '@/components/atoms/common/Button'

import {
  getGroupedOptions,
  getOptions,
  optionsWithContent,
} from '../../../../../../../.storybook/helpers'
import { Select, SelectProps } from './Select'

const meta: Meta<typeof Select> = {
  title: 'Molecules/Form/comboboxes/Select',
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

const SelectWithHooks = (args: SelectProps<string>) => {
  const [value, setValue] = useState<string>('')
  return (
    <div
      className={`flex h-80 items-center justify-center ${args.placement === 'top' ? 'items-end' : ''}`}
    >
      <Select<string>
        {...args}
        value={value}
        onClear={args.onClear ? () => setValue('') : undefined}
        onChange={setValue}
      />
    </div>
  )
}

export default meta
type Story = StoryObj<typeof Select<string>>

export const PrimaryDefault: Story = {
  args: {
    className: '',
    name: 'selectStory',
    placeholder: 'Select',
    value: getOptions('selectStory', 5)[0].value,
    multiValue: undefined,
    displayChips: undefined,
    options: getOptions('selectStory', 5),
    variant: 'outlined',
    color: 'primary',
    size: 'md',
    placement: 'bottom',
    error: '',
    disabled: false,
    chipProps: undefined,
    dropdownProps: undefined,
    listboxProps: undefined,
    onClear: undefined,
    onOpen: undefined,
    onClose: undefined,
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
    displayChips: true,
  },
  render: args => <SelectWithHooks {...args} />,
}

export const GroupedOptions: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'selectStory5',
    options: getGroupedOptions('selectStory5'),
    displayChips: true,
  },
  render: args => <SelectWithHooks {...args} />,
}

export const OnClear: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'selectStory6',
    onClear: () => console.log('clear'),
  },
  render: args => <SelectWithHooks {...args} />,
}

export const CreateNew: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'selectStory7',
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
  render: args => <SelectWithHooks {...args} />,
}

export const Error: Story = {
  args: {
    ...PrimaryDefault.args,
    error: 'error',
    name: 'selectStory8',
  },
  render: args => <SelectWithHooks {...args} />,
}

export const Disabled: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'selectStory9',
    options: getOptions('selectStory6', 5),
    disabled: true,
  },
  render: args => <SelectWithHooks {...args} />,
}
