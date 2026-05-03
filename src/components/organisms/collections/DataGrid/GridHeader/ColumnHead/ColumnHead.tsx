'use client'
import { useTranslations } from 'next-intl'
import { memo, useCallback, useMemo } from 'react'

import { Button } from '@/components/atoms/common/Button'
import { buttonSize } from '@/components/atoms/common/Button/Button.style'
import { ChevronIcon } from '@/components/atoms/icons'
import { Ellipsis } from '@/components/atoms/typography/Ellipsis'
import { cn } from '@/utils/utils'

import { useDataGridContext } from '../../utils/DataGridContext'
import { ColumnDef } from '../../utils/types'
import { alignColumn } from './ColumnHead.style'
import { GridFilter } from './GridFilter'

enum AriaSort {
  asc = 'ascending',
  desc = 'descending',
  none = 'none',
}

export type ColumnHeadProps = {
  /** for passing custom tailwind classes */
  className?: string
  /** grid column span value (e.g., "1 / span 2") */
  gridColumn?: string
  /** grid row span value (e.g., "1" or "1 / span 2") */
  gridRow?: string
  /** grid column definition */
  column: ColumnDef
  /** whether sorting is enabled for this column */
  canSort?: boolean
  /** whether filtering is enabled for this column */
  canFilter?: boolean
}

/** ColumnHeader component for DataGrid - non-interactive container with separate sort and filter buttons. USE CLIENT */
const ColumnHeadComponent = ({
  className,
  column,
  gridColumn,
  gridRow,
  canSort = true,
  canFilter = true,
}: ColumnHeadProps) => {
  const t = useTranslations('Components')
  const { variant, color, size, sorting, handleSorting } = useDataGridContext()
  const canSortColumn = canSort && !column.hideSort
  const ariaSorted = canSortColumn ? AriaSort[sorting?.key === column.name ? sorting?.value : 'none'] : undefined
  const canFilterColumn = canFilter && column.filter
  const isSorted = sorting?.key === column.name
  const isLeafColumn = !column.columns || column.columns.length === 0
  const align = column.align || (isLeafColumn ? 'left' : 'center')

  const chevronState = useMemo(() => {
    if (!isSorted) {
      return 'opacity-40 hover-device:opacity-0 group-hoverable:opacity-40 group-focus-visible:opacity-40'
    }
    return sorting?.value === 'desc' ? 'opacity-100 rotate-0' : 'opacity-100 rotate-180'
  }, [isSorted, sorting?.value])

  const handleSortClick = useCallback(() => {
    if (canSortColumn) {
      handleSorting(column.name)
    }
  }, [canSortColumn, handleSorting, column.name])

  return (
    <div
      className={cn(
        'ColumnHeader group grid items-center overflow-hidden font-semibold focus-visible:ring focus-visible:z-10 ring-current focus:outline-none',
        className,
      )}
      style={{
        ...(gridColumn && { gridColumn }),
        ...(gridRow && { gridRow }),
        gridTemplateColumns: canFilterColumn
          ? align === 'right' ? 'auto 1fr' : '1fr auto'
          : '1fr',
      }}
      role="columnheader"
      aria-sort={ariaSorted}
      tabIndex={isLeafColumn ? -1 : undefined}
      data-testid="ColumnHeader"
    >
      {align === 'right' && canFilterColumn && <GridFilter column={column} />}
      {canSortColumn ? (
        <Button
          className={cn(
            'group w-full min-w-0 gap-1 rounded-none font-[inherit] text-inherit focus-visible:ring-0 dark:text-inherit',
            align === 'right'
              ? 'flex-row-reverse justify-start pl-0.5'
              : cn('pr-0.5', alignColumn[align]),
          )}
          variant={variant}
          color={color}
          size={size}
          hideShadow
          hideBorder
          onClick={handleSortClick}
          aria-label={t('sortIn', { field: column.label })}
          data-testid="ColumnHeadSortButton"
          tabIndex={-1}
        >
          <Ellipsis>{column.label}</Ellipsis>
          <ChevronIcon className={cn('shrink-0 transition-all duration-200', chevronState)} />
        </Button>
      ) : (
        <div
          className={cn('flex w-full min-w-0 items-center', alignColumn[align], buttonSize[size])}
        >
          <Ellipsis>{column.label}</Ellipsis>
        </div>
      )}
      {align !== 'right' && canFilterColumn && <GridFilter column={column} />}
    </div>
  )
}

export const ColumnHead = memo(ColumnHeadComponent)

ColumnHead.displayName = 'ColumnHead'
