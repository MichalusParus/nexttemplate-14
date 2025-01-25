import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'

import { render, screen } from '../../../../../.jest/customRender'
import { Span } from '.'

expect.extend(toHaveNoViolations)

describe('Span', () => {
  it('default', () => {
    render(<Span className="className">Span Text</Span>)
    const spanText = screen.getByText('Span Text')

    expect(spanText).toBeInTheDocument()
    expect(spanText).toHaveClass('className')
    expect(spanText).toHaveTextContent('Span Text')
  })

  it('bold', () => {
    render(<Span variant="bold">Span Text</Span>)
    const spanText = screen.getByText('Span Text')

    expect(spanText.tagName).toBe('STRONG')
  })

  it('italic', () => {
    render(<Span variant="italic">Span Text</Span>)
    const spanText = screen.getByText('Span Text')

    expect(spanText.tagName).toBe('EM')
  })

  it('underline', () => {
    render(<Span variant="underline">Span Text</Span>)
    const spanText = screen.getByText('Span Text')

    expect(spanText.tagName).toBe('SPAN')
  })

  it('axe', async () => {
    const { container } = render(<Span className="className">Span Text</Span>)

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
