import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import SpinnerLoader from '.'

describe('SpinnerLoader', () => {
  it('default', () => {
    render(<SpinnerLoader className="className" />)
    expect(screen.getByRole('status')).toBeTruthy()
    expect(screen.getByRole('status')).toHaveClass('className')
  })
})
