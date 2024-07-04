import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import Main from '.'

describe('Main', () => {
  it('default', () => {
    render(<Main className="className" />)
    expect(screen.getByTestId('Main')).toBeTruthy()
    expect(screen.getByTestId('Main')).toHaveClass('className')
  })
})
