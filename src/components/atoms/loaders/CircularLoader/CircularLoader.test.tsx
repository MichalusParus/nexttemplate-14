import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import CircularLoader from '.'

describe('CircularLoader', () => {
  it('default', () => {
    render(<CircularLoader className="className" />)
    expect(screen.getByRole('status')).toBeTruthy()
    expect(screen.getByRole('status')).toHaveClass('className')
  })
})
