import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import Header from '.'

describe('Header', () => {
  it('default', () => {
    render(<Header className="className" />)
    expect(screen.getByTestId('Header')).toBeTruthy()
    expect(screen.getByTestId('Header')).toHaveClass('className')
  })
})
