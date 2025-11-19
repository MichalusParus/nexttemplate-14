import type { Meta, StoryObj } from '@storybook/nextjs'
import { useState } from 'react'

import { optionsWithContent } from '../../../../../../../.storybook/helpers'
import { Switch } from '.'
import { SwitchProps } from './Switch'

const meta: Meta<typeof Switch> = {
  title: 'Molecules/Form/toggles/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

const SwitchWithHooks = (args: SwitchProps) => {
  const [value, setValue] = useState<string>()
  return (
    <Switch
      {...args}
      value={value}
      isChecked={args.isChecked || Boolean(value)}
      onChange={v => setValue(prev => (prev ? undefined : v))}
    />
  )
}

export default meta
type Story = StoryObj<typeof Switch>

export const PrimaryDefault: Story = {
  args: {
    className: '',
    name: 'switchStory',
    label: 'Label',
    value: 'value',
    content: undefined,
    variant: 'outlined',
    color: 'primary',
    size: 'md',
    isChecked: false,
    error: '',
    fake: false,
    onChange: undefined,
  },
  render: args => <SwitchWithHooks {...args} />,
}

export const OptionsWithContent: Story = {
  args: {
    ...PrimaryDefault.args,
    className: 'min-w-40',
    name: 'switchStory3',
    content: optionsWithContent[0].content,
  },
  render: args => <SwitchWithHooks {...args} />,
}

export const Error: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'switchStory4',
    error: 'error',
  },
  render: args => <SwitchWithHooks {...args} />,
}

export const Disabled: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'switchStory5',
    disabled: true,
  },
  render: args => <SwitchWithHooks {...args} />,
}
