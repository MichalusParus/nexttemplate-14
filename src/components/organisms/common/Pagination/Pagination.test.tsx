import '@testing-library/jest-dom'

import { render, screen } from '../../../../../.jest/customRender'
import { Pagination } from '.'

describe('Pagination', () => {
  it('default', () => {
    render(
      <Pagination
        name="paginationTest"
        count={5}
        selectedPage={1}
        setSelectedPage={() => {}}
        className="className"
      />,
    )
    expect(screen.getByTestId('Pagination')).toBeInTheDocument()
    expect(screen.getByTestId('Pagination')).toHaveClass('className')
  })
})
