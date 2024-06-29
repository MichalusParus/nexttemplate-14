import type { Meta, StoryObj } from '@storybook/react'
import { useEffect, useState, useTransition } from 'react'

import { useFilterData } from '@/utils/hooks/useFilterData'

import { options } from '../../../../../../.storybook/helpers'
import { MultiAutocomplete, MultiAutocompleteProps } from './MultiAutocomplete'

const meta: Meta<typeof MultiAutocomplete> = {
  title: 'Molecules/Form/MultiAutocomplete',
  component: MultiAutocomplete,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    options: {
      control: false,
    },
    inputProps: {
      control: false,
    },
  },
}

const MultiAutocompleteWithFetch = (args: MultiAutocompleteProps) => {
  const [value, setValue] = useState<string[]>([])
  const [inputValue, setInputValue] = useState<string>('')
  const [options, setOptions] = useState<{ label: string; value: string }[]>([])
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    startTransition(() => {
      fetch(`https://freetestapi.com/api/v1/actresses?search=${inputValue}`)
        .then(res => res.json())
        .then(res =>
          setOptions(
            res.map((o: { name: string; id: string }) => ({ label: o.name, value: o.id })),
          ),
        )
    })
  }, [inputValue])

  return (
    <div className={`flex h-96 justify-center ${args.placement === 'top' ? 'items-end' : ''}`}>
      <MultiAutocomplete
        {...args}
        options={options}
        isLoading={isPending || args.isLoading}
        value={value}
        inputValue={inputValue}
        onInputChange={setInputValue}
        onChange={setValue}
      />
    </div>
  )
}

const ClientMultiAutocomplete = (args: MultiAutocompleteProps) => {
  const [value, setValue] = useState<string[]>([])
  const { filteredData, filter, setFilter } = useFilterData(args.options)

  return (
    <div className={'flex h-80 justify-center'}>
      <MultiAutocomplete
        {...args}
        options={filteredData}
        value={value}
        inputValue={filter.label || ''}
        onInputChange={(value: string) => setFilter({ label: value })}
        onChange={setValue}
      />
    </div>
  )
}

export default meta
type Story = StoryObj<typeof MultiAutocomplete>

export const PrimaryDefault: Story = {
  args: {
    className: 'className',
    name: 'MultiAutocompleteStory',
    label: 'Label',
    inputValue: '',
    value: [],
    options: options.slice(0, 5),
    variant: 'outlined',
    color: 'primary',
    size: 'md',
    placeholder: 'placeholder',
    description: '',
    placement: 'left',
    width: 'w-[30rem]',
    isLoading: false,
    hideLabel: false,
    hideError: false,
    collapsed: 'default',
    error: '',
    inputProps: undefined,
    onInputChange: () => {},
    onChange: value => console.log(value),
  },
  render: args => <MultiAutocompleteWithFetch {...args} />,
}

export const ClientFilter: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'clientMultiAutocompleteStory',
  },
  render: args => <ClientMultiAutocomplete {...args} />,
}

export const Top: Story = {
  args: {
    ...PrimaryDefault.args,
    placement: 'top',
    name: 'MultiAutocompleteStory2',
  },
  render: args => <MultiAutocompleteWithFetch {...args} />,
}

export const Scroll: Story = {
  args: {
    ...PrimaryDefault.args,
    options: options,
    name: 'MultiAutocompleteStory3',
  },
  render: args => <MultiAutocompleteWithFetch {...args} />,
}

export const IsLoading: Story = {
  args: {
    ...PrimaryDefault.args,
    isLoading: true,
    name: 'MultiAutocompleteStory4',
  },
  render: args => <MultiAutocompleteWithFetch {...args} />,
}

export const Error: Story = {
  args: {
    ...PrimaryDefault.args,
    error: 'error',
    name: 'MultiAutocompleteStory5',
  },
  render: args => <MultiAutocompleteWithFetch {...args} />,
}

export const Disabled: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'MultiAutocompleteStory6',
    disabled: true,
  },
  render: args => <MultiAutocompleteWithFetch {...args} />,
}
