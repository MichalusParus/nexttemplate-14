import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import { SimpleMain } from '.'

describe('SimpleMain', () => {
  it('default', () => {
    render(<SimpleMain className="className" />)
    expect(screen.getByTestId('SimpleMain')).toBeInTheDocument()
    expect(screen.getByTestId('SimpleMain')).toHaveClass('className')
  })
})
