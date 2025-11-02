'use client'
import { forwardRef, ReactNode, useEffect, useState } from 'react'

import { StyleProps } from '@/components/utils/types'
import { cn } from '@/utils/utils'

import { Disclosure, DisclosureProps } from '../Disclosure/Disclosure'

type DisclosureOption = {
  title: ReactNode
  content: ReactNode
  expanded?: boolean
}

export type AccordionProps = Omit<StyleProps, 'size'> & {
  /** for passing custom tailwind classes */
  className?: string
  /** options for individual Disclosures */
  options: DisclosureOption[]
  /** optional boolean for exclusive mode, when only one Disclosure can be open at a time */
  exclusive?: boolean
  /** gap between Disclosures as tailwind class */
  gap?: string
  /** for passing aditional props to all disclosures */
  disclosuresProps?: Partial<Omit<DisclosureProps, 'title' | 'expanded' | 'setIsOpen'>>
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
      gap = 'gap-4',
      disclosuresProps = {},
    },
    ref,
  ) => {
    const [openState, setOpenState] = useState<boolean[]>(
      options.map(({ expanded }) => Boolean(expanded)),
    )

    useEffect(() => {
      setOpenState(options.map(({ expanded }) => Boolean(expanded)))
    }, [options])

    const handleOpenStateChange = (index: number) => {
      setOpenState(prev => prev.map((_, i) => i === index))
    }

    return (
      <div
        className={cn('Accordion', 'flex flex-col', gap, className)}
        ref={ref}
        data-testid="Accordion"
      >
        {options.map(({ content, title, expanded }, index) => (
          <Disclosure
            key={`accordion-disclosure-${index}`}
            title={title}
            variant={variant}
            color={color}
            expanded={exclusive ? openState[index] : expanded}
            setIsOpen={exclusive ? () => handleOpenStateChange(index) : undefined}
            {...disclosuresProps}
          >
            {content}
          </Disclosure>
        ))}
      </div>
    )
  },
)

Accordion.displayName = 'Accordion'
