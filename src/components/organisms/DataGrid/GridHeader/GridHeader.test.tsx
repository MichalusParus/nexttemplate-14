import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'

import { gridColsDef,JestMockProvider } from '../../../../../.storybook/helpers'
import GridHeader from '.'

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
    render(
      <JestMockProvider>
        <GridHeader className="className" name="ColumnHeadTest" columns={gridColsDef} />,
      </JestMockProvider>,
    )
    expect(screen.getByRole('rowgroup')).toBeTruthy()
    expect(screen.getByRole('rowgroup')).toHaveClass('className')
    expect(screen.getByRole('rowgroup')).toHaveTextContent(
      'Column Head 1Num 2Column Head 3Column Head 4',
    )
  })

  it('interactive', () => {
    const spy = jest.fn()
    render(
      <JestMockProvider>
        <GridHeader
          className="className"
          name="ColumnHeadTest"
          columns={gridColsDef}
          handleSorting={spy}
          setFilter={spy}
        />
      </JestMockProvider>,
    )
    expect(screen.getByRole('rowgroup')).toBeInTheDocument()
    expect(screen.getAllByTestId('MenuWrap')).toHaveLength(4)
    fireEvent.click(screen.getAllByRole('combobox')[0])
    expect(screen.getAllByRole('search')).toHaveLength(1)
    expect(screen.getAllByRole('menu')[0]).toHaveAttribute('id', 'filterColumnHeadTestname1')
    fireEvent.change(screen.getAllByRole('searchbox')[0], {
      target: {
        value: 'newvalue',
      },
    })
    expect(spy).toHaveBeenCalledWith({ name1: 'newvalue' })
    fireEvent.click(screen.getAllByRole('columnheader')[0])
    expect(spy).toHaveBeenCalled()
  })

  it('handleAll', () => {
    const spy = jest.fn()
    render(
      <JestMockProvider>
        <GridHeader
          className="className"
          name="ColumnHeadTest"
          columns={gridColsDef}
          handleSorting={() => {}}
          setFilter={() => {}}
          handleAll={spy}
        />
      </JestMockProvider>,
    )
    expect(screen.getAllByRole('columnheader')).toHaveLength(5)
    expect(screen.getByTestId('FakeCheckboxWrap')).toBeInTheDocument()
    fireEvent.click(screen.getAllByRole('columnheader')[0])
    expect(spy).toHaveBeenCalled()
  })
})
