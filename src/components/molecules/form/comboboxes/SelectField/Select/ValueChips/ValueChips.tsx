'use client'
import { useTranslations } from 'next-intl'

import { Chip, ChipProps } from '@/components/atoms/common/Chip'
import { ClearButton } from '@/components/molecules/form/comboboxes/SelectField/Select/ClearButton'
import { OptionType, StyleProps } from '@/components/utils/types'
import { cn } from '@/utils/utils'

export type ValueChipsProps<T = string> = StyleProps & {
  /** selected options for displaing multiselect values */
  selectedOptions: OptionType<T>[]
  /** optional multiValue for displaing multiselect values */
  multiValue?: T[]
  /** for passing aditional props to chips */
  chipProps?: Partial<ChipProps>
  /** handle onChange function */
  handleOnChange: (value: T) => void
}

/** Combobox for Select and MultiSelect. USE CLIENT */
export const ValueChips = <T,>({
  selectedOptions,
  multiValue,
  variant = 'outlined',
  color = 'primary',
  size = 'md',
  chipProps = {},
  handleOnChange,
}: ValueChipsProps<T>) => {
  const t = useTranslations('Components')

  return (
    <div
      className={cn('ValueChips', 'mr-0 flex max-w-full flex-wrap gap-2')}
      data-testid="ValueChips"
    >
      {selectedOptions.map(option => (
        <Chip
          key={String(option.value)}
          className={cn('max-w-full border-none text-inherit', multiValue && 'bg-dark-950/10')}
          variant={variant}
          color={color}
          size={size}
          endIcon={
            <ClearButton
              className={cn('ChipClearButton', !multiValue && 'hidden')}
              label={`${t('delete', { label: option.label })}`}
              onClick={() => handleOnChange(option.value)}
            />
          }
          {...chipProps}
        >
          {option.content || option.label}
        </Chip>
      ))}
    </div>
  )
}

ValueChips.displayName = 'ValueChips'
