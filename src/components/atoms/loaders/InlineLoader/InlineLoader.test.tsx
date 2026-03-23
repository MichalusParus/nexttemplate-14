import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { render, screen } from '../../../../../.jest/customRender'
import { InlineLoader } from '.'

expect.extend(toHaveNoViolations)

describe('InlineLoader', () => {
  describe('Semantics', () => {
    it('renders with role status', () => {
      render(<InlineLoader />)
      const loader = screen.getByRole('status')

      expect(loader).toBeInTheDocument()
    })

    it('forwards className', () => {
      render(<InlineLoader className="className" />)
      const loader = screen.getByRole('status')

      expect(loader).toHaveClass('className')
    })

    it('renders three dots', () => {
      render(<InlineLoader />)
      const loader = screen.getByRole('status')
      const dots = loader.querySelectorAll('.Dot')

      expect(dots).toHaveLength(3)
    })

    it('dots have staggered animation delays', () => {
      render(<InlineLoader />)
      const loader = screen.getByRole('status')
      const dots = loader.querySelectorAll('.Dot')

      expect(dots[0]).toHaveStyle({ animationDelay: '' })
      expect(dots[1]).toHaveStyle({ animationDelay: '150ms' })
      expect(dots[2]).toHaveStyle({ animationDelay: '300ms' })
    })

    it('aria-busy is true', () => {
      render(<InlineLoader />)
      const loader = screen.getByRole('status')

      expect(loader).toHaveAttribute('aria-busy', 'true')
    })

    it('aria-label defaults to Loading', () => {
      render(<InlineLoader />)
      const loader = screen.getByRole('status')

      expect(loader).toHaveAttribute('aria-label', 'Loading')
    })

    it('hideStatus removes status role and aria attributes', () => {
      const { container } = render(<InlineLoader hideStatus />)
      const loader = container.querySelector('.InlineLoaderWrap')!

      expect(loader).not.toHaveAttribute('role')
      expect(loader).not.toHaveAttribute('aria-label')
      expect(loader).not.toHaveAttribute('aria-busy')
    })
  })

  describe('Ref', () => {
    it('forwards ref', () => {
      const ref = createRef<HTMLSpanElement>()
      render(<InlineLoader ref={ref} />)

      expect(ref.current).toBeInstanceOf(HTMLSpanElement)
    })
  })

  describe('Accessibility', () => {
    it('no axe violations', async () => {
      const { container } = render(<InlineLoader />)

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
