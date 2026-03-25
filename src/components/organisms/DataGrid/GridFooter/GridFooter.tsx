'use client'
import { useTranslations } from 'next-intl'
import { useCallback, useMemo } from 'react'

import { Button } from '@/components/atoms/common/Button'
import { SignInIcon } from '@/components/atoms/icons'
import { P } from '@/components/atoms/typography/P'
import { Select } from '@/components/molecules/form/comboboxes/SelectField/Select'
import { Tooltip } from '@/components/molecules/popovers/Tooltip'
import { baseVariant } from '@/components/utils/common.style'
import { cn } from '@/utils/utils'

import { MobilePagination } from '../../common/Pagination/MobilePagination'
import { useDataGridContext } from '../utils/DataGridContext'
import { exportToCSV } from '../utils/utils'
import { gridRowPadding } from './GridFooter.style'

export type GridFooterProps<T extends Record<string, unknown> = Record<string, unknown>> = {
  /** filtered data for export */
  filteredData: T[]
  /** current selected rowsPerPage */
  selectedRowsPerPage: number
  /** available pages for pagination */
  pages: number[]
  /** current selected page for pagination */
  selectedPage: number
  /** loading state for pagination */
  isLoading?: boolean
  /** page selecting function for pagination */
  setSelectedPage: (value: number) => void
  /** rowsPerPage selecting function */
  setSelectedRowsPerPage: (value: number) => void
}

/** Footer for DataGrid with rows per page, export and pagination. USE CLIENT */
export const GridFooter = <T extends Record<string, unknown> = Record<string, unknown>>({
  filteredData,
  selectedRowsPerPage,
  pages,
  selectedPage,
  isLoading,
  setSelectedPage,
  setSelectedRowsPerPage,
}: GridFooterProps<T>) => {
  const t = useTranslations('Components')
  const {
    variant,
    color,
    size,
    name,
    columnsInRow,
    hideExport,
    onExport,
    selectedRowsCount,
    filteredDataCount,
  } = useDataGridContext()

  const rowPerPageOptions = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => ({
        label: `${(i + 1) * 10}`,
        value: (i + 1) * 10,
      })),
    [],
  )

  const handleRowsPerPage = useCallback(
    (value: number) => {
      setSelectedPage(1)
      setSelectedRowsPerPage(value)
    },
    [setSelectedPage, setSelectedRowsPerPage],
  )

  const handleExport = useCallback(() => {
    if (onExport) {
      onExport()
    } else {
      exportToCSV(filteredData, columnsInRow, `${name}-export.csv`)
    }
  }, [onExport, name, filteredData, columnsInRow])

  return (
    <div
      className={cn('GridFooter', 'min-w-max rounded-b-md border pr-2', baseVariant[variant][color])}
      role="toolbar"
      aria-label="Grid controls"
    >
      <div
        className={cn(
          'GridFooterContent',
          'relative flex w-full items-center justify-between',
          gridRowPadding[size],
        )}
      >
        <div className={cn('LeftWrap', 'flex items-center gap-2')}>
          {filteredDataCount > (rowPerPageOptions[0]?.value ?? 10) && (
            <Select<number>
              className={cn(
                'RowsPerPageSelect',
                'items-center border-transparent dark:border-transparent',
              )}
              name="rowsPerPage"
              placement="top"
              placeholder="Rows"
              value={selectedRowsPerPage}
              options={rowPerPageOptions}
              variant={variant}
              color={color}
              size={size}
              onChange={handleRowsPerPage}
            />
          )}
          {!hideExport && filteredDataCount > 0 && (
            <Tooltip title="Export">
              <Button
                className={cn('ExportButton', 'border-transparent dark:border-transparent')}
                variant={variant}
                color={color}
                size={size}
                startIcon={<SignInIcon className="rotate-90" />}
                aria-label="Export"
                hideShadow
                onClick={handleExport}
                data-testid="GridExportButton"
              />
            </Tooltip>
          )}
        </div>
        <P
          size={size}
          color="none"
          className={cn('whitespace-nowrap', selectedRowsCount === 0 && 'sr-only')}
          aria-live="polite"
          aria-atomic="true"
          data-testid="GridSelectionCount"
        >
          {selectedRowsCount > 0
            ? t('selectedOf', { count: selectedRowsCount, total: filteredDataCount })
            : ''}
        </P>
        <MobilePagination
          count={pages.length}
          page={selectedPage}
          variant={variant}
          color={color}
          size={size}
          isLoading={isLoading}
          buttonProps={{
            className: 'border-transparent dark:border-transparent',
          }}
          onChange={setSelectedPage}
        />
      </div>
    </div>
  )
}

GridFooter.displayName = 'GridFooter'
