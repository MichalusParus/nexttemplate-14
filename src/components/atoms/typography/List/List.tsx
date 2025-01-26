import { forwardRef, OlHTMLAttributes, ReactNode } from 'react'

import { StyleProps } from '@/components/types'
import { cn } from '@/utils/utils'

import { P, PProps } from '../P'
import { Title, TitleProps } from '../Title/Title'
import { Li, LiProps } from './Li'

type NativeListProps = Omit<
  OlHTMLAttributes<HTMLOListElement>,
  'content' | 'color' | 'className' | 'title' | 'type'
>

export type ListProps = NativeListProps &
  LiProps &
  Omit<StyleProps, 'variant'> & {
    /** for setting ul list type, default ol */
    type?: 'ol' | 'ul'
    /** Style type of list, new style types must be added to tailwind theme first */
    listStyleType?: string
    /** optional title for list component */
    title?: string
    /** optional form component description */
    description?: string
    /** Optional content in string arrays for list component, otherwise use children */
    content?: ReactNode[]
    /** expected lines for ghost template */
    expectedLines?: number
    /** optional title props */
    titleProps?: Partial<TitleProps>
    /** optional p props */
    pProps?: Partial<PProps>
  }

/** List component with ghost loading and optional title. Default HTMLAttributes props supported. */
export const List = forwardRef<HTMLOListElement, ListProps>(
  (
    {
      className,
      type = 'ol',
      listStyleType = 'list-none',
      color = 'none',
      size = 'md',
      content,
      title,
      titleProps = {},
      pProps = {},
      description,
      icon,
      isLoading = false,
      expectedLines = 3,
      children,
      ...rest
    },
    ref,
  ) => {
    const ghostContent = isLoading && !content?.length ? new Array(expectedLines).fill(null) : []
    const completeContent = [...(content || []), ...ghostContent]
    const Element = type === 'ul' ? 'ul' : 'ol'

    return (
      <>
        {title && (
          <Title variant="h3" color={color} size={size} {...titleProps}>
            {title}
          </Title>
        )}
        {description && (
          <P color={color} size={size} {...pProps}>
            {description}
          </P>
        )}
        <Element className={cn('List', 'pl-7', listStyleType, className)} ref={ref} {...rest}>
          {children}
          {completeContent?.map((li, index) => (
            <Li
              key={'listItem' + index}
              color={color}
              size={size}
              icon={icon}
              isLoading={isLoading}
            >
              {li}
            </Li>
          ))}
        </Element>
      </>
    )
  },
)

List.displayName = 'List'
