import type { Meta, StoryObj } from '@storybook/react'
import { PropsWithChildren, useState, useTransition } from 'react'

import { Button } from '@/components/atoms/common/Button'
import { useFilterData } from '@/utils/hooks/useFilterData'
import { debounce } from '@/utils/utils'

import { getOptions, optionsWithContent } from '../../../../../../../.storybook/helpers'
import { Autocomplete, AutocompleteProps } from './Autocomplete'

const meta: Meta<typeof Autocomplete> = {
  title: 'Molecules/Form/comboboxes/Autocomplete',
  component: Autocomplete,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    options: {
      control: false,
    },
    children: {
      control: false,
    },
  },
}

const AutocompleteWithFetch = (args: PropsWithChildren<AutocompleteProps>) => {
  const [value, setValue] = useState<string>('')
  const [options, setOptions] = useState<{ label: string; value: string }[]>([])
  const [isPending, startTransition] = useTransition()

  const getOptions = async (value: string) => {
    startTransition(async () => {
      await fetch(
        value.length
          ? `https://restcountries.com/v3.1/name/${value}`
          : 'https://restcountries.com/v3.1/all?fields=name',
      )
        .then(res => res.json())
        .then(res =>
          setOptions(
            res.length
              ? res.map((o: { name: { common: string }; id: string }) => ({
                  label: o.name.common,
                  value: o.name.common,
                }))
              : [],
          ),
        )
    })
  }

  const debouncedFn = debounce(getOptions, 500)

  return (
    <div
      className={`flex h-96 items-center justify-center ${args.placement === 'top' ? 'items-end' : ''}`}
    >
      <Autocomplete
        {...args}
        options={options}
        isLoading={isPending || args.isLoading}
        value={value}
        onOpen={() => getOptions('')}
        onClear={args.onClear ? () => setValue('') : undefined}
        onInputChange={debouncedFn}
        onChange={setValue}
      />
    </div>
  )
}

const ClientAutocomplete = (args: PropsWithChildren<AutocompleteProps>) => {
  const [value, setValue] = useState<string>('')
  const { filteredData, setFilter } = useFilterData(args.options)

  return (
    <div className={'flex h-80 items-center justify-center'}>
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
type Story = StoryObj<typeof Autocomplete<string>>

export const PrimaryDefault: Story = {
  args: {
    className: '',
    name: 'autocompleteStory',
    placeholder: 'placeholder',
    value: '',
    multiValue: undefined,
    options: [],
    displayChips: false,
    variant: 'outlined',
    color: 'primary',
    size: 'md',
    placement: 'bottom',
    isLoading: false,
    error: '',
    disabled: false,
    inputProps: undefined,
    dropdownProps: undefined,
    listboxProps: undefined,
    chipProps: undefined,
    onClear: undefined,
    onOpen: undefined,
    onClose: undefined,
    onInputChange: value => console.log('onInputChange', value),
    onChange: value => console.log('onChange', value),
  },
  render: args => <AutocompleteWithFetch {...args} />,
}

export const ClientFilter: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'clientAutocompleteStory',
    options: getOptions('clientAutocompleteStory', 5),
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
    name: 'autocompleteStory3',
    options: getOptions('autocompleteStory3', 20),
  },
  render: args => <ClientAutocomplete {...args} />,
}

export const OptionsWithContent: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'autocompleteStory4',
    options: optionsWithContent.slice(0, 5),
    displayChips: true,
  },
  render: args => <ClientAutocomplete {...args} />,
}

export const OnClear: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'autocompleteStory5',
    onClear: () => console.log('clear'),
  },
  render: args => <AutocompleteWithFetch {...args} />,
}

export const IsLoading: Story = {
  args: {
    ...PrimaryDefault.args,
    isLoading: true,
    name: 'autocompleteStory6',
  },
  render: args => <AutocompleteWithFetch {...args} />,
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
  render: args => <AutocompleteWithFetch {...args} />,
}

export const Error: Story = {
  args: {
    ...PrimaryDefault.args,
    error: 'error',
    name: 'autocompleteStory8',
  },
  render: args => <AutocompleteWithFetch {...args} />,
}

export const Disabled: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'autocompleteStory9',
    disabled: true,
  },
  render: args => <AutocompleteWithFetch {...args} />,
}
