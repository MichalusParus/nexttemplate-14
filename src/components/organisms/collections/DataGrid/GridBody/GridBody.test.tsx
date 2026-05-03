import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'

import { fireEvent, render, screen } from '../../../../../../.jest/customRender'
import { gridData, JestDataGridProvider } from '../../../../../../.storybook/helpers'
import { GridBody } from '.'

expect.extend(toHaveNoViolations)

describe('GridBody', () => {
  const defaultGetRowId = (row: Record<string, unknown>) => row.id as string | number
  const defaultGridTemplateColumns = '1fr 1fr 1fr 1fr 1fr 1fr'
  const emptySelectedRowIds = new Set<string | number>()

  describe('Semantics', () => {
    it('renders rowgroup with rows and gridcells', () => {
      render(
        <JestDataGridProvider>
          <GridBody
            pagedData={gridData.slice(0, 10)}
            selectedRowIds={emptySelectedRowIds}
            getRowId={defaultGetRowId}
            headerDepth={1}
            multiselect={false}
            gridTemplateColumns={defaultGridTemplateColumns}
            handleRowClick={() => {}}
          />
        </JestDataGridProvider>,
      )

      expect(screen.getByRole('rowgroup')).toBeInTheDocument()
      expect(screen.getByRole('rowgroup')).toHaveClass('ContentWrap')
      expect(screen.getAllByRole('row')).toHaveLength(10)
      expect(screen.getAllByRole('gridcell')).toHaveLength(60)
    })

    it('loading renders ghost rows with correct aria-rowindex', () => {
      render(
        <JestDataGridProvider>
          <GridBody
            pagedData={gridData.slice(0, 20)}
            selectedRowIds={emptySelectedRowIds}
            getRowId={defaultGetRowId}
            multiselect={false}
            headerDepth={1}
            gridTemplateColumns={defaultGridTemplateColumns}
            rowsPerPage={5}
            isLoading
            handleRowClick={() => {}}
          />
        </JestDataGridProvider>,
      )
      const rows = screen.getAllByRole('row')

      expect(rows).toHaveLength(5)
      expect(rows[0]).toHaveAttribute('aria-rowindex', '2')
      expect(rows[0]).toHaveAttribute('id', 'loading-2')
      expect(rows[0]).not.toHaveAttribute('aria-selected')
    })

    it('empty state shows no-rows message with gridcell', () => {
      render(
        <JestDataGridProvider>
          <GridBody
            pagedData={[]}
            selectedRowIds={emptySelectedRowIds}
            getRowId={defaultGetRowId}
            headerDepth={1}
            multiselect={false}
            gridTemplateColumns={defaultGridTemplateColumns}
          />
        </JestDataGridProvider>,
      )
      const row = screen.getByRole('row')
      const gridcell = screen.getByRole('gridcell')

      expect(row).toBeInTheDocument()
      expect(row).toHaveAttribute('aria-rowindex', '2')
      expect(gridcell).toHaveAttribute('aria-colindex', '1')
      expect(gridcell).toHaveTextContent(/no/i)
    })
  })

  describe('Interaction', () => {
    it('handleRowClick fires on row inner click', () => {
      const handleRowClick = jest.fn()
      render(
        <JestDataGridProvider>
          <GridBody
            pagedData={gridData.slice(0, 20)}
            selectedRowIds={emptySelectedRowIds}
            getRowId={defaultGetRowId}
            headerDepth={1}
            multiselect={false}
            gridTemplateColumns={defaultGridTemplateColumns}
            handleRowClick={handleRowClick}
          />
        </JestDataGridProvider>,
      )
      const firstRow = screen.getAllByRole('row')[0]
      const rowInner = firstRow.querySelector('.RowInnerWrap')

      fireEvent.click(rowInner!)
      expect(handleRowClick).toHaveBeenCalledWith(gridData[0])
    })
  })

  describe('Ref', () => {
    it('rowgroup is accessible in DOM', () => {
      render(
        <JestDataGridProvider>
          <GridBody
            pagedData={gridData.slice(0, 10)}
            selectedRowIds={emptySelectedRowIds}
            getRowId={defaultGetRowId}
            headerDepth={1}
            multiselect={false}
            gridTemplateColumns={defaultGridTemplateColumns}
          />
        </JestDataGridProvider>,
      )

      expect(screen.getByRole('rowgroup')).toBeInstanceOf(HTMLDivElement)
    })
  })

  describe('Accessibility', () => {
    it('axe', async () => {
      const { container } = render(
        <JestDataGridProvider>
          <div role="grid">
            <GridBody
              pagedData={gridData.slice(0, 10)}
              selectedRowIds={emptySelectedRowIds}
              getRowId={defaultGetRowId}
              headerDepth={1}
              multiselect={false}
              gridTemplateColumns={defaultGridTemplateColumns}
              handleRowClick={() => {}}
            />
          </div>
        </JestDataGridProvider>,
      )

      const results = await axe(container, {
        rules: {
          'aria-required-children': { enabled: false },
          'aria-required-parent': { enabled: false },
        },
      })
      expect(results).toHaveNoViolations()
    })
  })
})
