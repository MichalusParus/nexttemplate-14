import type { Meta, StoryObj } from '@storybook/react'
import { useState, useTransition } from 'react'

import { Button } from '@/components/atoms/common/Button'
import { useFilterData } from '@/utils/hooks/useFilterData'
import { debounce } from '@/utils/utils'

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
  const [options, setOptions] = useState<{ label: string; value: string }[]>([])
  const [isPending, startTransition] = useTransition()

  const getOptions = async (value: string) => {
    if (value.length > 2) {
      startTransition(async () => {
        await fetch(`https://restcountries.com/v3.1/name/${value}`)
          .then(res => res.json())
          .then(res =>
            setOptions(
              res.map((o: { name: { common: string }; id: string }) => ({
                label: o.name.common,
                value: o.name.common,
              })),
            ),
          )
      })
    } else {
      setOptions([])
    }
  }

  const debouncedFn = debounce(getOptions, 500)

  return (
    <div className={`flex h-96 justify-center ${args.placement === 'top' ? 'items-end' : ''}`}>
      <Autocomplete
        {...args}
        options={options}
        isLoading={isPending || args.isLoading}
        value={value}
        onInputChange={debouncedFn}
        onChange={setValue}
      />
    </div>
  )
}

const ClientAutocomplete = (args: AutocompleteProps) => {
  const [value, setValue] = useState<string>('')
  const { filteredData, setFilter } = useFilterData(args.options)

  return (
    <div className={'flex h-80 justify-center'}>
      <Autocomplete
        {...args}
        options={filteredData}
        value={value}
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
    placeholder: 'placeholder',
    value: '',
    options: options.slice(0, 5),
    variant: 'outlined',
    color: 'primary',
    size: 'md',
    placement: 'bottom',
    isLoading: false,
    error: '',
    inputProps: undefined,
    dropdownProps: undefined,
    listboxProps: undefined,
    labelProps: { width: 'w-96' },
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
