'use client'
import { useTranslations } from 'next-intl'

import { ScrollShadow } from '@/components/atoms/containers/ScrollShadow'
import { P } from '@/components/atoms/typography/P'
import { paperVariant, textVariant } from '@/components/utils/common.style'
import { cn } from '@/utils/utils'

import { useDataGridContext } from '../utils/DataGridContext'
import { GridRow } from './GridRow'

export type GridBodyProps<T extends Record<string, unknown> = Record<string, unknown>> = {
  /** paged data for display */
  pagedData: T[]
  /** selected row ids */
  selectedRowIds: Set<string | number>
  /** loading ghost state */
  isLoading?: boolean
  /** default rowsPerPage option for ghost loading */
  rowsPerPage?: number
  /** optional max height for scrollShadow as tailwind class */
  maxHeight?: string
  /** boolean for if multiselect is chosen */
  multiselect: boolean
  /** header depth for aria-rowindex calculation */
  headerDepth: number
  /** grid template column def */
  gridTemplateColumns: string
  /** function to extract unique row identifier */
  getRowId: (row: T) => string | number
  /** on row click function */
  handleRowClick?: (row: T) => void
}

/** Body for DataGrid with ScrollShadow. USE CLIENT */
export const GridBody = <T extends Record<string, unknown> = Record<string, unknown>>({
  pagedData,
  selectedRowIds,
  isLoading,
  rowsPerPage,
  maxHeight,
  multiselect,
  headerDepth,
  gridTemplateColumns,
  getRowId,
  handleRowClick,
}: GridBodyProps<T>) => {
  const t = useTranslations('Components')
  const { variant, color, size } = useDataGridContext()

  return (
    <div
      className={cn(
        'GridBody',
        'min-w-max border',
        paperVariant[variant][color],
        textVariant[variant][color],
      )}
      role="rowgroup"
    >
      <ScrollShadow height={maxHeight} gutter disableHorizontal>
        {isLoading &&
          Array.from({ length: rowsPerPage || 10 }, (_, i) => (
            <GridRow
              key={`loading-${i}`}
              rowIndex={i + headerDepth + 1}
              multiselect={multiselect}
              gridTemplateColumns={gridTemplateColumns}
              isLoading
            />
          ))}
        {!isLoading &&
          pagedData.length > 0 &&
          pagedData.map((row, index) => (
            <GridRow
              key={String(getRowId(row))}
              row={row}
              getRowId={getRowId}
              rowIndex={index + headerDepth + 1}
              isSelected={selectedRowIds.has(getRowId(row))}
              multiselect={multiselect}
              gridTemplateColumns={gridTemplateColumns}
              handleRowClick={handleRowClick}
            />
          ))}
        {!isLoading && pagedData.length === 0 && (
          <div role="row" aria-rowindex={headerDepth + 1}>
            <div role="gridcell" aria-colindex={1}>
              <P className="my-6 text-center" color="none" size={size}>
                {t('noRows')}
              </P>
            </div>
          </div>
        )}
      </ScrollShadow>
    </div>
  )
}

GridBody.displayName = 'GridBody'
