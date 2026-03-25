import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { render, screen } from '../../../../../.jest/customRender'
import { Paper } from '.'

expect.extend(toHaveNoViolations)

describe('Paper', () => {
  describe('Semantics', () => {
    it('renders as div', () => {
      render(<Paper>Paper</Paper>)
      const paper = screen.getByTestId('Paper')

      expect(paper).toBeInTheDocument()
      expect(paper).toHaveTextContent('Paper')
    })

    it('forwards className', () => {
      render(<Paper className="className">Paper</Paper>)
      const paper = screen.getByTestId('Paper')

      expect(paper).toHaveClass('className')
    })

    it('custom padding and rounded', () => {
      render(
        <Paper padding="p-6" rounded="rounded-lg">
          Paper
        </Paper>,
      )
      const paper = screen.getByTestId('Paper')

      expect(paper).toHaveClass('p-6')
      expect(paper).toHaveClass('rounded-lg')
    })

    it('hideShadow removes shadow-paper', () => {
      render(<Paper hideShadow>Paper</Paper>)
      const paper = screen.getByTestId('Paper')

      expect(paper).not.toHaveClass('shadow-paper')
    })

    it('no role attribute', () => {
      render(<Paper>Paper</Paper>)
      const paper = screen.getByTestId('Paper')

      expect(paper).not.toHaveAttribute('role')
    })
  })

  describe('Ref', () => {
    it('forwards ref', () => {
      const ref = createRef<HTMLDivElement>()
      render(<Paper ref={ref}>Paper</Paper>)

      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })
  })

  describe('Accessibility', () => {
    it('no axe violations', async () => {
      const { container } = render(<Paper>Paper</Paper>)

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
