import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'

import { fireEvent, render, screen } from '../../../../../../.jest/customRender'
import { gridData, JestDataGridProvider } from '../../../../../../.storybook/helpers'
import { GridRow } from '.'

expect.extend(toHaveNoViolations)

describe('GridRow', () => {
  const mockRow = gridData[0]
  const mockHandleRowClick = jest.fn()
  const defaultGetRowId = (row: Record<string, unknown>) => row.id as string | number
  const defaultGridTemplateColumns = '1fr 1fr 1fr 1fr 1fr 1fr'

  beforeEach(() => {
    mockHandleRowClick.mockClear()
  })

  it('default', () => {
    render(
      <JestDataGridProvider>
        <GridRow
          className="className"
          row={mockRow}
          getRowId={defaultGetRowId}
          rowIndex={1}
          isSelected={false}
          multiselect={false}
          gridTemplateColumns={defaultGridTemplateColumns}
        />
      </JestDataGridProvider>,
    )

    const row = screen.getByRole('row')
    const gridcells = screen.getAllByRole('gridcell')

    expect(row).toBeInTheDocument()
    expect(row).toHaveClass('className')
    expect(row).toHaveClass('GridRow')
    expect(row).toHaveAttribute('aria-rowindex', '1')
    expect(row).toHaveAttribute('id', mockRow.id)
    expect(gridcells).toHaveLength(6)
    expect(row).toHaveTextContent(mockRow.name)
  })

  it('not interactive without handlers', () => {
    render(
      <JestDataGridProvider>
        <GridRow
          row={mockRow}
          getRowId={defaultGetRowId}
          rowIndex={1}
          isSelected={false}
          multiselect={false}
          gridTemplateColumns={defaultGridTemplateColumns}
        />
      </JestDataGridProvider>,
    )

    const row = screen.getByRole('row')
    const rowInner = row.querySelector('.RowInnerWrap')

    expect(rowInner).toBeInTheDocument()
    expect(rowInner).not.toHaveClass('cursor-pointer')
    expect(row).toBeInTheDocument()
  })

  it('interactive with handleRowClick', () => {
    render(
      <JestDataGridProvider>
        <GridRow
          row={mockRow}
          getRowId={defaultGetRowId}
          rowIndex={1}
          isSelected={false}
          multiselect={false}
          gridTemplateColumns={defaultGridTemplateColumns}
          handleRowClick={mockHandleRowClick}
        />
      </JestDataGridProvider>,
    )

    const row = screen.getByRole('row')
    const rowInner = row.querySelector('.RowInnerWrap')

    expect(rowInner).toBeInTheDocument()
    expect(rowInner).toHaveClass('cursor-pointer')
    expect(row).toHaveAttribute('aria-selected', 'false')

    fireEvent.click(rowInner!)
    expect(mockHandleRowClick).toHaveBeenCalledWith(mockRow)
  })

  it('multiselect with checkbox', () => {
    render(
      <JestDataGridProvider>
        <GridRow
          row={mockRow}
          getRowId={defaultGetRowId}
          rowIndex={1}
          isSelected={false}
          multiselect={true}
          gridTemplateColumns={defaultGridTemplateColumns}
        />
      </JestDataGridProvider>,
    )

    const gridcells = screen.getAllByRole('gridcell')
    const checkboxWrap = screen.getByTestId('CheckboxWrap')

    expect(gridcells).toHaveLength(7)
    expect(checkboxWrap).toBeInTheDocument()
  })

  it('selected row', () => {
    render(
      <JestDataGridProvider>
        <GridRow
          row={mockRow}
          getRowId={defaultGetRowId}
          rowIndex={1}
          isSelected={true}
          multiselect={true}
          gridTemplateColumns={defaultGridTemplateColumns}
          handleRowClick={mockHandleRowClick}
        />
      </JestDataGridProvider>,
    )

    const row = screen.getByRole('row')
    const rowInner = row.querySelector('.RowInnerWrap')
    const checkboxInputWrap = screen.getByTestId('CheckboxInputWrap')
    const checkIcon = screen.getByTestId('CheckIcon')

    expect(rowInner).toHaveClass('selected')
    expect(row).toHaveAttribute('aria-selected', 'true')
    expect(checkboxInputWrap).toHaveClass('selected')
    expect(checkIcon).toHaveClass('opacity-100')
  })

  it('multiselect is interactive', () => {
    render(
      <JestDataGridProvider>
        <GridRow
          row={mockRow}
          getRowId={defaultGetRowId}
          rowIndex={1}
          isSelected={false}
          multiselect={true}
          gridTemplateColumns={defaultGridTemplateColumns}
        />
      </JestDataGridProvider>,
    )

    const row = screen.getByRole('row')
    const rowInner = row.querySelector('.RowInnerWrap')
    expect(rowInner).toBeInTheDocument()
    expect(rowInner).toHaveClass('cursor-pointer')
  })

  it('aria-colindex', () => {
    render(
      <JestDataGridProvider>
        <GridRow
          row={mockRow}
          getRowId={defaultGetRowId}
          rowIndex={1}
          isSelected={false}
          multiselect={false}
          gridTemplateColumns={defaultGridTemplateColumns}
        />
      </JestDataGridProvider>,
    )

    const gridcells = screen.getAllByRole('gridcell')
    expect(gridcells[0]).toHaveAttribute('aria-colindex', '1')
    expect(gridcells[1]).toHaveAttribute('aria-colindex', '2')
  })

  it('aria-colindex with multiselect', () => {
    render(
      <JestDataGridProvider>
        <GridRow
          row={mockRow}
          getRowId={defaultGetRowId}
          rowIndex={1}
          isSelected={false}
          multiselect={true}
          gridTemplateColumns={defaultGridTemplateColumns}
        />
      </JestDataGridProvider>,
    )

    const gridcells = screen.getAllByRole('gridcell')
    const dataCells = gridcells.slice(1)
    expect(dataCells[0]).toHaveAttribute('aria-colindex', '2')
    expect(dataCells[1]).toHaveAttribute('aria-colindex', '3')
  })

  it('renderCell', () => {
    type CustomRowType = { id: string; name: string; age: number }
    const customRow: CustomRowType = { id: 'test-1', name: 'Test User', age: 25 }
    const columnsWithRenderCell = [
      { name: 'name', label: 'Name' },
      {
        name: 'age',
        label: 'Age',
        renderCell: (row: unknown) => (
          <span data-testid="custom-age">Age: {(row as CustomRowType).age}</span>
        ),
      },
    ]

    render(
      <JestDataGridProvider columnsInRow={columnsWithRenderCell}>
        <GridRow
          row={customRow}
          getRowId={defaultGetRowId}
          rowIndex={1}
          isSelected={false}
          multiselect={false}
          gridTemplateColumns={defaultGridTemplateColumns}
        />
      </JestDataGridProvider>,
    )

    const customCell = screen.getByTestId('custom-age')
    expect(customCell).toBeInTheDocument()
    expect(customCell).toHaveTextContent('Age: 25')
  })

  it('loading state', () => {
    render(
      <JestDataGridProvider>
        <GridRow
          rowIndex={1}
          multiselect={false}
          gridTemplateColumns={defaultGridTemplateColumns}
          isLoading
        />
      </JestDataGridProvider>,
    )

    const row = screen.getByRole('row')
    const gridcells = screen.getAllByRole('gridcell')

    expect(row).toBeInTheDocument()
    expect(row).toHaveAttribute('aria-rowindex', '1')
    expect(row).toHaveAttribute('id', 'loading-1')
    expect(gridcells).toHaveLength(6)
    expect(row).not.toHaveAttribute('aria-selected')
  })

  it('axe', async () => {
    const { container } = render(
      <JestDataGridProvider>
        <div role="table">
          <div role="rowgroup">
            <GridRow
              row={mockRow}
              getRowId={defaultGetRowId}
              rowIndex={1}
              isSelected={false}
              multiselect={false}
              gridTemplateColumns={defaultGridTemplateColumns}
            />
          </div>
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
