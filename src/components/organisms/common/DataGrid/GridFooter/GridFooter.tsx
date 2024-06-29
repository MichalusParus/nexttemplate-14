import Button from '@/components/atoms/common/Button'
import SignInIcon from '@/components/atoms/icons/SignInIcon'
import Select from '@/components/molecules/form/SelectField/Select'
import Tooltip from '@/components/molecules/popovers/Tooltip'

import MobilePagination from '../../Pagination/MobilePagination'
import { rowgroupVariant } from '../GridHeader/GridHeader.style'
import { RowDef } from '../types'
import { gridRowPadding, paginationMarginClass, rowClass } from './GridFooter.style'

type Props = {
  /** filtered data for export */
  filteredData: RowDef[]
  /** current selected rowsPerPage */
  selectedRowsPerPage: number
  /** available pages for pagination */
  pages: number[]
  /** current selected page for pagination */
  selectedPage: number
  /** style variant of component */
  variant?: 'text' | 'outlined' | 'contained'
  /** theme color of component, none disable styles for custom styling via className */
  color?: 'primary' | 'secondary' | 'none'
  /** size of component, none disable sizes for custom styling via className */
  size?: 'sm' | 'md' | 'lg' | 'none'
  /** optional for hiding export */
  hideExport?: boolean
  /** page selecting function for pagination */
  setSelectedPage: (value: number) => void
  /** rowsPerPage selecting function */
  setSelectedRowsPerPage: (value: number) => void
}

/** Footer for DataGrid. */
export const GridFooter = ({
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
}: Props) => {
  const rowPerPageOptions = new Array(5).fill(null).map((value, index) => ({
    label: `${(index + 1) * 10}`,
    value: `${(index + 1) * 10}`,
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
      className={`GridFooter rounded-b-md border ${rowgroupVariant[variant][color]}`}
      role="rowgroup"
    >
      <div className={`GridRow ${rowClass} ${gridRowPadding[size]}`} role="row">
        <div className="flex items-center">
          <Select
            className={`[&.LabelWrap]:items-center [&>#rowsPerPage-label]:m-0 ${pages.length > 1 ? 'flex' : 'hidden'}`}
            name="rowsPerPage"
            placement="top"
            label="rows:"
            value={String(selectedRowsPerPage)}
            options={rowPerPageOptions}
            variant={variant === 'outlined' ? 'text' : variant}
            color={color}
            size={size}
            width="w-40"
            placeholder="Rows"
            tabIndex={-1}
            hideError
            collapsed="never"
            onChange={(value: string) => handleRowsPerPage(value)}
          />
          {!hideExport ? (
            <Tooltip title="Export">
              <Button
                className="ExportButton"
                variant={variant === 'outlined' ? 'text' : variant}
                color={color}
                size={size}
                startIcon={<SignInIcon className="rotate-90" />}
                hideShadow
                tabIndex={-1}
                onClick={handleExport}
              />
            </Tooltip>
          ) : null}
        </div>
        <MobilePagination
          className={paginationMarginClass[size]}
          pages={pages}
          selectedPage={selectedPage}
          variant={variant === 'outlined' ? 'text' : variant}
          color={color}
          size={size}
          setSelectedPage={setSelectedPage}
        />
      </div>
    </div>
  )
}

GridFooter.displayName = 'GridFooter'
