import { ReactNode } from 'react'

import { OptionGroupType, OptionType } from '@/components/utils/types'

import {
  MenuItemButtonProps,
  MenuItemCheckboxProps,
  MenuItemLinkProps,
  MenuItemRadioGroupProps,
} from './items'
import { MenuProps } from './Menu'

type BaseMenuOption = {
  label: string
  content?: ReactNode
  closeOnClick?: boolean
}

type ButtonOption = BaseMenuOption & {
  type: 'button'
  onClick?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  menuItemProps?: Partial<MenuItemButtonProps>
}

type LinkOption = BaseMenuOption & {
  type: 'link'
  href: string
  menuItemProps?: Partial<MenuItemLinkProps>
}

type CheckboxOption = BaseMenuOption & {
  type: 'checkbox'
  isChecked: boolean
  onClick?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  menuItemProps?: Partial<MenuItemCheckboxProps>
}

type SwitchOption = BaseMenuOption & {
  type: 'switch'
  isChecked: boolean
  onClick?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  menuItemProps?: Partial<MenuItemCheckboxProps>
}

type RadioOption<T = string> = BaseMenuOption & {
  type: 'radio'
  value: string
  options: OptionType<T>[]
  onChange: (value: string) => void
  menuItemProps?: Partial<MenuItemRadioGroupProps>
}

type SubmenuOption = BaseMenuOption & {
  type: 'submenu'
  options: MenuOptionType[] | MenuOptionGroupType[]
  menuItemProps?: Partial<MenuProps>
}

export type MenuOptionType<T = string> =
  | ButtonOption
  | CheckboxOption
  | LinkOption
  | RadioOption<T>
  | SubmenuOption
  | SwitchOption

export type MenuOptionGroupType<T = string> = Omit<OptionGroupType<T>, 'groupedOptions'> & {
  groupedOptions: MenuOptionType<T>[]
}
