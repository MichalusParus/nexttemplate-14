import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import { Footer } from '.'

describe('Footer', () => {
  it('default', () => {
    render(<Footer className="className" />)
    expect(screen.getByTestId('Footer')).toBeInTheDocument()
    expect(screen.getByTestId('Footer')).toHaveClass('className')
  })
})
