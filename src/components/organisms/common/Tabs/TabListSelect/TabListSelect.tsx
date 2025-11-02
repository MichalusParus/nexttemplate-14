'use client'
import { PropsWithChildren } from 'react'

import { Select, SelectProps } from '@/components/molecules/form/comboboxes/SelectField/Select'
import { cn } from '@/utils/utils'

import { TabListProps } from '../TabList/TabList'

export type TabListSelectProps<T = string> = TabListProps<T> & {
  /** for passing additional select props for mobile display of tabs */
  selectProps?: Partial<SelectProps<T>>
}

/** TabList inside dropdown for mobile screen tablist. tabButtonProps, Button and Dropdown props supported. USE CLIENT */
export const TabListSelect = <T,>({
  className,
  name = 'tab',
  selectedTab,
  tabs,
  variant,
  color,
  size,
  tabButtonProps = {},
  selectProps = {},
  onTabChange,
  children,
}: PropsWithChildren<TabListSelectProps<T>>) => {
  const {
    className: selectClassName,
    listboxProps: selectListboxProps,
    ...restSelectProps
  } = selectProps
  const options = tabs.map(tab => ({
    ...tab,
    buttonProps: {
      id: `${name}-${tab.value}-tab`,
      'aria-controls': `${tab.value}-tabpanel`,
      disabled: tab.isDisabled,
    },
  }))

  return (
    <Select<T>
      className={cn('TabListSelect', '[&_.Ellipsis]:text-current', selectClassName, className)}
      name="select-tablist"
      placeholder={selectedTab.label}
      value={selectedTab.value}
      options={options}
      variant={variant}
      color={color}
      size={size}
      listboxProps={{
        role: 'tablist',
        buttonProps: {
          role: 'tab',
          ...tabButtonProps,
        },
        ...selectListboxProps,
      }}
      onChange={onTabChange}
      data-testid="TabListSelect"
      {...restSelectProps}
    >
      {children}
    </Select>
  )
}

TabListSelect.displayName = 'TabListSelect'
