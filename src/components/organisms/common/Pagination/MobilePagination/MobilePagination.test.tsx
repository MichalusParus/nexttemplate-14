import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import { JestMockProvider } from '../../../../../../.storybook/helpers'
import { MobilePagination } from '.'

describe('MobilePagination', () => {
  it('default', () => {
    render(
      <JestMockProvider>
        <MobilePagination
          count={3}
          selectedPage={1}
          setSelectedPage={() => {}}
          className="className"
        />
      </JestMockProvider>,
    )
    expect(screen.getByTestId('MobilePagination')).toBeInTheDocument()
    expect(screen.getByTestId('MobilePagination')).toHaveClass('className')
    expect(screen.getAllByRole('button')).toHaveLength(1)
    expect(screen.getByTestId('SelectedOutOff')).toHaveTextContent('1 / 3')
  })

  it('selectedPage', () => {
    render(
      <JestMockProvider>
        <MobilePagination
          count={3}
          selectedPage={3}
          setSelectedPage={() => {}}
          className="className"
        />
      </JestMockProvider>,
    )
    expect(screen.getByTestId('SelectedOutOff')).toHaveTextContent('3 / 3')
  })
})
