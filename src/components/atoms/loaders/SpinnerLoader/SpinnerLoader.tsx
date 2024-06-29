import { forwardRef, HTMLAttributes } from 'react'

import { spinnerClass, spinnerColor, spinnerSize } from './SpinnerLoader.style'

export type SpinnerLoaderProps = Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'color'> & {
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
export const SpinnerLoader = forwardRef<HTMLDivElement, SpinnerLoaderProps>(
  (
    { className = '', color = 'primary', size = 'md', label = 'Loading...', hideLabel, ...rest },
    ref,
  ) => {
    return (
      <div
        className={`SpinnerLoader ${className} flex flex-col items-center`}
        role="status"
        aria-label="loading"
        aria-busy="true"
        ref={ref}
        {...rest}
      >
        <div
          className={`SpinnerWrap relative rounded-full border-4 ${spinnerColor[color]} ${spinnerSize[size]}`}
        >
          <div className={`Spinner animate-[spin_750ms_ease-in_infinite] ${spinnerClass}`} />
          <div className={`Spinner animate-[spin_750ms_linear_infinite] ${spinnerClass}`} />
          <div className={`Spinner animate-[spin_750ms_ease-out_infinite] ${spinnerClass}`} />
        </div>
        {!hideLabel ? label : null}
      </div>
    )
  },
)

SpinnerLoader.displayName = 'SpinnerLoader'
