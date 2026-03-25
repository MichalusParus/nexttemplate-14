import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'

import { fireEvent, render, screen } from '../../../../../../.jest/customRender'
import { gridData, JestDataGridProvider } from '../../../../../../.storybook/helpers'
import { GridRow } from '.'

expect.extend(toHaveNoViolations)

describe('GridRow', () => {
  const mockRow = gridData[0]
  const defaultGetRowId = (row: Record<string, unknown>) => row.id as string | number
  const defaultGridTemplateColumns = '1fr 1fr 1fr 1fr 1fr 1fr'

  describe('Semantics', () => {
    it('renders row with gridcells and data', () => {
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
      const gridcells = screen.getAllByRole('gridcell')

      expect(row).toBeInTheDocument()
      expect(row).toHaveClass('GridRow')
      expect(row).toHaveAttribute('aria-rowindex', '1')
      expect(row).toHaveAttribute('id', mockRow.id)
      expect(gridcells).toHaveLength(6)
      expect(row).toHaveTextContent(mockRow.name)
    })

    it('className lands on row', () => {
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

      expect(screen.getByRole('row')).toHaveClass('className')
    })

    it('aria-colindex sequential without multiselect', () => {
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

    it('aria-colindex offset by 1 with multiselect', () => {
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

      expect(gridcells).toHaveLength(7)
      expect(gridcells[1]).toHaveAttribute('aria-colindex', '2')
      expect(gridcells[2]).toHaveAttribute('aria-colindex', '3')
    })

    it('multiselect renders checkbox cell', () => {
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

      expect(screen.getByTestId('CheckboxWrap')).toBeInTheDocument()
    })

    it('non-interactive row has no cursor-pointer', () => {
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
      const rowInner = screen.getByRole('row').querySelector('.RowInnerWrap')

      expect(rowInner).not.toHaveClass('cursor-pointer')
    })

    it('interactive row has cursor-pointer', () => {
      render(
        <JestDataGridProvider>
          <GridRow
            row={mockRow}
            getRowId={defaultGetRowId}
            rowIndex={1}
            isSelected={false}
            multiselect={false}
            gridTemplateColumns={defaultGridTemplateColumns}
            handleRowClick={jest.fn()}
          />
        </JestDataGridProvider>,
      )
      const row = screen.getByRole('row')
      const rowInner = row.querySelector('.RowInnerWrap')

      expect(rowInner).toHaveClass('cursor-pointer')
      expect(row).toHaveAttribute('aria-selected', 'false')
    })

    it('selected row has selected class and aria-selected true', () => {
      render(
        <JestDataGridProvider>
          <GridRow
            row={mockRow}
            getRowId={defaultGetRowId}
            rowIndex={1}
            isSelected={true}
            multiselect={true}
            gridTemplateColumns={defaultGridTemplateColumns}
            handleRowClick={jest.fn()}
          />
        </JestDataGridProvider>,
      )
      const row = screen.getByRole('row')
      const rowInner = row.querySelector('.RowInnerWrap')

      expect(rowInner).toHaveClass('selected')
      expect(row).toHaveAttribute('aria-selected', 'true')
      expect(screen.getByTestId('CheckIcon')).toHaveClass('opacity-100')
    })

    it('loading state renders ghost cells', () => {
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

      expect(row).toHaveAttribute('aria-rowindex', '1')
      expect(row).toHaveAttribute('id', 'loading-1')
      expect(screen.getAllByRole('gridcell')).toHaveLength(6)
      expect(row).not.toHaveAttribute('aria-selected')
    })

    it('multiselect without handleRowClick is still interactive', () => {
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

      expect(screen.getByRole('row').querySelector('.RowInnerWrap')).toHaveClass('cursor-pointer')
    })

    it('renderCell outputs custom content', () => {
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

    it('plain text cells wrapped in Ellipsis', () => {
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

      const ellipses = screen.getAllByTestId('Ellipsis')
      expect(ellipses.length).toBeGreaterThan(0)
      expect(ellipses[0]).toHaveTextContent(mockRow.name)
    })

    it('renderCell output not wrapped in Ellipsis', () => {
      type CustomRowType = { id: string; custom: string }
      const customRow: CustomRowType = { id: 'test-1', custom: 'value' }
      const columnsWithRenderCell = [
        {
          name: 'custom',
          label: 'Custom',
          renderCell: (row: unknown) => (
            <span data-testid="custom-cell">{(row as CustomRowType).custom}</span>
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

      expect(screen.getByTestId('custom-cell')).toBeInTheDocument()
      expect(screen.queryByTestId('Ellipsis')).not.toBeInTheDocument()
    })

    it('loading + multiselect has no aria-selected', () => {
      render(
        <JestDataGridProvider>
          <GridRow
            rowIndex={1}
            multiselect={true}
            gridTemplateColumns={defaultGridTemplateColumns}
            isLoading
          />
        </JestDataGridProvider>,
      )

      expect(screen.getByRole('row')).not.toHaveAttribute('aria-selected')
    })
  })

  describe('Interaction', () => {
    it('click fires handleRowClick with row data', () => {
      const handleRowClick = jest.fn()
      render(
        <JestDataGridProvider>
          <GridRow
            row={mockRow}
            getRowId={defaultGetRowId}
            rowIndex={1}
            isSelected={false}
            multiselect={false}
            gridTemplateColumns={defaultGridTemplateColumns}
            handleRowClick={handleRowClick}
          />
        </JestDataGridProvider>,
      )

      fireEvent.click(screen.getByRole('row').querySelector('.RowInnerWrap')!)
      expect(handleRowClick).toHaveBeenCalledWith(mockRow)
    })

    it('loading prevents row click', () => {
      const handleRowClick = jest.fn()
      render(
        <JestDataGridProvider>
          <GridRow
            row={mockRow}
            getRowId={defaultGetRowId}
            rowIndex={1}
            isSelected={false}
            multiselect={false}
            gridTemplateColumns={defaultGridTemplateColumns}
            handleRowClick={handleRowClick}
            isLoading
          />
        </JestDataGridProvider>,
      )
      const row = screen.getByRole('row')
      const rowInner = row.querySelector('.RowInnerWrap')

      // Loading row should not have click handler
      expect(rowInner).not.toHaveClass('cursor-pointer')
    })
  })

  describe('Ref', () => {
    it('row is accessible in DOM', () => {
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

      expect(screen.getByRole('row')).toBeInstanceOf(HTMLDivElement)
    })
  })

  describe('Accessibility', () => {
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
})
