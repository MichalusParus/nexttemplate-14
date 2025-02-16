'use client'
import { useTranslations } from 'next-intl'

import { Chip, ChipProps } from '@/components/atoms/common/Chip'
import { ClearButton } from '@/components/molecules/form/selects/SelectField/Select/ClearButton'
import { OptionType, StyleProps } from '@/components/types'
import { cn } from '@/utils/utils'

export type ValueChipsProps = StyleProps & {
  /** selected options for displaing multiselect values */
  selectedOptions: OptionType[]
  /** optional multiValue for displaing multiselect values */
  multiValue?: string[]
  /** for passing aditional props to chips */
  chipProps?: Partial<ChipProps>
  /** handle onChange function */
  handleOnChange: (value: string) => void
}

/** Combobox for Select and MultiSelect. USE CLIENT */
export const ValueChips = ({
  selectedOptions,
  multiValue,
  variant = 'outlined',
  color = 'primary',
  size = 'md',
  chipProps = {},
  handleOnChange,
}: ValueChipsProps) => {
  const t = useTranslations('Components')
  console.log(multiValue)
  return (
    <div
      className={cn('ValueChips', 'mr-0 flex max-w-full flex-wrap gap-2')}
      data-testid="ValueChips"
    >
      {selectedOptions.map(option => (
        <Chip
          key={option.value}
          className={cn('border-none', multiValue && 'bg-dark-950/10')}
          variant={variant}
          color={color}
          size={size}
          endIcon={
            <ClearButton
              className={cn(!multiValue && 'hidden')}
              label={`${t('delete')} ${option.label}`}
              onClear={() => handleOnChange(option.value)}
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
