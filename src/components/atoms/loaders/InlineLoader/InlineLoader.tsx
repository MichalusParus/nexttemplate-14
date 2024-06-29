import { forwardRef, HTMLAttributes } from 'react'

import { dottClass, loaderSize } from './InlineLoader.style'

export type InlineLoaderProps = Omit<HTMLAttributes<HTMLSpanElement>, 'className'> & {
  /** for passing custom tailwind classes */
  className?: string
  /** size of component, none disable sizes for custom styling via className */
  size?: 'sm' | 'md' | 'lg' | 'inline' | 'none'
}

/** Serves as inline loader, takes current text color. Default HTMLAttributes props supported. */
export const InlineLoader = forwardRef<HTMLSpanElement, InlineLoaderProps>(
  ({ className = '', size = 'md', ...rest }, ref) => {
    return (
      <span
        className={`InlineLoaderWrap ${className} inline-flex items-center`}
        role="status"
        aria-label="loading"
        aria-busy="true"
        ref={ref}
        {...rest}
      >
        <span className={`Dott ${dottClass} ${loaderSize[size]}`} />
        <span
          className={`Dott ${dottClass} ${loaderSize[size]}`}
          style={{ animationDelay: '150ms' }}
        />
        <span
          className={`Dott ${dottClass} ${loaderSize[size]}`}
          style={{ animationDelay: '300ms' }}
        />
      </span>
    )
  },
)

InlineLoader.displayName = 'InlineLoader'
