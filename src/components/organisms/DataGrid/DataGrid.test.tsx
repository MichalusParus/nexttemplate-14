import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'

import {
  gridCleanColsDef,
  gridColsDef,
  gridData,
  JestMockProvider,
} from '../../../../.storybook/helpers'
import { DataGrid } from '.'

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
      <JestMockProvider>
        <DataGrid
          className="className"
          name="dataGridTest"
          columns={gridCleanColsDef}
          rows={gridData}
        />
      </JestMockProvider>,
    )
    expect(screen.getByRole('grid')).toBeTruthy()
    expect(screen.getByRole('grid')).toHaveClass('className')
    expect(screen.getAllByRole('rowgroup')[0]).toHaveTextContent(
      'Column Head 1Num 2Column Head 3Column Head 4',
    )
  })

  it('interactive', () => {
    const spy = jest.fn()
    render(
      <JestMockProvider>
        <DataGrid
          className="className"
          name="dataGridTest"
          columns={gridColsDef}
          rows={gridData}
          onRowClick={spy}
        />
      </JestMockProvider>,
    )
    expect(screen.getAllByRole('rowgroup')[1]).toBeInTheDocument()
    expect(screen.getAllByTestId('MenuWrap')).toHaveLength(4)
    fireEvent.click(screen.getAllByRole('button')[0])
    expect(screen.getAllByRole('search')).toHaveLength(1)
    expect(screen.getAllByRole('menu')[0]).toHaveAttribute('id', 'filterdataGridTestname1')
  })

  it('multiselect', () => {
    const spy = jest.fn()
    render(
      <JestMockProvider>
        <DataGrid
          className="className"
          name="dataGridTest"
          columns={gridColsDef}
          rows={gridData}
          onMultiselectSubmit={spy}
        />
      </JestMockProvider>,
    )
    expect(screen.getAllByRole('columnheader')).toHaveLength(5)
    expect(screen.getAllByTestId('FakeCheckboxWrap')).toHaveLength(26)
    fireEvent.click(screen.getAllByRole('button')[20])
    fireEvent.click(screen.getAllByRole('button')[20])
    fireEvent.click(screen.getByTestId('gridMultiselectSubmit'))
    expect(spy).toHaveBeenCalled()
  })
})
