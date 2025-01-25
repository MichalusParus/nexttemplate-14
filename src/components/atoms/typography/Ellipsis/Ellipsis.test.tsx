import '@testing-library/jest-dom'

import { render, screen } from '../../../../../.jest/customRender'
import { Ellipsis } from '.'

describe('Ellipsis', () => {
  it('default', () => {
    render(<Ellipsis className="className">text</Ellipsis>)
    expect(screen.getByTestId('Ellipsis')).toBeInTheDocument()
    expect(screen.getByTestId('Ellipsis')).toHaveClass('className')
    expect(screen.getByTestId('Ellipsis')).toHaveTextContent('text')
    expect(screen.queryByRole('tooltip')).toBeNull()
  })
})
