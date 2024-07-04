import { forwardRef, HTMLAttributes } from 'react'

import { cn } from '@/utils/utils'

export type ComponentTemplateProps = Omit<HTMLAttributes<HTMLDivElement>, 'className'> & {
  /** for passing custom tailwind classes */
  className?: string
}

// Component building check
// 1. Code style
//   - import order
//   - props order, storybook table, docs
//   - Button.displayName = 'Button';
// 2. simplyfy
//   - minimalize logic
//   - minimalize structure
//   - minimalize styles, test all variants, styleclasses rename, get rid of ternaries in classes
// 3. qualitity test
//   - try to break it
//   - responsivity test
//   - aria, tabindex, focustrap tests
//   - research other uilibraries, upgrades
// 4. Dev side
//   - storybook table, stories, docs
//   - jest tests

/** Serves as a template for creating new components. Default HTMLAttributes props supported. */
export const ComponentTemplate = forwardRef<HTMLDivElement, ComponentTemplateProps>(
  ({ className = '', ...rest }, ref) => {
    return (
      <div
        className={cn('ComponentTemplate', className)}
        ref={ref}
        data-testid="ComponentTemplate"
        {...rest}
      >
        {className}
      </div>
    )
  },
)

ComponentTemplate.displayName = 'ComponentTemplate'
