import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import { JestMockProvider } from '../../../../../.storybook/helpers'
import { Nav } from '.'

describe('Nav', () => {
  it('default', () => {
    render(
      <JestMockProvider>
        <Nav className="className" navLinks={[]} />
      </JestMockProvider>,
    )
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getByRole('navigation')).toHaveClass('className')
  })
})
