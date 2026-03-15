'use client'
import { forwardRef, PropsWithChildren } from 'react'

import { Button, ButtonProps } from '@/components/atoms/common/Button'
import { Ghost } from '@/components/atoms/loaders/Ghost'
import { Checkbox } from '@/components/molecules/form/toggles/CheckboxField/Checkbox'
import { CheckboxProps } from '@/components/molecules/form/toggles/CheckboxField/Checkbox/Checkbox'
import { StyleProps } from '@/components/utils/types'
import { cn } from '@/utils/utils'



export type OptionItemProps<T = string> = StyleProps & {
  /** unique id for option element */
  id?: string
  /** string label of option */
  label: string
  /** value of option */
  value: T
  /** boolean for isSelected */
  isSelected: boolean
  /** loading state for options fetching, loading is delayed for 1 second to prevent flickering */
  isLoading?: boolean
  /** hide option checkbox */
  hideCheckbox?: boolean
  /** optional props for option button */
  buttonProps?: Partial<ButtonProps>
  /** optional props for checkbox */
  checkboxProps?: Partial<CheckboxProps>
  /** on Option click function */
  onClick: (value: T) => void
}

/** optionItem Ul with selectable options. USE CLIENT */
function OptionItemComponent<T = string>(
  {
    id,
    label,
    value,
    isSelected,
    variant = 'outlined',
    color = 'primary',
    size = 'md',
    isLoading,
    hideCheckbox,
    buttonProps = {},
    checkboxProps = {},
    onClick,
    children,
  }: PropsWithChildren<OptionItemProps<T>>,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  const { className: buttonClassName, children: buttonChildren, ...restButtonProps } = buttonProps
  const { className: checkboxClassName, ...restCheckboxProps } = checkboxProps

  return (
    <li role="presentation">
      <Button
        className={cn(
          'Option',
          'flex w-full items-center justify-start rounded-none border border-transparent focus:outline-hidden dark:border-transparent',
          isSelected && 'selected',
          isLoading ? 'cursor-not-allowed' : 'cursor-pointer',
          buttonClassName,
        )}
        variant={variant}
        color={color}
        size={size}
        startIcon={
          !hideCheckbox && (
            <Checkbox
              className={checkboxClassName}
              name={`${label}-optionFakeCheckbox`}
              label=""
              value={`${label}-optionFakeCheckbox`}
              variant={variant}
              color={color}
              size={size}
              isChecked={isSelected}
              disabled={isLoading}
              fake
              aria-hidden="true"
              onChange={() => {}}
              {...restCheckboxProps}
            />
          )
        }
        id={id}
        role="option"
        tabIndex={-1}
        hideShadow
        aria-selected={isSelected}
        aria-disabled={isLoading}
        onClick={() => (!isLoading ? onClick(value) : undefined)}
        ref={ref}
        {...restButtonProps}
      >
        {isLoading ? (
          <Ghost className="ml-0 mr-16 w-full" size={size} />
        ) : (
          buttonChildren || children || label
        )}
      </Button>
    </li>
  )
}

type OptionItemComponentType = {
  <T = string>(
    props: PropsWithChildren<OptionItemProps<T>> & {
      ref?: React.ForwardedRef<HTMLButtonElement>
    },
  ): React.ReactElement | null
  displayName?: string
}

export const OptionItem = forwardRef(OptionItemComponent) as OptionItemComponentType

OptionItem.displayName = 'OptionItem'
