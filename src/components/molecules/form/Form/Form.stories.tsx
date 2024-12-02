import { zodResolver } from '@hookform/resolvers/zod'
import type { Meta, StoryObj } from '@storybook/react'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { Button } from '@/components/atoms/common/Button'
import { Label } from '@/components/atoms/common/Label'
import { useFilterData } from '@/utils/hooks/useFilterData'

import { formSchema, getOptions, initialValues } from '../../../../../.storybook/helpers'
import { AutocompleteField } from '../AutocompleteField'
import { CheckboxField } from '../CheckboxField'
import { CheckboxGroupField } from '../CheckboxGroupField'
import { DatePickerField } from '../DatePickerField'
import { MultiAutocompleteField } from '../MultiAutocompleteField'
import { MultiDatePickerField } from '../MultiDatePickerField'
import { MultiSelectField } from '../MultiSelectField'
import { PasswordField } from '../PasswordField'
import { RadioGroupField } from '../RadioGroupField'
import { RangeDatePickerField } from '../RangeDatePickerField'
import { RangeField } from '../RangeField'
import { SearchField } from '../SearchField'
import { SelectField } from '../SelectField'
import { TextAreaField } from '../TextAreaField'
import { TextField } from '../TextField'
import { Form } from '.'
import { FormProps } from './Form'

const meta: Meta<typeof Form> = {
  title: 'Molecules/Form/Form',
  component: Form,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    form: {
      control: false,
    },
  },
}

export default meta
type Story = StoryObj<typeof Form>

const FormWithHooks = (args: FormProps<object>) => {
  const optionsRef = useRef(getOptions('formStory', 20))
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  })
  const { filteredData: autocompleteOptions, setFilter: setAutocompleteFilter } = useFilterData(
    optionsRef.current,
  )
  const { filteredData: multiAutocompleteOptions, setFilter: setMultiAutocompleteFilter } =
    useFilterData(optionsRef.current)

  return (
    <div className="px-40">
      <Form {...args} form={form}>
        <TextField name="inputStory" label="TextInput:" placeholder="input" />
        <TextField name="numberStory" type="number" label="NumberInput:" placeholder="number" />
        <PasswordField name="passwordStory" label="PasswordInput:" placeholder="password" />
        <SearchField
          name="searchStory"
          label="SearchInput:"
          placeholder="search"
          labelProps={{ description: 'Some description' }}
        />
        <TextAreaField name="textareaStory" label="Textarea:" placeholder="textarea" />
        <RangeField name="rangeStory" label="Range:" min={100} max={200} />
        <Label name="checkboxStory" label="Fake label:" fakeLabel>
          <CheckboxField name="checkboxStory" label="checkbox" />
        </Label>
        <CheckboxGroupField
          name="checkboxGroupStory"
          label="Checkbox Group:"
          options={getOptions('checkboxGroupStory', 6)}
        />
        <CheckboxGroupField
          name="switchGroupStory"
          label="Switch Group:"
          variant="switch"
          options={getOptions('switchGroupStory', 6)}
        />
        <RadioGroupField
          name="radioGroupStory"
          label="Radio Group:"
          options={getOptions('radioGroupStory', 6)}
        />
        <DatePickerField name="dateStory" label="DatePicker:" placeholder="date" />
        <RangeDatePickerField name="dateRangeStory" label="RangeDatePicker:" placeholder="range" />
        <MultiDatePickerField name="dateMultiStory" label="MultiDatePicker:" placeholder="multi" />
        <SelectField
          name="selectStory"
          label="Select:"
          placeholder="select"
          options={getOptions('selectStory', 20)}
        />
        <MultiSelectField
          name="multiSelectStory"
          label="MultiSelect:"
          placeholder="multiSelect"
          options={getOptions('multiSelectStory', 20)}
        />
        <AutocompleteField
          name="autocompleteStory"
          label="Autocomplete:"
          placeholder="autocomplete"
          options={autocompleteOptions}
          onInputChange={(value: string) => setAutocompleteFilter({ label: value })}
        />
        <MultiAutocompleteField
          name="multiAutocompleteStory"
          label="MultiAutocomplete:"
          placeholder="multiAutocomplete"
          options={multiAutocompleteOptions}
          onInputChange={(value: string) => setMultiAutocompleteFilter({ label: value })}
        />
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  )
}

export const Default: Story = {
  args: {
    className: 'w-96 gap-2',
    name: 'formStory',
    form: undefined,
    variant: 'outlined',
    color: 'primary',
    size: 'md',
    onSubmit: values => console.log(values),
  },
  render: args => <FormWithHooks {...args} />,
}
