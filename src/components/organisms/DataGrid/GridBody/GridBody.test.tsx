import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'

import { gridColsDef, gridData,JestMockProvider } from '../../../../../.storybook/helpers'
import GridBody from '.'

describe('GridBody', () => {
  it('default', () => {
    render(
      <JestMockProvider>
        <GridBody
          columns={gridColsDef}
          pagedData={gridData.slice(0, 10)}
          selectedRows={[]}
          multiselect={false}
          handleRowClick={() => {}}
        />
      </JestMockProvider>,
    )
    expect(screen.getByRole('rowgroup')).toBeTruthy()
    expect(screen.getByRole('rowgroup')).toHaveClass('GridBody')
    expect(screen.getAllByRole('row')).toHaveLength(10)
    expect(screen.getAllByRole('gridcell')).toHaveLength(40)
  })

  it('loading', () => {
    render(
      <JestMockProvider>
        <GridBody
          columns={gridColsDef}
          pagedData={gridData.slice(0, 20)}
          selectedRows={[]}
          multiselect={false}
          rowsPerPage={5}
          isLoading
          handleRowClick={() => {}}
        />
      </JestMockProvider>,
    )
    expect(screen.getAllByRole('status')).toHaveLength(5)
  })

  it('handleRowClick', () => {
    const spy = jest.fn()
    render(
      <JestMockProvider>
        <GridBody
          columns={gridColsDef}
          pagedData={gridData.slice(0, 20)}
          selectedRows={[]}
          multiselect={false}
          handleRowClick={spy}
        />
      </JestMockProvider>,
    )
    fireEvent.click(screen.getAllByRole('button')[0])
    expect(spy).toHaveBeenCalled()
  })
})
