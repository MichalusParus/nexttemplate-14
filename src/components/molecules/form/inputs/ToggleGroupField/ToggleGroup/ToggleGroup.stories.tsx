import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { getOptions, optionsWithContent } from '../../../../../../../.storybook/helpers'
import { ToggleGroup, ToggleGroupProps } from './ToggleGroup'

const meta: Meta<typeof ToggleGroup> = {
  title: 'Molecules/Form/inputs/ToggleGroup',
  component: ToggleGroup,
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

const ToggleGroupWithHooks = (args: ToggleGroupProps) => {
  const [value, setValue] = useState<string>('')
  return <ToggleGroup {...args} value={value} onChange={v => setValue(v)} />
}

export default meta
type Story = StoryObj<typeof ToggleGroup>

export const PrimaryDefault: Story = {
  args: {
    className: '',
    name: 'toggleGroupStory',
    value: '',
    options: getOptions('toggleGroupStory', 5),
    multiValue: undefined,
    column: false,
    variant: 'outlined',
    color: 'primary',
    size: 'md',
    error: '',
    disabled: false,
    buttonProps: {},
    onChange: () => {},
  },
  render: args => <ToggleGroupWithHooks {...args} />,
}

export const Column: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'toggleGroupStory2',
    options: getOptions('toggleGroupStory2', 5),

    column: true,
  },
  render: args => <ToggleGroupWithHooks {...args} />,
}

export const OptionsWithContent: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'toggleGroupStory3',
    options: optionsWithContent.slice(0, 3),
  },
  render: args => <ToggleGroupWithHooks {...args} />,
}

export const Error: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'toggleGroupStory4',
    options: getOptions('toggleGroupStory4', 5),
    error: 'error',
  },
  render: args => <ToggleGroupWithHooks {...args} />,
}

export const Disabled: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'toggleGroupStory5',
    disabled: true,
    options: getOptions('toggleGroupStory5', 5),
  },
  render: args => <ToggleGroupWithHooks {...args} />,
}
