import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import { JestMockProvider } from '../../../../../.storybook/helpers'
import HamburgerMenu from '.'

describe('HamburgerMenu', () => {
  it('default', () => {
    render(
      <JestMockProvider>
        <HamburgerMenu className="className" />
      </JestMockProvider>,
    )
    expect(screen.getByTestId('HamburgerMenu')).toBeTruthy()
    expect(screen.getByTestId('HamburgerMenu')).toHaveClass('className')
  })
})
