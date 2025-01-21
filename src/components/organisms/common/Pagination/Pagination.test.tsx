import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import { JestMockProvider } from '../../../../../.storybook/helpers'
import { Pagination } from '.'

describe('Pagination', () => {
  it('default', () => {
    render(
      <JestMockProvider>
        <Pagination
          name="paginationTest"
          count={5}
          selectedPage={1}
          setSelectedPage={() => {}}
          className="className"
        />
      </JestMockProvider>,
    )
    expect(screen.getByTestId('Pagination')).toBeInTheDocument()
    expect(screen.getByTestId('Pagination')).toHaveClass('className')
  })
})
