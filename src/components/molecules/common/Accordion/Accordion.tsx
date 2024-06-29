'use client'
import { ReactNode, forwardRef, useState } from 'react'

import { slugify } from '@/utils/utils'

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
  ({ className = '', options, exclusive, gap = 'gap-2', ...rest }, ref) => {
    const [openState, setOpenState] = useState<boolean[]>(
      options.map(({ expanded }) => Boolean(expanded)),
    )
    return (
      <div
        className={`Accordion ${className} flex flex-col overflow-hidden ${gap}`}
        data-testid="Accordion"
      >
        {options.map(({ content, title, expanded }, index) => (
          <Disclosure
            key={slugify(title)}
            title={title}
            ref={ref}
            expanded={exclusive ? openState[index] : expanded}
            onChange={
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
