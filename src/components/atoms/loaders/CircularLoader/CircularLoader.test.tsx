import '@testing-library/jest-dom'

import { render, screen } from '../../../../../.jest/customRender'
import { CircularLoader } from '.'

describe('CircularLoader', () => {
  it('default', () => {
    render(<CircularLoader className="className" />)
    expect(screen.getByRole('status')).toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveClass('className')
  })
})
