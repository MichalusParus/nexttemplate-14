import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import MenuItem from '.'

describe('MenuItem', () => {
  it('default', () => {
    render(<MenuItem className="className" />)
    expect(screen.getByRole('menuitem')).toBeTruthy()
    expect(screen.getByRole('menuitem')).toHaveClass('className')
  })
})
