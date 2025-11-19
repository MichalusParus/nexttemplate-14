import type { Meta, StoryObj } from '@storybook/nextjs'
import { useState } from 'react'

import { Button } from '@/components/atoms/common/Button'

import {
  getGroupedOptions,
  getOptions,
  optionsWithContent,
} from '../../../../../../../.storybook/helpers'
import { MultiSelect, MultiSelectProps } from './MultiSelect'

const meta: Meta<typeof MultiSelect> = {
  title: 'Molecules/Form/comboboxes/MultiSelect',
  component: MultiSelect,
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

const MultiSelectWithHooks = (args: MultiSelectProps) => {
  const [value, setValue] = useState<string[]>([])
  return (
    <div
      className={`flex h-80 items-center justify-center ${args.placement === 'top' ? 'items-end' : ''}`}
    >
      <MultiSelect {...args} value={value} onChange={setValue} />
    </div>
  )
}

export default meta
type Story = StoryObj<typeof MultiSelect<string>>

export const PrimaryDefault: Story = {
  args: {
    className: '',
    name: 'multiSelectStory',
    placeholder: 'MultiSelect',
    value: [],
    options: getOptions('multiSelectStory', 5),
    displayChips: false,
    variant: 'outlined',
    color: 'primary',
    size: 'md',
    placement: 'bottom',
    error: '',
    dropdownProps: undefined,
    listboxProps: undefined,
    chipProps: undefined,
    onOpen: undefined,
    onClose: undefined,
    onChange: value => console.log(value),
  },
  render: args => <MultiSelectWithHooks {...args} />,
}

export const DisplayChips: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'multiSelectStory2',
    options: getOptions('multiSelectStory2', 5),
    displayChips: true,
  },
  render: args => <MultiSelectWithHooks {...args} />,
}

export const Top: Story = {
  args: {
    ...PrimaryDefault.args,
    placement: 'top',
    name: 'multiSelectStory3',
    options: getOptions('multiSelectStory3', 5),
  },
  render: args => <MultiSelectWithHooks {...args} />,
}

export const Scroll: Story = {
  args: {
    ...PrimaryDefault.args,
    options: getOptions('multiSelectStory4', 20),
    name: 'multiSelectStory4',
  },
  render: args => <MultiSelectWithHooks {...args} />,
}

export const OptionsWithContent: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'multiSelectStory5',
    options: optionsWithContent.slice(0, 5),
  },
  render: args => <MultiSelectWithHooks {...args} />,
}

export const GroupedOptions: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'multiSelectStory6',
    options: getGroupedOptions('multiSelectStory6'),
    displayChips: true,
  },
  render: args => <MultiSelectWithHooks {...args} />,
}

export const CreateNew: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'autocompleteStory7',
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
  render: args => <MultiSelectWithHooks {...args} />,
}

export const Error: Story = {
  args: {
    ...PrimaryDefault.args,
    error: 'error',
    name: 'multiSelectStory8',
    options: getOptions('multiSelectStory8', 5),
  },
  render: args => <MultiSelectWithHooks {...args} />,
}

export const Disabled: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'multiSelectStory9',
    options: getOptions('multiSelectStory9', 5),
    disabled: true,
  },
  render: args => <MultiSelectWithHooks {...args} />,
}
