import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import { Ellipsis } from '.'

describe('Ellipsis', () => {
  it('default', () => {
    render(<Ellipsis className="className" />)
    expect(screen.getByTestId('Ellipsis')).toBeInTheDocument()
    expect(screen.getByTestId('Ellipsis')).toHaveClass('className')
  })
})
