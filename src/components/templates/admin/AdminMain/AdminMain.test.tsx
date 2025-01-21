import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import { AdminMain } from '.'

describe('AdminMain', () => {
  it('default', () => {
    render(<AdminMain className="className" />)
    expect(screen.getByTestId('AdminMain')).toBeInTheDocument()
    expect(screen.getByTestId('AdminMain')).toHaveClass('className')
  })
})
