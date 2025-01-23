import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'

import { Divider } from '.'

expect.extend(toHaveNoViolations)

describe('Divider', () => {
  it('default', () => {
    render(<Divider className="className" />)
    const seperatorRole = screen.getByRole('separator')
    const dividerTestID = screen.getAllByTestId('Divider')

    expect(seperatorRole).toBeInTheDocument()
    expect(seperatorRole).toHaveClass('className')
    expect(seperatorRole).toHaveAttribute('aria-orientation', 'horizontal')
    expect(seperatorRole).toHaveStyle('height: 2, width: 100%')
    expect(seperatorRole).toHaveTextContent('')
    expect(dividerTestID).toHaveLength(1)
  })

  it('vertical', () => {
    render(<Divider vertical />)
    const seperatorRole = screen.getByRole('separator')

    expect(seperatorRole).toHaveAttribute('aria-orientation', 'vertical')
    expect(seperatorRole).toHaveStyle('width: 2, height: 100%')
  })

  it('width', () => {
    render(<Divider width="5px" />)
    const seperatorRole = screen.getByRole('separator')

    expect(seperatorRole).toHaveStyle('height: 5')
  })

  it('label', () => {
    render(<Divider label="label" />)
    const labelText = screen.getByText('label')
    const dividerTestID = screen.getAllByTestId('Divider')

    expect(labelText).toBeInTheDocument()
    expect(dividerTestID).toHaveLength(2)
  })

  it('axe', async () => {
    const { container } = render(<Divider />)

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
