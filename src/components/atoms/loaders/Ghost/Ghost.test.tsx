import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import { JestMockProvider } from '../../../../../.storybook/helpers'
import Ghost from '.'

describe('Ghost', () => {
  it('default', () => {
    render(
      <JestMockProvider>
        <Ghost className="className" />
      </JestMockProvider>,
    )
    expect(screen.getByRole('status')).toBeTruthy()
    expect(screen.getByRole('status')).toHaveClass('className')
  })
})
