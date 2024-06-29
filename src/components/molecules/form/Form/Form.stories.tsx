import type { Meta, StoryObj } from '@storybook/react'

import Button from '@/components/atoms/common/Button'
import Label from '@/components/atoms/common/Label'
import { useFilterData } from '@/utils/hooks/useFilterData'

import { formScheme, initialValues, options } from '../../../../../.storybook/helpers'
import AutocompleteField from '../AutocompleteField'
import CheckboxField from '../CheckboxField'
import CheckboxGroupField from '../CheckboxGroupField'
import InputField from '../InputField'
import MultiAutocompleteField from '../MultiAutocompleteField'
import MultiSelectField from '../MultiSelectField'
import RadioGroupField from '../RadioGroupField'
import RangeField from '../RangeField'
import SelectField from '../SelectField'
import TextAreaField from '../TextAreaField'
import Form from '.'
import { FormProps } from './Form'

const meta: Meta<typeof Form> = {
  title: 'Molecules/Form/Form',
  component: Form,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    initialValues: {
      control: false,
    },
    validationSchema: {
      control: false,
    },
  },
}

export default meta
type Story = StoryObj<typeof Form>

const FormWithHooks = (args: FormProps) => {
  const {
    filteredData: autocompleteOptions,
    filter: autocompleteFilter,
    setFilter: setAutocompleteFilter,
  } = useFilterData(options)
  const {
    filteredData: multiAutocompleteOptions,
    filter: multiAutocompleteFilter,
    setFilter: setMultiAutocompleteFilter,
  } = useFilterData(options)

  return (
    <Form {...args}>
      <InputField name="inputStory" label="Input:" placeholder="input" />
      <InputField name="numberStory" type="number" label="Number:" placeholder="number" />
      <InputField name="searchStory" type="search" label="Search:" placeholder="Search" />
      <InputField name="dateStory" type="date" label="Date:" placeholder="date" />
      <TextAreaField name="textareaStory" label="Textarea:" placeholder="textarea" />
      <RangeField name="rangeStory" label="Range:" min={100} max={200} />
      <Label label="Fake label:" collapsed={args.collapsed} fakeLabel>
        <CheckboxField name="checkboxStory" label="checkbox" />
      </Label>
      <CheckboxGroupField
        name="checkboxGroupStory"
        label="Checkbox Group:"
        options={options.slice(0, 6).map(o => ({
          label: o.label,
          value: o.value + 'checkbox',
        }))}
      />
      <CheckboxGroupField
        name="switchGroupStory"
        label="Switch Group:"
        variant="switch"
        options={options.slice(0, 6).map((o, i) => ({
          label: o.label,
          value: o.value + 'checkbox' + i,
        }))}
      />
      <RadioGroupField name="radioGroupStory" label="Radio Group:" options={options.slice(0, 6)} />
      <SelectField
        name="selectStory"
        label="Select:"
        placeholder="select"
        options={options.slice(0.6)}
      />
      <MultiSelectField
        name="multiSelectStory"
        label="MultiSelect:"
        placeholder="multiSelect"
        options={options.slice(0.6)}
      />
      <AutocompleteField
        name="autocompleteStory"
        label="Autocomplete:"
        placeholder="autocomplete"
        options={autocompleteOptions}
        inputValue={autocompleteFilter.label || ''}
        onInputChange={(value: string) => setAutocompleteFilter({ label: value })}
      />
      <MultiAutocompleteField
        name="multiAutocompleteStory"
        label="MultiAutocomplete:"
        placeholder="multiAutocomplete"
        options={multiAutocompleteOptions}
        inputValue={multiAutocompleteFilter.label || ''}
        onInputChange={(value: string) => setMultiAutocompleteFilter({ label: value })}
      />
      <Button type="submit">Submit</Button>
    </Form>
  )
}

export const Default: Story = {
  args: {
    className: '',
    initialValues: initialValues,
    validationSchema: formScheme,
    variant: 'outlined',
    color: 'primary',
    size: 'md',
    collapsed: 'default',
    onSubmit: values => console.log(values),
  },
  render: args => <FormWithHooks {...args} />,
}
