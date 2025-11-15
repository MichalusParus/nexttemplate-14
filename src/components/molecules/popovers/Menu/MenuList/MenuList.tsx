'use client'
import { forwardRef, OlHTMLAttributes, PropsWithChildren } from 'react'

import { buttonSize } from '@/components/atoms/common/Button/Button.style'
import { useGroupedOptions } from '@/components/utils/hooks/useGroupedOptions'
import { OptionType, StyleProps } from '@/components/utils/types'
import { cn } from '@/utils/utils'

import { MenuItemButton, MenuItemCheckbox, MenuItemLink, MenuItemRadioGroup } from '../items'
import { MenuItemSubmenu } from '../items/MenuItemSubmenu'
import { MenuItemSwitch } from '../items/MenuItemSwitch'
import { MenuOptionGroupType, MenuOptionType } from '../types'

type NativeMenuListProps = Omit<
  OlHTMLAttributes<HTMLUListElement>,
  'className' | 'onClick' | 'color'
>

export type MenuListProps<T = string> = NativeMenuListProps &
  StyleProps & {
    /** for passing custom tailwind classes */
    className?: string
    /** name of the listbox for aria-controls */
    name: string
    /** options for display */
    options: MenuOptionType<T>[] | MenuOptionGroupType<T>[]
    /** close all menus up to root */
    onCloseAll?: () => void
  }

/** MenuList Ul with selectable options. USE CLIENT */
function MenuListComponent<T = string>(
  {
    className,
    name,
    options,
    variant = 'outlined',
    color = 'primary',
    size = 'md',
    onCloseAll,
    children,
    ...rest
  }: PropsWithChildren<MenuListProps<T>>,
  ref: React.ForwardedRef<HTMLUListElement>,
) {
  const { isGrouped } = useGroupedOptions(options)
  const styleProps = { variant, color, size }

  const renderMenuOptions = (options: MenuOptionType<T>[]) => {
    return options.map(option => {
      switch (option.type) {
        case 'button':
          return (
            <MenuItemButton
              key={option.label}
              {...styleProps}
              {...option.menuItemProps}
              onClick={() => {
                if (option.closeOnClick) onCloseAll?.()
                option.onClick?.()
              }}
            >
              {option.label}
            </MenuItemButton>
          )
        case 'link':
          return (
            <MenuItemLink
              key={option.label}
              {...styleProps}
              {...option.menuItemProps}
              href={option.href}
              onClick={() => {
                if (option.closeOnClick) onCloseAll?.()
              }}
            >
              {option.label}
            </MenuItemLink>
          )
        case 'checkbox':
          return (
            <MenuItemCheckbox
              key={option.label}
              {...styleProps}
              {...option.menuItemProps}
              isChecked={option.isChecked}
              onClick={option.onClick}
            >
              {option.label}
            </MenuItemCheckbox>
          )
        case 'switch':
          return (
            <MenuItemSwitch
              key={option.label}
              {...styleProps}
              {...option.menuItemProps}
              isChecked={option.isChecked}
              onClick={option.onClick}
            >
              {option.label}
            </MenuItemSwitch>
          )
        case 'radio':
          return (
            <MenuItemRadioGroup
              key={option.label}
              {...styleProps}
              {...option.menuItemProps}
              name={option.label}
              value={option.value}
              options={option.options as OptionType[]}
              onChange={option.onChange}
            />
          )
        case 'submenu':
          return (
            <MenuItemSubmenu
              key={option.label}
              title={option.label}
              {...styleProps}
              {...option.menuItemProps}
              options={option.options}
            />
          )
        default:
          return null
      }
    })
  }

  return (
    <ul
      id={name}
      className={cn('MenuList', isGrouped && 'flex flex-col gap-3', className)}
      aria-labelledby={`${name}-button`}
      role="menu"
      data-testid="MenuList"
      ref={ref}
      {...rest}
    >
      {isGrouped
        ? (options as MenuOptionGroupType<T>[]).map(group => (
            <li role="presentation" key={group.label}>
              <ul role="group" aria-label={group.label}>
                <li
                  className={cn('GroupLabel', 'text-center text-inherit', buttonSize[size])}
                  role="presentation"
                >
                  {group.content || group.label}
                </li>
                {renderMenuOptions(group.groupedOptions)}
              </ul>
            </li>
          ))
        : renderMenuOptions(options as MenuOptionType<T>[])}
      {children}
    </ul>
  )
}

type MenuListComponentType = {
  <T = string>(
    props: PropsWithChildren<MenuListProps<T>> & {
      ref?: React.ForwardedRef<HTMLUListElement>
    },
  ): React.ReactElement | null
  displayName?: string
}

export const MenuList = forwardRef(MenuListComponent) as MenuListComponentType

MenuList.displayName = 'MenuList'
