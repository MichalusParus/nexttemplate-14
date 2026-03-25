import { forwardRef, OlHTMLAttributes, ReactNode } from 'react'

import { StyleProps } from '@/components/utils/types'
import { cn } from '@/utils/utils'

import { Li, LiProps } from './Li'

type NativeListProps = Omit<
  OlHTMLAttributes<HTMLOListElement>,
  'content' | 'color' | 'className' | 'type'
>

export type ListProps = NativeListProps &
  LiProps &
  Omit<StyleProps, 'variant'> & {
    /** for setting ul list type, default ol */
    type?: 'ol' | 'ul'
    /** Style type of list, new style types must be added to tailwind theme first */
    listStyleType?: string
    /** Optional content in string arrays for list component, otherwise use children */
    content?: ReactNode[]
    /** expected lines for ghost template */
    expectedLines?: number
  }

/** List component with ghost loading. Native HTMLAttributes props supported. */
export const List = forwardRef<HTMLOListElement | null, ListProps>(
  (
    {
      className,
      content,
      type = 'ol',
      listStyleType = 'list-none',
      color = 'none',
      size = 'md',
      icon,
      isLoading = false,
      expectedLines = 3,
      ghostProps = {},
      children,
      ...rest
    },
    ref,
  ) => {
    const ghostContent =
      isLoading && !content?.length ? Array.from({ length: expectedLines }, (_, i) => i) : []
    const completeContent = [...(content || []), ...ghostContent]
    const Element = type === 'ul' ? 'ul' : 'ol'

    return (
      <Element className={cn('List', 'pl-7', listStyleType, className)} ref={ref} {...rest}>
        {completeContent?.map((li, index) => (
          <Li
            key={'listItem' + index}
            color={color}
            size={size}
            icon={icon}
            isLoading={isLoading}
            ghostProps={ghostProps}
          >
            {li}
          </Li>
        ))}
        {children}
      </Element>
    )
  },
)

List.displayName = 'List'
