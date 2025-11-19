import type { Meta, StoryObj } from '@storybook/nextjs'
import { useState, useTransition } from 'react'

import { Button } from '@/components/atoms/common/Button'
import { useGroupedOptions } from '@/components/utils/hooks/useGroupedOptions'
import { OptionGroupType, OptionType } from '@/components/utils/types'
import { debounce } from '@/utils/utils'

import {
  getGroupedOptions,
  getOptions,
  optionsWithContent,
} from '../../../../../../../.storybook/helpers'
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
  const { isGrouped } = useGroupedOptions(args.options)
  const [value, setValue] = useState<string[]>([])
  const [options, setOptions] = useState<OptionType[] | OptionGroupType[]>(args.options)

  return (
    <div className={'flex h-96 items-center justify-center'}>
      <MultiAutocomplete
        {...args}
        options={options}
        value={value}
        onInputChange={(value: string) =>
          setOptions(() => {
            if (isGrouped) {
              return (args.options as OptionGroupType[]).map(group => ({
                ...group,
                options: group.groupedOptions.filter(option => option.label.startsWith(value)),
              }))
            } else {
              return (args.options as OptionType[]).filter(option => option.label.startsWith(value))
            }
          })
        }
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
    displayChips: false,
    variant: 'outlined',
    color: 'primary',
    size: 'md',
    placement: 'bottom',
    isLoading: false,
    error: '',
    inputProps: undefined,
    dropdownProps: undefined,
    listboxProps: undefined,
    chipProps: undefined,
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
    name: 'ClientMultiAutocompleteStory',
    options: getOptions('ClientMultiAutocompleteStory', 5),
  },
  render: args => <ClientMultiAutocomplete {...args} />,
}

export const Top: Story = {
  args: {
    ...PrimaryDefault.args,
    placement: 'top',
    name: 'MultiAutocompleteStory2',
    options: getOptions('MultiAutocompleteStory2', 5),
  },
  render: args => <ClientMultiAutocomplete {...args} />,
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

export const GroupedOptions: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'MultiAutocompleteStory5',
    options: getGroupedOptions('MultiAutocompleteStory5'),
    displayChips: true,
  },
  render: args => <ClientMultiAutocomplete {...args} />,
}

export const IsLoading: Story = {
  args: {
    ...PrimaryDefault.args,
    isLoading: true,
    name: 'MultiAutocompleteStory6',
  },
  render: args => <MultiAutocompleteWithFetch {...args} />,
}

export const CreateNew: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'MultiAutocompleteStory7',
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
  render: args => <MultiAutocompleteWithFetch {...args} />,
}

export const Error: Story = {
  args: {
    ...PrimaryDefault.args,
    error: 'error',
    name: 'MultiAutocompleteStory8',
  },
  render: args => <MultiAutocompleteWithFetch {...args} />,
}

export const Disabled: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'MultiAutocompleteStory9',
    disabled: true,
  },
  render: args => <MultiAutocompleteWithFetch {...args} />,
}
