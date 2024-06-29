import Button from '@/components/atoms/common/Button'
import ScrollShadow from '@/components/atoms/containers/ScrollShadow'
import Ghost from '@/components/atoms/loaders/Ghost'
import P from '@/components/atoms/typography/P'
import Checkbox from '@/components/molecules/form/CheckboxField/Checkbox'

import { cellOverflow, cellSize, selectCellSize } from '../ColumnHead/ColumnHead.style'
import { checkboxSize, rowgroupVariant } from '../GridHeader/GridHeader.style'
import { ColumnDef, RowDef } from '../types'

type Props = {
  /** grid columns definition */
  columns: ColumnDef[]
  /** paged data for display */
  pagedData: RowDef[]
  /** selected rows for multiselect */
  selectedRows: RowDef[]
  /** style variant of component */
  variant?: 'text' | 'outlined' | 'contained'
  /** theme color of component, none disable styles for custom styling via className */
  color?: 'primary' | 'secondary' | 'none'
  /** size of component, none disable sizes for custom styling via className */
  size?: 'sm' | 'md' | 'lg' | 'none'
  /** loading ghost state */
  isLoading?: boolean
  /** default rowsPerPage option */
  rowsPerPage?: number
  /** optional max height for scrollShadow as tailwind class */
  maxHeight?: string
  /** bolean for if multiselect is chosen */
  multiselect: boolean
  /** on row click function */
  handleOnRowClick?: (row: RowDef) => void
}

/** Body for DataGrid with ScrollShadow. */
export const GridBody = ({
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
  handleOnRowClick,
}: Props) => {
  const isRowInteractive = Boolean(handleOnRowClick || multiselect)
  const haveSubColumns = columns.some(col => col.columns && col.columns.length > 0)

  const selectedClass = (rowId: string) => {
    if (selectedRows.length) {
      return selectedRows.map(r => r.id).includes(rowId) ? 'selected' : ''
    }
    return ''
  }

  if (isLoading) {
    return (
      <div className={`GridBody border ${rowgroupVariant[variant][color]}`} role="rowgroup">
        <ScrollShadow height={maxHeight} gutter disableHorizontal>
          {new Array(rowsPerPage).fill(null).map((row, index) => (
            <div
              key={`gridGhost${index}`}
              className={`border border-transparent ${checkboxSize[size]}`}
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
    <div className={`GridBody border ${rowgroupVariant[variant][color]}`} role="rowgroup">
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
                className={`RowButton group [&.RowButton]:rounded-none ${selectedClass(String(row.id))} ${
                  isRowInteractive ? 'cursor-pointer' : 'cursor-default'
                }`}
                variant={variant === 'outlined' ? 'text' : variant}
                color={isRowInteractive ? color : 'none'}
                size="none"
                disableUpperCase
                hideShadow
                fullWidth
                tabIndex={-1}
                aria-selected={selectedRows.some(row => row.id)}
                onClick={() => (handleOnRowClick ? handleOnRowClick(row) : {})}
              >
                <div className="RowInnerWrap flex w-full">
                  {multiselect ? (
                    <div
                      role="gridcell"
                      className={`GridCell ${selectedClass(String(row.id))} ${selectCellSize[size]}`}
                    >
                      <Checkbox
                        name={String(row.id)}
                        label={String(row.id)}
                        value={selectedRows.map(row => String(row.id))}
                        variant={variant === 'text' ? 'outlined' : variant}
                        color={color}
                        size={size}
                        isChecked={Boolean(selectedClass(String(row.id)))}
                        fake
                        onChange={() => {}}
                      />
                    </div>
                  ) : null}
                  {columns.map((col, index) => (
                    <div
                      key={row.id + col!.name}
                      className={`GridCell font-normal ${col?.width} ${cellOverflow} ${cellSize[size]} ${
                        col.shrink ? 'shrink-1' : 'shrink-0'
                      } ${col.grow ? 'grow' : 'grow-0'} ${!isRowInteractive ? 'cursor-text' : ''} ${
                        typeof row[col.name] === 'number' ? 'text-right' : ''
                      } ${selectedClass(String(row.id))}`}
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
                No data
              </P>
            </div>
          </div>
        )}
      </ScrollShadow>
    </div>
  )
}

GridBody.displayName = 'GridBody'
