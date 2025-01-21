'use client'
import { useTranslations } from 'next-intl'
import { forwardRef, KeyboardEvent, MouseEvent, useCallback, useState } from 'react'

import { buttonContentSize, buttonVariant } from '@/components/atoms/common/Button/Button.style'
import { ChevronIcon, FilterIcon } from '@/components/atoms/icons'
import { Span } from '@/components/atoms/typography/Span'
import { SearchInput } from '@/components/molecules/form/inputs/SearchField/SearchInput'
import { Menu } from '@/components/molecules/popovers/Menu'
import { Tooltip } from '@/components/molecules/popovers/Tooltip'
import { StyleProps } from '@/components/types'
import { FilterDef, SortingDef } from '@/utils/hooks/useFilterData'
import { cn } from '@/utils/utils'

import { ColumnDef } from '../../types'
import {
  cellOverflow,
  closeIconState,
  filterMenuVisibility,
  searchMenuClass,
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
  /** current applied sort */
  sorting?: SortingDef
  /** current filter */
  filter?: FilterDef
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
      sorting,
      filter,
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

    const handleOpenFilter = (e: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>) => {
      e.stopPropagation()
      setIsFilterOpen(prev => !prev)
    }

    return (
      <div
        className={cn(
          'ColumnHeader',
          'group flex items-center justify-between transition-colors focus:outline-none',
          column.shrink ? 'shrink-1' : 'shrink-0',
          column.grow ? 'grow' : 'grow-0',
          isInteractive && 'cursor-pointer',
          isInteractive && buttonVariant[variant][color],
          className,
        )}
        style={{ flexBasis: column.width }}
        role="columnheader"
        aria-label={t('sortIn', { field: column.label })}
        aria-sort={ariaSorted}
        ref={ref}
        tabIndex={0}
        data-testid="ColumnHeader"
        onClick={() => handleSorting?.(column.name)}
        onKeyDown={e =>
          e.code === 'Enter' || e.code === 'Space' ? handleSorting?.(column.name) : null
        }
      >
        <div
          className={cn(
            'flex w-full items-center justify-start whitespace-nowrap',
            buttonContentSize[size],
          )}
        >
          <Span className={cellOverflow}>{column.label}</Span>
          {!column.hideSort && handleSorting && (
            <ChevronIcon className={cn('shrink-0 transition-transform', getIconState())} />
          )}
        </div>
        {!column.hideFilter && setFilter && (
          <>
            <Tooltip
              title={t('filterIn', { field: column.label })}
              placement="top"
              offset={[0, 15]}
            >
              <div
                className={cn(
                  'GridFilterButton',
                  'relative border-transparent focus:outline-none dark:border-transparent',
                  filterMenuVisibility,
                  isFilterApplied &&
                    'opacity-100 group-hover:opacity-100 group-focus-visible:opacity-100',
                  buttonVariant[variant][color],
                  buttonContentSize[size],
                  isFilterOpen && 'z-combobox',
                )}
                role="button"
                aria-label={t('filterIn', { field: column.label })}
                aria-expanded={isFilterOpen}
                aria-haspopup="menu"
                aria-controls={`filter${name}${column.name}`}
                aria-owns={`filter${name}${column.name}`}
                tabIndex={0}
                onClick={e => handleOpenFilter(e)}
                onKeyDown={e =>
                  e.code === 'Enter' || e.code === 'Space' ? handleOpenFilter(e) : null
                }
                data-testid="GridFilterButton"
              >
                <FilterIcon />
              </div>
            </Tooltip>
            <Menu
              className={cn('FilterMenu', searchMenuClass)}
              isOpen={isFilterOpen}
              name={`filter${name}${column.name}`}
              variant={variant}
              color={color}
              width="min-w-max"
              placement="bottom-end"
              dropdownProps={{ className: 'mt-1', modal: true, offset: [0, 28] }}
              setIsOpen={() => setIsFilterOpen(prev => !prev)}
            >
              <SearchInput
                className="border-transparent"
                name={`searchIn${column.name}`}
                variant={variant}
                color={color}
                size={size}
                placeholder={t('searchIn', { field: column.label })}
                onClick={e => e.stopPropagation()}
                onChange={value => {
                  setFilter?.({ ...filter, [column.name]: String(value) })
                }}
              />
            </Menu>
          </>
        )}
      </div>
    )
  },
)

ColumnHead.displayName = 'ColumnHead'
