'use client'
import { useTranslations } from 'next-intl'
import { forwardRef, useCallback, useState } from 'react'

import { Button } from '@/components/atoms/common/Button'
import { buttonVariant } from '@/components/atoms/common/Button/Button.style'
import { Combobox } from '@/components/atoms/common/Combobox'
import { ChevronIcon, FilterIcon } from '@/components/atoms/icons'
import { P } from '@/components/atoms/typography/P'
import { Checkbox } from '@/components/molecules/form/CheckboxField/Checkbox'
import { SearchBar } from '@/components/molecules/form/SearchBar'
import { Menu } from '@/components/molecules/popovers/Menu'
import { Tooltip } from '@/components/molecules/popovers/Tooltip'
import { StyleProps } from '@/components/types'
import { FilterDef, SortingDef } from '@/utils/hooks/useFilterData'
import { cn } from '@/utils/utils'

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

export type ColumnHeadProps = StyleProps & {
  /** for passing custom tailwind classes */
  className?: string
  /** DataGrid name for id and aria purposes */
  name: string
  /** grid column definition */
  column: ColumnDef
  /** boolean for all rows selected */
  allSelected?: boolean
  /** current applied sort */
  sorting?: SortingDef
  /** current filter */
  filter?: FilterDef
  /** function for selecting all rows */
  handleAll?: () => void
  /** function for setting sorting */
  handleSorting?: (key: string) => void
  /** function for setting filter options */
  setFilter?: (value: FilterDef) => void
}

/** ColumnHeader component for DataGrid with multiselect, sort and filter. USE CLIENT */
export const ColumnHead = forwardRef<HTMLDivElement, ColumnHeadProps>(
  (
    {
      className,
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
    },
    ref,
  ) => {
    const t = useTranslations('Components')
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const isFilterApplied =
      filter && Object.keys(filter).includes(column.name) && filter[column.name] !== ''
    const ariaSorted = AriaSort[sorting?.key === column.name ? sorting?.value : 'none']
    const isSelected = sorting?.key === column.name || isFilterApplied
    const isInteractive = Boolean(handleSorting || setFilter)

    const getIconState = useCallback(() => {
      if (!sorting) return ''
      switch (sorting[column.name] ? sorting[column.name] : 'default') {
        case 'dec':
          return 'opacity-100 rotate-0'
        case 'asc':
          return 'opacity-100 rotate-180'
        default:
          return closeIconState
      }
    }, [sorting, column.name])

    if (handleAll) {
      return (
        <Button
          className={cn(
            'SelectAll',
            selectCellSize[size],
            allSelected && 'selected',
            isInteractive ? buttonVariant[variant][color] : 'cursor-default',
            'group border-transparent dark:border-transparent',
            className,
          )}
          variant="text"
          color="none"
          size="none"
          role="columnheader"
          hideShadow
          tabIndex={-1}
          aria-sort="none"
          aria-label={t('selectAll')}
          onClick={() => (isInteractive ? handleAll() : {})}
          startIcon={
            <Checkbox
              className={cn('SelectAllCheck', !isInteractive && 'cursor-default opacity-0')}
              name={`${name}All`}
              label=""
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
        className={cn(
          'ColumnHeader',
          'group',
          column.shrink ? 'shrink-1' : 'shrink-0',
          column.grow ? 'grow' : 'grow-0',
          isSelected && 'selected',
          className,
        )}
        style={{ flexBasis: column.width }}
        ref={ref}
        data-testid="ColumnHeader"
      >
        {handleSorting && setFilter && !column.hideSort ? (
          <div className={cn('SubColTitle', 'flex justify-between')}>
            <Button
              className={cn(
                'SubColButton',
                'group w-full rounded-none border-0 pr-0',
                cellOverflow,
              )}
              variant={variant}
              color={color}
              size={size}
              disableUpperCase
              role="columnheader"
              hideShadow
              aria-label={t('sortIn', { field: column.label })}
              aria-sort={ariaSorted}
              tabIndex={-1}
              onClick={() => handleSorting(column.name)}
            >
              <div className="flex w-full justify-start">
                {column.label}
                <ChevronIcon className={cn('transition-dropdown', getIconState())} />
              </div>
            </Button>
            {!column.hideFilter && (
              <Tooltip title={t('filterIn', { field: column.label })} placement="top">
                <Combobox
                  className={cn(
                    'GridFilterCombobox',
                    'border-transparent dark:border-transparent',
                    filterMenuVisibility,
                    !isFilterApplied ? 'opacity-30' : 'selected',
                  )}
                  name={`filter${name}${column.name}`}
                  isOpen={isFilterOpen}
                  hasPopup="menu"
                  startIcon={<FilterIcon />}
                  variant={variant}
                  color={color}
                  size={size}
                  hideShadow
                  aria-label={t('filterIn', { field: column.label })}
                  tabIndex={-1}
                  onClick={() => setIsFilterOpen(prev => !prev)}
                />
                <Menu
                  className={cn('FilterMenu', searchMenuClass)}
                  isOpen={isFilterOpen}
                  name={`filter${name}${column.name}`}
                  color="none"
                  setIsOpen={() => setIsFilterOpen(prev => !prev)}
                  dropdownProps={{ className: 'mt-1' }}
                >
                  <SearchBar
                    className="border border-transparent bg-bg dark:bg-darkBg"
                    name={`searchIn${column.name}`}
                    placeholder={t('searchIn', { field: column.label })}
                    variant={variant}
                    color={color}
                    size={size}
                    onChange={value => setFilter({ ...filter, [column.name]: value })}
                  />
                </Menu>
              </Tooltip>
            )}
          </div>
        ) : (
          <P className={cn('SubColTitle', 'font-semibold', cellSize[size])} size={size}>
            {column.label}
          </P>
        )}
      </div>
    )
  },
)

ColumnHead.displayName = 'ColumnHead'
