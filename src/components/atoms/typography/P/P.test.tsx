import '@testing-library/jest-dom'

import { render, screen } from '../../../../../.jest/customRender'
import { P } from '.'

describe('P', () => {
  it('default', () => {
    render(<P className="className">Paragraph text</P>)
    expect(screen.getByTestId('P')).toBeInTheDocument()
    expect(screen.getByTestId('P')).toHaveClass('className')
    expect(screen.getByTestId('P')).toHaveTextContent('Paragraph text')
  })
})
