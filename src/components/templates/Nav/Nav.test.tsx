import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import { JestMockProvider } from '../../../../.storybook/helpers'
import Nav from '.'

describe('Nav', () => {
  it('default', () => {
    render(
      <JestMockProvider>
        <Nav className="className" />
      </JestMockProvider>,
    )
    expect(screen.getByRole('navigation')).toBeTruthy()
    expect(screen.getByRole('navigation')).toHaveClass('className')
  })
})
