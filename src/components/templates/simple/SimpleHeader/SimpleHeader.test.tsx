import '@testing-library/jest-dom'

import { render, screen } from '../../../../../.jest/customRender'
import { SimpleHeader } from '.'

describe('SimpleHeader', () => {
  it('default', () => {
    render(<SimpleHeader className="className" />)
    expect(screen.getByTestId('SimpleHeader')).toBeInTheDocument()
    expect(screen.getByTestId('SimpleHeader')).toHaveClass('className')
  })
})
