import { useTranslations } from 'next-intl'
import { forwardRef, HTMLAttributes, ReactNode } from 'react'

import { StyleProps } from '@/components/types'
import { cn, filterOutKeys } from '@/utils/utils'

import { XIcon } from '../../icons'
import { Span } from '../../typography/Span'
import { Button, ButtonProps } from '../Button/Button'
import { buttonIconSize } from '../Button/Button.style'
import { chipClass, chipSize, chipVariant } from './Chip.style'

type NativeChipProps = Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'color' | 'onClick'>

export type ChipProps = NativeChipProps &
  StyleProps & {
    /** for passing custom tailwind classes */
    className?: string
    /** Optional chip heading */
    title?: string
    /** pass svg icon before children */
    startIcon?: ReactNode
    /** pass svg icon to onClick button, onClick cannot be undefined */
    buttonIcon?: ReactNode
    /** optional props for button */
    buttonProps?: Partial<ButtonProps>
    /** onClick function */
    onClick?: () => void
  }

/** Small styled wrapper for displaying selected options with optional button. Default HTMLAttributes props supported. */
export const Chip = forwardRef<HTMLDivElement, ChipProps>(
  (
    {
      className,
      variant = 'contained',
      color = 'primary',
      size = 'md',
      title,
      startIcon,
      buttonIcon,
      buttonProps = {},
      onClick,
      children,
      ...rest
    },
    ref,
  ) => {
    const t = useTranslations('Components')

    return (
      <div
        className={cn(
          'Chip',
          chipClass,
          chipVariant[variant][color],
          chipSize[size],
          buttonIconSize[size],
          className,
        )}
        data-testid="Chip"
        ref={ref}
        {...rest}
      >
        {startIcon && startIcon}
        <div className="ChipInnerWrap flex flex-col px-2">
          <Span variant="bold">{title && title}</Span>
          <Span className="whitespace-nowrap" variant="none">
            {children}
          </Span>
        </div>
        {onClick && (
          <Button
            className={cn('ChipAction', 'rounded-full border-0', buttonProps?.className)}
            startIcon={buttonIcon ? buttonIcon : <XIcon />}
            variant={variant}
            color={color}
            size="none"
            hideShadow
            aria-label={t('delete') + (title || String(children))}
            onClick={onClick}
            {...filterOutKeys(buttonProps, ['className'])}
          />
        )}
      </div>
    )
  },
)

Chip.displayName = 'Chip'
