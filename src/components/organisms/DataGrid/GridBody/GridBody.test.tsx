import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '../../../../../.jest/customRender'
import { gridColsDef, gridData } from '../../../../../.storybook/helpers'
import { GridBody } from '.'

describe('GridBody', () => {
  it('default', () => {
    render(
      <GridBody
        columns={gridColsDef}
        pagedData={gridData.slice(0, 10)}
        selectedRows={[]}
        multiselect={false}
        handleRowClick={() => {}}
      />,
    )
    expect(screen.getByRole('rowgroup')).toBeInTheDocument()
    expect(screen.getByRole('rowgroup')).toHaveClass('GridBody')
    expect(screen.getAllByRole('row')).toHaveLength(10)
    expect(screen.getAllByRole('gridcell')).toHaveLength(40)
  })

  it('loading', () => {
    render(
      <GridBody
        columns={gridColsDef}
        pagedData={gridData.slice(0, 20)}
        selectedRows={[]}
        multiselect={false}
        rowsPerPage={5}
        isLoading
        handleRowClick={() => {}}
      />,
    )
    expect(screen.getAllByRole('status')).toHaveLength(5)
  })

  it('handleRowClick', () => {
    const spy = jest.fn()
    render(
      <GridBody
        columns={gridColsDef}
        pagedData={gridData.slice(0, 20)}
        selectedRows={[]}
        multiselect={false}
        handleRowClick={spy}
      />,
    )
    fireEvent.click(screen.getAllByRole('button')[0])
    expect(spy).toHaveBeenCalled()
  })
})
