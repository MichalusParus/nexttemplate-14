import { usePathname } from 'next/navigation'
import {
  forwardRef,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import { Button, ButtonProps } from '@/components/atoms/common/Button'
import { Link } from '@/components/atoms/common/Link'
import { LinkProps } from '@/components/atoms/common/Link/Link'
import { Paper } from '@/components/atoms/containers/Paper'
import { ChevronIcon } from '@/components/atoms/icons'
import { StyleProps } from '@/components/types'
import { cn } from '@/utils/utils'

import { Dropdown } from '../../popovers/Dropdown'
import { MenuProps } from '../../popovers/Menu/Menu'

type TabOption = {
  label: string
  slug: string
  component: ReactNode
  isHidden?: boolean
}

export type TabsProps = Omit<StyleProps, 'size'> & {
  /** for passing custom tailwind classes */
  className?: string
  /** name string serves as id for aria purposes and as secondary aria label */
  name: string
  /** url param for identifying selectedtab */
  param: string
  /** tabs object list: tab label, searchparam slug, rendered component and hidden for hiding tab list */
  tabs: TabOption[]
  /** size of component, none disable sizes for custom styling via className */
  size?: StyleProps['size'] | 'inline'
  /** full width mode of tabs component */
  fullWidth?: boolean
  /** for passing aditional props to Dropdown Button */
  buttonProps?: Partial<ButtonProps>
  /** for passing aditional props to Link */
  linkProps?: Partial<LinkProps>
  /** for passing aditional props to Dropdown */
  dropdownProps?: Partial<MenuProps>
}

/** Tabs component for switching panels with content. Link, Button and Disclosure props supported. Default server component with optional client side control. */
export const Tabs = forwardRef<HTMLDivElement, PropsWithChildren<TabsProps>>(
  (
    {
      className,
      name,
      param,
      tabs,
      variant = 'text',
      color = 'primary',
      size = 'md',
      fullWidth,
      buttonProps,
      linkProps,
      dropdownProps,
      children,
    },
    ref,
  ) => {
    const pathName = usePathname()
    const comboboxRef = useRef<HTMLDivElement>(null)
    const [isOpen, setIsOpen] = useState(false)
    const selectedTab = tabs.find(tab => tab.slug === param) || tabs[0]
    const tabPanelId = `${selectedTab.slug}-tabpanel`
    const tabsWidth = fullWidth ? 'w-full' : 'w-max'
    const getSelectedClass = useCallback(
      (slug: string) => (selectedTab.slug === slug ? 'selected' : ''),
      [selectedTab.slug],
    )

    useEffect(() => {
      if (pathName) {
        setIsOpen(false)
      }
    }, [pathName])

    return (
      <div className={cn('TabsWrap', 'relative w-full', className)} ref={ref} data-testid="Tabs">
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
            aria-label={name}
          >
            {tabs.map(
              tab =>
                !tab.isHidden && (
                  <li key={tab.slug} className="w-full" role="presentation">
                    <Link
                      className={cn('Tab', 'rounded-none border-none', getSelectedClass(tab.slug))}
                      variant={variant}
                      color={color}
                      size={size}
                      hideShadow
                      role="tab"
                      aria-controls={tabPanelId}
                      aria-selected={tab.slug === selectedTab.slug}
                      href={`?tab=${tab.slug}`}
                      {...linkProps}
                    >
                      {tab.label}
                    </Link>
                  </li>
                ),
            )}
            {children}
          </ul>
        </Paper>
        <div className="w-full" ref={comboboxRef}>
          <Button
            className={cn('TabsDropdownCombobox', 'w-full justify-between md:hidden')}
            variant={variant}
            color={color}
            role="combobox"
            aria-expanded={isOpen}
            aria-haspopup="true"
            aria-controls={name}
            aria-owns={name}
            onClick={() => setIsOpen(prev => !prev)}
            {...buttonProps}
          >
            {selectedTab.label}
            <ChevronIcon
              className={cn('text-inherit transition-transform', isOpen && 'rotate-180')}
            />
          </Button>
        </div>
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
          <ul
            id={name}
            className={cn('TabList', 'flex w-full flex-col justify-center')}
            role="tablist"
            aria-hidden={!isOpen}
            aria-label={name}
          >
            {tabs.map(
              tab =>
                !tab.isHidden && (
                  <li key={tab.slug} className="w-full" role="presentation">
                    <Link
                      className={cn('Tab', 'rounded-none border-none', getSelectedClass(tab.slug))}
                      variant={variant}
                      color={color}
                      size={size}
                      hideShadow
                      role="tab"
                      aria-controls={tabPanelId}
                      aria-selected={tab.slug === selectedTab.slug}
                      href={`?tab=${tab.slug}`}
                      {...linkProps}
                    >
                      {tab.label}
                    </Link>
                  </li>
                ),
            )}
            {children}
          </ul>
        </Dropdown>
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
