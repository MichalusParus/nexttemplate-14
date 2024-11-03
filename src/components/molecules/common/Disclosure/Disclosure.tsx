'use client'
import { forwardRef, PropsWithChildren, useState } from 'react'

import { Combobox, ComboboxProps } from '@/components/atoms/common/Combobox/Combobox'
import { Paper } from '@/components/atoms/containers/Paper'
import { PaperProps } from '@/components/atoms/containers/Paper/Paper'
import { ScrollShadow } from '@/components/atoms/containers/ScrollShadow'
import { ChevronIcon } from '@/components/atoms/icons'
import { StyleProps } from '@/components/types'
import { cn, filterOutKeys, slugify } from '@/utils/utils'

export type DisclosureProps = Omit<StyleProps, 'size'> & {
  /** for passing custom tailwind classes */
  className?: string
  /** combobox title */
  title: string
  /** chevron position in Combobox */
  chevronPosition?: 'start' | 'end'
  /** for setting component width as tailwind class */
  width?: string
  /** for setting component height or maxHeight as tailwind class */
  height?: string
  /** boolean for default open state */
  expanded?: boolean
  /** aria level for heading, hierarchy in Accordion component */
  ariaLevel?: number
  /** for passing aditional props to combobox */
  comboboxProps?: Partial<Omit<ComboboxProps, 'name' | 'hasPopup' | 'isOpen'>>
  /** for passing aditional props to dropdown */
  paperProps?: Partial<PaperProps>
  /** optional setIsOpen for external state control, must be use with expanded prop */
  setIsOpen?: (isOpen: boolean) => void
}

/** Disclosure is dropdown for displaying additional info. Combobox and Paper props supported. USE CLIENT */
export const Disclosure = forwardRef<HTMLButtonElement, PropsWithChildren<DisclosureProps>>(
  (
    {
      className,
      title,
      chevronPosition = 'end',
      variant = 'outlined',
      color = 'primary',
      width = 'w-full',
      height = 'max-h-[40vh]',
      expanded,
      ariaLevel,
      comboboxProps = {},
      paperProps = { hideShadow: true },
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
        className={cn(
          'Disclosure',
          'relative w-full transition-maxHeight',
          disclosureOpenState,
          className,
        )}
        data-testid="Disclosure"
        data-accordion="collapse"
      >
        <div className="DisclosureHeading" role="heading" aria-level={ariaLevel}>
          <Combobox
            id={slugify(title)}
            className={cn('w-full', comboboxProps.className)}
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
            {...filterOutKeys(comboboxProps, ['className'])}
          >
            <div className={cn('ComboboxInnerWrap', 'flex w-full justify-between')}>
              <div className={cn('ComboboxStartWrap', 'flex gap-1')}>
                {chevronPosition === 'start' && (
                  <ChevronIcon
                    className={cn('text-inherit transition-transform', startIconOpenState)}
                  />
                )}
                {title}
              </div>
              {chevronPosition === 'end' && (
                <ChevronIcon
                  className={cn('text-inherit transition-transform', endIconOpenState)}
                />
              )}
            </div>
          </Combobox>
        </div>
        <div
          id={slugify(title)}
          className={cn(
            'Dropdown',
            'translate-y-1.5 transition-dropdown',
            width,
            openState ? 'visible z-[35] opacity-100' : 'invisible max-h-0 opacity-50',
            className,
          )}
        >
          <Paper
            className={cn('overflow-hidden', paperProps.className)}
            variant={variant}
            color={color}
            {...filterOutKeys(paperProps, ['className'])}
          >
            <ScrollShadow height={height}>
              <div className="DisclosureContent" role="region" aria-labelledby={slugify(title)}>
                {children}
              </div>
            </ScrollShadow>
          </Paper>
        </div>
      </div>
    )
  },
)

Disclosure.displayName = 'Disclosure'
