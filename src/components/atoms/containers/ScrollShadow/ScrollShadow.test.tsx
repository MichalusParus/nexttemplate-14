import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import { ScrollShadow } from '.'

describe('ScrollShadow', () => {
  it('default', () => {
    render(<ScrollShadow className="className" />)
    expect(screen.getByTestId('ScrollShadow')).toBeInTheDocument()
    expect(screen.getByTestId('ScrollShadow')).toHaveClass('className')
  })
})
