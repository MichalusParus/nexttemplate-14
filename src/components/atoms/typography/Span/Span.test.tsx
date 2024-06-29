import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import Span from '.'

describe('Span', () => {
  it('default', () => {
    render(<Span className="className">Span Text</Span>)
    expect(screen.getByTestId('Span')).toBeTruthy()
    expect(screen.getByTestId('Span')).toHaveClass('className')
    expect(screen.getByTestId('Span')).toHaveTextContent('Span Text')
  })
})
