import { forwardRef, Fragment, HTMLAttributes } from 'react'

import { Link } from '@/components/atoms/common/Link'
import { Span } from '@/components/atoms/typography/Span'
import { StyleProps } from '@/components/types'
import { cn } from '@/utils/utils'

export type BreadcrumbProps = Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'color'> &
  Pick<StyleProps, 'color'> & {
    /** for passing custom tailwind classes */
    className?: string
    /** list of breadcrumb options */
    options: { label: string; href: string }[]
  }

/** Breadcrumb navigation component. Default HTMLAttributes props supported. */
export const Breadcrumb = forwardRef<HTMLDivElement, BreadcrumbProps>(
  ({ className, options, color = 'none', ...rest }, ref) => {
    return (
      <nav className={cn('Breadcrumb', className)} ref={ref} aria-label="breadcrumb" {...rest}>
        <ol className="flex flex-wrap items-center gap-2.5 break-words">
          {options.map((option, index) => (
            <Fragment key={`${option.href}-${index}`}>
              <li>
                {index !== options.length - 1 ? (
                  <Link
                    className="inline-flex items-center gap-1.5"
                    variant="text"
                    color={color}
                    size="inline"
                    href={option.href}
                  >
                    {option.label}
                  </Link>
                ) : (
                  <Span
                    className={cn('CurrentPageSpan', 'cursor-default font-semibold underline')}
                    variant="none"
                    color={color}
                    aria-current="page"
                    data-testid="CurrentPageSpan"
                  >
                    {option.label}
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
