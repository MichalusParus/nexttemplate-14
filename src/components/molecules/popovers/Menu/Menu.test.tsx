import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import Menu from '.'

describe('Menu', () => {
  it('default', () => {
    render(
      <Menu name="menuTest" className="className">
        Children
      </Menu>,
    )
    expect(screen.getByTestId('MenuWrap')).toBeTruthy()
    expect(screen.getByTestId('MenuWrap')).toHaveClass('className')
    expect(screen.getByRole('menu')).toBeTruthy()
    expect(screen.getByRole('menu')).toHaveAttribute('id', 'menuTest')
    expect(screen.getByRole('menu')).toHaveTextContent('Children')
  })
})
