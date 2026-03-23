import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { render, screen } from '../../../../../.jest/customRender'
import { breadcrumbOptions } from '../../../../../.storybook/helpers'
import { Breadcrumb } from './Breadcrumb'

expect.extend(toHaveNoViolations)

describe('Breadcrumb', () => {
  describe('Semantics', () => {
    it('renders as nav landmark', () => {
      render(<Breadcrumb options={breadcrumbOptions} />)
      const nav = screen.getByRole('navigation')
      expect(nav).toBeInTheDocument()
    })

    it('has aria-label breadcrumb', () => {
      render(<Breadcrumb options={breadcrumbOptions} />)
      const nav = screen.getByRole('navigation')
      expect(nav).toHaveAttribute('aria-label', 'breadcrumb')
    })

    it('forwards className', () => {
      render(<Breadcrumb className="className" options={breadcrumbOptions} />)
      const nav = screen.getByRole('navigation')
      expect(nav).toHaveClass('className')
    })

    it('renders links for non-last items', () => {
      render(<Breadcrumb options={breadcrumbOptions} />)
      const links = screen.getAllByRole('link')
      expect(links).toHaveLength(breadcrumbOptions.length - 1)
      expect(links[0]).toHaveTextContent(breadcrumbOptions[0].label)
      expect(links[1]).toHaveTextContent(breadcrumbOptions[1].label)
    })

    it('renders current page span for last item', () => {
      render(<Breadcrumb options={breadcrumbOptions} />)
      const currentPage = screen.getByTestId('CurrentPageSpan')
      expect(currentPage).toBeInTheDocument()
      expect(currentPage).toHaveTextContent(breadcrumbOptions[2].label)
    })

    it('marks current page with aria-current', () => {
      render(<Breadcrumb options={breadcrumbOptions} />)
      const currentPage = screen.getByTestId('CurrentPageSpan')
      expect(currentPage).toHaveAttribute('aria-current', 'page')
    })

    it('hides separators from assistive technology', () => {
      render(<Breadcrumb options={breadcrumbOptions} />)
      const separators = screen.getAllByRole('presentation', { hidden: true })
      expect(separators).toHaveLength(breadcrumbOptions.length - 1)
    })

    it('content overrides label display', () => {
      const optionsWithContent = [
        { label: 'Home', href: '/', content: <span data-testid="custom">Custom Home</span> },
        { label: 'Page', href: '/page' },
      ]
      render(<Breadcrumb options={optionsWithContent} />)
      const custom = screen.getByTestId('custom')

      expect(custom).toHaveTextContent('Custom Home')
    })

    it('linkProps forwards to links', () => {
      render(<Breadcrumb options={breadcrumbOptions} linkProps={{ className: 'linkClass' }} />)
      const links = screen.getAllByRole('link')

      expect(links[0]).toHaveClass('linkClass')
      expect(links[1]).toHaveClass('linkClass')
    })

    it('spanProps forwards to current page', () => {
      render(<Breadcrumb options={breadcrumbOptions} spanProps={{ className: 'spanClass' }} />)
      const currentPage = screen.getByTestId('CurrentPageSpan')

      expect(currentPage).toHaveClass('spanClass')
    })
  })

  describe('Ref', () => {
    it('forwards ref', () => {
      const ref = createRef<HTMLDivElement>()
      render(<Breadcrumb ref={ref} options={breadcrumbOptions} />)
      expect(ref.current).toBeInstanceOf(HTMLElement)
    })
  })

  describe('Accessibility', () => {
    it('no axe violations', async () => {
      const { container } = render(<Breadcrumb options={breadcrumbOptions} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
