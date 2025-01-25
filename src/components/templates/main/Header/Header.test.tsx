import '@testing-library/jest-dom'

import { render, screen } from '../../../../../.jest/customRender'
import { Header } from '.'

describe('Header', () => {
  it('default', () => {
    render(<Header className="className" />)
    expect(screen.getByTestId('Header')).toBeInTheDocument()
    expect(screen.getByTestId('Header')).toHaveClass('className')
  })
})
