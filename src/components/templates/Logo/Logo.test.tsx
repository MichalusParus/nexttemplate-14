import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import Logo from '.'

describe('Logo', () => {
  it('default', () => {
    render(<Logo className="className" />)
    expect(screen.getByTestId('Logo')).toBeTruthy()
    expect(screen.getByTestId('Logo')).toHaveClass('className')
  })
})
