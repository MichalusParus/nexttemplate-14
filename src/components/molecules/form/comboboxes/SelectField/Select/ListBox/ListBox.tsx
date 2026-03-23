'use client'
import { isEqual } from 'lodash'
import { useTranslations } from 'next-intl'
import { forwardRef, HTMLAttributes, PropsWithChildren } from 'react'

import { buttonSize } from '@/components/atoms/common/Button/Button.style'
import { spanColor } from '@/components/atoms/typography/Span/Span.style'
import { OptionGroupType, OptionType, SelectAllState, StyleProps } from '@/components/utils/types'
import { cn } from '@/utils/utils'

import { OptionItem, OptionItemProps } from './OptionItem'

type NativeListBoxProps = Omit<
  HTMLAttributes<HTMLUListElement>,
  'className' | 'onClick' | 'color'
>

export type ListBoxProps<T = string> = NativeListBoxProps &
  Omit<OptionItemProps<T>, 'label' | 'value' | 'isSelected'> &
  StyleProps & {
    /** for passing custom tailwind classes */
    className?: string
    /** name of the listbox for aria-controls */
    name: string
    /** id of the label element for aria-labelledby */
    labelId?: string
    /** value of selected options */
    value: T[]
    /** options for display */
    options: OptionType<T>[] | OptionGroupType<T>[]
    /** bolean for if options are grouped */
    isGrouped?: boolean
    /** label for no option */
    noOptionLabel?: string
    /** state for select all checkbox */
    selectAllState?: SelectAllState
    /** callback for select all action, renders select all row when provided */
    onSelectAll?: () => void
  }

/** Listbox Ul with selectable options. USE CLIENT */
function ListBoxComponent<T = string>(
  {
    className,
    name,
    labelId,
    value = [],
    options,
    isGrouped,
    variant = 'outlined',
    color = 'primary',
    size = 'md',
    isLoading,
    noOptionLabel,
    hideCheckbox,
    buttonProps = {},
    checkboxProps = {},
    selectAllState,
    onSelectAll,
    onClick,
    children,
    ...rest
  }: PropsWithChildren<ListBoxProps<T>>,
  ref: React.ForwardedRef<HTMLUListElement>,
) {
  const t = useTranslations('Components')

  const renderOptions = (options: OptionType<T>[]) => {
    if (!options.length && !isLoading && noOptionLabel)
      return (
        <li
          className={cn('NoOptionLabel', 'text-center', buttonSize[size], spanColor[color])}
          role="presentation"
        >
          {noOptionLabel}
        </li>
      )

    const ghostOptions =
      isLoading && !options.length
        ? [{ value: 'ghost' as T, label: 'ghost', content: '', buttonProps: {} }]
        : []

    return [...options, ...ghostOptions].map(
      ({ value: optionValue, label, content, buttonProps: optionButtonProps }, index) => {
        return (
          <OptionItem
            key={`${name}-${index}-${label}-option`}
            id={`${name}-${index}-${label}-option`}
            label={label}
            value={optionValue}
            isSelected={!!value.find(v => isEqual(v, optionValue))}
            variant={variant}
            color={color}
            size={size}
            isLoading={isLoading}
            hideCheckbox={hideCheckbox}
            buttonProps={{ ...buttonProps, ...optionButtonProps }}
            checkboxProps={checkboxProps}
            onClick={onClick}
          >
            {content || label}
          </OptionItem>
        )
      },
    )
  }

  return (
    <ul
      id={name}
      className={cn('ListBox', isGrouped && 'flex flex-col gap-3', className)}
      aria-labelledby={labelId}
      aria-busy={isLoading}
      role="listbox"
      ref={ref}
      data-testid="ListBox"
      {...rest}
    >
      {selectAllState && onSelectAll && (
        <OptionItem
          id={`${name}-selectAll`}
          label={t('selectAll')}
          value={'selectAll' as T}
          isSelected={selectAllState.checked}
          variant={variant}
          color={color}
          size={size}
          checkboxProps={{
            ...checkboxProps,
            isIndeterminate: selectAllState.indeterminate,
          }}
          buttonProps={{
            disabled: selectAllState.disabled,
          }}
          onClick={() => onSelectAll()}
        />
      )}
      {isGrouped
        ? (options as OptionGroupType<T>[]).map(group => (
            <li key={group.label} role="presentation">
              <ul role="group" aria-label={group.label}>
                <li
                  className={cn('GroupLabel', 'text-center text-inherit', buttonSize[size])}
                  role="presentation"
                  data-testid="GroupLabel"
                >
                  {group.content || group.label}
                </li>
                {renderOptions(group.groupedOptions)}
              </ul>
            </li>
          ))
        : renderOptions(options as OptionType<T>[])}
      {children !== undefined && children}
    </ul>
  )
}

type ListboxComponentType = {
  <T = string>(
    props: PropsWithChildren<ListBoxProps<T>> & {
      ref?: React.ForwardedRef<HTMLUListElement>
    },
  ): React.ReactElement | null
  displayName?: string
}

export const ListBox = forwardRef(ListBoxComponent) as ListboxComponentType

ListBox.displayName = 'ListBox'
