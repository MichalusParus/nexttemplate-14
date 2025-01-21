import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import { Paper } from '.'

describe('Paper', () => {
  it('default', () => {
    render(<Paper className="className" />)
    expect(screen.getByTestId('Paper')).toBeInTheDocument()
    expect(screen.getByTestId('Paper')).toHaveClass('className')
  })
})
