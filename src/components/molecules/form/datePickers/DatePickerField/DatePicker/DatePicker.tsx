'use client'
import { format } from 'date-fns'
import { forwardRef, useImperativeHandle, useRef, useState } from 'react'

import { Button, ButtonProps } from '@/components/atoms/common/Button'
import { CalendarIcon } from '@/components/atoms/icons'
import { Calendar } from '@/components/molecules/common/Calendar'
import { CalendarProps } from '@/components/molecules/common/Calendar/Calendar'
import { Dropdown } from '@/components/molecules/popovers/Dropdown'
import { DropdownProps } from '@/components/molecules/popovers/Dropdown/Dropdown'
import { InputProps, StyleProps } from '@/components/types'
import { useFocus } from '@/utils/hooks/useFocus'
import { cn, filterOutKeys } from '@/utils/utils'

export type DatePickerProps = Pick<ButtonProps, 'name' | 'disabled'> &
  InputProps &
  StyleProps & {
    /** position of dropdown */
    placement?: 'bottom-start' | 'top-start'
    /** current value of component */
    value?: Date
    /** optional button props for datePicker combobox */
    buttonProps?: Partial<ButtonProps>
    /** for passing aditional props to dropdown */
    dropdownProps?: Partial<DropdownProps>
    /** for passing aditional props to calendar */
    calendarProps?: Partial<CalendarProps>
    /** onChange function */
    onChange: (value: Date) => void
  }

/** Basic custom uncontroled DatePicker. For form purposes use DatePickerField. Button, Dropdown and Calendar props supported. USE CLIENT */
export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      className,
      name,
      placeholder,
      value,
      variant = 'outlined',
      color = 'primary',
      size = 'md',
      placement = 'bottom-start',
      disabled,
      error,
      buttonProps = {},
      dropdownProps = {},
      calendarProps = {},
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
      <div
        className={cn('DatePicker', 'relative w-full', className)}
        ref={componentRef}
        data-testid="DatePicker"
      >
        <Button
          id={name}
          className={cn(
            'DatePickerCombobox',
            'w-full',
            isOpen && 'selected z-combobox',
            error && 'error',
            buttonProps.className,
          )}
          type="button"
          variant={variant}
          color={color}
          size={size}
          disabled={disabled}
          hideShadow
          role="combobox"
          aria-labelledby={`${name}-label`}
          aria-describedby={`${name}-description`}
          aria-expanded={isOpen}
          aria-haspopup="true"
          aria-controls={name}
          aria-owns={name}
          onClick={() => setIsOpen(prev => !prev)}
          {...filterOutKeys(buttonProps, ['className'])}
        >
          <div className={cn('ComboboxInnerWrap', 'flex w-full justify-between gap-2')}>
            <div className="truncate">{getComboboxTitle()}</div>
            <CalendarIcon className={cn('text-inherit transition-transform')} />
          </div>
        </Button>
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
            aria-hidden={!isOpen}
            // paperProps={{ className: 'border-none' }}
            onChange={handleOnChange}
            {...calendarProps}
          />
        </Dropdown>
      </div>
    )
  },
)

DatePicker.displayName = 'DatePicker'
