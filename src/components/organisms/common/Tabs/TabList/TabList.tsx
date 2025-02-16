'use client'
import { PropsWithChildren, ReactNode } from 'react'

import { Button, ButtonProps } from '@/components/atoms/common/Button'
import { Paper } from '@/components/atoms/containers/Paper'
import { OptionType, StyleProps } from '@/components/types'
import { cn } from '@/utils/utils'

export type TabOption = OptionType & {
  component: ReactNode
  isHidden?: boolean
}

export type TabListProps = Omit<StyleProps, 'size'> & {
  /** for passing custom tailwind classes */
  className?: string
  /** name of component, serves as key for searchparam, default is tab */
  name?: string
  /** current selected tab */
  selectedTab: TabOption
  /** tabs object list: tab label, searchparam value, rendered component and hidden for hiding tab list */
  tabs: TabOption[]
  /** size of component, none disable sizes for custom styling via className */
  size?: StyleProps['size'] | 'inline'
  /** optional full width style for tabs */
  fullWidth?: boolean
  /** for passing aditional props to Link */
  tabButtonProps?: Partial<ButtonProps>
  /** for passing onTabChange function */
  onTabChange: (tabValue: string) => void
}

/** Tablist for screen tabs. tabButtonProps supported. USE CLIENT */
export const TabList = ({
  className,
  name = 'tab',
  selectedTab,
  tabs,
  variant,
  color,
  size,
  fullWidth,
  tabButtonProps = {},
  onTabChange,
  children,
}: PropsWithChildren<TabListProps>) => {
  const { className: buttonClassName, ...restButtonProps } = tabButtonProps

  return (
    <Paper
      className={cn('TabListPaper', className)}
      variant={variant}
      color={color}
      padding=""
      hideShadow
    >
      <ul
        className={cn(
          'TabList',
          'flex overflow-hidden rounded-md focus:outline-offset-8 focus:outline-text',
        )}
        role="tablist"
      >
        {tabs.map(tab => (
          <li
            key={tab.value}
            role="presentation"
            className={cn(fullWidth && 'w-full')}
            data-testid="tabLi"
          >
            <Button
              id={`${name}-${tab.value}-tab`}
              className={cn(
                'Tab',
                'rounded-none border-none',
                selectedTab.value === tab.value && 'selected',
                fullWidth && 'w-full',
                buttonClassName,
              )}
              variant={variant}
              color={color}
              size={size}
              hideShadow
              role="tab"
              aria-controls={`${name}-tabpanel`}
              aria-selected={tab.value === selectedTab.value}
              onClick={() => onTabChange(tab.value)}
              {...restButtonProps}
            >
              {tab.content || tab.label}
            </Button>
          </li>
        ))}
        {children}
      </ul>
    </Paper>
  )
}

TabList.displayName = 'TabList'
