'use client'
import { useState } from 'react'

import { Combobox, ComboboxProps } from '@/components/atoms/common/Combobox/Combobox'
import ChevronIcon from '@/components/atoms/icons/ChevronIcon'
import { slugify } from '@/utils/utils'

import Dropdown from '../../popovers/Dropdown'

export type DisclosureProps = {
  /** for passing custom tailwind classes */
  className?: string
  /** combobox title */
  title: string
  /** chevron position in Combobox */
  chevronPosition?: 'start' | 'end'
  /** style variant of component */
  variant?: 'text' | 'outlined' | 'contained'
  /** theme color of component, none disable styles for custom styling via className */
  color?: 'primary' | 'secondary' | 'none'
  /** boolean for default open state */
  expanded?: boolean
  /** for passing aditional props to combobox */
  comboboxProps?: Omit<ComboboxProps, 'name' | 'hasPopup' | 'isOpen'>
  /** children */
  children: React.ReactNode
}

/** Disclosure is dropdown for displaying additional info. */
export const Disclosure = ({
  className = '',
  title,
  chevronPosition = 'end',
  variant = 'contained',
  color = 'primary',
  expanded,
  comboboxProps,
  children,
}: DisclosureProps) => {
  const [isOpen, setIsOpen] = useState(Boolean(expanded))

  return (
    <div
      className={`Disclosure ${className} relative w-full transition-maxHeight ${isOpen ? 'max-h-full' : ' max-h-[3rem]'}`}
      data-testid="Disclosure"
      data-accordion="collapse"
    >
      <Combobox
        className="w-full"
        name={slugify(title)}
        isOpen={isOpen}
        variant={variant}
        color={color}
        disableUpperCase
        onClick={() => setIsOpen(prev => !prev)}
        hideShadow
        hasPopup="true"
        role="button"
        {...comboboxProps}
      >
        <div className="ComboboxInnerWrap flex w-full justify-between">
          <div className="flex gap-1">
            {chevronPosition === 'start' ? (
              <ChevronIcon
                className={`text-inherit transition-transform ${isOpen ? '' : '-rotate-90'}`}
              />
            ) : null}
            {title}
          </div>
          {chevronPosition === 'end' ? (
            <ChevronIcon
              className={`text-inherit transition-transform ${isOpen ? 'rotate-180' : ''}`}
            />
          ) : null}
        </div>
      </Combobox>
      <Dropdown
        name={slugify(title)}
        isOpen={isOpen}
        placement="relative"
        variant={variant}
        color={color}
        padding="pt-1"
        role="region"
        hideShadow
        onClose={() => setIsOpen(false)}
      >
        {children}
      </Dropdown>
    </div>
  )
}
