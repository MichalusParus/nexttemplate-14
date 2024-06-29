import Button from '@/components/atoms/common/Button'
import { buttonVariant } from '@/components/atoms/common/Button/Button.style'
import ChevronIcon from '@/components/atoms/icons/ChevronIcon'
import FilterIcon from '@/components/atoms/icons/FilterIcon'
import P from '@/components/atoms/typography/P'
import Checkbox from '@/components/molecules/form/CheckboxField/Checkbox'
import SearchBar from '@/components/molecules/form/SearchBar'
import Menu from '@/components/molecules/popovers/Menu'
import { FilterDef, SortingDef } from '@/utils/hooks/useFilterData'

import { ColumnDef } from '../types'
import {
  cellOverflow,
  cellSize,
  closeIconState,
  filterMenuVisibility,
  searchMenuClass,
  selectCellSize,
} from './ColumnHead.style'

enum AriaSort {
  asc = 'ascending',
  dec = 'descending',
  none = 'none',
}

type Props = {
  /** for passing custom tailwind classes */
  className?: string
  /** DataGrid name for id and aria purposes */
  name: string
  /** grid column definition */
  column: ColumnDef
  /** style variant of component */
  variant?: 'text' | 'outlined' | 'contained'
  /** theme color of component, none disable styles for custom styling via className */
  color?: 'primary' | 'secondary' | 'none'
  /** size of component, none disable sizes for custom styling via className */
  size?: 'sm' | 'md' | 'lg' | 'none'
  /** boolean for all rows selected */
  allSelected?: boolean
  /** current applied sort */
  sorting: SortingDef
  /** current filter */
  filter: FilterDef
  /** function for selecting all rows */
  handleAll?: () => void
  /** function for setting sorting */
  handleSorting?: (key: string) => void
  /** function for setting filter options */
  setFilter?: (value: FilterDef) => void
}

/** ColumnHeader component for DataGrid with multiselect, sort and filter. */
export const ColumnHead = ({
  className = '',
  name,
  column,
  variant = 'outlined',
  color = 'primary',
  size = 'md',
  allSelected,
  sorting,
  filter,
  handleAll,
  handleSorting,
  setFilter,
}: Props) => {
  const isFilterApplied =
    filter && Object.keys(filter).includes(column.name) && filter[column.name] !== ''
  const ariaSorted = AriaSort[sorting.key === column.name ? sorting.value : 'none']
  const isSelected = sorting.key === column.name || isFilterApplied
  const isSubColumn = Boolean(handleSorting || setFilter)

  const getIconState = () => {
    switch (sorting[column.name] ? sorting[column.name] : 'default') {
      case 'dec':
        return 'opacity-100 rotate-0'
      case 'asc':
        return 'opacity-100 rotate-180'
      default:
        return closeIconState
    }
  }

  if (handleAll) {
    return (
      <Button
        className={`ColumnHeader group [&.ColumnHeader]:border-transparent ${className} ${selectCellSize[size]} ${allSelected ? 'selected' : ''} ${
          isSubColumn ? buttonVariant[variant][color] : '[&.ColumnHeader]:cursor-default'
        }`}
        variant="text"
        color="none"
        size="none"
        role="columnheader"
        disableUpperCase
        hideShadow
        aria-sort="none"
        onClick={() => (isSubColumn ? handleAll() : {})}
        startIcon={
          <Checkbox
            className={!isSubColumn ? 'opacity-0 [&>.FakeInput]:cursor-default' : ''}
            name={`${name}All`}
            label="all"
            value={String(allSelected)}
            variant={variant === 'text' ? 'outlined' : variant}
            color={color}
            size={size}
            isChecked={allSelected || false}
            fake
            onChange={() => {}}
          />
        }
      />
    )
  }

  return (
    <div
      className={`ColumnHeader ${className} group overflow-hidden ${column.width} ${column.shrink ? 'shrink-1' : 'shrink-0'} ${column.grow ? 'grow' : 'grow-0'} ${isSelected ? 'selected' : ''} ${
        isSubColumn && !column.hideSort ? buttonVariant[variant][color] : ''
      }`}
      data-testid="ColumnHeader"
    >
      {handleSorting && setFilter && !column.hideSort ? (
        <div className={'SubColTitle flex justify-between'}>
          <Button
            className={`SubColButton group [&.SubColButton]:pr-0 ${cellOverflow}`}
            variant="text"
            color="none"
            size={size}
            disableUpperCase
            fullWidth
            role="columnheader"
            aria-label={`sort in ${column.label}`}
            aria-sort={ariaSorted}
            tabIndex={-1}
            onClick={() => handleSorting(column.name)}
          >
            <div className="flex w-full justify-start">
              {column.label}
              <ChevronIcon className={`transition-dropdown ${getIconState()}`} />
            </div>
          </Button>
          {!column.hideFilter ? (
            <Menu
              className={`${searchMenuClass} ${filterMenuVisibility} ${isFilterApplied ? 'opacity-100' : 'opacity-0'}`}
              name={`filter${name}${column.name}`}
              icon={<FilterIcon />}
              color="none"
              unlocked
              comboboxProps={{ size: size, tabIndex: -1 }}
            >
              <SearchBar
                name={`searchIn${column.name}`}
                placeholder={`Search in ${column.label}`}
                variant={variant}
                color={color}
                size={size}
                onChange={value => setFilter({ ...filter, [column.name]: value })}
              />
            </Menu>
          ) : null}
        </div>
      ) : (
        <P className={`SubColTitle font-bold ${cellSize[size]}`} size={size}>
          {column.label}
        </P>
      )}
    </div>
  )
}

ColumnHead.displayName = 'ColumnHead'
