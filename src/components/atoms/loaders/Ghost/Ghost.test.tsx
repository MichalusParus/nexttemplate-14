import '@testing-library/jest-dom'

import { render, screen } from '../../../../../.jest/customRender'
import { Ghost } from '.'

describe('Ghost', () => {
  it('default', () => {
    render(<Ghost className="className" />)
    expect(screen.getByRole('status')).toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveClass('className')
  })
})
