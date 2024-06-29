import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import InlineLoader from '.'

describe('InlineLoader', () => {
  it('default', () => {
    render(<InlineLoader className="className" />)
    expect(screen.getByRole('status')).toBeVisible()
    expect(screen.getByRole('status')).toHaveClass('className')
  })
})
