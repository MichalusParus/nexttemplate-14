import '@testing-library/jest-dom'

import { render, screen } from '../../../../../.jest/customRender'
import { Logo } from '.'

describe('Logo', () => {
  it('default', () => {
    render(<Logo className="className" />)
    expect(screen.getByTestId('Logo')).toBeInTheDocument()
    expect(screen.getByTestId('Logo')).toHaveClass('className')
  })
})
