import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { render, screen } from '../../../../../.jest/customRender'
import { CircularLoader } from '.'

expect.extend(toHaveNoViolations)

describe('CircularLoader', () => {
  describe('Semantics', () => {
    it('renders with role status', () => {
      render(<CircularLoader />)
      const loader = screen.getByRole('status')

      expect(loader).toBeInTheDocument()
    })

    it('forwards className', () => {
      render(<CircularLoader className="className" />)
      const loader = screen.getByRole('status')

      expect(loader).toHaveClass('className')
    })

    it('aria-busy is true', () => {
      render(<CircularLoader />)
      const loader = screen.getByRole('status')

      expect(loader).toHaveAttribute('aria-busy', 'true')
    })

    it('aria-label is Loading', () => {
      render(<CircularLoader />)
      const loader = screen.getByRole('status')

      expect(loader).toHaveAttribute('aria-label', 'Loading')
    })

    it('renders label text by default', () => {
      render(<CircularLoader />)
      const loader = screen.getByRole('status')

      expect(loader).toHaveTextContent('Loading...')
    })

    it('renders custom label text', () => {
      render(<CircularLoader label="Please wait..." />)
      const loader = screen.getByRole('status')

      expect(loader).toHaveTextContent('Please wait...')
    })

    it('hideLabel hides label text', () => {
      render(<CircularLoader hideLabel />)
      const loader = screen.getByRole('status')

      expect(loader).not.toHaveTextContent('Loading...')
    })

  })

  describe('Ref', () => {
    it('forwards ref', () => {
      const ref = createRef<HTMLSpanElement>()
      render(<CircularLoader ref={ref} />)

      expect(ref.current).toBeInstanceOf(HTMLSpanElement)
    })
  })

  describe('Accessibility', () => {
    it('no axe violations', async () => {
      const { container } = render(<CircularLoader />)

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
