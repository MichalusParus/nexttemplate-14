'use client'
import { usePathname, useRouter } from 'next/navigation'
import { forwardRef, PropsWithChildren, useCallback } from 'react'

import { cn } from '@/utils/utils'

import { DropdownTabList, DropdownTabListProps } from './DropdownTabList'
import { TabList } from './TabList'

export type TabsProps = Omit<DropdownTabListProps, 'selectedTab' | 'onTabChange'> & {
  /** current selected tab value */
  selectedValue: string
  /** optional for passing onTabChange function */
  onTabChange?: DropdownTabListProps['onTabChange']
}

/** Tabs component for switching panels with content. Link, Button and Disclosure props supported. */
export const Tabs = forwardRef<HTMLDivElement, PropsWithChildren<TabsProps>>(
  (
    {
      className,
      name = 'tab',
      tabs,
      selectedValue,
      variant = 'text',
      color = 'primary',
      size = 'inline',
      fullWidth,
      buttonProps,
      tabButtonProps,
      dropdownProps,
      onTabChange,
      children,
    },
    ref,
  ) => {
    const router = useRouter()
    const pathname = usePathname()
    const selectedTab = tabs.find(tab => tab.value === selectedValue) || tabs[0]
    const visibleTabs = tabs.filter(tab => !tab.isHidden)

    const handleTabChange = useCallback(
      (tabValue: string) => {
        if (onTabChange) onTabChange(tabValue)
        else {
          const tabParam = new URLSearchParams({ [name]: tabValue }).toString()
          router.push(`${pathname}?${tabParam}`)
        }
      },
      [router, name, pathname, onTabChange],
    )

    const tablistProps = {
      name,
      selectedTab,
      tabs: visibleTabs,
      variant,
      color,
      size,
      tabButtonProps,
      onTabChange: handleTabChange,
      children,
    }

    return (
      <div className={cn('TabsWrap', 'relative', className)} ref={ref} data-testid="Tabs">
        <TabList className={cn('hidden md:block')} fullWidth={fullWidth} {...tablistProps} />
        <DropdownTabList
          className={'md:hidden'}
          buttonProps={buttonProps}
          dropdownProps={dropdownProps}
          {...tablistProps}
        />
        <div
          id={`${name}-tabpanel`}
          className={cn('TabPanel', 'w-full')}
          role="tabpanel"
          aria-labelledby={`${name}-${selectedTab.value}-tab`}
        >
          {selectedTab.component}
        </div>
      </div>
    )
  },
)

Tabs.displayName = 'Tabs'
