import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'

import { fireEvent, render, screen } from '../../../../../.jest/customRender'
import { gridData, JestDataGridProvider } from '../../../../../.storybook/helpers'
import { GridFooter } from '.'

expect.extend(toHaveNoViolations)

describe('GridFooter', () => {
  it('default', () => {
    render(
      <JestDataGridProvider>
        <GridFooter
          filteredData={gridData.slice(0, 25)}
          selectedRowsPerPage={20}
          pages={[1, 2]}
          selectedPage={1}
          setSelectedPage={() => {}}
          setSelectedRowsPerPage={() => {}}
        />
      </JestDataGridProvider>,
    )
    const rowgroup = screen.getByRole('rowgroup')
    const row = screen.getByRole('row')
    const gridcell = screen.getByRole('gridcell')
    const paginationTestId = screen.getByTestId('MobilePagination')
    const comboboxRole = screen.getByRole('combobox')
    const exportTestId = screen.getByTestId('GridExportButton')

    expect(rowgroup).toBeInTheDocument()
    expect(rowgroup).toHaveClass('GridFooter')
    expect(row).toBeInTheDocument()
    expect(gridcell).toBeInTheDocument()
    expect(gridcell).toHaveAttribute('aria-colspan', '6')
    expect(paginationTestId).toBeInTheDocument()
    expect(comboboxRole).toBeInTheDocument()
    expect(exportTestId).toBeInTheDocument()
  })

  it('rows per page select not rendered', () => {
    render(
      <JestDataGridProvider>
        <GridFooter
          filteredData={gridData.slice(0, 8)}
          selectedRowsPerPage={20}
          pages={[1]}
          selectedPage={1}
          setSelectedPage={() => {}}
          setSelectedRowsPerPage={() => {}}
        />
      </JestDataGridProvider>,
    )

    const comboboxRole = screen.queryByRole('combobox')
    expect(comboboxRole).not.toBeInTheDocument()
  })

  it('export button hidden no data', () => {
    render(
      <JestDataGridProvider>
        <GridFooter
          filteredData={[]}
          selectedRowsPerPage={20}
          pages={[1]}
          selectedPage={1}
          setSelectedPage={() => {}}
          setSelectedRowsPerPage={() => {}}
        />
      </JestDataGridProvider>,
    )

    const exportButtonQuery = screen.queryByTestId('GridExportButton')
    expect(exportButtonQuery).not.toBeInTheDocument()
  })

  it('hideExport', () => {
    render(
      <JestDataGridProvider hideExport>
        <GridFooter
          filteredData={gridData.slice(0, 25)}
          selectedRowsPerPage={20}
          pages={[1, 2]}
          selectedPage={1}
          setSelectedPage={() => {}}
          setSelectedRowsPerPage={() => {}}
        />
      </JestDataGridProvider>,
    )

    const exportButtonQuery = screen.queryByTestId('GridExportButton')
    expect(exportButtonQuery).not.toBeInTheDocument()
  })

  it('selectedRows not displayed when count is zero', () => {
    render(
      <JestDataGridProvider selectedRowsCount={0} filteredDataCount={25}>
        <GridFooter
          filteredData={gridData.slice(0, 25)}
          selectedRowsPerPage={20}
          pages={[1, 2]}
          selectedPage={1}
          setSelectedPage={() => {}}
          setSelectedRowsPerPage={() => {}}
        />
      </JestDataGridProvider>,
    )

    const selectionCount = screen.queryByTestId('GridSelectionCount')
    expect(selectionCount).not.toBeInTheDocument()
  })

  it('selectedRows displays count when rows are selected', () => {
    render(
      <JestDataGridProvider selectedRowsCount={5} filteredDataCount={25}>
        <GridFooter
          filteredData={gridData.slice(0, 25)}
          selectedRowsPerPage={20}
          pages={[1, 2]}
          selectedPage={1}
          setSelectedPage={() => {}}
          setSelectedRowsPerPage={() => {}}
        />
      </JestDataGridProvider>,
    )

    const selectionCount = screen.getByTestId('GridSelectionCount')
    expect(selectionCount).toBeInTheDocument()
    expect(selectionCount).toHaveTextContent(/5/)
    expect(selectionCount).toHaveTextContent(/25/)
  })

  it('setSelectedRowsPerPage', () => {
    const setSelectedPage = jest.fn()
    const setSelectedRowsPerPage = jest.fn()

    render(
      <JestDataGridProvider>
        <GridFooter
          filteredData={gridData.slice(0, 25)}
          selectedRowsPerPage={20}
          pages={[1, 2]}
          selectedPage={1}
          setSelectedPage={setSelectedPage}
          setSelectedRowsPerPage={setSelectedRowsPerPage}
        />
      </JestDataGridProvider>,
    )

    const comboboxRole = screen.getByRole('combobox')
    fireEvent.click(comboboxRole)

    const options = screen.getAllByRole('option')
    fireEvent.click(options[2])

    expect(setSelectedPage).toHaveBeenCalledWith(1)
    expect(setSelectedRowsPerPage).toHaveBeenCalledWith(30)
  })

  it('setSelectedPage', () => {
    const setSelectedPage = jest.fn()

    render(
      <JestDataGridProvider>
        <GridFooter
          filteredData={gridData.slice(0, 50)}
          selectedRowsPerPage={20}
          pages={[1, 2, 3]}
          selectedPage={1}
          setSelectedPage={setSelectedPage}
          setSelectedRowsPerPage={() => {}}
        />
      </JestDataGridProvider>,
    )

    const buttonRoles = screen.getAllByRole('button')
    fireEvent.click(buttonRoles[1])

    expect(setSelectedPage).toHaveBeenCalledWith(2)
  })

  it('axe', async () => {
    const { container } = render(
      <JestDataGridProvider>
        <div role="table">
          <GridFooter
            filteredData={gridData.slice(0, 25)}
            selectedRowsPerPage={20}
            pages={[1, 2]}
            selectedPage={1}
            setSelectedPage={() => {}}
            setSelectedRowsPerPage={() => {}}
          />
        </div>
      </JestDataGridProvider>,
    )

    const results = await axe(container, {
      rules: {
        'button-name': { enabled: false },
        'aria-required-children': { enabled: false },
        'aria-required-parent': { enabled: false },
      },
    })
    expect(results).toHaveNoViolations()
  })
})
