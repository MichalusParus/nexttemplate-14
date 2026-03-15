'use client'
import { Placement } from '@popperjs/core'
import { forwardRef, useCallback, useRef, useState } from 'react'

import { Calendar } from '@/components/molecules/common/Calendar'
import { Dropdown } from '@/components/molecules/popovers/Dropdown'
import { DropdownProps } from '@/components/molecules/popovers/Dropdown/Dropdown'
import { FOCUS_SELECTORS, useFocus } from '@/components/utils/hooks/useFocus'
import { cn, normalizeDateValue } from '@/utils/utils'

import { DatePickerCombobox, DatePickerComboboxProps } from './DatePickerCombobox'

export type DateValue = string | Date | number

export type DatePickerProps = Omit<
  DatePickerComboboxProps,
  'isOpen' | 'value' | 'handleOpen' | 'handleOnChange'
> & {
  /** current value of component */
  value?: DateValue
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
    const comboboxRef = useRef<HTMLButtonElement | null>(null)
    const [dropdownEl, setDropdownEl] = useState<HTMLDivElement | null>(null)
    const { scrollShadowProps, ...restDropdownProps } = dropdownProps
    const { paperProps, ...restCalendarProps } = calendarProps
    const dateValue = normalizeDateValue(value)

    const handleToggle = useCallback(
      (open?: boolean) => {
        const nextState = open ?? !isOpen
        setIsOpen(prev => {
          if (prev && !nextState) onClose?.()
          if (!prev && nextState) onOpen?.()
          return nextState
        })
      },
      [isOpen, onOpen, onClose],
    )

    const handleOnChange = useCallback(
      (value: Date) => {
        onChange(value)
        if (!calendarProps?.range && !calendarProps?.multiValue) {
          comboboxRef.current?.focus()
          handleToggle(false)
        }
      },
      [onChange, calendarProps?.range, calendarProps?.multiValue, handleToggle],
    )

    const handleCalendarClose = useCallback(() => {
      comboboxRef.current?.focus()
      handleToggle(false)
    }, [handleToggle])

    useFocus(isOpen, comboboxRef, {
      portalEl: dropdownEl,
      selectors: FOCUS_SELECTORS.datepicker,
      onToggle: handleToggle,
      scope: true,
      triggerNav: true,
      scopeType: 'dropdown',
      value: dateValue,
      onOpen: () => {
        requestAnimationFrame(() => {
          const grid = dropdownEl?.querySelector('[role="grid"]')
          if (!grid) return
          const cells = Array.from(
            grid.querySelectorAll('[role="gridcell"][tabindex]') as NodeListOf<HTMLElement>,
          )
          if (cells.length === 0) return
          const selected = cells.find(
            el => el.classList.contains('DateButton') && el.getAttribute('aria-selected') === 'true',
          )
          const today = cells.find(
            el => el.classList.contains('DateButton') && el.getAttribute('aria-current') === 'date',
          )
          const first = cells.find(el => el.classList.contains('DateButton'))
          ;(selected ?? today ?? first ?? cells[0])?.focus()
        })
      },
    })

    return (
      <div
        className={cn('DatePicker', 'relative w-full')}
        ref={componentRef}
        data-testid="DatePicker"
      >
        <DatePickerCombobox
          isOpen={isOpen}
          name={name}
          value={dateValue}
          variant={variant}
          color={color}
          size={size}
          calendarProps={calendarProps}
          handleOpen={() => handleToggle()}
          handleOnChange={handleOnChange}
          ref={el => {
            comboboxRef.current = el
            if (typeof ref === 'function') ref(el)
            else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = el
          }}
          {...rest}
        />
        <Dropdown
          isOpen={isOpen}
          anchorRef={componentRef}
          placement={placement}
          variant={variant}
          color={color}
          paddingX="px-0"
          paddingY="py-0"
          width={'w-auto'}
          height="max-h-full"
          scrollShadowProps={scrollShadowProps}
          onClose={() => handleToggle(false)}
          ref={setDropdownEl}
          {...restDropdownProps}
        >
          <Calendar
            name={`${name}-calendar`}
            date={dateValue}
            variant={variant}
            color={color}
            size={size}
            isActive={isOpen}
            onClose={handleCalendarClose}
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
