import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'

import { fireEvent, render, screen } from '../../../../../.jest/customRender'
import { gridData, JestDataGridProvider } from '../../../../../.storybook/helpers'
import { GridFooter } from '.'

expect.extend(toHaveNoViolations)

describe('GridFooter', () => {
  describe('Semantics', () => {
    it('renders toolbar with pagination, rows-per-page select, and export', () => {
      render(
        <JestDataGridProvider filteredDataCount={25}>
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
      const toolbar = screen.getByRole('toolbar')

      expect(toolbar).toBeInTheDocument()
      expect(toolbar).toHaveClass('GridFooter')
      expect(toolbar).toHaveAttribute('aria-label', 'Grid controls')
      expect(screen.getByTestId('MobilePagination')).toBeInTheDocument()
      expect(screen.getByRole('combobox')).toBeInTheDocument()
      expect(screen.getByTestId('GridExportButton')).toBeInTheDocument()
    })

    it('rows-per-page select hidden when data below threshold', () => {
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

      expect(screen.queryByRole('combobox')).not.toBeInTheDocument()
    })

    it('export button hidden when no data', () => {
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

      expect(screen.queryByTestId('GridExportButton')).not.toBeInTheDocument()
    })

    it('export button hidden when hideExport', () => {
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

      expect(screen.queryByTestId('GridExportButton')).not.toBeInTheDocument()
    })

    it('selection count sr-only when zero', () => {
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
      const selectionCount = screen.getByTestId('GridSelectionCount')

      expect(selectionCount).toBeInTheDocument()
      expect(selectionCount).toHaveClass('sr-only')
      expect(selectionCount).toHaveTextContent('')
    })

    it('selection count displays when rows selected', () => {
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

    it('selection count has aria-live and aria-atomic', () => {
      render(
        <JestDataGridProvider selectedRowsCount={3} filteredDataCount={25}>
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

      expect(selectionCount).toHaveAttribute('aria-live', 'polite')
      expect(selectionCount).toHaveAttribute('aria-atomic', 'true')
    })
  })

  describe('Interaction', () => {
    it('rows-per-page change resets page to 1', () => {
      const setSelectedPage = jest.fn()
      const setSelectedRowsPerPage = jest.fn()

      render(
        <JestDataGridProvider filteredDataCount={25}>
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

      fireEvent.click(screen.getByRole('combobox'))
      fireEvent.click(screen.getAllByRole('option')[2])

      expect(setSelectedPage).toHaveBeenCalledWith(1)
      expect(setSelectedRowsPerPage).toHaveBeenCalledWith(30)
    })

    it('pagination page change fires setSelectedPage', () => {
      const setSelectedPage = jest.fn()

      render(
        <JestDataGridProvider filteredDataCount={50}>
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

      const buttons = screen.getAllByRole('button')
      fireEvent.click(buttons[1])

      expect(setSelectedPage).toHaveBeenCalledWith(2)
    })

    it('onExport overrides default export', () => {
      const onExport = jest.fn()
      render(
        <JestDataGridProvider filteredDataCount={25} onExport={onExport}>
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

      fireEvent.click(screen.getByTestId('GridExportButton'))
      expect(onExport).toHaveBeenCalledTimes(1)
    })
  })

  describe('Ref', () => {
    it('toolbar is accessible in DOM', () => {
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

      expect(screen.getByRole('toolbar')).toBeInstanceOf(HTMLDivElement)
    })
  })

  describe('Accessibility', () => {
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
})
