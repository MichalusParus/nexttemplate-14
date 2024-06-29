import { forwardRef, OlHTMLAttributes, ReactNode } from 'react'

import Ghost from '../../loaders/Ghost'
import { Title, TitleProps } from '../Title/Title'
import { listColor, listSize } from './List.style'

export type ListProps = Omit<
  OlHTMLAttributes<HTMLOListElement>,
  'content' | 'color' | 'className' | 'title'
> & {
  /** for passing custom tailwind classes */
  className?: string
  /** Style type of list, new style types must be added to tailwind theme first */
  listStyleType?: 'list-disc' | 'list-decimal'
  /** theme color of component, none disable styles for custom styling via className */
  color?: 'primary' | 'secondary' | 'terciary' | 'none'
  /** size of component, none disable sizes for custom styling via className */
  size?: 'sm' | 'md' | 'lg' | 'none'
  /** optional title for list component */
  title?: string
  /** for choosing heading type */
  titleProps?: TitleProps
  /** Optional content in string arrays for list component, otherwise use children */
  content?: ReactNode[]
  /** ghost loading state for list as tailwind class */
  isLoading?: boolean
  /** expected lines for ghost template */
  expectedLines?: number
}

/** List component with ghost loading and optional title. Default HTMLAttributes props supported. */
export const List = forwardRef<HTMLOListElement, ListProps>(
  (
    {
      className = '',
      listStyleType = 'list-decimal',
      color = 'none',
      size = 'md',
      content,
      title,
      titleProps = { variant: 'h3' },
      isLoading = false,
      expectedLines = 3,
      children,
      ...rest
    },
    ref,
  ) => {
    return (
      <div className={`ListWrap ${className}`} data-testid="ListWrap">
        {title ? (
          <Title color={color} size={size} {...titleProps}>
            {title}
          </Title>
        ) : null}
        {children}
        {isLoading ? (
          new Array(expectedLines)
            .fill(null)
            .map((line, index) => (
              <Ghost key={`liGhost${index}`} className="float-left w-2/3" size={size} />
            ))
        ) : (
          <ol className={`pl-4 ${listStyleType}`} ref={ref} {...rest}>
            {content?.map((li, index) => (
              <Li key={typeof li === 'string' ? li.slice(0, 10) : index} color={color} size={size}>
                {li}
              </Li>
            ))}
          </ol>
        )}
      </div>
    )
  },
)

List.displayName = 'List'

export const Li = ({ className = '', color = 'none', size = 'md', children }: ListProps) => {
  return <li className={`Li ${className} ${listColor[color]} ${listSize[size]}`}>{children}</li>
}

Li.displayName = 'Li'
