import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { SettingIcon } from '@/components/atoms/icons'

import { NumberInput, NumberInputProps } from '.'

const meta: Meta<typeof NumberInput> = {
  title: 'Molecules/Form/inputs/NumberInput',
  component: NumberInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

const InputWithHooks = (args: NumberInputProps) => {
  const [value, setValue] = useState<number | undefined>(args.value)
  return <NumberInput {...args} value={value} onChange={v => setValue(v)} />
}

export default meta
type Story = StoryObj<typeof NumberInput>

export const PrimaryDefault: Story = {
  args: {
    className: 'w-96',
    name: 'inputStory',
    value: undefined,
    placeholder: 'NumberInput',
    allowNegative: false,
    allowDecimal: 2,
    formatOptions: undefined,
    locale: undefined,
    min: undefined,
    max: undefined,
    variant: 'outlined',
    color: 'primary',
    size: 'md',
    startIcon: undefined,
    endIcon: undefined,
    error: '',
    disabled: false,
    onChange: v => console.log(v),
  },
  render: args => <InputWithHooks {...args} />,
}

export const Integral: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'inputStory2',
    allowDecimal: 0,
  },
  render: args => <InputWithHooks {...args} />,
}

export const Negative: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'inputStory3',
    allowNegative: true,
  },
  render: args => <InputWithHooks {...args} />,
}

export const NoGrouping: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'inputStory4',
    formatOptions: { useGrouping: false },
  },
  render: args => <InputWithHooks {...args} />,
}

export const Localized: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'inputStory5',
    locale: 'cs-CZ',
  },
  render: args => <InputWithHooks {...args} />,
}

export const MinMax: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'inputStory6',
    min: 0,
    max: 135.75,
  },
  render: args => <InputWithHooks {...args} />,
}

export const Currency: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'inputStory7',
    formatOptions: { style: 'currency', currency: 'EUR', currencyDisplay: 'narrowSymbol' },
  },
  render: args => <InputWithHooks {...args} />,
}

export const StartIcon: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'inputStory6',
    startIcon: <SettingIcon />,
  },
  render: args => <InputWithHooks {...args} />,
}

export const EndIcon: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'inputStory7',
    endIcon: <SettingIcon />,
  },
  render: args => <InputWithHooks {...args} />,
}

export const Error: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'inputStory8',
    error: 'error',
  },
  render: args => <InputWithHooks {...args} />,
}

export const Disabled: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'inputStory9',
    disabled: true,
  },
}
