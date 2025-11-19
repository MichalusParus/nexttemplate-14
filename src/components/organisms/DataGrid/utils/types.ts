import { ReactNode } from 'react'

import { DatePickerProps } from '@/components/molecules/form/comboboxes/DatePickerField/DatePicker'
import { MultiDatePickerProps } from '@/components/molecules/form/comboboxes/MultiDatePickerField/MultiDatePicker'
import { MultiSelectProps } from '@/components/molecules/form/comboboxes/MultiSelectField/MultiSelect'
import { RangeDatePickerProps } from '@/components/molecules/form/comboboxes/RangeDatePickerField/RangeDatePicker'
import { SelectProps } from '@/components/molecules/form/comboboxes/SelectField/Select'
import { MultiToggleGroupProps } from '@/components/molecules/form/toggles/MultiToggleGroupField/MultiToggleGroup'
import { TextInputProps } from '@/components/molecules/form/inputs/TextField/TextInput'
import { ToggleGroupProps } from '@/components/molecules/form/toggles/ToggleGroupField/ToggleGroup'
import { OptionType } from '@/components/utils/types'
import { FilterOperator } from '@/utils/hooks/useFilterData'

export type ColDef<T = Record<string, unknown>> = {
  name: string
  label: string
  filter?: FilterConfig
  hideSort?: boolean
  width?: string
  grow?: boolean | number
  shrink?: boolean | number
  align?: 'left' | 'center' | 'right'
  renderCell?: (row: T) => ReactNode
}

export type ColumnDef<T = Record<string, unknown>> = ColDef<T> & {
  columns?: ColumnDef<T>[]
}

export type RowDef = {
  [key: string]: string | number
}

export type FilterConfig =
  | {
      type: 'text'
      operator?: FilterOperator
      filterProps?: Omit<Partial<TextInputProps>, 'value' | 'onChange'>
    }
  | {
      type: 'number'
      operator?: FilterOperator
      filterProps?: Omit<Partial<TextInputProps>, 'value' | 'onChange'>
    }
  | {
      type: 'date'
      operator?: FilterOperator
      filterProps?: Omit<
        Partial<DatePickerProps | RangeDatePickerProps | MultiDatePickerProps>,
        'value' | 'onChange'
      >
    }
  | {
      type: 'select'
      operator?: FilterOperator
      options: OptionType[]
      filterProps?: Omit<Partial<SelectProps | MultiSelectProps>, 'value' | 'onChange'>
    }
  | {
      type: 'toggle'
      operator?: FilterOperator
      options: OptionType[]
      filterProps?: Omit<Partial<ToggleGroupProps | MultiToggleGroupProps>, 'value' | 'onChange'>
    }
