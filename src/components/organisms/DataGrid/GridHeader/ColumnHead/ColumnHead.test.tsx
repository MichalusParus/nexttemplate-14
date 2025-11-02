import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '../../../../../../.jest/customRender'
import { gridColsDef } from '../../../../../../.storybook/helpers'
import { ColumnHead } from '.'

jest.mock('next/navigation', () => {
  const router = {
    push: jest.fn(),
    query: {},
  }
  return {
    useRouter: jest.fn().mockReturnValue(router),
  }
})

describe('ColumnHead', () => {
  it('default', () => {
    render(<ColumnHead className="className" name="ColumnHeadTest" column={gridColsDef[0]} />)
    expect(screen.getByTestId('ColumnHeader')).toBeInTheDocument()
    expect(screen.getByTestId('ColumnHeader')).toHaveClass('className')
    expect(screen.getByTestId('ColumnHeader')).toHaveTextContent('Column Head 1')
  })

  // it('interactive', () => {
  //   const spy = jest.fn()
  //   render(
  //     <ColumnHead
  //       className="className"
  //       name="ColumnHeadTest"
  //       column={gridColsDef[0]}
  //       handleSorting={spy}
  //       setFilter={spy}
  //     />,
  //   )
  //   expect(screen.getByRole('columnheader')).toBeInTheDocument()
  //   expect(screen.getByTestId('MenuWrap')).toBeInTheDocument()
  //   fireEvent.click(screen.getByTestId('GridFilterButton'))
  //   expect(screen.getByRole('menu')).toBeInTheDocument()
  //   expect(screen.getByRole('menu')).toHaveAttribute('id', 'filterColumnHeadTestname1')
  //   fireEvent.click(screen.getByRole('columnheader'))
  //   expect(spy).toHaveBeenCalled()
  // })
})
