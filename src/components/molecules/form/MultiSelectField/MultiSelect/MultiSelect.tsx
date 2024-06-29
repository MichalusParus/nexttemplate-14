'use client'
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react'

import Button from '@/components/atoms/common/Button'
import Chip from '@/components/atoms/common/Chip'
import Combobox from '@/components/atoms/common/Combobox'
import ListBox from '@/components/atoms/common/ListBox'
import ChevronIcon from '@/components/atoms/icons/ChevronIcon'
import XIcon from '@/components/atoms/icons/XIcon'
import Dropdown from '@/components/molecules/popovers/Dropdown'
import { useFocusTrap } from '@/utils/hooks/useFocusTrap'

import { Label } from '../../../../atoms/common/Label/Label'
import { SelectProps } from '../../SelectField/Select/Select'
import { iconSize, selectedClass, selectedSize } from './MultiSelect.style'

export type MultiSelectProps = Omit<SelectProps, 'value' | 'onChange'> & {
  /** current value of component */
  value: string[]
  /** onChange function */
  onChange: (value: string[]) => void
}

/** Basic custom MultiSelect inside Label Component. For form purposes use MultiSelectField. Combobox, Dropdown and ListBox supported. USE CLIENT */
export const MultiSelect = forwardRef<HTMLDivElement, MultiSelectProps>(
  (
    {
      className = '',
      name,
      label,
      placeholder = label,
      options,
      value,
      placement = 'left',
      variant = 'outlined',
      color = 'primary',
      size = 'md',
      width,
      description,
      hideLabel,
      hideError,
      collapsed,
      disabled,
      error,
      comboboxProps,
      dropdownProps,
      listboxProps,
      onChange,
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedOptionsSize, setSelectedOptionsSize] = useState<{
      width?: number
      height?: number
    }>()
    const sortedOptions = placement === 'top' ? options.reverse() : options
    const selectedOptionsRef = useRef<HTMLDivElement>(null)
    const { componentRef, startRef } = useFocusTrap(isOpen, () => setIsOpen(false), [
      '.Option',
      '.ChipAction',
      '.ClearButton',
    ])
    useImperativeHandle(ref, () => componentRef.current!)
    const selectedOptions = options.filter(option => value.includes(option.value)) || options[0]
    const chevronPosition = isOpen ? 'rotate-180' : ''
    const errorClass = error ? 'error' : ''
    const dropdownPadding = placement === 'left' ? 'pt-1' : 'pb-1'
    const comboboxZIndex = isOpen ? 'z-40' : 'z-20'

    const handleClose = useCallback(() => {
      startRef?.current?.focus()
      setIsOpen(prev => !prev)
    }, [startRef])

    const handleOnChange = useCallback(
      (v: string) => {
        if (value.includes(v)) {
          onChange(value.filter(val => val !== v))
        } else {
          onChange([...value, v])
        }
      },
      [value, onChange],
    )

    useEffect(() => {
      if (selectedOptions.length) {
        setSelectedOptionsSize({
          width: selectedOptionsRef.current?.clientWidth,
          height: (selectedOptionsRef.current?.clientHeight || 2) - 2,
        })
      }
    }, [selectedOptions.length, selectedOptionsRef, setSelectedOptionsSize])

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
        <div className="MultiSelect relative w-full" ref={componentRef}>
          <Combobox
            id={name}
            className={`SelectCombobox ${errorClass}`}
            name={name}
            variant={variant}
            color={color}
            size={size}
            hasPopup="listbox"
            fullWidth
            isOpen={isOpen}
            disabled={disabled}
            hideShadow
            disableUpperCase
            ref={startRef}
            aria-labelledby={'label-' + name}
            onClick={handleClose}
            {...comboboxProps}
          >
            <div className="ComboboxInnerWrap flex w-full items-center justify-between">
              {selectedOptions.length ? (
                <div
                  className={'FakeSelectedWrap'}
                  style={{
                    width: selectedOptionsSize?.width,
                    height: selectedOptionsSize?.height,
                  }}
                />
              ) : (
                <div className="text-dark-400">{placeholder}</div>
              )}
              <ChevronIcon
                className={`text-inherit transition-transform ${chevronPosition} ${iconSize[size]}`}
              />
            </div>
          </Combobox>
          <div
            className={`SelectedOptionsWrap ${selectedClass} ${selectedSize[size]} ${comboboxZIndex} `}
            ref={selectedOptionsRef}
            data-testid="SelectedOptionsWrap"
          >
            {selectedOptions.map(option => (
              <Chip
                key={option.value}
                variant={variant}
                color={color}
                size={size}
                buttonProps={{ tabIndex: -1 }}
                onClick={() => handleOnChange(option.value)}
              >
                {option.label}
              </Chip>
            ))}
            {value.length ? (
              <Button
                className={'ClearButton shrink-0 border-0'}
                type="button"
                startIcon={<XIcon className={`${iconSize[size]}`} />}
                variant={variant}
                color={color}
                size="none"
                hideShadow
                aria-label={'clear'}
                tabIndex={-1}
                onClick={() => onChange([])}
              />
            ) : null}
          </div>
          <Dropdown
            isOpen={isOpen}
            placement={placement}
            variant={variant}
            color={color}
            onClose={handleClose}
            {...dropdownProps}
          >
            <ListBox
              className={dropdownPadding}
              name={name}
              value={value}
              options={sortedOptions}
              variant={variant}
              color={color}
              size={size}
              aria-multiselectable={true}
              onClick={handleOnChange}
              {...listboxProps}
            />
          </Dropdown>
        </div>
      </Label>
    )
  },
)

MultiSelect.displayName = 'MultiSelect'
