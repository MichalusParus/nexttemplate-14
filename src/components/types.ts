import { ReactNode } from 'react'

import { LabelProps } from './atoms/common/Label/Label'

export type OptionType = {
  label: string
  value: string
  content?: ReactNode
}

export type FieldProps = {
  /** for passing custom tailwind classes */
  className?: string
  /** name of form field */
  name: string
  /** text content of label */
  label: string
  /** placeholder of input */
  placeholder?: string
  /** if defined, error state for label and input */
  error?: string
  /** optional props for label */
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
