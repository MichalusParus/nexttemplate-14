import { forwardRef, HTMLAttributes } from 'react'

import { spinnerClass, spinnerColor, spinnerSize } from './SpinnerLoader.style'

export type CircularLoaderProps = Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'color'> & {
  /** for passing custom tailwind classes */
  className?: string
  /** theme color of component, none disable styles for custom styling via className */
  color?: 'primary' | 'secondary' | 'terciary' | 'none'
  /** size of spinner, none disable sizes for custom styling via className */
  size?: 'sm' | 'md' | 'lg' | 'none'
  /** optional label for replacing default Loading... */
  label?: string
  /** hide label for displaying only Spinner */
  hideLabel?: boolean
}

/** Serves as block loader. Default HTMLAttributes props supported. */
export const CircularLoader = forwardRef<HTMLDivElement, CircularLoaderProps>(
  (
    { className = '', color = 'primary', size = 'md', label = 'Loading...', hideLabel, ...rest },
    ref,
  ) => {
    return (
      <div
        className={`CircularLoader ${className} flex flex-col items-center`}
        role="status"
        aria-label="loading"
        aria-busy="true"
        ref={ref}
        {...rest}
      >
        <div
          className={`SpinnerWrap relative rounded-full border-4 ${spinnerColor[color]} ${spinnerSize[size]}`}
        >
          <div className={`Spinner animate-circularLoaderAnim ${spinnerClass}`} />
        </div>
        {!hideLabel ? label : null}
      </div>
    )
  },
)

CircularLoader.displayName = 'CircularLoader'
