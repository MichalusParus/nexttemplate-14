'use client'
import { forwardRef, ReactNode, useState } from 'react'

import { cn, slugify } from '@/utils/utils'

import { Disclosure, DisclosureProps } from '../Disclosure/Disclosure'

type DisclosureOption = {
  title: string
  content: ReactNode
  expanded?: boolean
}

export type AccordionProps = Omit<DisclosureProps, 'title' | 'expanded' | 'children'> & {
  /** options for individual Disclosures */
  options: DisclosureOption[]
  /** optional boolean for exclusive mode, when only one Disclosure can be open at a time */
  exclusive?: boolean
  /** gap between Disclosures as tailwind class */
  gap?: string
}

/** Serves as set of Disclosures. Have exclusive one open mode and can be nested. DisclosureProps supported. USE CLIENT */
export const Accordion = forwardRef<HTMLButtonElement, AccordionProps>(
  ({ className, options, exclusive, gap = 'gap-2', ...rest }, ref) => {
    const [openState, setOpenState] = useState<boolean[]>(
      options.map(({ expanded }) => Boolean(expanded)),
    )

    return (
      <div
        className={cn('Accordion', 'flex flex-col overflow-hidden', gap, className)}
        data-testid="Accordion"
      >
        {options.map(({ content, title, expanded }, index) => (
          <Disclosure
            key={slugify(title)}
            title={title}
            ref={ref}
            expanded={exclusive ? openState[index] : expanded}
            setIsOpen={
              exclusive
                ? () => setOpenState(options.map((_, i) => (i === index ? true : false)))
                : undefined
            }
            {...rest}
          >
            {content}
          </Disclosure>
        ))}
      </div>
    )
  },
)

Accordion.displayName = 'Accordion'
