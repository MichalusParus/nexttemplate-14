import { forwardRef, PropsWithChildren, ReactNode, useCallback } from 'react'

import Button from '@/components/atoms/common/Button'
import { ButtonProps } from '@/components/atoms/common/Button/Button'
import Link from '@/components/atoms/common/Link'
import { LinkProps } from '@/components/atoms/common/Link/Link'
import Paper from '@/components/atoms/containers/Paper'
import { cn } from '@/utils/utils'

import Disclosure from '../Disclosure'
import { DisclosureProps } from '../Disclosure/Disclosure'

type TabOption = {
  label: string
  slug: string
  component: ReactNode
  isHidden?: boolean
}

export type TabsProps = {
  /** for passing custom tailwind classes */
  className?: string
  /** name string serves as id for aria purposes and as secondary aria label */
  name: string
  /** url param for identifying selectedtab */
  param: string
  /** tabs object list: tab label, searchparam slug, rendered component and hidden for hiding tab list */
  tabs: TabOption[]
  /** style variant of component */
  variant?: 'text' | 'outlined' | 'contained'
  /** theme color of component, none disable styles for custom styling via className */
  color?: 'primary' | 'secondary' | 'terciary' | 'none'
  /** size of component, none disable sizes for custom styling via className */
  size?: 'sm' | 'md' | 'lg' | 'inline' | 'none'
  /** full width mode of tabs component */
  fullWidth?: boolean
  /** for passing aditional props to Button */
  buttonProps?: Partial<ButtonProps>
  /** for passing aditional props to Link */
  linkProps?: Partial<LinkProps>
  /** for passing aditional props to Disclosure */
  disclosureProps?: Partial<DisclosureProps>
  /** optional on tab click for external control. Must be inside use client parent */
  onTabClick?: (tab: TabOption) => void
}

/** Tabs component for switching panels with content. Link, Button and Disclosure props supported. Default server component with optional client side control. */
export const Tabs = forwardRef<HTMLUListElement, PropsWithChildren<TabsProps>>(
  (
    {
      className = '',
      name,
      param,
      tabs,
      variant = 'text',
      color = 'primary',
      size = 'md',
      fullWidth,
      buttonProps,
      linkProps,
      disclosureProps,
      onTabClick,
      children,
    },
    ref,
  ) => {
    const selectedTab = tabs.find(tab => tab.slug === param) || tabs[0]
    const tabPanelId = `${selectedTab.slug}-tabpanel`
    const tabsWidth = fullWidth ? 'w-full' : 'w-max'
    const getSelectedClass = useCallback(
      (slug: string) => (selectedTab.slug === slug ? 'selected' : ''),
      [selectedTab.slug],
    )

    return (
      <div className={cn('TabsWrap', 'relative w-full', className)} data-testid="Tabs">
        <Paper
          className={`hidden md:block ${tabsWidth}`}
          variant={variant}
          color={color}
          padding=""
          hideShadow
        >
          <ul
            id="tablist"
            className={cn(
              'TabList',
              'flex overflow-hidden rounded-md focus:outline-offset-8 focus:outline-text',
            )}
            role="tablist"
            ref={ref}
            aria-label={name}
          >
            {tabs.map(tab =>
              !tab.isHidden ? (
                <li
                  key={tab.slug}
                  className={cn('Tab', 'w-full')}
                  role="tab"
                  aria-controls={tabPanelId}
                  aria-selected={tab.slug === selectedTab.slug}
                >
                  {onTabClick ? (
                    <Button
                      className={cn(
                        'TabButton',
                        'rounded-none border-none',
                        getSelectedClass(tab.slug),
                      )}
                      variant={variant}
                      color={color}
                      size={size}
                      fullWidth
                      disableUpperCase
                      hideShadow
                      onClick={() => onTabClick(tab)}
                      {...buttonProps}
                    >
                      {tab.label}
                    </Button>
                  ) : (
                    <Link
                      className={cn(
                        'TabLink',
                        'rounded-none border-none',
                        getSelectedClass(tab.slug),
                      )}
                      variant={variant}
                      color={color}
                      size={size}
                      disableUpperCase
                      hideShadow
                      href={`?tab=${tab.slug}`}
                      {...linkProps}
                    >
                      {tab.label}
                    </Link>
                  )}
                </li>
              ) : null,
            )}
            {children}
          </ul>
        </Paper>
        <Disclosure
          className="w-full md:hidden"
          title={selectedTab.label}
          variant={variant}
          color={color}
          comboboxProps={{ color: color }}
          {...disclosureProps}
        >
          <ul
            className={cn('TabList', 'flex w-full flex-col justify-center')}
            role="tablist"
            ref={ref}
            aria-label={name}
          >
            {tabs.map(tab => (
              <li
                key={tab.slug}
                id={name + tab.slug}
                className={cn('Tab', 'w-full')}
                role="tab"
                aria-controls={tabPanelId}
                aria-selected={tab.slug === selectedTab.slug}
              >
                {onTabClick ? (
                  <Button
                    className={cn('TabButton', getSelectedClass(tab.slug))}
                    variant={variant}
                    color={color}
                    size={size}
                    fullWidth
                    disableUpperCase
                    onClick={() => onTabClick(tab)}
                    {...buttonProps}
                  >
                    {tab.label}
                  </Button>
                ) : (
                  <Link
                    className={cn('TabLink', getSelectedClass(tab.slug))}
                    variant={variant}
                    color={color}
                    size={size}
                    disableUpperCase
                    href={`?tab=${tab.slug}`}
                    {...linkProps}
                  >
                    {tab.label}
                  </Link>
                )}
              </li>
            ))}
            {children}
          </ul>
        </Disclosure>
        <div
          id={tabPanelId}
          className={cn('TabPanel', 'w-full')}
          role="tabpanel"
          aria-labelledby={name + selectedTab.slug}
        >
          {selectedTab.component}
        </div>
      </div>
    )
  },
)

Tabs.displayName = 'Tabs'
