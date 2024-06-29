import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import ScreenPagination from '.'

describe('ScreenPagination', () => {
  it('default', () => {
    render(
      <ScreenPagination
        pages={[1, 2, 3]}
        selectedPage={1}
        setSelectedPage={() => {}}
        pageSpread={11}
        className="className"
      />,
    )
    expect(screen.getByTestId('ScreenPagination')).toBeTruthy()
    expect(screen.getByTestId('ScreenPagination')).toHaveClass('className')
  })
})
