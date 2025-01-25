import '@testing-library/jest-dom'

import { render, screen } from '../../../../../.jest/customRender'
import { InlineLoader } from '.'

describe('InlineLoader', () => {
  it('default', () => {
    render(<InlineLoader className="className" />)
    expect(screen.getByRole('status')).toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveClass('className')
  })
})
