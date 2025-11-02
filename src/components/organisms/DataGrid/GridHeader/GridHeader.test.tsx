import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '../../../../../.jest/customRender'
import { gridColsDef } from '../../../../../.storybook/helpers'
import { GridHeader } from '.'

jest.mock('next/navigation', () => {
  const router = {
    push: jest.fn(),
    query: {},
  }
  return {
    useRouter: jest.fn().mockReturnValue(router),
  }
})

describe('GridHeader', () => {
  it('default', () => {
    render(<GridHeader className="className" name="ColumnHeadTest" columns={gridColsDef} />)
    expect(screen.getByRole('rowgroup')).toBeInTheDocument()
    expect(screen.getByRole('rowgroup')).toHaveClass('className')
    expect(screen.getByRole('rowgroup')).toHaveTextContent(
      'Column Head 1Num 2Column Head 3Column Head 4',
    )
  })

  // it('interactive', () => {
  //   const spy = jest.fn()
  //   render(
  //     <GridHeader
  //       className="className"
  //       name="ColumnHeadTest"
  //       columns={gridColsDef}
  //       handleSorting={spy}
  //       setFilter={spy}
  //     />,
  //   )
  //   expect(screen.getByRole('rowgroup')).toBeInTheDocument()
  //   expect(screen.getAllByTestId('MenuWrap')).toHaveLength(4)
  //   fireEvent.click(screen.getAllByRole('button')[0])
  //   expect(screen.getAllByRole('menu')).toHaveLength(1)
  //   expect(screen.getAllByRole('menu')[0]).toHaveAttribute('id', 'filterColumnHeadTestname1')
  //   fireEvent.click(screen.getAllByRole('columnheader')[0])
  //   expect(spy).toHaveBeenCalled()
  // })

  it('handleAll', () => {
    const spy = jest.fn()
    render(
      <GridHeader
        className="className"
        name="ColumnHeadTest"
        columns={gridColsDef}
        handleSorting={() => {}}
        setFilter={() => {}}
        handleAll={spy}
      />,
    )
    expect(screen.getAllByRole('columnheader')).toHaveLength(5)
    fireEvent.click(screen.getAllByRole('columnheader')[0])
    expect(spy).toHaveBeenCalled()
  })
})
