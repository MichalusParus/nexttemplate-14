import '@testing-library/jest-dom'

import { render, screen } from '../../../../../../.jest/customRender'
import { ScreenPagination } from '.'

describe('ScreenPagination', () => {
  it('default', () => {
    render(
      <ScreenPagination
        name="paginationTest"
        count={5}
        selectedPage={1}
        setSelectedPage={() => {}}
        pageSpread={11}
        className="className"
      />,
    )
    expect(screen.getByTestId('ScreenPagination')).toBeInTheDocument()
    expect(screen.getByTestId('ScreenPagination')).toHaveClass('className')
    expect(screen.getAllByRole('button')).toHaveLength(6)
  })

  // it('pageSpread', () => {
  //   render(
  //
  //       <ScreenPagination
  //         name="paginationTest"
  //         count={20}
  //         selectedPage={1}
  //         setSelectedPage={() => {}}
  //         pageSpread={11}
  //         className="className"
  //       />
  //     ,
  //   )
  //   expect(screen.getAllByRole('button')).toHaveLength(12)
  // })

  // it('pageSpreadMiddle', () => {
  //   render(
  //
  //       <ScreenPagination
  //         name="paginationTest"
  //         count={20}
  //         selectedPage={10}
  //         setSelectedPage={() => {}}
  //         pageSpread={11}
  //         className="className"
  //       />
  //     ,
  //   )
  //   expect(screen.getAllByRole('button')).toHaveLength(12)
  // })

  // it('pageSpreadEnd', () => {
  //   render(
  //
  //       <ScreenPagination
  //         name="paginationTest"
  //         count={20}
  //         selectedPage={20}
  //         setSelectedPage={() => {}}
  //         pageSpread={11}
  //         className="className"
  //       />
  //     ,
  //   )
  //   expect(screen.getAllByRole('button')).toHaveLength(12)
  // })

  // it('pageSpreadLow', () => {
  //   render(
  //
  //       <ScreenPagination
  //         name="paginationTest"
  //         count={20}
  //         selectedPage={10}
  //         setSelectedPage={() => {}}
  //         pageSpread={7}
  //         className="className"
  //       />
  //     ,
  //   )
  //   expect(screen.getAllByRole('button')).toHaveLength(8)
  // })
})
