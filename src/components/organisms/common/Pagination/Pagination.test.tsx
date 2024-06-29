import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import Pagination from '.'

describe('Pagination', () => {
  it('default', () => {
    render(
      <Pagination
        pages={[1, 2, 3]}
        selectedPage={1}
        setSelectedPage={() => {}}
        className="className"
      />,
    )
    expect(screen.getByTestId('Pagination')).toBeTruthy()
    expect(screen.getByTestId('Pagination')).toHaveClass('className')
  })
})
