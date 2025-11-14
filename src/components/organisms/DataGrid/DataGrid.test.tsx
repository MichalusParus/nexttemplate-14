import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { fireEvent, render, screen } from '../../../../.jest/customRender'
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
  it('default', () => {
    render(
      <DataGrid
        className="className"
        name="dataGridTest"
        columns={gridCleanColsDef}
        rows={gridData}
      />,
    )
    expect(screen.getByRole('grid')).toBeInTheDocument()
    expect(screen.getByRole('grid')).toHaveClass('className')
    expect(screen.getAllByRole('rowgroup')[0]).toHaveTextContent(
      'NameAgeStatusActiveJoin DateDepartment',
    )
  })

  it('multiselect', () => {
    const spy = jest.fn()
    render(
      <DataGrid
        className="className"
        name="dataGridTest"
        columns={gridColsDef}
        rows={gridData}
        onSelectionChange={spy}
      />,
    )
    expect(screen.getAllByRole('columnheader')).toHaveLength(7)
    const rows = screen.getAllByRole('row')

    const firstDataRow = Array.from(rows).find(row => row.querySelector('.RowInnerWrap'))!
    const rowInner = firstDataRow.querySelector('.RowInnerWrap')!
    fireEvent.click(rowInner)

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy.mock.calls[0][0]).toHaveLength(1)

    fireEvent.click(rowInner)
    expect(spy).toHaveBeenCalledWith([])
  })

  it('export', () => {
    render(<DataGrid name="dataGridTest" columns={gridCleanColsDef} rows={gridData} />)
    const exportButton = screen.getByTestId('GridExportButton')
    expect(exportButton).toBeInTheDocument()
    expect(exportButton).toHaveAttribute('aria-label', 'Export')
  })

  it('selection count display', () => {
    render(
      <DataGrid
        name="dataGridTest"
        columns={gridColsDef}
        rows={gridData}
        onSelectionChange={jest.fn()}
      />,
    )

    expect(screen.queryByTestId('GridSelectionCount')).not.toBeInTheDocument()

    const rows = screen.getAllByRole('row')
    const firstDataRow = Array.from(rows).find(row => row.querySelector('.RowInnerWrap'))!
    const rowInner = firstDataRow.querySelector('.RowInnerWrap')!
    fireEvent.click(rowInner)

    const selectionCount = screen.getByTestId('GridSelectionCount')
    expect(selectionCount).toBeInTheDocument()
    expect(selectionCount).toHaveTextContent(/1 of \d+ selected/)
  })

  it('pagination', () => {
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

  it('row click', () => {
    const spy = jest.fn()
    render(
      <DataGrid
        name="dataGridTest"
        columns={gridCleanColsDef}
        rows={gridData}
        onRowClick={spy}
      />,
    )

    const rows = screen.getAllByRole('row')
    const firstDataRow = Array.from(rows).find(row => row.querySelector('.RowInnerWrap'))!
    const rowInner = firstDataRow.querySelector('.RowInnerWrap')!

    fireEvent.click(rowInner)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(gridData[0])
  })

  it('ref', () => {
    const ref = createRef<HTMLDivElement>()
    render(
      <DataGrid
        ref={ref}
        name="dataGridTest"
        columns={gridCleanColsDef}
        rows={gridData}
      />,
    )

    expect(ref.current).not.toBeNull()
    expect(ref.current?.focus).toBeDefined()

    const focusMock = jest.spyOn(ref.current!, 'focus').mockImplementation(() => {})
    ref.current?.focus()

    expect(focusMock).toHaveBeenCalled()
    focusMock.mockRestore()
  })

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
