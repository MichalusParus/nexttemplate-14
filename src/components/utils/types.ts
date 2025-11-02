import { HTMLAttributes, InputHTMLAttributes, ReactNode } from 'react'

import { ButtonProps } from '../atoms/common/Button'
import { LabelProps } from '../atoms/common/Label/Label'

export type OptionGroupType<T = string> = {
  label: string
  content?: ReactNode
  groupedOptions: OptionType<T>[]
}

export type OptionType<T = string> = {
  label: string
  content?: ReactNode
  value: T
  buttonProps?: Partial<ButtonProps>
}

export type NativeDivProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'className' | 'title' | 'color' | 'onClick' | 'label' | 'onChange'
>

export type NativeInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  | 'color'
  | 'size'
  | 'onChange'
  | 'name'
  | 'className'
  | 'value'
  | 'placeholder'
  | 'type'
  | 'width'
  | 'content'
  | 'onDrop'
>

export type InputProps = {
  /** for passing custom tailwind classes */
  className?: string
  /** name of form field */
  name: string
  /** placeholder of input */
  placeholder?: string
  /** if defined, error state for label and input */
  error?: string
}

export type FieldProps = {
  /** text content of label */
  label: string
  /** for passing aditional props to label */
  labelProps?: Partial<LabelProps>
}

export type StyleProps = {
  /** style variant of component */
  variant?: 'text' | 'outlined' | 'contained'
  /** theme color of component, none disable styles for custom styling via className */
  color?: 'primary' | 'secondary' | 'terciary' | 'none'
  /** size of component, none disable sizes for custom styling via className */
  size?: 'sm' | 'md' | 'lg' | 'none'
}
