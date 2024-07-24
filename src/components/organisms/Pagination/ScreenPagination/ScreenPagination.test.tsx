import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import { getPages, JestMockProvider } from '../../../../../.storybook/helpers'
import ScreenPagination from '.'

describe('ScreenPagination', () => {
  it('default', () => {
    render(
      <JestMockProvider>
        <ScreenPagination
          name="paginationTest"
          pages={getPages(5)}
          selectedPage={1}
          setSelectedPage={() => {}}
          pageSpread={11}
          className="className"
        />
      </JestMockProvider>,
    )
    expect(screen.getByTestId('ScreenPagination')).toBeTruthy()
    expect(screen.getByTestId('ScreenPagination')).toHaveClass('className')
    expect(screen.getAllByRole('button')).toHaveLength(7)
  })

  it('pageSpread', () => {
    render(
      <JestMockProvider>
        <ScreenPagination
          name="paginationTest"
          pages={getPages(20)}
          selectedPage={1}
          setSelectedPage={() => {}}
          pageSpread={11}
          className="className"
        />
      </JestMockProvider>,
    )
    expect(screen.getAllByRole('button')).toHaveLength(12)
  })

  it('pageSpreadMiddle', () => {
    render(
      <JestMockProvider>
        <ScreenPagination
          name="paginationTest"
          pages={getPages(20)}
          selectedPage={10}
          setSelectedPage={() => {}}
          pageSpread={11}
          className="className"
        />
      </JestMockProvider>,
    )
    expect(screen.getAllByRole('button')).toHaveLength(12)
  })

  it('pageSpreadEnd', () => {
    render(
      <JestMockProvider>
        <ScreenPagination
          name="paginationTest"
          pages={getPages(20)}
          selectedPage={20}
          setSelectedPage={() => {}}
          pageSpread={11}
          className="className"
        />
      </JestMockProvider>,
    )
    expect(screen.getAllByRole('button')).toHaveLength(12)
  })

  it('pageSpreadLow', () => {
    render(
      <JestMockProvider>
        <ScreenPagination
          name="paginationTest"
          pages={getPages(20)}
          selectedPage={10}
          setSelectedPage={() => {}}
          pageSpread={7}
          className="className"
        />
      </JestMockProvider>,
    )
    expect(screen.getAllByRole('button')).toHaveLength(8)
  })
})
