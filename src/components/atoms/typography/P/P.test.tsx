import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import P from '.'

describe('P', () => {
  it('default', () => {
    render(<P className="className">Paragraph text</P>)
    expect(screen.getByTestId('P')).toBeTruthy()
    expect(screen.getByTestId('P')).toHaveClass('className')
    expect(screen.getByTestId('P')).toHaveTextContent('Paragraph text')
  })
})
