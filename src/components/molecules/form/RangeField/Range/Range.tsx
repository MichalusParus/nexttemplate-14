import { forwardRef, InputHTMLAttributes } from 'react'

import { Label, LabelProps } from '@/components/atoms/common/Label/Label'
import Span from '@/components/atoms/typography/Span'

import { rangeClass, rangeColor, rangeSize, rangeWrapClass } from './Range.style'

export type RangeProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'color' | 'size' | 'onChange' | 'type'
> &
  Omit<LabelProps, 'name'> & {
    /** name of form field */
    name: string
    /** theme color of component, none disable styles for custom styling via className */
    color?: 'primary' | 'secondary' | 'terciary' | 'none'
    /** onChange function */
    onChange: (value: string) => void
  }

/** Basic styled Range Input inside Label Component. For form purposes use RangeField. Default InputHTMLAttributes props supported. */
export const Range = forwardRef<HTMLInputElement, RangeProps>(
  (
    {
      className = '',
      name,
      label,
      color = 'primary',
      size = 'md',
      value,
      width,
      description,
      hideLabel,
      hideError,
      collapsed,
      disabled,
      error,
      onChange,
      ...rest
    },
    ref,
  ) => {
    const errorShadow = error ? 'shadow-error' : ''
    const valueVisibility = value ? 'opacity-100' : 'opacity-0'

    return (
      <Label
        className={className}
        name={name}
        label={label}
        size={size}
        width={width}
        error={error}
        description={description}
        hideLabel={hideLabel}
        hideError={hideError}
        collapsed={collapsed}
      >
        <div className={`RangeWrap ${rangeWrapClass} ${rangeSize[size]}`}>
          <Span className={`ValueWrap min-w-[3rem] ${valueVisibility}`}>{value || '0'}</Span>
          <input
            className={`${rangeClass} ${rangeColor[color]} ${errorShadow}`}
            id={name}
            type="range"
            name={name}
            value={value}
            onChange={e => onChange(e.target.value)}
            disabled={disabled}
            tabIndex={disabled ? -1 : 0}
            ref={ref}
            {...rest}
          />
        </div>
      </Label>
    )
  },
)

Range.displayName = 'Range'
