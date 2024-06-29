import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import Ghost from '.'

describe('Ghost', () => {
  it('default', () => {
    render(<Ghost className="className" />)
    expect(screen.getByRole('status')).toBeTruthy()
    expect(screen.getByRole('status')).toHaveClass('className')
  })
})
