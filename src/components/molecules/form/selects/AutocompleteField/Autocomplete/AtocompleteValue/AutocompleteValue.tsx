'use client'
import { useTranslations } from 'next-intl'
import { forwardRef, KeyboardEvent, MouseEvent, PropsWithChildren } from 'react'

import { Chip } from '@/components/atoms/common/Chip'
import { XIcon } from '@/components/atoms/icons'
import { OptionType, StyleProps } from '@/components/types'
import { cn } from '@/utils/utils'

type AutocompleteValueProps = StyleProps & {
  selectedOptions: OptionType[]
  multiValue?: OptionType[]
  expandable?: boolean
  handleOnChange: (
    value: string,
    e?: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>,
  ) => void
}

export const AutocompleteValue = forwardRef<
  HTMLDivElement,
  PropsWithChildren<AutocompleteValueProps>
>(
  (
    { selectedOptions, multiValue, variant, color, size, expandable, children, handleOnChange },
    ref,
  ) => {
    const t = useTranslations('Components')
    return (
      <div
        className={cn(
          'SelectedOptionsWrap',
          'flex w-full gap-2 truncate bg-inherit',
          expandable && 'flex-wrap',
        )}
        data-testid="SelectedOptionsWrap"
      >
        {Boolean(selectedOptions.length) && Boolean(multiValue) && (
          <div
            className={cn('flex items-center gap-2 truncate', expandable && 'flex-wrap')}
            ref={ref}
          >
            {selectedOptions.map(option => (
              <Chip
                key={option.value}
                className="border-none [&>.ChipInnerWrap]:p-0"
                variant={variant}
                color={color}
                size={size}
              >
                <div className="flex items-center gap-1">
                  {option.label}
                  <div
                    className={cn('DeleteButton', 'shrink-0')}
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
        )}
        {children}
      </div>
    )
  },
)

AutocompleteValue.displayName = 'AutocompleteValue'
