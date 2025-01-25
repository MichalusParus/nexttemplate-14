import '@testing-library/jest-dom'

import { render, screen } from '../../../../../.jest/customRender'
import { Nav } from '.'

describe('Nav', () => {
  it('default', () => {
    render(<Nav className="className" navLinks={[]} />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getByRole('navigation')).toHaveClass('className')
  })
})
