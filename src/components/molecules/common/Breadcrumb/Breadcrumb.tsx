import { forwardRef, Fragment, ReactNode } from 'react'

import { Link, LinkProps } from '@/components/atoms/common/Link'
import { Span, SpanProps } from '@/components/atoms/typography/Span'
import { NativeDivProps, StyleProps } from '@/components/utils/types'
import { cn } from '@/utils/utils'

export type BreadcrumbOption = {
  label: string
  href: string
  content?: ReactNode
}

export type BreadcrumbProps = NativeDivProps &
  Pick<StyleProps, 'color'> & {
    /** for passing custom tailwind classes */
    className?: string
    /** list of breadcrumb options */
    options: BreadcrumbOption[]
    /** for passing aditional props to all links */
    linkProps?: Partial<Omit<LinkProps, 'href'>>
    /** for passing aditional props to current page span */
    spanProps?: Partial<SpanProps>
  }

/** Breadcrumb navigation component. Native HTMLAttributes props supported. */
export const Breadcrumb = forwardRef<HTMLDivElement | null, BreadcrumbProps>(
  ({ className, options, color = 'none', linkProps = {}, spanProps = {}, ...rest }, ref) => {
    const { className: linkClassName, ...restLinkProps } = linkProps
    const { className: spanClassName, ...restSpanProps } = spanProps

    return (
      <nav className={cn('Breadcrumb', className)} ref={ref} aria-label="breadcrumb" {...rest}>
        <ol className="flex flex-wrap items-center gap-2.5 wrap-break-word">
          {options.map((option, index) => (
            <Fragment key={`${option.href}-${index}`}>
              <li>
                {index !== options.length - 1 ? (
                  <Link
                    className={cn('inline-flex items-center gap-1.5', linkClassName)}
                    variant="text"
                    color={color}
                    size="inline"
                    href={option.href}
                    {...restLinkProps}
                  >
                    {option.content || option.label}
                  </Link>
                ) : (
                  <Span
                    className={cn('CurrentPageSpan', 'cursor-default font-semibold underline', spanClassName)}
                    variant="none"
                    color={color}
                    aria-current="page"
                    data-testid="CurrentPageSpan"
                    {...restSpanProps}
                  >
                    {option.content || option.label}
                  </Span>
                )}
              </li>
              {index !== options.length - 1 && (
                <li role="presentation" aria-hidden="true">
                  /
                </li>
              )}
            </Fragment>
          ))}
        </ol>
      </nav>
    )
  },
)

Breadcrumb.displayName = 'Breadcrumb'
