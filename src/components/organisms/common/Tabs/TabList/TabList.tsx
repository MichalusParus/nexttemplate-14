'use client'
import { PropsWithChildren, ReactNode, useRef } from 'react'

import { Button, ButtonProps } from '@/components/atoms/common/Button'
import { Paper } from '@/components/atoms/containers/Paper'
import { useFocus } from '@/components/utils/hooks/useFocus'
import { OptionType, StyleProps } from '@/components/utils/types'
import { cn } from '@/utils/utils'

export type TabOption<T = string> = OptionType<T> & {
  component: ReactNode
  isHidden?: boolean
  isDisabled?: boolean
}

export type TabListProps<T = string> = StyleProps & {
  /** for passing custom tailwind classes */
  className?: string
  /** name of component, serves as key for searchparam, default is tab */
  name?: string
  /** current selected tab */
  selectedTab: TabOption<T>
  /** tabs object list: tab label, searchparam value, rendered component and hidden for hiding tab list */
  tabs: TabOption<T>[]
  /** optional full width style for tabs */
  fullWidth?: boolean
  /** for passing aditional props to button with role tab */
  tabButtonProps?: Partial<ButtonProps>
  /** for passing onTabChange function */
  onTabChange: (tabValue: T) => void
}

/** Tablist for screen tabs. tabButtonProps supported. USE CLIENT */
export const TabList = <T,>({
  className,
  name = 'tab',
  selectedTab,
  tabs,
  fullWidth,
  variant,
  color,
  size,
  tabButtonProps = {},
  onTabChange,
  children,
}: PropsWithChildren<TabListProps<T>>) => {
  const { className: buttonClassName, ...restButtonProps } = tabButtonProps
  const componentRef = useRef<HTMLUListElement>(null)
  const nullRef = useRef(null)

  useFocus(true, componentRef, {
    triggerRef: nullRef,
    selectors: ['.Tab'],
  })

  return (
    <Paper
      className={cn('TabListPaper', fullWidth && 'w-full', className)}
      variant={variant}
      color={color}
      padding=""
      hideShadow
    >
      <ul
        className={cn(
          'TabList',
          'flex rounded-md focus:outline-offset-8 focus:outline-text',
        )}
        role="tablist"
        aria-orientation="horizontal"
        ref={componentRef}
      >
        {tabs.map((tab, index) => (
          <li
            key={String(tab.value)}
            className={cn(fullWidth && 'w-full')}
            role="presentation"
            data-testid="tabLi"
          >
            <Button
              id={`${name}-${tab.value}-tab`}
              className={cn(
                'Tab',
                'rounded-none border-none focus-visible:z-10',
                index === 0 && 'rounded-l-md',
                index === tabs.length - 1 && 'rounded-r-md',
                selectedTab.value === tab.value && 'selected',
                fullWidth && 'w-full',
                buttonClassName,
              )}
              variant={variant}
              color={color}
              size={size}
              hideShadow
              role="tab"
              tabIndex={selectedTab.value === tab.value ? 0 : -1}
              disabled={tab.isDisabled}
              aria-controls={`${tab.value}-tabpanel`}
              aria-selected={tab.value === selectedTab.value}
              onClick={() => onTabChange(tab.value)}
              {...restButtonProps}
            >
              {tab.content || tab.label}
            </Button>
          </li>
        ))}
        {children && <li role="presentation">{children}</li>}
      </ul>
    </Paper>
  )
}

TabList.displayName = 'TabList'
