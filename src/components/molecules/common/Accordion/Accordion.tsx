import { ReactNode } from 'react'

import { ComboboxProps } from '@/components/atoms/common/Combobox/Combobox'
import { slugify } from '@/utils/utils'

import { Disclosure, DisclosureProps } from '../Disclosure/Disclosure'

type DisclosureOption = {
  title: string
  content: ReactNode
  expanded?: boolean
  comboboxProps?: Omit<ComboboxProps, 'name' | 'hasPopup' | 'isOpen'>
}

export type AccordionProps = Omit<
  DisclosureProps,
  'title' | 'expanded' | 'children' | 'comboboxProps'
> & {
  /** options for individual Disclosures */
  options: DisclosureOption[]
  /** gap between Disclosures as tailwind class */
  gap?: string
}

/** Serves as set of Disclosures. */
export const Accordion = ({ className = '', options, gap = 'gap-2', ...rest }: AccordionProps) => {
  return (
    <div className={`Accordion ${className} flex flex-col ${gap}`} data-testid="Accordion">
      {options.map(({ content, title, ...optionRest }) => (
        <Disclosure key={slugify(title)} title={title} {...optionRest} {...rest}>
          {content}
        </Disclosure>
      ))}
    </div>
  )
}
