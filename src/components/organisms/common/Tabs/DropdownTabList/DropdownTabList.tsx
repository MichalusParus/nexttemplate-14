'use client'
import { PropsWithChildren, useEffect, useRef, useState } from 'react'

import { Button, ButtonProps } from '@/components/atoms/common/Button'
import { ListBox } from '@/components/atoms/common/ListBox'
import { ChevronIcon } from '@/components/atoms/icons'
import { Dropdown, DropdownProps } from '@/components/molecules/popovers/Dropdown'
import { cn, filterOutKeys } from '@/utils/utils'

import { TabListProps } from '../TabList'

export type DropdownTabListProps = TabListProps & {
  /** for passing custom tailwind classes */
  buttonProps?: Partial<ButtonProps>
  /** for passing aditional props to Dropdown */
  dropdownProps?: Partial<DropdownProps>
}

/** TabList inside dropdown for mobile screen tablist. tabButtonProps, Button and Dropdown props supported. USE CLIENT */
export const DropdownTabList = ({
  className,
  name = 'tab',
  selectedTab,
  tabs,
  variant,
  color,
  size,
  tabButtonProps = {},
  buttonProps = {},
  dropdownProps = {},
  onTabChange,
  children,
}: PropsWithChildren<DropdownTabListProps>) => {
  const comboboxRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(false)
  }, [selectedTab])

  return (
    <div
      className={cn('DropdownTabListWrap', 'w-full', className)}
      ref={comboboxRef}
      data-testid="DropdownTabListWrap"
    >
      <Button
        className={cn('TabsDropdownCombobox', 'w-full justify-between', buttonProps?.className)}
        variant={variant}
        color={color}
        size={size}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={`${name}-tablist`}
        aria-owns={`${name}-tablist`}
        onClick={() => setIsOpen(prev => !prev)}
        {...filterOutKeys(buttonProps, ['className'])}
      >
        {selectedTab.label}
        <ChevronIcon className={cn('text-inherit transition-transform', isOpen && 'rotate-180')} />
      </Button>
      <Dropdown
        isOpen={isOpen}
        parentRef={comboboxRef}
        placement="bottom"
        variant={variant}
        color={color}
        modal
        onClose={() => setIsOpen(false)}
        {...dropdownProps}
      >
        <ListBox
          name={`${name}-tablist`}
          value={[selectedTab.value]}
          options={tabs}
          hideCheckbox
          buttonProps={{ role: 'tab', 'aria-controls': `${name}-tabpanel`, ...tabButtonProps }}
          role="tablist"
          aria-hidden={!isOpen}
          aria-label={name}
          onClick={value => onTabChange(value)}
        />
        {children}
      </Dropdown>
    </div>
  )
}

DropdownTabList.displayName = 'DropdownTabList'
