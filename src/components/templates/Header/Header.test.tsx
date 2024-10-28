import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import { JestMockProvider } from '../../../../.storybook/helpers'
import { Header } from '.'

describe('Header', () => {
  it('default', () => {
    render(
      <JestMockProvider>
        <Header className="className" />
      </JestMockProvider>,
    )
    expect(screen.getByTestId('Header')).toBeTruthy()
    expect(screen.getByTestId('Header')).toHaveClass('className')
  })
})
