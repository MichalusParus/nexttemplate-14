import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

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

  it('ref', () => {
    const ref = createRef<HTMLSpanElement>()
    render(<Span ref={ref}>Span Text</Span>)

    expect(ref.current).not.toBeNull()
    expect(ref.current?.focus).toBeDefined()

    const focusMock = jest.spyOn(ref.current!, 'focus').mockImplementation(() => {})
    ref.current?.focus()

    expect(focusMock).toHaveBeenCalled()
    focusMock.mockRestore()
  })

  it('axe', async () => {
    const { container } = render(<Span>Span Text</Span>)

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
