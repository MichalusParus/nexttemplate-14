import '@testing-library/jest-dom'

import { render, screen } from '../../../../../.jest/customRender'
import { Disclosure } from '.'

describe('Disclosure', () => {
  it('default', () => {
    render(
      <Disclosure className="className" title="Disclosure">
        Children
      </Disclosure>,
    )
    expect(screen.getByTestId('Disclosure')).toBeInTheDocument()
    expect(screen.getByTestId('Disclosure')).toHaveClass('className')
    expect(screen.getByRole('button')).toHaveTextContent('Disclosure')
    expect(screen.getByTestId('DisclosureDropdown')).toHaveTextContent('Children')
  })
})
