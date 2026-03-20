import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { render, screen } from '../../../../../.jest/customRender'
import { Ghost } from '.'

expect.extend(toHaveNoViolations)

describe('Ghost', () => {
  describe('Semantics', () => {
    it('renders with role status', () => {
      render(<Ghost />)
      const ghost = screen.getByRole('status')

      expect(ghost).toBeInTheDocument()
    })

    it('forwards className', () => {
      render(<Ghost className="className" />)
      const ghost = screen.getByRole('status')

      expect(ghost).toHaveClass('className')
    })


    it('aria-busy is true', () => {
      render(<Ghost />)
      const ghost = screen.getByRole('status')

      expect(ghost).toHaveAttribute('aria-busy', 'true')
    })

    it('aria-label defaults to Loading', () => {
      render(<Ghost />)
      const ghost = screen.getByRole('status')

      expect(ghost).toHaveAttribute('aria-label', 'Loading')
    })

    it('hideStatus removes role and aria attributes', () => {
      const { container } = render(<Ghost hideStatus />)
      const ghost = container.querySelector('.Ghost')!

      expect(ghost).not.toHaveAttribute('role')
      expect(ghost).not.toHaveAttribute('aria-label')
      expect(ghost).not.toHaveAttribute('aria-busy')
    })
  })

  describe('Ref', () => {
    it('forwards ref', () => {
      const ref = createRef<HTMLSpanElement>()
      render(<Ghost ref={ref} />)

      expect(ref.current).toBeInstanceOf(HTMLSpanElement)
    })
  })

  describe('Accessibility', () => {
    it('no axe violations', async () => {
      const { container } = render(<Ghost />)

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
