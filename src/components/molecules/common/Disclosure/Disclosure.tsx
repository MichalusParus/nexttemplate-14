'use client'
import { PropsWithChildren, forwardRef, useState } from 'react'

import { Combobox, ComboboxProps } from '@/components/atoms/common/Combobox/Combobox'
import ChevronIcon from '@/components/atoms/icons/ChevronIcon'
import { slugify } from '@/utils/utils'

import Dropdown from '../../popovers/Dropdown'
import { DropdownProps } from '../../popovers/Dropdown/Dropdown'

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
  color?: 'primary' | 'secondary' | 'terciary' | 'none'
  /** boolean for default open state */
  expanded?: boolean
  /** aria level for heading, hierarchy in Accordion component */
  ariaLevel?: number
  /** for passing aditional props to combobox */
  comboboxProps?: Partial<Omit<ComboboxProps, 'name' | 'hasPopup' | 'isOpen'>>
  /** for passing aditional props to dropdown */
  dropdownProps?: Partial<Omit<DropdownProps, 'name'>>
  /** optional setIsOpen for external state control, must be use with expanded prop */
  setIsOpen?: (isOpen: boolean) => void
}

/** Disclosure is dropdown for displaying additional info. Combobox and Dropdown props supported. USE CLIENT */
export const Disclosure = forwardRef<HTMLButtonElement, PropsWithChildren<DisclosureProps>>(
  (
    {
      className = '',
      title,
      chevronPosition = 'end',
      variant = 'outlined',
      color = 'primary',
      expanded,
      ariaLevel,
      comboboxProps,
      dropdownProps,
      children,
      setIsOpen,
    },
    ref,
  ) => {
    const [isLocallyOpen, setIsLocallyOpen] = useState(Boolean(expanded))
    const openState = setIsOpen ? expanded : isLocallyOpen
    const disclosureOpenState = openState ? 'max-h-full' : ' max-h-[3rem]'
    const startIconOpenState = !openState ? '-rotate-90' : ''
    const endIconOpenState = openState ? 'rotate-180' : ''

    const handleChange = () => {
      if (setIsOpen) {
        setIsOpen(!expanded)
      } else {
        setIsLocallyOpen(!isLocallyOpen)
      }
    }

    return (
      <div
        className={`Disclosure ${className} relative w-full transition-maxHeight ${disclosureOpenState}`}
        data-testid="Disclosure"
        data-accordion="collapse"
      >
        <div className="DisclosureHeading" role="heading" aria-level={ariaLevel}>
          <Combobox
            id={slugify(title)}
            className="w-full"
            name={slugify(title)}
            isOpen={Boolean(openState)}
            variant={variant}
            color={color}
            disableUpperCase
            hideShadow
            hasPopup="true"
            role="button"
            ref={ref}
            onClick={handleChange}
            {...comboboxProps}
          >
            <div className="ComboboxInnerWrap flex w-full justify-between">
              <div className="ComboboxStartWrap flex gap-1">
                {chevronPosition === 'start' ? (
                  <ChevronIcon
                    className={`text-inherit transition-transform ${startIconOpenState}`}
                  />
                ) : null}
                {title}
              </div>
              {chevronPosition === 'end' ? (
                <ChevronIcon className={`text-inherit transition-transform ${endIconOpenState}`} />
              ) : null}
            </div>
          </Combobox>
        </div>
        <Dropdown
          isOpen={Boolean(openState)}
          placement="relative"
          variant={variant}
          color={color}
          padding="pt-1"
          hideShadow
          onClose={handleChange}
          {...dropdownProps}
        >
          <div className="DisclosureContent" role="region" aria-labelledby={slugify(title)}>
            {children}
          </div>
        </Dropdown>
      </div>
    )
  },
)

Disclosure.displayName = 'Disclosure'
