import type { Meta, StoryObj } from '@storybook/nextjs'
import { useState } from 'react'

import { getOptions, optionsWithContent } from '../../../../../../../.storybook/helpers'
import { MultiToggleGroup, MultiToggleGroupProps } from './MultiToggleGroup'

const meta: Meta<typeof MultiToggleGroup<string>> = {
  title: 'Molecules/Form/toggles/MultiToggleGroup',
  component: MultiToggleGroup,
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

const MultiToggleGroupWithHooks = (args: MultiToggleGroupProps) => {
  const [value, setValue] = useState<string[]>([])
  return <MultiToggleGroup {...args} value={value} onChange={v => setValue(v)} />
}

export default meta
type Story = StoryObj<typeof MultiToggleGroup<string>>

export const PrimaryDefault: Story = {
  args: {
    className: '',
    name: 'toggleGroupStory',
    value: [],
    options: getOptions('toggleGroupStory', 5),
    column: false,
    allowEmpty: true,
    variant: 'outlined',
    color: 'primary',
    size: 'md',
    error: '',
    disabled: false,
    buttonProps: {},
    onClear: undefined,
    onChange: () => {},
  },
  render: args => <MultiToggleGroupWithHooks {...args} />,
}

export const Column: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'toggleGroupStory2',
    options: getOptions('toggleGroupStory2', 5),

    column: true,
  },
  render: args => <MultiToggleGroupWithHooks {...args} />,
}

export const OptionsWithContent: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'toggleGroupStory3',
    options: optionsWithContent.slice(0, 3),
  },
  render: args => <MultiToggleGroupWithHooks {...args} />,
}

export const Error: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'toggleGroupStory4',
    options: getOptions('toggleGroupStory4', 5),
    error: 'error',
  },
  render: args => <MultiToggleGroupWithHooks {...args} />,
}

export const Disabled: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'toggleGroupStory5',
    disabled: true,
    options: getOptions('toggleGroupStory5', 5),
  },
  render: args => <MultiToggleGroupWithHooks {...args} />,
}
