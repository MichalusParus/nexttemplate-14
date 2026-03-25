'use client'
import { forwardRef, ReactNode, useCallback, useState } from 'react'

import { StyleProps } from '@/components/utils/types'
import { cn } from '@/utils/utils'

import { Disclosure, DisclosureProps } from '../Disclosure/Disclosure'

export type DisclosureOption = {
  title: ReactNode
  content: ReactNode
  defaultExpanded?: boolean
}

export type AccordionProps = Omit<StyleProps, 'size'> & {
  /** for passing custom tailwind classes */
  className?: string
  /** options for individual Disclosures */
  options: DisclosureOption[]
  /** optional boolean for exclusive mode, when only one Disclosure can be open at a time */
  exclusive?: boolean
  /** for passing aditional props to all disclosures */
  disclosuresProps?: Partial<Omit<DisclosureProps, 'title' | 'expanded' | 'setIsOpen'>>
  /** callback fired when a panel is toggled */
  onToggle?: (index: number, isOpen: boolean) => void
}

/** Serves as set of Disclosures. DisclosureProps supported. USE CLIENT */
export const Accordion = forwardRef<HTMLDivElement | null, AccordionProps>(
  (
    {
      className,
      options,
      exclusive,
      variant = 'outlined',
      color = 'primary',
      disclosuresProps = {},
      onToggle,
    },
    ref,
  ) => {
    const [openIndices, setOpenIndices] = useState<Set<number>>(() => {
      const initial = new Set<number>()
      options.forEach((o, i) => {
        if (o.defaultExpanded) initial.add(i)
      })
      if (exclusive && initial.size > 1) {
        const first = initial.values().next().value!
        return new Set([first])
      }
      return initial
    })

    const handleToggle = useCallback(
      (index: number) => {
        let willBeOpen = false
        setOpenIndices(prev => {
          willBeOpen = !prev.has(index)
          const next = exclusive ? new Set<number>() : new Set(prev)
          if (willBeOpen) next.add(index)
          else next.delete(index)
          return next
        })
        onToggle?.(index, willBeOpen)
      },
      [exclusive, onToggle],
    )

    return (
      <div
        className={cn('Accordion', 'flex flex-col gap-4', className)}
        ref={ref}
        data-testid="Accordion"
      >
        {options.map((option, index) => (
          <Disclosure
            {...disclosuresProps}
            key={`accordion-disclosure-${index}`}
            title={option.title}
            variant={variant}
            color={color}
            expanded={openIndices.has(index)}
            setIsOpen={() => handleToggle(index)}
          >
            {option.content}
          </Disclosure>
        ))}
      </div>
    )
  },
)

Accordion.displayName = 'Accordion'
