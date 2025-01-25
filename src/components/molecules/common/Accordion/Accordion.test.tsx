import '@testing-library/jest-dom'

import { render, screen } from '../../../../../.jest/customRender'
import { accordionOptions } from '../../../../../.storybook/helpers'
import { Accordion } from '.'

describe('Accordion', () => {
  it('default', () => {
    render(<Accordion className="className" options={accordionOptions} />)
    expect(screen.getByTestId('Accordion')).toBeInTheDocument()
    expect(screen.getByTestId('Accordion')).toHaveClass('className')
    expect(screen.getAllByRole('button')).toHaveLength(5)
    expect(screen.getAllByTestId('DisclosureDropdown')[0]).toHaveTextContent(
      accordionOptions[0].content.props.children,
    )
  })
})
