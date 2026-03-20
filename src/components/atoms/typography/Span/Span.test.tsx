import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { render, screen } from '../../../../../.jest/customRender'
import { Span } from '.'

expect.extend(toHaveNoViolations)

describe('Span', () => {
  describe('Semantics', () => {
    it('renders with text content', () => {
      render(<Span>Span Text</Span>)
      const span = screen.getByTestId('Span')

      expect(span).toBeInTheDocument()
      expect(span).toHaveTextContent('Span Text')
    })

    it('forwards className', () => {
      render(<Span className="className">Span Text</Span>)
      const span = screen.getByTestId('Span')

      expect(span).toHaveClass('className')
    })

    it('bold renders as STRONG', () => {
      render(<Span variant="bold">Span Text</Span>)
      const span = screen.getByText('Span Text')

      expect(span.tagName).toBe('STRONG')
    })

    it('italic renders as EM', () => {
      render(<Span variant="italic">Span Text</Span>)
      const span = screen.getByText('Span Text')

      expect(span.tagName).toBe('EM')
    })

    it('underline renders as SPAN', () => {
      render(<Span variant="underline">Span Text</Span>)
      const span = screen.getByText('Span Text')

      expect(span.tagName).toBe('SPAN')
    })

    it('none renders as SPAN', () => {
      render(<Span variant="none">Span Text</Span>)
      const span = screen.getByText('Span Text')

      expect(span.tagName).toBe('SPAN')
    })

    it('text-inherit base class', () => {
      render(<Span>Span Text</Span>)
      const span = screen.getByTestId('Span')

      expect(span).toHaveClass('text-inherit')
    })
  })

  describe('Ref', () => {
    it('forwards ref', () => {
      const ref = createRef<HTMLSpanElement>()
      render(<Span ref={ref}>Span Text</Span>)

      expect(ref.current).toBeInstanceOf(HTMLElement)
    })
  })

  describe('Accessibility', () => {
    it('no axe violations', async () => {
      const { container } = render(<Span>Span Text</Span>)

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
