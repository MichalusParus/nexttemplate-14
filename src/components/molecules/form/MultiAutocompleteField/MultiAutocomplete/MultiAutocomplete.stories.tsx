import type { Meta, StoryObj } from '@storybook/react'
import { useCallback, useEffect, useState, useTransition } from 'react'

import { useFilterData } from '@/utils/hooks/useFilterData'

import { options } from '../../../../../../.storybook/helpers'
import { MultiAutocomplete, MultiAutocompleteProps } from './MultiAutocomplete'
import { useDebounce } from '@/utils/hooks/useDebounce'

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
    dropdownProps: {
      control: false,
    },
    listboxProps: {
      control: false,
    },
  },
}

const MultiAutocompleteWithFetch = (args: MultiAutocompleteProps) => {
  const [value, setValue] = useState<string[]>([])
  const [inputValue, setInputValue] = useState<string>('')
  const [options, setOptions] = useState<{ label: string; value: string }[]>([])
  const [isPending, startTransition] = useTransition()
  const { debouncedValue, isDebouncePending } = useDebounce(inputValue, 500)

  useEffect(() => {
    startTransition(async () => {
      await fetch(`https://freetestapi.com/api/v1/actresses?search=${debouncedValue}`)
        .then(res => res.json())
        .then(res =>
          setOptions(
            res.map((o: { name: string; id: string }) => ({ label: o.name, value: o.id })),
          ),
        )
    })
  }, [debouncedValue])

  return (
    <div className={`flex h-96 justify-center ${args.placement === 'top' ? 'items-end' : ''}`}>
      <MultiAutocomplete
        {...args}
        options={options}
        isLoading={isPending || isDebouncePending || args.isLoading}
        value={value}
        inputValue={inputValue}
        onInputChange={setInputValue}
        onChange={setValue}
      />
    </div>
  )
}

const MultiAutocompleteOnOpenFetch = (args: MultiAutocompleteProps) => {
  const [value, setValue] = useState<string[]>([])
  const [inputValue, setInputValue] = useState<string>('')
  const [options, setOptions] = useState<{ label: string; value: string }[]>([])
  const [isPending, startTransition] = useTransition()
  const { debouncedValue, isDebouncePending } = useDebounce(inputValue, 500)

  const handleOpen = useCallback(() => {
    startTransition(async () => {
      await fetch(`https://freetestapi.com/api/v1/actresses?search=${debouncedValue}`)
        .then(res => res.json())
        .then(res =>
          setOptions(
            res.map((o: { name: string; id: string }) => ({ label: o.name, value: o.id })),
          ),
        )
    })
  }, [debouncedValue])

  return (
    <div className={`flex h-96 justify-center ${args.placement === 'top' ? 'items-end' : ''}`}>
      <MultiAutocomplete
        {...args}
        options={options}
        isLoading={isPending || isDebouncePending || args.isLoading}
        value={value}
        inputValue={inputValue}
        onOpen={handleOpen}
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
    dropdownProps: undefined,
    listboxProps: undefined,
    onInputChange: () => {},
    onChange: value => console.log(value),
  },
  render: args => <MultiAutocompleteWithFetch {...args} />,
}

export const OnOpenFetch: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'onOpenAutocompleteStory',
  },
  render: args => <MultiAutocompleteOnOpenFetch {...args} />,
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
