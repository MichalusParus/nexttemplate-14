'use client'
import { forwardRef } from 'react'

import { Button } from '@/components/atoms/common/Button'
import { SignInIcon } from '@/components/atoms/icons'
import { Select } from '@/components/molecules/form/selects/SelectField/Select'
import { Tooltip } from '@/components/molecules/popovers/Tooltip'
import { StyleProps } from '@/components/types'
import { cn } from '@/utils/utils'

import { MobilePagination } from '../../common/Pagination/MobilePagination'
import { rowgroupVariant } from '../GridHeader/GridHeader.style'
import { RowDef } from '../types'
import { gridRowPadding, paginationMarginClass, rowClass } from './GridFooter.style'

export type GridFooterProps = StyleProps & {
  /** filtered data for export */
  filteredData: RowDef[]
  /** current selected rowsPerPage */
  selectedRowsPerPage: number
  /** available pages for pagination */
  pages: number[]
  /** current selected page for pagination */
  selectedPage: number
  /** optional for hiding export */
  hideExport?: boolean
  /** page selecting function for pagination */
  setSelectedPage: (value: number) => void
  /** rowsPerPage selecting function */
  setSelectedRowsPerPage: (value: number) => void
}

/** Footer for DataGrid with rows per page, export and pagination. USE CLIENT */
export const GridFooter = forwardRef<HTMLDivElement, GridFooterProps>(
  (
    {
      filteredData,
      selectedRowsPerPage,
      pages,
      selectedPage,
      variant = 'outlined',
      color = 'primary',
      size = 'md',
      hideExport,
      setSelectedPage,
      setSelectedRowsPerPage,
    },
    ref,
  ) => {
    const rowPerPageOptions = Array.from({ length: 5 }, (_, i) => ({
      label: `${(i + 1) * 10}`,
      value: `${(i + 1) * 10}`,
    }))

    const handleRowsPerPage = (value: string) => {
      setSelectedPage(1)
      setSelectedRowsPerPage(Number(value))
    }

    const handleExport = () => {
      const dataKeys = Object.entries(filteredData[0]).map(d1 => d1[0])
      const dataArray = filteredData.map(d => Object.entries(d).map(d1 => d1[1]))
      const csvContent =
        'data:text/csv;charset=utf-8,' +
        [dataKeys, ...dataArray]
          .map(row =>
            row
              .map(String)
              .map(v => `"${v.replaceAll('"', '""')}"`)
              .join(','),
          )
          .join('\r\n')
      const encodedUri = encodeURI(csvContent)
      window.open(encodedUri)
    }

    return (
      <div
        className={cn('GridFooter', 'rounded-b-md border', rowgroupVariant[variant][color])}
        role="rowgroup"
        ref={ref}
      >
        <div className={cn('GridRow', rowClass, gridRowPadding[size])} role="row">
          <div className={cn('LeftWrap', 'flex items-center')}>
            <Select
              className={cn('RowsPerPageSelect', 'items-center', pages.length <= 1 && 'hidden')}
              name="rowsPerPage"
              placement="top"
              placeholder="Rows"
              value={String(selectedRowsPerPage)}
              options={rowPerPageOptions}
              variant={variant}
              color={color}
              size={size}
              buttonProps={{
                className: 'border-transparent dark:border-transparent',
                tabIndex: -1,
              }}
              onChange={(value: string) => handleRowsPerPage(value)}
            />
            {!hideExport && (
              <Tooltip title="Export">
                <Button
                  className={cn('ExportButton', 'border-transparent dark:border-transparent')}
                  variant={variant}
                  color={color}
                  size={size}
                  startIcon={<SignInIcon className="rotate-90" />}
                  hideShadow
                  tabIndex={-1}
                  onClick={handleExport}
                />
              </Tooltip>
            )}
          </div>
          <MobilePagination
            className={paginationMarginClass[size]}
            count={pages.length}
            selectedPage={selectedPage}
            variant={variant}
            color={color}
            size={size}
            buttonProps={{ className: 'border-transparent dark:border-transparent', tabIndex: -1 }}
            setSelectedPage={setSelectedPage}
          />
        </div>
      </div>
    )
  },
)

GridFooter.displayName = 'GridFooter'
