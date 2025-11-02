'use client'
import { Placement } from '@popperjs/core'
import { forwardRef, useRef, useState } from 'react'

import { Calendar } from '@/components/molecules/common/Calendar'
import { Dropdown } from '@/components/molecules/popovers/Dropdown'
import { DropdownProps } from '@/components/molecules/popovers/Dropdown/Dropdown'
import { cn } from '@/utils/utils'

import { DatePickerCombobox, DatePickerComboboxProps } from './DatePickerCombobox'

export type DatePickerProps = Omit<
  DatePickerComboboxProps,
  'isOpen' | 'handleOpen' | 'handleOnChange'
> & {
  /** position of dropdown */
  placement?: Placement
  /** for passing aditional props to dropdown */
  dropdownProps?: Partial<DropdownProps>
  /** optional onOpen function for RangeDatePicker */
  onOpen?: () => void
  /** optional onClose function for RangeDatePicker */
  onClose?: () => void
  /** onChange function */
  onChange: (value: Date) => void
}

/** Basic custom uncontroled DatePicker. For form purposes use DatePickerField. Button, Dropdown and Calendar props supported. USE CLIENT */
export const DatePicker = forwardRef<HTMLButtonElement | null, DatePickerProps>(
  (
    {
      name,
      value,
      variant = 'outlined',
      color = 'primary',
      size = 'md',
      placement = 'bottom-start',
      dropdownProps = {},
      calendarProps = {},
      onOpen,
      onClose,
      onChange,
      ...rest
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false)
    const componentRef = useRef<HTMLDivElement>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const { scrollShadowProps, ...restDropdownProps } = dropdownProps
    const { paperProps, ...restCalendarProps } = calendarProps

    const handleOpen = () => {
      if (isOpen) {
        onClose?.()
      } else {
        onOpen?.()
      }
      setIsOpen(prev => !prev)
    }

    const handleOnChange = (value: Date) => {
      onChange(value)
      if (!calendarProps?.range && !calendarProps?.multiValue) {
        handleOpen()
      }
    }

    return (
      <div
        className={cn('DatePicker', 'relative w-full')}
        ref={componentRef}
        data-testid="DatePicker"
      >
        <DatePickerCombobox
          isOpen={isOpen}
          name={name}
          value={value}
          variant={variant}
          color={color}
          size={size}
          calendarProps={calendarProps}
          handleOpen={handleOpen}
          handleOnChange={handleOnChange}
          ref={ref}
          {...rest}
        />
        <Dropdown
          isOpen={isOpen}
          anchorRef={componentRef}
          placement={placement}
          variant={variant}
          color={color}
          padding="p-0"
          width={'w-auto'}
          height="max-h-full"
          scrollShadowProps={{
            className: '[&_.ContentWrap]:px-0',
            ...scrollShadowProps,
          }}
          onClose={handleOpen}
          ref={dropdownRef}
          {...restDropdownProps}
        >
          <Calendar
            name={`${name}-calendar`}
            date={value}
            variant={variant}
            color={color}
            size={size}
            aria-hidden={!isOpen}
            paperProps={{ className: 'border-none', ...paperProps }}
            onChange={handleOnChange}
            {...restCalendarProps}
          />
        </Dropdown>
      </div>
    )
  },
)

DatePicker.displayName = 'DatePicker'
