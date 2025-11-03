'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ForwardedRef, forwardRef, PropsWithChildren, useCallback } from 'react'

import { cn } from '@/utils/utils'

import { TabList } from './TabList'
import { TabListSelect, TabListSelectProps } from './TabListSelect'

export type TabsProps<T extends string | number = string> = Omit<
  TabListSelectProps<T>,
  'selectedTab' | 'onTabChange'
> & {
  /** current selected tab value */
  selectedValue: T
  /** optional for passing onTabChange function for non url query navigation */
  onTabChange?: TabListSelectProps<T>['onTabChange']
}

/** Tabs component for switching panels with content. Link, Button and Disclosure props supported. */
function TabsComponent<T extends string | number = string>(
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
  const searchParams = useSearchParams()
  const selectedTab = tabs.find(tab => tab.value === selectedValue) || tabs[0]
  const visibleTabs = tabs.filter(tab => !tab.isHidden)

  const handleTabChange = useCallback(
    (tabValue: T) => {
      if (onTabChange) onTabChange(tabValue)
      else {
        const params = new URLSearchParams(searchParams.toString())
        params.set(name, String(tabValue))
        router.push(`${pathname}?${params.toString()}`)
      }
    },
    [router, name, pathname, searchParams, onTabChange],
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

  if (!tabs.length || selectedValue === undefined || selectedValue === null) return null

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
          tabIndex={tab.value === selectedTab.value ? 0 : -1}
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
  <T extends string | number = string>(
    props: PropsWithChildren<TabsProps<T>> & {
      ref?: ForwardedRef<HTMLDivElement>
    },
  ): React.ReactElement | null
  displayName?: string
}

export const Tabs = forwardRef(TabsComponent) as TabsComponentType

Tabs.displayName = 'Tabs'
