'use client'
import { useSearchParams } from 'next/navigation'

import Link from '@/components/atoms/common/Link'

import Accordion from '../Disclosure'

type Props = {
  /** for passing custom tailwind classes */
  className?: string
  /** name string serves as id for aria purposes and as secondary aria label */
  name: string
  /** objects with tab options, tab label, searchparam slug, rendered component and hidden from tab list */
  tabs: {
    label: string
    slug: string
    component: React.ReactNode
    isHidden?: boolean
  }[]
  /** style variant of component */
  variant?: 'text' | 'outlined' | 'contained'
  /** theme color of component, none disable styles for custom styling via className */
  color?: 'primary' | 'secondary' | 'none'
  /** children */
  children?: React.ReactNode
}

/** Tabs component for switching panels with content. */
export const Tabs = ({
  className = '',
  name,
  tabs,
  variant = 'outlined',
  color = 'primary',
  children,
}: Props) => {
  const selectedParams = useSearchParams().get('tab')
  const selectedTab = tabs.find(tab => tab.slug === selectedParams) || tabs[0]
  const tabPanelId = `${selectedTab.slug}-tabpanel`

  return (
    <div className={`TabsWrap ${className} relative w-full`} data-testid="Tabs">
      <ul
        id="tablist"
        className={
          'hidden w-full overflow-hidden rounded-md focus:outline-offset-8 focus:outline-text md:flex'
        }
        role="tablist"
        aria-label={name}
      >
        {tabs.map(tab =>
          !tab.isHidden ? (
            <li
              className="w-full"
              key={tab.slug}
              role="tab"
              aria-controls={tabPanelId}
              aria-selected={tab.slug === selectedTab.slug}
            >
              <Link
                className={`TabLink ${tab.slug === selectedTab.slug ? 'selected' : ''}`}
                variant={variant}
                color={color}
                disableUpperCase
                href={`?tab=${tab.slug}`}
              >
                {tab.label}
              </Link>
            </li>
          ) : null,
        )}
        {children}
      </ul>
      <Accordion
        className="w-full md:hidden"
        title={selectedTab.label}
        variant={variant}
        color="none"
        comboboxProps={{ color: color }}
      >
        <ul className="flex w-full flex-col justify-center" role="tablist" aria-label={name}>
          {tabs.map(tab => (
            <li
              key={tab.slug}
              id={name + tab.slug}
              role="tab"
              aria-controls={tabPanelId}
              aria-selected={tab.slug === selectedTab.slug}
            >
              <Link
                className={`${tab.slug === selectedTab.slug ? 'selected' : ''}`}
                variant={variant}
                color={color}
                disableUpperCase
                href={`?tab=${tab.slug}`}
              >
                {tab.label}
              </Link>
            </li>
          ))}
          {children}
        </ul>
      </Accordion>
      <div
        id={tabPanelId}
        className="mt-8 w-full"
        role="tabpanel"
        aria-labelledby={name + selectedTab.slug}
      >
        {selectedTab.component}
      </div>
    </div>
  )
}
