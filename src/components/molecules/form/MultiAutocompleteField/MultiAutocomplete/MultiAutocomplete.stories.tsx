import type { Meta, StoryObj } from '@storybook/react'
import { useState, useTransition } from 'react'

import { Button } from '@/components/atoms/common/Button'
import { useFilterData } from '@/utils/hooks/useFilterData'
import { debounce } from '@/utils/utils'

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

const MultiAutocompleteWithFetch = (args: MultiAutocompleteProps) => {
  const [value, setValue] = useState<string[]>([])
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
      <MultiAutocomplete
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

const ClientMultiAutocomplete = (args: MultiAutocompleteProps) => {
  const [value, setValue] = useState<string[]>([])
  const { filteredData, setFilter } = useFilterData(args.options)

  return (
    <div className={'flex h-80 justify-center'}>
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
type Story = StoryObj<typeof MultiAutocomplete>

export const PrimaryDefault: Story = {
  args: {
    className: 'className',
    name: 'MultiAutocompleteStory',
    label: 'Label',
    value: [],
    options: options.slice(0, 5),
    variant: 'outlined',
    color: 'primary',
    size: 'md',
    placeholder: 'placeholder',
    placement: 'bottom',
    isLoading: false,
    error: '',
    inputProps: undefined,
    dropdownProps: undefined,
    listboxProps: undefined,
    labelProps: { width: 'w-[30rem]' },
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

export const CreateNew: Story = {
  args: {
    ...PrimaryDefault.args,
    isLoading: true,
    name: 'MultiAutocompleteStory5',
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
    name: 'MultiAutocompleteStory6',
  },
  render: args => <MultiAutocompleteWithFetch {...args} />,
}

export const Disabled: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'MultiAutocompleteStory7',
    disabled: true,
  },
  render: args => <MultiAutocompleteWithFetch {...args} />,
}
