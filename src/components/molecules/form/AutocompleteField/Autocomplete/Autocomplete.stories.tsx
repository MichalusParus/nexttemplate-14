import type { Meta, StoryObj } from '@storybook/react'
import { useState, useTransition } from 'react'

import Button from '@/components/atoms/common/Button'
import { useDebounce } from '@/utils/hooks/useDebounce'
import { useFilterData } from '@/utils/hooks/useFilterData'

import { options } from '../../../../../../.storybook/helpers'
import { Autocomplete, AutocompleteProps } from './Autocomplete'

const meta: Meta<typeof Autocomplete> = {
  title: 'Molecules/Form/Autocomplete',
  component: Autocomplete,
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
    children: {
      control: false,
    },
  },
}

const AutocompleteWithFetch = (args: AutocompleteProps) => {
  const [value, setValue] = useState<string>('')
  const [inputValue, setInputValue] = useState<string>('')
  const [options, setOptions] = useState<{ label: string; value: string }[]>([])
  const [isPending, startTransition] = useTransition()

  const getOptions = async (value: string) => {
    await fetch(`https://freetestapi.com/api/v1/actresses?search=${value}`)
      .then(res => res.json())
      .then(res =>
        setOptions(res.map((o: { name: string; id: string }) => ({ label: o.name, value: o.id }))),
      )
  }

  const { debouncedFn, isDebouncePending } = useDebounce(getOptions, 500)

  const handleInputChange = (value: string) => {
    if (value.length > 2) {
      startTransition(async () => {
        await debouncedFn(value)
      })
    } else if (options.length) {
      setOptions([])
    }
    setInputValue(value)
  }

  return (
    <div className={`flex h-96 justify-center ${args.placement === 'top' ? 'items-end' : ''}`}>
      <Autocomplete
        {...args}
        options={options}
        isLoading={isPending || isDebouncePending || args.isLoading}
        value={value}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        onChange={setValue}
      />
    </div>
  )
}

const ClientAutocomplete = (args: AutocompleteProps) => {
  const [value, setValue] = useState<string>('')
  const { filteredData, filter, setFilter } = useFilterData(args.options)

  return (
    <div className={'flex h-80 justify-center'}>
      <Autocomplete
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
type Story = StoryObj<typeof Autocomplete>

export const PrimaryDefault: Story = {
  args: {
    className: 'className',
    name: 'autocompleteStory',
    label: 'Label',
    inputValue: '',
    value: '',
    options: options.slice(0, 5),
    variant: 'outlined',
    color: 'primary',
    size: 'md',
    placeholder: 'placeholder',
    description: '',
    placement: 'left',
    width: 'w-96',
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
  render: args => <AutocompleteWithFetch {...args} />,
}

export const ClientFilter: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'clientAutocompleteStory',
  },
  render: args => <ClientAutocomplete {...args} />,
}

export const Top: Story = {
  args: {
    ...PrimaryDefault.args,
    placement: 'top',
    name: 'autocompleteStory2',
  },
  render: args => <AutocompleteWithFetch {...args} />,
}

export const Scroll: Story = {
  args: {
    ...PrimaryDefault.args,
    options: options,
    name: 'autocompleteStory3',
  },
  render: args => <AutocompleteWithFetch {...args} />,
}

export const IsLoading: Story = {
  args: {
    ...PrimaryDefault.args,
    isLoading: true,
    name: 'autocompleteStory4',
  },
  render: args => <AutocompleteWithFetch {...args} />,
}

export const CreateNew: Story = {
  args: {
    ...PrimaryDefault.args,
    isLoading: true,
    name: 'autocompleteStory5',
    children: (
      <Button
        className="w-full rounded-none border-none"
        variant={PrimaryDefault.args?.variant}
        color={PrimaryDefault.args?.color}
        size={PrimaryDefault.args?.size}
        onClick={() => console.log('create new')}
      >
        Create new
      </Button>
    ),
  },
  render: args => <AutocompleteWithFetch {...args} />,
}

export const Error: Story = {
  args: {
    ...PrimaryDefault.args,
    error: 'error',
    name: 'autocompleteStory6',
  },
  render: args => <AutocompleteWithFetch {...args} />,
}

export const Disabled: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'autocompleteStory7',
    disabled: true,
  },
  render: args => <AutocompleteWithFetch {...args} />,
}
