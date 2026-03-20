import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { render, screen } from '../../../../../.jest/customRender'
import { P } from '.'

expect.extend(toHaveNoViolations)

describe('P', () => {
  describe('Semantics', () => {
    it('renders with text content', () => {
      render(<P>Paragraph text</P>)
      const p = screen.getByTestId('P')

      expect(p).toBeInTheDocument()
      expect(p).toHaveTextContent('Paragraph text')
    })

    it('forwards className', () => {
      render(<P className="className">Paragraph text</P>)
      const p = screen.getByTestId('P')

      expect(p).toHaveClass('className')
    })

    it('applies align class', () => {
      render(<P align="text-center">Paragraph text</P>)
      const p = screen.getByTestId('P')

      expect(p).toHaveClass('text-center')
    })

    it('whitespace-pre-wrap base class', () => {
      render(<P>Paragraph text</P>)
      const p = screen.getByTestId('P')

      expect(p).toHaveClass('whitespace-pre-wrap')
    })

    it('replaces content with ghosts when loading', () => {
      const { container } = render(
        <P isLoading expectedLines={5}>
          Paragraph text
        </P>,
      )
      const textQuery = screen.queryByText('Paragraph text')
      const ghosts = container.querySelectorAll('.Ghost')

      expect(textQuery).toBeNull()
      expect(ghosts).toHaveLength(5)
    })

    it('ghostProps forwarded to ghost', () => {
      const { container } = render(
        <P isLoading ghostProps={{ className: 'ghostClass' }}>
          Paragraph text
        </P>,
      )
      const ghost = container.querySelector('.Ghost')

      expect(ghost).toHaveClass('ghostClass')
    })

    it('loading ghosts hidden from status', () => {
      render(
        <P isLoading expectedLines={3}>
          Paragraph text
        </P>,
      )
      const statusElements = screen.queryAllByRole('status')

      expect(statusElements).toHaveLength(0)
    })
  })

  describe('Ref', () => {
    it('forwards ref', () => {
      const ref = createRef<HTMLParagraphElement>()
      render(<P ref={ref}>Paragraph text</P>)

      expect(ref.current).toBeInstanceOf(HTMLParagraphElement)
    })
  })

  describe('Accessibility', () => {
    it('no axe violations', async () => {
      const { container } = render(<P>Paragraph text</P>)

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
