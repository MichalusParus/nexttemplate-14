'use client'
import { forwardRef, PropsWithChildren, ReactNode, useId, useState } from 'react'

import { Button, ButtonProps } from '@/components/atoms/common/Button'
import { Paper } from '@/components/atoms/containers/Paper'
import { PaperProps } from '@/components/atoms/containers/Paper/Paper'
import { ScrollShadow, ScrollShadowProps } from '@/components/atoms/containers/ScrollShadow'
import { ChevronIcon } from '@/components/atoms/icons'
import { StyleProps } from '@/components/types'
import { cn } from '@/utils/utils'

export type DisclosureProps = Omit<StyleProps, 'size'> & {
  /** for passing custom tailwind classes */
  className?: string
  /** combobox title */
  title: ReactNode
  /** chevron position in Combobox */
  chevronPosition?: 'start' | 'end'
  /** for setting component height or maxHeight as tailwind class */
  height?: string
  /** boolean for default open state or external state control */
  expanded?: boolean
  /** for passing aditional props to button */
  buttonProps?: Partial<Omit<ButtonProps, 'name' | 'hasPopup' | 'isOpen'>>
  /** for passing aditional props to paper */
  paperProps?: Partial<PaperProps>
  /** for passing aditional props to scroll shadow */
  scrollShadowProps?: Partial<ScrollShadowProps>
  /** optional setIsOpen for external state control, must be use with expanded prop */
  setIsOpen?: (isOpen: boolean) => void
}

/** Disclosure is dropdown for displaying additional info. Button, Paper and ScrollShadow props supported. USE CLIENT */
export const Disclosure = forwardRef<HTMLDivElement, PropsWithChildren<DisclosureProps>>(
  (
    {
      className,
      title,
      chevronPosition = 'end',
      variant = 'outlined',
      color = 'primary',
      height = 'max-h-[40vh]',
      expanded,
      buttonProps = {},
      paperProps = {},
      scrollShadowProps = {},
      children,
      setIsOpen,
    },
    ref,
  ) => {
    const [isInternallyOpen, setIsInternallyOpen] = useState(Boolean(expanded))
    const openState = setIsOpen ? expanded : isInternallyOpen
    const { className: buttonClassName, ...restButtonProps } = buttonProps
    const { className: paperClassName, ...restPaperProps } = paperProps
    const id = useId()
    const dropdownId = `disclosureDropdown-${id}`
    const buttonId = `disclosureButton-${id}`
    const startIconOpenState = !openState ? '-rotate-90' : ''
    const endIconOpenState = openState ? 'rotate-180' : ''

    const handleChange = () => {
      if (setIsOpen) {
        setIsOpen(!expanded)
      } else {
        setIsInternallyOpen(!isInternallyOpen)
      }
    }

    return (
      <div
        className={cn('Disclosure', 'relative w-full', className)}
        data-testid="Disclosure"
        ref={ref}
      >
        <Button
          id={buttonId}
          className={cn('w-full', buttonClassName)}
          variant={variant}
          color={color}
          hideShadow
          aria-expanded={openState}
          aria-controls={dropdownId}
          onClick={handleChange}
          {...restButtonProps}
        >
          <div className={cn('ButtonInnerWrap', 'flex w-full justify-between')}>
            <div className={cn('ButtonStartWrap', 'flex gap-1')}>
              {chevronPosition === 'start' && (
                <ChevronIcon
                  className={cn('text-inherit transition-transform', startIconOpenState)}
                  aria-hidden="true"
                  data-testid="StartIcon"
                />
              )}
              {title}
            </div>
            {chevronPosition === 'end' && (
              <ChevronIcon
                className={cn('text-inherit transition-transform', endIconOpenState)}
                aria-hidden="true"
                data-testid="EndIcon"
              />
            )}
          </div>
        </Button>
        <div
          id={dropdownId}
          className={cn(
            'Dropdown',
            'translate-y-1.5 overflow-hidden transition-maxHeight',
            openState ? 'visible max-h-max opacity-100' : 'invisible max-h-0 opacity-50',
            className,
          )}
          hidden={!openState}
          data-testid="DisclosureDropdown"
        >
          <Paper
            className={cn('overflow-hidden', paperClassName)}
            variant={variant}
            color={color}
            hideShadow
            {...restPaperProps}
          >
            <ScrollShadow
              key={openState ? 'open' : 'closed'}
              height={height}
              {...scrollShadowProps}
            >
              <div
                className={cn('DisclosureContent', 'overflow-hidden')}
                role="region"
                aria-labelledby={buttonId}
              >
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
