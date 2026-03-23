import type { Meta, StoryObj } from '@storybook/nextjs'
import { useState } from 'react'

import { getOptions, optionsWithContent } from '../../../../../../../.storybook/helpers'
import { ToggleGroup, ToggleGroupProps } from './ToggleGroup'

const meta: Meta<typeof ToggleGroup<string>> = {
  title: 'Molecules/Form/toggles/ToggleGroup',
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
  const [value, setValue] = useState<string | undefined>('')
  return <ToggleGroup {...args} value={value} onChange={setValue} />
}

export default meta
type Story = StoryObj<typeof ToggleGroup<string>>

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

export const Exclusive: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'toggleGroupStory2',
    options: getOptions('toggleGroupStory2', 3),
    allowEmpty: false,
  },
  render: args => <ToggleGroupWithHooks {...args} />,
}

export const Column: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'toggleGroupStory3',
    options: getOptions('toggleGroupStory3', 5),

    column: true,
  },
  render: args => <ToggleGroupWithHooks {...args} />,
}

export const OptionsWithContent: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'toggleGroupStory4',
    options: optionsWithContent.slice(0, 3),
  },
  render: args => <ToggleGroupWithHooks {...args} />,
}

export const Error: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'toggleGroupStory5',
    options: getOptions('toggleGroupStory5', 5),
    error: 'error',
  },
  render: args => <ToggleGroupWithHooks {...args} />,
}

export const Disabled: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'toggleGroupStory6',
    disabled: true,
    options: getOptions('toggleGroupStory6', 5),
  },
  render: args => <ToggleGroupWithHooks {...args} />,
}
