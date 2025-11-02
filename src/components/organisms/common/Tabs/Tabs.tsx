'use client'
import { usePathname, useRouter } from 'next/navigation'
import { ForwardedRef, forwardRef, PropsWithChildren, useCallback } from 'react'

import { cn } from '@/utils/utils'

import { TabList } from './TabList'
import { TabListSelect, TabListSelectProps } from './TabListSelect'

export type TabsProps<T = string> = Omit<TabListSelectProps<T>, 'selectedTab' | 'onTabChange'> & {
  /** current selected tab value */
  selectedValue: T
  /** optional for passing onTabChange function for non url query navigation */
  onTabChange?: TabListSelectProps<T>['onTabChange']
}

/** Tabs component for switching panels with content. Link, Button and Disclosure props supported. */
function TabsComponent<T = string>(
  {
    className,
    name = 'tab',
    tabs,
    selectedValue,
    variant = 'text',
    color = 'primary',
    size = 'md',
    fullWidth,
    tabButtonProps = {},
    selectProps = {},
    onTabChange,
    children,
  }: PropsWithChildren<TabsProps<T>>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const router = useRouter()
  const pathname = usePathname()
  const selectedTab = tabs.find(tab => tab.value === selectedValue) || tabs[0]
  const visibleTabs = tabs.filter(tab => !tab.isHidden)

  const handleTabChange = useCallback(
    (tabValue: T) => {
      if (onTabChange) onTabChange(tabValue)
      else {
        const tabParam = new URLSearchParams({ [name]: String(tabValue) }).toString()
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
    <div
      className={cn('TabsWrap', 'relative flex flex-col items-start gap-4', className)}
      ref={ref}
      data-testid="Tabs"
    >
      <TabList<T> className={cn('hidden md:block')} fullWidth={fullWidth} {...tablistProps} />
      <TabListSelect<T> className={'md:hidden'} selectProps={selectProps} {...tablistProps} />
      {tabs.map(tab => (
        <div
          id={`${tab.value}-tabpanel`}
          key={`${tab.value}-tabpanel`}
          className={cn('TabPanel', 'w-full')}
          role="tabpanel"
          aria-labelledby={`${name}-${tab.value}-tab`}
          hidden={tab.value !== selectedTab.value}
        >
          {tab.component}
        </div>
      ))}
    </div>
  )
}

type TabsComponentType = {
  <T = string>(
    props: PropsWithChildren<TabsProps<T>> & {
      ref?: ForwardedRef<HTMLDivElement>
    },
  ): React.ReactElement | null
  displayName?: string
}

export const Tabs = forwardRef(TabsComponent) as TabsComponentType

Tabs.displayName = 'Tabs'
