import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { act } from 'react'

import { fireEvent, render, screen } from '../../../../../../.jest/customRender'
import {
  gridCleanColsDef,
  gridColsDef,
  JestDataGridProvider,
} from '../../../../../../.storybook/helpers'
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
  it('default', () => {
    render(
      <JestDataGridProvider>
        <ColumnHead className="className" column={gridColsDef[0]} />
      </JestDataGridProvider>,
    )
    const columnHeader = screen.getByTestId('ColumnHeader')
    const ellipsis = screen.getByTestId('Ellipsis')
    const sortButton = columnHeader.querySelector('button')
    const filterButton = screen.getByTestId('MenuButton')

    expect(columnHeader).toBeInTheDocument()
    expect(columnHeader).toHaveClass('className')
    expect(columnHeader).toHaveTextContent('Name')
    expect(columnHeader).toHaveAttribute('role', 'columnheader')
    expect(columnHeader).toHaveAttribute('aria-sort', 'none')
    expect(ellipsis).toBeInTheDocument()
    expect(sortButton).toBeInTheDocument()
    expect(sortButton).toHaveAttribute('aria-label', 'sort in Name')
    expect(filterButton).toBeInTheDocument()
  })

  it('parent col no sort no filter', () => {
    render(
      <JestDataGridProvider>
        <ColumnHead column={gridColsDef[0]} canSort={false} canFilter={false} />
      </JestDataGridProvider>,
    )

    const columnHeader = screen.getByTestId('ColumnHeader')
    const chevron = columnHeader.querySelector('svg')
    const sortButtonTestId = screen.queryByTestId('ColumnHeadSortButton')
    const filterButton = screen.queryByTestId('MenuButton')

    expect(filterButton).not.toBeInTheDocument()
    expect(sortButtonTestId).toBeNull()
    expect(chevron).toBeNull()
    expect(columnHeader).toHaveAttribute('aria-sort', 'none')
  })

  it('coldef hideSort', () => {
    const columnWithHideSort = { ...gridColsDef[0], hideSort: true }
    render(
      <JestDataGridProvider>
        <ColumnHead column={columnWithHideSort} />
      </JestDataGridProvider>,
    )
    const columnHeader = screen.getByTestId('ColumnHeader')
    const sortButtonTestId = screen.queryByTestId('ColumnHeadSortButton')

    expect(sortButtonTestId).toBeNull()
    expect(columnHeader).toHaveAttribute('aria-sort', 'none')
  })

  it('asc', () => {
    render(
      <JestDataGridProvider sorting={{ key: 'name', value: 'asc' }}>
        <ColumnHead column={gridColsDef[0]} />
      </JestDataGridProvider>,
    )
    const columnHeader = screen.getByTestId('ColumnHeader')
    const chevron = columnHeader.querySelector('svg')

    expect(columnHeader).toHaveAttribute('aria-sort', 'ascending')
    expect(chevron).toHaveClass('opacity-100')
    expect(chevron).toHaveClass('rotate-180')
  })

  it('desc', () => {
    render(
      <JestDataGridProvider sorting={{ key: 'name', value: 'desc' }}>
        <ColumnHead column={gridColsDef[0]} />
      </JestDataGridProvider>,
    )
    const columnHeader = screen.getByTestId('ColumnHeader')
    const chevron = columnHeader.querySelector('svg')

    expect(columnHeader).toHaveAttribute('aria-sort', 'descending')
    expect(chevron).toHaveClass('opacity-100')
    expect(chevron).toHaveClass('rotate-0')
  })

  it('sort click', () => {
    const spy = jest.fn()
    render(
      <JestDataGridProvider handleSorting={spy}>
        <ColumnHead column={gridColsDef[0]} />
      </JestDataGridProvider>,
    )
    const sortButton = screen.getByLabelText('sort in Name')

    fireEvent.click(sortButton)

    expect(spy).toHaveBeenCalledWith('name')
  })

  it('coldef no filter', () => {
    render(
      <JestDataGridProvider>
        <ColumnHead column={gridCleanColsDef[0]} />
      </JestDataGridProvider>,
    )
    const filterButton = screen.queryByTestId('MenuButton')

    expect(filterButton).not.toBeInTheDocument()
  })

  it('open filter', async () => {
    render(
      <JestDataGridProvider>
        <ColumnHead column={gridColsDef[0]} canFilter />
      </JestDataGridProvider>,
    )
    const filterButton = screen.getByTestId('MenuButton')

    expect(screen.queryByRole('menu')).not.toBeInTheDocument()

    await act(async () => {
      fireEvent.click(filterButton)
    })

    expect(screen.getByRole('menu')).toBeInTheDocument()
  })

  it('axe', async () => {
    const { container } = render(
      <JestDataGridProvider>
        <table>
          <thead>
            <tr>
              <th>
                <ColumnHead column={gridColsDef[0]} />
              </th>
            </tr>
          </thead>
        </table>
      </JestDataGridProvider>,
    )

    const results = await axe(container, {
      rules: {
        'button-name': { enabled: false },
        'aria-required-parent': { enabled: false }, // ColumnHead is used within DataGrid which provides proper table structure
      },
    })
    expect(results).toHaveNoViolations()
  })
})
