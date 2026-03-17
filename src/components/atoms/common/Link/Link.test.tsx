import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { render, screen } from '../../../../../.jest/customRender'
import { Link } from '.'

expect.extend(toHaveNoViolations)

describe('Link', () => {
  describe('Semantics', () => {
    it('renders as link', () => {
      render(<Link href="/#">title</Link>)
      const link = screen.getByRole('link')

      expect(link).toBeInTheDocument()
      expect(link).toHaveTextContent('title')
      expect(link).toHaveAttribute('href', '/#')
    })

    it('forwards className', () => {
      render(
        <Link className="className" href="/#">
          title
        </Link>,
      )
      const link = screen.getByRole('link')

      expect(link).toHaveClass('className')
    })

    it('icon-only renders icon', () => {
      render(<Link startIcon={<svg role="img" />} href="#" aria-label="label" />)
      const link = screen.getByRole('link')
      const img = screen.getByRole('img')

      expect(img).toBeInTheDocument()
      expect(link).toHaveTextContent('')
      expect(link).toHaveAttribute('aria-label', 'label')
    })

    it('startIcon renders with children', () => {
      render(
        <Link startIcon={<svg role="img" />} href="#">
          title
        </Link>,
      )
      const link = screen.getByRole('link')
      const img = screen.getByRole('img')

      expect(img).toBeInTheDocument()
      expect(link).toHaveTextContent('title')
    })

    it('endIcon renders with children', () => {
      render(
        <Link endIcon={<svg role="img" />} href="#">
          title
        </Link>,
      )
      const link = screen.getByRole('link')
      const img = screen.getByRole('img')

      expect(img).toBeInTheDocument()
      expect(link).toHaveTextContent('title')
    })

    it('endIcon-only renders icon', () => {
      render(<Link endIcon={<svg role="img" />} href="#" aria-label="label" />)
      const link = screen.getByRole('link')
      const img = screen.getByRole('img')

      expect(img).toBeInTheDocument()
      expect(link).toHaveTextContent('')
      expect(link).toHaveAttribute('aria-label', 'label')
    })

    it('icon-only warns without aria-label', () => {
      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
      render(<Link startIcon={<svg role="img" />} href="#" />)

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        '[components] Icon-only links should have an aria-label for accessibility.',
      )
      consoleWarnSpy.mockRestore()
    })

    it('aria-labelledby suppresses warning', () => {
      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
      render(<Link startIcon={<svg role="img" />} href="#" aria-labelledby="label-id" />)

      expect(consoleWarnSpy).not.toHaveBeenCalled()
      consoleWarnSpy.mockRestore()
    })

    it('no warning for normal link', () => {
      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
      render(<Link href="#">title</Link>)

      expect(consoleWarnSpy).not.toHaveBeenCalled()
      consoleWarnSpy.mockRestore()
    })
  })

  describe('Keyboard', () => {
    it('focusable', () => {
      render(<Link href="/#">title</Link>)
      const link = screen.getByRole('link')

      link.focus()
      expect(document.activeElement).toBe(link)
    })
  })

  describe('Ref', () => {
    it('forwards ref', () => {
      const ref = createRef<HTMLAnchorElement>()
      render(
        <Link ref={ref} href="/#">
          title
        </Link>,
      )

      expect(ref.current).toBeInstanceOf(HTMLAnchorElement)
    })
  })

  describe('Accessibility', () => {
    it('no axe violations', async () => {
      const { container } = render(<Link href="#">title</Link>)

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
