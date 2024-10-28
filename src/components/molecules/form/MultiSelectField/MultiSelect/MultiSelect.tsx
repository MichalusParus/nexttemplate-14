'use client'
import { useTranslations } from 'next-intl'
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react'

import { Button } from '@/components/atoms/common/Button'
import { Chip } from '@/components/atoms/common/Chip'
import { Combobox } from '@/components/atoms/common/Combobox'
import { ListBox } from '@/components/atoms/common/ListBox'
import { ChevronIcon, XIcon } from '@/components/atoms/icons'
import { Dropdown } from '@/components/molecules/popovers/Dropdown'
import { useFocus } from '@/utils/hooks/useFocus'
import { cn, filterOutKeys } from '@/utils/utils'

import { Label } from '../../../../atoms/common/Label/Label'
import { SelectProps } from '../../SelectField/Select/Select'
import { iconSize, selectedClass, selectedSize } from './MultiSelect.style'

export type MultiSelectProps = Omit<SelectProps, 'value' | 'onChange'> & {
  /** current value of component */
  value: string[]
  /** onChange function */
  onChange: (value: string[]) => void
}

/** Basic custom MultiSelect inside Label Component. For form purposes use MultiSelectField. Combobox, Dropdown and ListBox props supported. USE CLIENT */
export const MultiSelect = forwardRef<HTMLDivElement, MultiSelectProps>(
  (
    {
      className,
      name,
      label,
      placeholder = label,
      options,
      value,
      placement = 'bottom',
      variant = 'outlined',
      color = 'primary',
      size = 'md',
      disabled,
      error,
      comboboxProps = {},
      dropdownProps = {},
      listboxProps = {},
      labelProps,
      onChange,
    },
    ref,
  ) => {
    const t = useTranslations('Components')
    const componentRef = useRef<HTMLDivElement>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)
    useImperativeHandle(ref, () => componentRef.current!)
    const [isOpen, setIsOpen] = useState(false)
    const [selectedOptionsSize, setSelectedOptionsSize] = useState<{
      width?: number
      height?: number
    }>()
    const sortedOptions = placement === 'top' ? options.reverse() : options
    const selectedOptionsRef = useRef<HTMLDivElement>(null)
    const selectedOptions = options.filter(option => value.includes(option.value)) || options[0]
    const { focusableEl } = useFocus(
      isOpen,
      componentRef,
      ['.SelectCombobox', '.ChipAction', '.ClearButton', '.Option'],
      () => setIsOpen(false),
      {
        portalRef: dropdownRef,
        value: value,
      },
    )

    const handleClose = () => {
      focusableEl[0].focus()
      setIsOpen(false)
    }

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

    const handleClear = useCallback(() => {
      onChange([])
    }, [onChange])

    useEffect(() => {
      if (selectedOptions.length) {
        setSelectedOptionsSize({
          width: selectedOptionsRef.current?.clientWidth,
          height: (selectedOptionsRef.current?.clientHeight || 2) - 2,
        })
      }
    }, [selectedOptions.length, selectedOptionsRef, setSelectedOptionsSize])

    return (
      <Label name={name} label={label} size={size} error={error} {...labelProps}>
        <div
          className={cn('MultiSelect', 'relative w-full', className)}
          ref={componentRef}
          data-testid="MultiSelect"
        >
          <Combobox
            id={name}
            className={cn('SelectCombobox', 'w-full', error && 'error', comboboxProps.className)}
            name={name}
            variant={variant}
            color={color}
            size={size}
            hasPopup="listbox"
            isOpen={isOpen}
            disabled={disabled}
            hideShadow
            disableUpperCase
            aria-labelledby={'label-' + name}
            aria-describedby={`${name}-description`}
            onClick={() => setIsOpen(prev => !prev)}
            {...filterOutKeys(comboboxProps, ['className'])}
          >
            <div className={cn('ComboboxInnerWrap', 'flex w-full items-center justify-between')}>
              {selectedOptions.length ? (
                <div
                  className="FakeSelectedWrap"
                  style={{
                    width: selectedOptionsSize?.width,
                    height: selectedOptionsSize?.height,
                  }}
                />
              ) : (
                <div className="text-dark-400">{placeholder}</div>
              )}
              <ChevronIcon
                className={cn(
                  'text-inherit transition-transform',
                  isOpen && 'rotate-180',
                  iconSize[size],
                )}
              />
            </div>
          </Combobox>
          <div
            className={cn(
              'SelectedOptionsWrap',
              selectedClass,
              selectedSize[size],
              isOpen ? 'z-40' : 'z-20',
            )}
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
            {Boolean(value.length) && (
              <Button
                className={cn('ClearButton', 'shrink-0 border-0')}
                type="button"
                startIcon={<XIcon className={iconSize[size]} />}
                variant={variant}
                color={color}
                size="none"
                hideShadow
                aria-label={t('clear')}
                tabIndex={-1}
                onClick={handleClear}
              />
            )}
          </div>
          <Dropdown
            isOpen={isOpen}
            parentRef={componentRef}
            placement={placement}
            variant={variant}
            color={color}
            onClose={handleClose}
            scrollShadowProps={{ disableHorizontal: true }}
            ref={dropdownRef}
            {...dropdownProps}
          >
            <ListBox
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
