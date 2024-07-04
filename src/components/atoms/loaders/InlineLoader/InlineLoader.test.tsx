import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import { JestMockProvider } from '../../../../../.storybook/helpers'
import InlineLoader from '.'

describe('InlineLoader', () => {
  it('default', () => {
    render(
      <JestMockProvider>
        <InlineLoader className="className" />
      </JestMockProvider>,
    )
    expect(screen.getByRole('status')).toBeVisible()
    expect(screen.getByRole('status')).toHaveClass('className')
  })
})
