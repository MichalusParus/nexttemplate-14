import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import { SimpleMain } from '.'

describe('SimpleMain', () => {
  it('default', () => {
    render(<SimpleMain className="className" />)
    expect(screen.getByTestId('SimpleMain')).toBeTruthy()
    expect(screen.getByTestId('SimpleMain')).toHaveClass('className')
  })
})
