import '@testing-library/jest-dom'

import { render, screen } from '../../../../../.jest/customRender'
import { Menu } from '.'

describe('Menu', () => {
  it('default', () => {
    render(
      <Menu name="menuTest" className="className" isOpen={true}>
        Children
      </Menu>,
    )
    expect(screen.getByTestId('MenuWrap')).toBeInTheDocument()
    expect(screen.getByTestId('MenuWrap')).toHaveClass('className')
    expect(screen.getByRole('menu')).toBeInTheDocument()
    expect(screen.getByRole('menu')).toHaveAttribute('id', 'menuTest')
    expect(screen.getByRole('menu')).toHaveTextContent('Children')
  })
})
