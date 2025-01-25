import '@testing-library/jest-dom'

import { render, screen } from '../../../../../../.jest/customRender'
import { HamburgerMenu } from '.'

describe('HamburgerMenu', () => {
  it('default', () => {
    render(<HamburgerMenu className="className" navLinks={[]} />)
    expect(screen.getByTestId('HamburgerMenu')).toBeInTheDocument()
    expect(screen.getByTestId('HamburgerMenu')).toHaveClass('className')
  })
})
