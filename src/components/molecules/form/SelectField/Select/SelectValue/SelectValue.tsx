'use client'
import { useTranslations } from 'next-intl'
import { forwardRef, KeyboardEvent, MouseEvent } from 'react'

import { Chip } from '@/components/atoms/common/Chip'
import { XIcon } from '@/components/atoms/icons'
import { OptionType, StyleProps } from '@/components/types'
import { cn } from '@/utils/utils'

type SelectValueProps = StyleProps & {
  selectedOptions: OptionType[]
  multiValue?: string[]
  placeholder: string
  expandable?: boolean
  handleOnChange: (
    value: string,
    e?: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>,
  ) => void
}

export const SelectValue = forwardRef<HTMLDivElement, SelectValueProps>(
  (
    { selectedOptions, multiValue, placeholder, variant, color, size, expandable, handleOnChange },
    ref,
  ) => {
    const t = useTranslations('Components')
    if (!selectedOptions?.length) {
      return (
        <div className="font-semibold text-dark-400" data-testid="SelectPlaceholder">
          {placeholder}
        </div>
      )
    } else {
      return (
        <div
          className={cn(
            'SelectValue',
            'mr-8 flex max-w-full gap-2 truncate',
            expandable && 'mr-0 flex-wrap',
          )}
          ref={ref}
          data-testid="SelectValue"
        >
          {selectedOptions.map(option => (
            <Chip
              key={option.value}
              className="border-none [&>.ChipInnerWrap]:pl-1 [&>.ChipInnerWrap]:pr-0"
              variant={variant}
              color={color}
              size={size}
            >
              <div className="flex items-center gap-1">
                {option.label}
                <div
                  className={cn('DeleteButton', 'shrink-0', !multiValue?.length && 'hidden')}
                  role="button"
                  aria-label={t('delete') + option.label}
                  tabIndex={-1}
                  onClick={e => handleOnChange(option.value, e)}
                  onKeyDown={e =>
                    e.code === 'Enter' || e.code === 'Space'
                      ? handleOnChange(option.value, e)
                      : null
                  }
                >
                  <XIcon />
                </div>
              </div>
            </Chip>
          ))}
        </div>
      )
    }
  },
)

SelectValue.displayName = 'SelectValue'
