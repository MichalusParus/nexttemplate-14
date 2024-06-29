import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import MobilePagination from '.'

describe('MobilePagination', () => {
  it('default', () => {
    render(
      <MobilePagination
        pages={[1, 2, 3]}
        selectedPage={1}
        setSelectedPage={() => {}}
        className="className"
      />,
    )
    expect(screen.getByTestId('MobilePagination')).toBeTruthy()
    expect(screen.getByTestId('MobilePagination')).toHaveClass('className')
  })
})
