import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { act } from 'react'

import { fireEvent, render, screen } from '../../../../../../../.jest/customRender'
import {
  gridTestCleanColsDef,
  gridTestColsDef,
  JestDataGridProvider,
} from '../../../../../../../.storybook/helpers'
import { ColumnHead } from '.'

expect.extend(toHaveNoViolations)

jest.mock('next/navigation', () => {
  const router = {
    push: jest.fn(),
    query: {},
  }
  return {
    useRouter: jest.fn().mockReturnValue(router),
  }
})

describe('ColumnHead', () => {
  describe('Semantics', () => {
    it('renders columnheader with label', () => {
      render(
        <JestDataGridProvider>
          <ColumnHead column={gridTestColsDef[0]} />
        </JestDataGridProvider>,
      )
      const columnHeader = screen.getByTestId('ColumnHeader')

      expect(columnHeader).toBeInTheDocument()
      expect(columnHeader).toHaveAttribute('role', 'columnheader')
      expect(columnHeader).toHaveTextContent('Name')
      expect(screen.getByTestId('Ellipsis')).toBeInTheDocument()
    })

    it('className lands on columnheader', () => {
      render(
        <JestDataGridProvider>
          <ColumnHead className="className" column={gridTestColsDef[0]} />
        </JestDataGridProvider>,
      )

      expect(screen.getByTestId('ColumnHeader')).toHaveClass('className')
    })

    it('aria-sort none when unsorted', () => {
      render(
        <JestDataGridProvider>
          <ColumnHead column={gridTestColsDef[0]} />
        </JestDataGridProvider>,
      )

      expect(screen.getByTestId('ColumnHeader')).toHaveAttribute('aria-sort', 'none')
    })

    it('aria-sort ascending', () => {
      render(
        <JestDataGridProvider sorting={{ key: 'name', value: 'asc' }}>
          <ColumnHead column={gridTestColsDef[0]} />
        </JestDataGridProvider>,
      )
      const columnHeader = screen.getByTestId('ColumnHeader')
      const chevron = columnHeader.querySelector('svg')

      expect(columnHeader).toHaveAttribute('aria-sort', 'ascending')
      expect(chevron).toHaveClass('opacity-100')
      expect(chevron).toHaveClass('rotate-180')
    })

    it('aria-sort descending', () => {
      render(
        <JestDataGridProvider sorting={{ key: 'name', value: 'desc' }}>
          <ColumnHead column={gridTestColsDef[0]} />
        </JestDataGridProvider>,
      )
      const columnHeader = screen.getByTestId('ColumnHeader')
      const chevron = columnHeader.querySelector('svg')

      expect(columnHeader).toHaveAttribute('aria-sort', 'descending')
      expect(chevron).toHaveClass('opacity-100')
      expect(chevron).toHaveClass('rotate-0')
    })

    it('sort button with aria-label', () => {
      render(
        <JestDataGridProvider>
          <ColumnHead column={gridTestColsDef[0]} />
        </JestDataGridProvider>,
      )
      const sortButton = screen.getByTestId('ColumnHeadSortButton')

      expect(sortButton).toBeInTheDocument()
      expect(sortButton).toHaveAttribute('aria-label', 'sort in Name')
    })

    it('no sort button and no aria-sort when canSort false', () => {
      render(
        <JestDataGridProvider>
          <ColumnHead column={gridTestColsDef[0]} canSort={false} canFilter={false} />
        </JestDataGridProvider>,
      )
      const columnHeader = screen.getByTestId('ColumnHeader')

      expect(screen.queryByTestId('ColumnHeadSortButton')).not.toBeInTheDocument()
      expect(columnHeader.querySelector('svg')).toBeNull()
      expect(columnHeader).not.toHaveAttribute('aria-sort')
    })

    it('no sort button when hideSort in coldef', () => {
      const columnWithHideSort = { ...gridTestColsDef[0], hideSort: true }
      render(
        <JestDataGridProvider>
          <ColumnHead column={columnWithHideSort} />
        </JestDataGridProvider>,
      )

      expect(screen.queryByTestId('ColumnHeadSortButton')).not.toBeInTheDocument()
    })

    it('filter button present when column has filter config', () => {
      render(
        <JestDataGridProvider>
          <ColumnHead column={gridTestColsDef[0]} />
        </JestDataGridProvider>,
      )

      expect(screen.getByTestId('FilterButton')).toBeInTheDocument()
    })

    it('no filter button when column has no filter config', () => {
      render(
        <JestDataGridProvider>
          <ColumnHead column={gridTestCleanColsDef[0]} />
        </JestDataGridProvider>,
      )

      expect(screen.queryByTestId('FilterButton')).not.toBeInTheDocument()
    })

    it('gridColumn and gridRow props set inline styles', () => {
      render(
        <JestDataGridProvider>
          <ColumnHead column={gridTestColsDef[0]} gridColumn="2 / span 3" gridRow="1" />
        </JestDataGridProvider>,
      )
      const columnHeader = screen.getByTestId('ColumnHeader')

      expect(columnHeader).toHaveStyle({ gridColumn: '2 / span 3', gridRow: '1' })
    })

    it('non-leaf column has no tabIndex', () => {
      const parentColumn = { ...gridTestColsDef[0], columns: [gridTestColsDef[1]] }
      render(
        <JestDataGridProvider>
          <ColumnHead column={parentColumn} canSort={false} canFilter={false} />
        </JestDataGridProvider>,
      )
      const columnHeader = screen.getByTestId('ColumnHeader')

      expect(columnHeader).not.toHaveAttribute('tabindex')
    })

    it('leaf column has tabIndex -1', () => {
      render(
        <JestDataGridProvider>
          <ColumnHead column={gridTestColsDef[0]} />
        </JestDataGridProvider>,
      )

      expect(screen.getByTestId('ColumnHeader')).toHaveAttribute('tabindex', '-1')
    })
  })

  describe('Interaction', () => {
    it('sort click calls handleSorting with column name', () => {
      const handleSorting = jest.fn()
      render(
        <JestDataGridProvider handleSorting={handleSorting}>
          <ColumnHead column={gridTestColsDef[0]} />
        </JestDataGridProvider>,
      )

      fireEvent.click(screen.getByLabelText('sort in Name'))
      expect(handleSorting).toHaveBeenCalledWith('name')
    })

    it('filter button opens dropdown', async () => {
      render(
        <JestDataGridProvider>
          <ColumnHead column={gridTestColsDef[0]} canFilter />
        </JestDataGridProvider>,
      )

      expect(screen.queryByTestId('Dropdown')).not.toBeInTheDocument()

      await act(async () => {
        fireEvent.click(screen.getByTestId('FilterButton'))
      })

      expect(screen.getByTestId('Dropdown')).toBeInTheDocument()
    })
  })

  describe('Ref', () => {
    it('columnheader is accessible in DOM', () => {
      render(
        <JestDataGridProvider>
          <ColumnHead column={gridTestColsDef[0]} />
        </JestDataGridProvider>,
      )

      expect(screen.getByTestId('ColumnHeader')).toBeInstanceOf(HTMLDivElement)
    })
  })

  describe('Accessibility', () => {
    it('axe', async () => {
      const { container } = render(
        <JestDataGridProvider>
          <table>
            <thead>
              <tr>
                <th>
                  <ColumnHead column={gridTestColsDef[0]} />
                </th>
              </tr>
            </thead>
          </table>
        </JestDataGridProvider>,
      )

      const results = await axe(container, {
        rules: {
          'button-name': { enabled: false },
          'aria-required-parent': { enabled: false },
        },
      })
      expect(results).toHaveNoViolations()
    })
  })
})
