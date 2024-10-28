import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import { JestMockProvider } from '../../../../../.storybook/helpers'
import { CircularLoader } from '.'

describe('CircularLoader', () => {
  it('default', () => {
    render(
      <JestMockProvider>
        <CircularLoader className="className" />
      </JestMockProvider>,
    )
    expect(screen.getByRole('status')).toBeTruthy()
    expect(screen.getByRole('status')).toHaveClass('className')
  })
})
