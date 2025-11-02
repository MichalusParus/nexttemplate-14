'use client'
import { forwardRef } from 'react'

import { Tabs, TabsProps } from '@/components/organisms/common/Tabs'
import { TabOption } from '@/components/organisms/common/Tabs/TabList'
import { StyleProps } from '@/components/utils/types'
import { cn } from '@/utils/utils'

type StepOption = TabOption<number>

export type StepFormProps = Omit<TabsProps<number>, 'tabs' | 'selectedValue' | 'onTabChange'> &
  StyleProps & {
    /** form content of steps */
    steps: StepOption[]
    /** current step index */
    currentStep: number
    /** optional onStepChange for non url query stepper */
    onStepChange?: (step: number) => void
  }

/** StepForm with Stepper for multi step forms. Tabs props supported. USE CLIENT */
export const StepForm = forwardRef<HTMLDivElement | null, StepFormProps>(
  (
    {
      className,
      name,
      steps,
      currentStep,
      variant = 'outlined',
      color = 'primary',
      size = 'md',
      onStepChange,
      ...rest
    },
    ref,
  ) => {
    const currentStepValue = steps?.find(st => st.value === currentStep)?.value
    const fullSteps = steps.map(step => ({ ...step, isDisabled: step.value > currentStep }))

    if (currentStepValue === undefined || !fullSteps.length) return null

    return (
      <Tabs<number>
        className={cn('StepForm', className)}
        name={name || 'step'}
        tabs={fullSteps}
        selectedValue={currentStepValue}
        variant={variant}
        color={color}
        size={size}
        fullWidth
        onTabChange={onStepChange}
        ref={ref}
        {...rest}
      />
    )
  },
)

StepForm.displayName = 'StepForm'
