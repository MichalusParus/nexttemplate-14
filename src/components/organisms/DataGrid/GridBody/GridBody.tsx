'use client'
import { useTranslations } from 'next-intl'
import { forwardRef } from 'react'

import { Button } from '@/components/atoms/common/Button'
import { iconOnlySize } from '@/components/atoms/common/Button/Button.style'
import { ScrollShadow } from '@/components/atoms/containers/ScrollShadow'
import { Ghost } from '@/components/atoms/loaders/Ghost'
import { P } from '@/components/atoms/typography/P'
import { Checkbox } from '@/components/molecules/form/inputs/CheckboxField/Checkbox'
import { StyleProps } from '@/components/types'
import { cn } from '@/utils/utils'

import { cellOverflow, cellSize } from '../GridHeader/ColumnHead/ColumnHead.style'
import { checkboxSize, rowgroupVariant } from '../GridHeader/GridHeader.style'
import { ColumnDef, RowDef } from '../types'

export type GridBodyProps = StyleProps & {
  /** grid columns definition */
  columns: ColumnDef[]
  /** paged data for display */
  pagedData: RowDef[]
  /** selected rows for multiselect */
  selectedRows: RowDef[]
  /** loading ghost state */
  isLoading?: boolean
  /** default rowsPerPage option for ghost loading */
  rowsPerPage?: number
  /** optional max height for scrollShadow as tailwind class */
  maxHeight?: string
  /** bolean for if multiselect is chosen */
  multiselect: boolean
  /** on row click function */
  handleRowClick?: (row: RowDef) => void
}

/** Body for DataGrid with ScrollShadow. USE CLIENT */
export const GridBody = forwardRef<HTMLDivElement, GridBodyProps>(
  (
    {
      columns,
      pagedData,
      selectedRows,
      variant = 'outlined',
      color = 'primary',
      size = 'md',
      isLoading,
      rowsPerPage,
      maxHeight,
      multiselect,
      handleRowClick,
    },
    ref,
  ) => {
    const t = useTranslations('Components')
    const isRowInteractive = Boolean(handleRowClick || multiselect)
    const haveSubColumns = columns.some(col => col.columns && col.columns.length > 0)

    const selectedClass = (rowId: string) => {
      if (selectedRows.length) {
        return selectedRows.map(r => r.id).includes(rowId) ? 'selected' : ''
      }
      return ''
    }

    if (isLoading) {
      return (
        <div
          className={cn('GridLoadingBody', 'border', rowgroupVariant[variant][color])}
          role="rowgroup"
          ref={ref}
        >
          <ScrollShadow height={maxHeight} gutter disableHorizontal>
            {new Array(rowsPerPage).fill(null).map((_, index) => (
              <div
                key={`gridGhost${index}`}
                className={cn('GhostRow', 'border border-transparent', checkboxSize[size])}
                role="row"
                aria-rowindex={index + (haveSubColumns ? 3 : 2)}
              >
                <Ghost size={size} />
              </div>
            ))}
          </ScrollShadow>
        </div>
      )
    }

    return (
      <div className={cn('GridBody', 'border', rowgroupVariant[variant][color])} role="rowgroup">
        <ScrollShadow height={maxHeight} gutter disableHorizontal>
          {pagedData.length ? (
            pagedData.map((row, index) => (
              <div
                key={String(row.id)}
                id={String(row.id)}
                className="GridRow"
                role="row"
                aria-rowindex={index + (haveSubColumns ? 3 : 2)}
              >
                <Button
                  className={cn(
                    'RowButton',
                    'group w-full rounded-none border-none',
                    selectedClass(String(row.id)),
                    isRowInteractive ? 'cursor-pointer' : 'cursor-default',
                  )}
                  variant={variant}
                  color={isRowInteractive ? color : 'none'}
                  size="none"
                  hideShadow
                  tabIndex={-1}
                  aria-selected={selectedRows.some(row => row.id)}
                  onClick={() => (handleRowClick ? handleRowClick(row) : {})}
                >
                  <div className={cn('RowInnerWrap', 'flex w-full')}>
                    {multiselect && (
                      <div
                        role="gridcell"
                        className={cn(
                          'GridCell',
                          selectedClass(String(row.id)),
                          iconOnlySize[size],
                        )}
                      >
                        <Checkbox
                          name={String(row.id)}
                          label=""
                          value={selectedRows.map(row => String(row.id))}
                          variant={variant === 'text' ? 'outlined' : variant}
                          color={color}
                          size={size}
                          isChecked={Boolean(selectedClass(String(row.id)))}
                          fake
                          onChange={() => {}}
                        />
                      </div>
                    )}
                    {columns.map((col, index) => (
                      <div
                        key={row.id + col!.name}
                        className={cn(
                          'GridCell',
                          'font-normal',
                          cellOverflow,
                          cellSize[size],
                          col.width,
                          !col.shrink && 'shrink-0',
                          col.grow && 'grow',
                          !isRowInteractive && 'cursor-text',
                          typeof row[col.name] === 'number' && 'text-right',
                          selectedClass(String(row.id)),
                        )}
                        style={{ flexBasis: col.width }}
                        role="gridcell"
                        aria-colindex={index + (multiselect ? 2 : 1)}
                      >
                        {row[col.name]}
                      </div>
                    ))}
                  </div>
                </Button>
              </div>
            ))
          ) : (
            <div className="GridRow" role="row">
              <div className="GridCell" role="gridcell">
                <P className="my-6 text-center" color="none" size={size}>
                  {t('noRows')}
                </P>
              </div>
            </div>
          )}
        </ScrollShadow>
      </div>
    )
  },
)

GridBody.displayName = 'GridBody'
