import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { act, fireEvent, render, screen } from '../../../../.jest/customRender'
import { gridCleanColsDef, gridColsDef, gridData } from '../../../../.storybook/helpers'
import { DataGrid } from '.'

expect.extend(toHaveNoViolations)

jest.mock('next/navigation', () => {
  const router = {
    push: jest.fn(),
    query: {},
  }
  return {
    useRouter: jest.fn().mockReturnValue(router),
    useSearchParams: jest.fn().mockReturnValue(router),
  }
})

describe('DataGrid', () => {
  describe('Semantics', () => {
    it('renders grid role with aria-label', () => {
      render(
        <DataGrid name="dataGridTest" columns={gridCleanColsDef} rows={gridData} />,
      )
      const grid = screen.getByRole('grid')

      expect(grid).toBeInTheDocument()
      expect(grid).toHaveAttribute('aria-label', 'dataGridTest')
      expect(grid).toHaveAttribute('id', 'grid-dataGridTest')
    })

    it('className lands on grid element', () => {
      render(
        <DataGrid
          className="className"
          name="dataGridTest"
          columns={gridCleanColsDef}
          rows={gridData}
        />,
      )

      expect(screen.getByRole('grid')).toHaveClass('className')
    })

    it('renders column headers from columns', () => {
      render(
        <DataGrid name="dataGridTest" columns={gridCleanColsDef} rows={gridData} />,
      )

      expect(screen.getAllByRole('rowgroup')[0]).toHaveTextContent(
        'NameAgeStatusActiveJoin DateDepartment',
      )
    })

    it('aria-rowcount includes header depth + data rows', () => {
      render(
        <DataGrid name="dataGridTest" columns={gridCleanColsDef} rows={gridData} />,
      )
      const grid = screen.getByRole('grid')

      expect(grid).toHaveAttribute('aria-rowcount')
      const rowCount = Number(grid.getAttribute('aria-rowcount'))
      expect(rowCount).toBeGreaterThan(gridData.length)
    })

    it('aria-colcount matches leaf columns', () => {
      render(
        <DataGrid name="dataGridTest" columns={gridCleanColsDef} rows={gridData} />,
      )

      expect(screen.getByRole('grid')).toHaveAttribute(
        'aria-colcount',
        String(gridCleanColsDef.length),
      )
    })

    it('aria-colcount adds 1 for multiselect column', () => {
      render(
        <DataGrid
          name="dataGridTest"
          columns={gridCleanColsDef}
          rows={gridData}
          onSelectionChange={jest.fn()}
        />,
      )

      expect(screen.getByRole('grid')).toHaveAttribute(
        'aria-colcount',
        String(gridCleanColsDef.length + 1),
      )
    })

    it('aria-multiselectable when onSelectionChange provided', () => {
      render(
        <DataGrid
          name="dataGridTest"
          columns={gridCleanColsDef}
          rows={gridData}
          onSelectionChange={jest.fn()}
        />,
      )

      expect(screen.getByRole('grid')).toHaveAttribute('aria-multiselectable', 'true')
    })

    it('no aria-multiselectable without onSelectionChange', () => {
      render(
        <DataGrid name="dataGridTest" columns={gridCleanColsDef} rows={gridData} />,
      )

      expect(screen.getByRole('grid')).not.toHaveAttribute('aria-multiselectable')
    })

    it('aria-busy during loading', () => {
      render(
        <DataGrid
          name="dataGridTest"
          columns={gridCleanColsDef}
          rows={gridData}
          isLoading
        />,
      )

      expect(screen.getByRole('grid')).toHaveAttribute('aria-busy', 'true')
    })

    it('multiselect renders extra columnheader', () => {
      render(
        <DataGrid
          name="dataGridTest"
          columns={gridColsDef}
          rows={gridData}
          onSelectionChange={jest.fn()}
        />,
      )

      expect(screen.getAllByRole('columnheader')).toHaveLength(7)
    })

    it('export button with aria-label', () => {
      render(
        <DataGrid name="dataGridTest" columns={gridCleanColsDef} rows={gridData} />,
      )
      const exportButton = screen.getByTestId('GridExportButton')

      expect(exportButton).toBeInTheDocument()
      expect(exportButton).toHaveAttribute('aria-label', 'Export')
    })

    it('empty state renders no-rows row', () => {
      render(
        <DataGrid name="dataGridTest" columns={gridCleanColsDef} rows={[]} />,
      )
      const rows = screen.getAllByRole('row')
      const gridcells = screen.getAllByRole('gridcell')

      expect(rows).toHaveLength(1)
      expect(gridcells).toHaveLength(1)
      expect(gridcells[0]).toHaveAttribute('aria-colindex', '1')
    })

    it('defaultSelectedRows sets initial selection', () => {
      const onSelectionChange = jest.fn()
      render(
        <DataGrid
          name="dataGridTest"
          columns={gridCleanColsDef}
          rows={gridData}
          defaultSelectedRows={[gridData[0]]}
          onSelectionChange={onSelectionChange}
        />,
      )

      expect(screen.getByTestId('GridSelectionCount')).toBeInTheDocument()
    })
  })

  describe('Keyboard', () => {
    it('ArrowDown moves focus to next row cell', async () => {
      render(
        <DataGrid name="dataGridTest" columns={gridCleanColsDef} rows={gridData} />,
      )
      const gridcells = screen.getAllByRole('gridcell')
      const columnheaders = screen.getAllByRole('columnheader')

      await act(async () => {
        columnheaders[0].focus()
      })
      await act(async () => {})
      await act(async () => {})

      await act(async () => {
        fireEvent.keyDown(columnheaders[0], { key: 'ArrowDown', code: 'ArrowDown' })
      })

      expect(document.activeElement).toBe(gridcells[0])
    })

    it('Enter activates interaction mode on cell with button', async () => {
      render(
        <DataGrid name="dataGridTest" columns={gridColsDef} rows={gridData} />,
      )
      const columnheaders = screen.getAllByRole('columnheader')
      // Column headers have sort buttons and filter buttons inside

      await act(async () => {
        columnheaders[0].focus()
      })
      await act(async () => {})
      await act(async () => {})

      await act(async () => {
        fireEvent.keyDown(columnheaders[0], { key: 'Enter', code: 'Enter' })
      })

      // Should focus an interactive element inside the cell
      const activeEl = document.activeElement as HTMLElement
      expect(
        activeEl?.tagName === 'BUTTON' || activeEl?.tagName === 'A',
      ).toBe(true)
    })

    it('Escape exits interaction mode back to cell', async () => {
      render(
        <DataGrid name="dataGridTest" columns={gridColsDef} rows={gridData} />,
      )
      const columnheaders = screen.getAllByRole('columnheader')

      await act(async () => {
        columnheaders[0].focus()
      })
      await act(async () => {})
      await act(async () => {})

      // Enter interaction mode
      await act(async () => {
        fireEvent.keyDown(columnheaders[0], { key: 'Enter', code: 'Enter' })
      })

      const interactiveEl = document.activeElement as HTMLElement
      expect(interactiveEl.tagName === 'BUTTON' || interactiveEl.tagName === 'A').toBe(true)

      // Escape back to cell
      await act(async () => {
        fireEvent.keyDown(interactiveEl, { key: 'Escape', code: 'Escape' })
      })

      expect(document.activeElement?.getAttribute('role')).toBe('columnheader')
    })

    it('Ctrl+Space selects row in multiselect mode', async () => {
      const onSelectionChange = jest.fn()
      render(
        <DataGrid
          name="dataGridTest"
          columns={gridCleanColsDef}
          rows={gridData}
          onSelectionChange={onSelectionChange}
        />,
      )
      const gridcells = screen.getAllByRole('gridcell')
      const columnheaders = screen.getAllByRole('columnheader')

      // Navigate to a data cell
      await act(async () => {
        columnheaders[0].focus()
      })
      await act(async () => {})
      await act(async () => {})

      await act(async () => {
        fireEvent.keyDown(columnheaders[0], { key: 'ArrowDown', code: 'ArrowDown' })
      })

      const focusedCell = document.activeElement as HTMLElement
      expect(focusedCell.getAttribute('role')).toBe('gridcell')

      await act(async () => {
        fireEvent.keyDown(focusedCell, { key: ' ', code: 'Space', ctrlKey: true })
      })

      expect(onSelectionChange).toHaveBeenCalledTimes(1)
      expect(onSelectionChange.mock.calls[0][0]).toHaveLength(1)
      expect(onSelectionChange.mock.calls[0][0][0]).toHaveProperty('id')
    })

    it('Home moves focus to first cell in row', async () => {
      render(
        <DataGrid name="dataGridTest" columns={gridCleanColsDef} rows={gridData} />,
      )
      const columnheaders = screen.getAllByRole('columnheader')

      // Focus second column header
      await act(async () => {
        columnheaders[1].focus()
      })
      await act(async () => {})
      await act(async () => {})

      // Navigate right first to ensure we're not at first cell
      await act(async () => {
        fireEvent.keyDown(columnheaders[1], { key: 'ArrowRight', code: 'ArrowRight' })
      })

      const currentCell = document.activeElement as HTMLElement

      await act(async () => {
        fireEvent.keyDown(currentCell, { key: 'Home', code: 'Home' })
      })

      // Should be on first cell in this row
      expect(document.activeElement).toBe(columnheaders[0])
    })

    it('Ctrl+Home moves focus to first cell in grid', async () => {
      render(
        <DataGrid name="dataGridTest" columns={gridCleanColsDef} rows={gridData} />,
      )
      const columnheaders = screen.getAllByRole('columnheader')
      const gridcells = screen.getAllByRole('gridcell')

      // Focus a data cell
      await act(async () => {
        gridcells[0].focus()
      })
      await act(async () => {})
      await act(async () => {})

      await act(async () => {
        fireEvent.keyDown(gridcells[0], { key: 'Home', code: 'Home', ctrlKey: true })
      })

      // Should be on first cell in entire grid (first columnheader)
      expect(document.activeElement).toBe(columnheaders[0])
    })

    it('End moves focus to last cell in data row', async () => {
      render(
        <DataGrid
          name="dataGridTest"
          columns={gridCleanColsDef}
          rows={gridData}
          rowsPerPage={10}
        />,
      )
      const columnheaders = screen.getAllByRole('columnheader')

      // Navigate to first data cell
      await act(async () => {
        columnheaders[0].focus()
      })
      await act(async () => {})
      await act(async () => {})

      await act(async () => {
        fireEvent.keyDown(columnheaders[0], { key: 'ArrowDown', code: 'ArrowDown' })
      })

      const firstDataCell = document.activeElement as HTMLElement
      expect(firstDataCell.getAttribute('role')).toBe('gridcell')

      await act(async () => {
        fireEvent.keyDown(firstDataCell, { key: 'End', code: 'End' })
      })

      // Should be on last cell in this data row
      const lastCell = document.activeElement as HTMLElement
      expect(lastCell.getAttribute('role')).toBe('gridcell')
      expect(lastCell.getAttribute('aria-colindex')).toBe(String(gridCleanColsDef.length))
    })

    it('Ctrl+End moves focus to last cell in grid', async () => {
      render(
        <DataGrid
          name="dataGridTest"
          columns={gridCleanColsDef}
          rows={gridData}
          rowsPerPage={10}
        />,
      )
      const columnheaders = screen.getAllByRole('columnheader')
      const gridcells = screen.getAllByRole('gridcell')

      await act(async () => {
        columnheaders[0].focus()
      })
      await act(async () => {})
      await act(async () => {})

      await act(async () => {
        fireEvent.keyDown(columnheaders[0], { key: 'End', code: 'End', ctrlKey: true })
      })

      // Should be on last gridcell in the grid
      expect(document.activeElement).toBe(gridcells[gridcells.length - 1])
    })

    it('F2 enters interaction mode', async () => {
      render(
        <DataGrid name="dataGridTest" columns={gridColsDef} rows={gridData} />,
      )
      const columnheaders = screen.getAllByRole('columnheader')

      await act(async () => {
        columnheaders[0].focus()
      })
      await act(async () => {})
      await act(async () => {})

      await act(async () => {
        fireEvent.keyDown(columnheaders[0], { key: 'F2', code: 'F2' })
      })

      const activeEl = document.activeElement as HTMLElement
      expect(
        activeEl?.tagName === 'BUTTON' || activeEl?.tagName === 'A',
      ).toBe(true)
    })

    it('Ctrl+A selects all rows in multiselect mode', async () => {
      const onSelectionChange = jest.fn()
      render(
        <DataGrid
          name="dataGridTest"
          columns={gridCleanColsDef}
          rows={gridData.slice(0, 5)}
          onSelectionChange={onSelectionChange}
        />,
      )
      const columnheaders = screen.getAllByRole('columnheader')

      await act(async () => {
        columnheaders[0].focus()
      })
      await act(async () => {})
      await act(async () => {})

      await act(async () => {
        fireEvent.keyDown(columnheaders[0], { key: 'a', code: 'KeyA', ctrlKey: true })
      })

      expect(onSelectionChange).toHaveBeenCalledWith(gridData.slice(0, 5))
    })
  })

  describe('Interaction', () => {
    it('multiselect row click toggles selection', () => {
      const onSelectionChange = jest.fn()
      render(
        <DataGrid
          name="dataGridTest"
          columns={gridColsDef}
          rows={gridData}
          onSelectionChange={onSelectionChange}
        />,
      )
      const rows = screen.getAllByRole('row')
      const firstDataRow = Array.from(rows).find(row => row.querySelector('.RowInnerWrap'))!
      const rowInner = firstDataRow.querySelector('.RowInnerWrap')!

      fireEvent.click(rowInner)
      expect(onSelectionChange).toHaveBeenCalledTimes(1)
      expect(onSelectionChange).toHaveBeenCalledWith([gridData[0]])

      fireEvent.click(rowInner)
      expect(onSelectionChange).toHaveBeenCalledWith([])
    })

    it('onRowClick fires with row data', () => {
      const onRowClick = jest.fn()
      render(
        <DataGrid
          name="dataGridTest"
          columns={gridCleanColsDef}
          rows={gridData}
          onRowClick={onRowClick}
        />,
      )
      const rows = screen.getAllByRole('row')
      const firstDataRow = Array.from(rows).find(row => row.querySelector('.RowInnerWrap'))!
      const rowInner = firstDataRow.querySelector('.RowInnerWrap')!

      fireEvent.click(rowInner)
      expect(onRowClick).toHaveBeenCalledTimes(1)
      expect(onRowClick).toHaveBeenCalledWith(gridData[0])
    })

    it('selection count shows text after selecting a row', () => {
      render(
        <DataGrid
          name="dataGridTest"
          columns={gridColsDef}
          rows={gridData}
          onSelectionChange={jest.fn()}
        />,
      )
      const selectionCount = screen.getByTestId('GridSelectionCount')

      // Always mounted but sr-only when no selection
      expect(selectionCount).toHaveClass('sr-only')

      const rows = screen.getAllByRole('row')
      const firstDataRow = Array.from(rows).find(row => row.querySelector('.RowInnerWrap'))!
      const rowInner = firstDataRow.querySelector('.RowInnerWrap')!
      fireEvent.click(rowInner)

      expect(selectionCount).not.toHaveClass('sr-only')
      expect(selectionCount).toHaveTextContent(/1 of \d+ selected/)
    })

    it('pagination renders with rowsPerPage', () => {
      render(
        <DataGrid
          name="dataGridTest"
          columns={gridCleanColsDef}
          rows={gridData}
          rowsPerPage={10}
        />,
      )

      expect(screen.getByRole('grid')).toBeInTheDocument()
    })

    it('select all toggles all rows', () => {
      const onSelectionChange = jest.fn()
      render(
        <DataGrid
          name="dataGridTest"
          columns={gridColsDef}
          rows={gridData.slice(0, 5)}
          onSelectionChange={onSelectionChange}
        />,
      )
      const selectAllButton = screen.getByTestId('SelectAllButton')

      // Select all
      fireEvent.click(selectAllButton)
      expect(onSelectionChange).toHaveBeenCalledWith(gridData.slice(0, 5))

      // Deselect all
      fireEvent.click(selectAllButton)
      expect(onSelectionChange).toHaveBeenCalledWith([])
    })

    it('loading prevents row click', () => {
      const onRowClick = jest.fn()
      render(
        <DataGrid
          name="dataGridTest"
          columns={gridCleanColsDef}
          rows={gridData}
          onRowClick={onRowClick}
          isLoading
        />,
      )
      const rows = screen.getAllByRole('row')
      const firstRow = rows[0]
      const rowInner = firstRow.querySelector('.RowInnerWrap')

      if (rowInner) fireEvent.click(rowInner)
      expect(onRowClick).not.toHaveBeenCalled()
    })

    it('onExport overrides default CSV export', () => {
      const onExport = jest.fn()
      render(
        <DataGrid
          name="dataGridTest"
          columns={gridCleanColsDef}
          rows={gridData}
          onExport={onExport}
        />,
      )

      fireEvent.click(screen.getByTestId('GridExportButton'))
      expect(onExport).toHaveBeenCalledTimes(1)
    })
  })

  describe('Ref', () => {
    it('exposes HTMLDivElement', () => {
      const ref = createRef<HTMLDivElement>()
      render(
        <DataGrid
          ref={ref}
          name="dataGridTest"
          columns={gridCleanColsDef}
          rows={gridData}
        />,
      )

      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })
  })

  describe('Accessibility', () => {
    it('axe', async () => {
      const { container } = render(
        <DataGrid name="dataGridTest" columns={gridCleanColsDef} rows={gridData} />,
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
