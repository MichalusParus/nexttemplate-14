import '@testing-library/jest-dom'

import { render, screen } from '../../../../../../.jest/customRender'
import { OnScrollWrap } from '.'

describe('OnScrollWrap', () => {
  it('default', () => {
    render(<OnScrollWrap className="className" />)
    expect(screen.getByTestId('OnScrollWrap')).toBeInTheDocument()
    expect(screen.getByTestId('OnScrollWrap')).toHaveClass('className')
  })
})
