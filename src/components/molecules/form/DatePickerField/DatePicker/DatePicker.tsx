'use client'
import { format } from 'date-fns'
import { forwardRef, useImperativeHandle, useRef, useState } from 'react'

import { Combobox } from '@/components/atoms/common/Combobox'
import { ComboboxProps } from '@/components/atoms/common/Combobox/Combobox'
import { CalendarIcon } from '@/components/atoms/icons'
import { Calendar } from '@/components/molecules/common/Calendar'
import { CalendarProps } from '@/components/molecules/common/Calendar/Calendar'
import { Dropdown } from '@/components/molecules/popovers/Dropdown'
import { DropdownProps } from '@/components/molecules/popovers/Dropdown/Dropdown'
import { FieldProps, StyleProps } from '@/components/types'
import { useFocus } from '@/utils/hooks/useFocus'
import { cn, filterOutKeys } from '@/utils/utils'

import { Label } from '../../../../atoms/common/Label/Label'

export type DatePickerProps = Pick<ComboboxProps, 'name' | 'disabled'> &
  FieldProps &
  StyleProps & {
    /** position of dropdown */
    placement?: 'bottom-start' | 'top-start'
    /** current value of component */
    value?: Date
    /** optional combobox props for datePicker combobox */
    comboboxProps?: Partial<ComboboxProps>
    /** for passing aditional props to dropdown */
    dropdownProps?: Partial<DropdownProps>
    /** for passing aditional props to calendar */
    calendarProps?: Partial<CalendarProps>
    /** onChange function */
    onChange: (value: Date) => void
  }

/** Basic custom DatePicker inside Label Component. For form purposes use DatePickerField. Combobox, Dropdown and Calendar props supported. USE CLIENT */
export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      className,
      name,
      label,
      placeholder,
      value,
      variant = 'outlined',
      color = 'primary',
      size = 'md',
      placement = 'bottom-start',
      disabled,
      error,
      comboboxProps = {},
      dropdownProps = {},
      calendarProps = {},
      labelProps,
      onChange,
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false)
    const componentRef = useRef<HTMLDivElement>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)
    useImperativeHandle(ref, () => componentRef.current!)
    const { focusableEl } = useFocus(
      isOpen,
      componentRef,
      [
        '.DatePickerCombobox',
        '.PreviousMonthButton',
        '.MonthSelect',
        '.NextMonthButton',
        '.DateButton',
        '.MonthButton',
      ],
      () => setIsOpen(false),
      {
        portalRef: dropdownRef,
        value: value,
      },
    )

    const getComboboxTitle = () => {
      if (value || calendarProps?.range?.start || calendarProps?.multiValue?.length) {
        if (value && !calendarProps?.range && !calendarProps?.multiValue) {
          return format(value, 'dd.M.y')
        } else if (calendarProps?.range?.start && !calendarProps?.range?.end) {
          return `${format(calendarProps?.range.start, 'dd.M.y')} -`
        } else if (calendarProps?.range?.end && calendarProps?.range?.start) {
          return `${format(calendarProps?.range.start, 'dd.M.y')} - ${format(calendarProps?.range.end, 'dd.M.y')}`
        } else if (calendarProps?.multiValue) {
          return calendarProps?.multiValue.map(v => format(v, 'dd.M.y')).join(', ')
        }
      } else {
        return <div className="text-dark-400">{placeholder}</div>
      }
    }

    const handleClose = () => {
      if (focusableEl[0]) {
        focusableEl[0].focus()
      }
      setIsOpen(false)
    }

    const handleOnChange = (value: Date) => {
      onChange(value)
      if (!calendarProps?.range && !calendarProps?.multiValue) {
        handleClose()
      }
    }

    return (
      <Label name={name} label={label} size={size} error={error} {...labelProps}>
        <div
          className={cn('DatePicker', 'relative w-full', className)}
          ref={componentRef}
          data-testid="DatePicker"
        >
          <Combobox
            id={name}
            className={cn(
              'DatePickerCombobox',
              'z-40 w-full',
              error && 'error',
              comboboxProps.className,
            )}
            name={name}
            variant={variant}
            color={color}
            size={size}
            hasPopup="true"
            isOpen={isOpen}
            disabled={disabled}
            hideShadow
            disableUpperCase
            aria-labelledby={'label-' + name}
            aria-describedby={`${name}-description`}
            onClick={() => setIsOpen(prev => !prev)}
            {...filterOutKeys(comboboxProps, ['className'])}
          >
            <div className={cn('ComboboxInnerWrap', 'flex w-full justify-between gap-2')}>
              <div className="truncate">{getComboboxTitle()}</div>
              <CalendarIcon className={cn('text-inherit transition-transform')} />
            </div>
          </Combobox>
          <Dropdown
            isOpen={isOpen}
            parentRef={componentRef}
            placement={placement}
            variant={variant}
            color={color}
            padding="p-0"
            width={'w-auto'}
            height="max-h-full"
            scrollShadowProps={{
              className: '[&_.ContentWrap]:px-0',
            }}
            onClose={handleClose}
            ref={dropdownRef}
            {...dropdownProps}
          >
            <Calendar
              name={name}
              date={value}
              variant={variant}
              color={color}
              size={size}
              enableUseFocus={isOpen}
              paperProps={{ className: 'border-none' }}
              onChange={handleOnChange}
              {...calendarProps}
            />
          </Dropdown>
        </div>
      </Label>
    )
  },
)

DatePicker.displayName = 'DatePicker'
