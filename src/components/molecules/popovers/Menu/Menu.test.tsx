import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import Menu from '.'

describe('Menu', () => {
  it('default', () => {
    render(
      <Menu name="menuTest" className="className" title="accordion">
        Children
      </Menu>,
    )
    expect(screen.getByTestId('Menu')).toBeTruthy()
    expect(screen.getByTestId('Menu')).toHaveClass('className')
  })
})
