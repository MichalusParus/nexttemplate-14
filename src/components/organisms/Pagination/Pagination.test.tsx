import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import { getPages,JestMockProvider } from '../../../../.storybook/helpers'
import Pagination from '.'

describe('Pagination', () => {
  it('default', () => {
    render(
      <JestMockProvider>
        <Pagination
          name="paginationTest"
          pages={getPages(5)}
          selectedPage={1}
          setSelectedPage={() => {}}
          className="className"
        />
      </JestMockProvider>,
    )
    expect(screen.getByTestId('Pagination')).toBeTruthy()
    expect(screen.getByTestId('Pagination')).toHaveClass('className')
  })
})
