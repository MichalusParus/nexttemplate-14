import type { Meta, StoryObj } from '@storybook/react'
import { useState, useTransition } from 'react'

import { Button } from '@/components/atoms/common/Button'
import { useFilterData } from '@/utils/hooks/useFilterData'
import { debounce } from '@/utils/utils'

import { getOptions, optionsWithContent } from '../../../../../../../.storybook/helpers'
import { MultiAutocomplete, MultiAutocompleteProps } from './MultiAutocomplete'

const meta: Meta<typeof MultiAutocomplete> = {
  title: 'Molecules/Form/comboboxes/MultiAutocomplete',
  component: MultiAutocomplete,
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

const MultiAutocompleteWithFetch = (args: MultiAutocompleteProps) => {
  const [value, setValue] = useState<string[]>([])
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
      <MultiAutocomplete
        {...args}
        options={options}
        isLoading={isPending || args.isLoading}
        value={value}
        onOpen={() => getOptions('')}
        onInputChange={debouncedFn}
        onChange={setValue}
      />
    </div>
  )
}

const ClientMultiAutocomplete = (args: MultiAutocompleteProps) => {
  const [value, setValue] = useState<string[]>([])
  const { filteredData, setFilter } = useFilterData(args.options)

  return (
    <div className={'flex h-96 items-center justify-center'}>
      <MultiAutocomplete
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
type Story = StoryObj<typeof MultiAutocomplete<string>>

export const PrimaryDefault: Story = {
  args: {
    className: '',
    name: 'MultiAutocompleteStory',
    value: [],
    placeholder: 'placeholder',
    options: [],
    variant: 'outlined',
    color: 'primary',
    size: 'md',
    placement: 'bottom',
    isLoading: false,
    error: '',
    inputProps: undefined,
    dropdownProps: undefined,
    listboxProps: undefined,
    onOpen: undefined,
    onClose: undefined,
    onInputChange: () => {},
    onChange: value => console.log(value),
  },
  render: args => <MultiAutocompleteWithFetch {...args} />,
}

export const ClientFilter: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'clientMultiAutocompleteStory',
    options: getOptions('clientMultiAutocompleteStory', 5),
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
    name: 'MultiAutocompleteStory3',
    options: getOptions('MultiAutocompleteStory3', 20),
  },
  render: args => <ClientMultiAutocomplete {...args} />,
}

export const OptionsWithContent: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'MultiAutocompleteStory4',
    options: optionsWithContent.slice(0, 5),
    displayChips: true,
  },
  render: args => <ClientMultiAutocomplete {...args} />,
}

export const IsLoading: Story = {
  args: {
    ...PrimaryDefault.args,
    isLoading: true,
    name: 'MultiAutocompleteStory5',
  },
  render: args => <MultiAutocompleteWithFetch {...args} />,
}

export const CreateNew: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'MultiAutocompleteStory6',
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
  render: args => <MultiAutocompleteWithFetch {...args} />,
}

export const Error: Story = {
  args: {
    ...PrimaryDefault.args,
    error: 'error',
    name: 'MultiAutocompleteStory7',
  },
  render: args => <MultiAutocompleteWithFetch {...args} />,
}

export const Disabled: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'MultiAutocompleteStory8',
    disabled: true,
  },
  render: args => <MultiAutocompleteWithFetch {...args} />,
}
