import { forwardRef, OlHTMLAttributes, ReactNode } from 'react'

import { StyleProps } from '@/components/types'
import { cn } from '@/utils/utils'

import { buttonIconSize } from '../../common/Button/Button.style'
import Ghost from '../../loaders/Ghost'
import P from '../P'
import { Title, TitleProps } from '../Title/Title'
import { listColor, listSize } from './List.style'

type NativeListProps = Omit<
  OlHTMLAttributes<HTMLOListElement>,
  'content' | 'color' | 'className' | 'title'
>

export type ListProps = NativeListProps &
  Omit<StyleProps, 'variant'> & {
    /** for passing custom tailwind classes */
    className?: string
    /** Style type of list, new style types must be added to tailwind theme first */
    listStyleType?: string
    /** optional title for list component */
    title?: string
    /** for choosing heading type */
    titleProps?: TitleProps
    /** optional form component description */
    description?: string
    /** optional icon for li */
    icon?: ReactNode
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
      className,
      listStyleType = 'list-none',
      color = 'none',
      size = 'md',
      content,
      title,
      titleProps = { variant: 'h3' },
      description,
      icon,
      isLoading = false,
      expectedLines = 3,
      children,
      ...rest
    },
    ref,
  ) => {
    return (
      <div className={cn('ListWrap', className)} data-testid="ListWrap">
        {title && (
          <Title className="ListTitle" color={color} size={size} {...titleProps}>
            {title}
          </Title>
        )}
        {description && (
          <P className="ListDescription" color={color} size={size}>
            {description}
          </P>
        )}
        {isLoading ? (
          new Array(expectedLines)
            .fill(null)
            .map((_, index) => (
              <Ghost key={`liGhost${index}`} className="float-left w-2/3" size={size} />
            ))
        ) : (
          <ol className={`pl-7 ${listStyleType}`} ref={ref} {...rest}>
            {children}
            {content?.map((li, index) => (
              <Li key={'listItem' + index} color={color} size={size} icon={icon}>
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

export const Li = ({ className, color = 'none', size = 'md', icon, children }: ListProps) => {
  return (
    <li
      className={cn(
        'Li',
        '[&>svg]:absolute [&>svg]:left-3',
        listColor[color],
        listSize[size],
        buttonIconSize[size],
        className,
      )}
    >
      {icon}
      {children}
    </li>
  )
}

Li.displayName = 'Li'
