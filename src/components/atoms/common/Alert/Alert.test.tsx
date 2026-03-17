import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { render, screen } from '../../../../../.jest/customRender'
import { Alert } from '.'

expect.extend(toHaveNoViolations)

describe('Alert', () => {
  describe('Semantics', () => {
    it('renders as div', () => {
      render(<Alert>Alert</Alert>)
      const alert = screen.getByTestId('Alert')

      expect(alert).toBeInTheDocument()
      expect(alert).toHaveTextContent('Alert')
    })

    it('forwards className', () => {
      render(<Alert className="className">Alert</Alert>)
      const alert = screen.getByTestId('Alert')

      expect(alert).toHaveClass('className')
    })

    it('error status sets role alert', () => {
      render(<Alert status="error">Alert</Alert>)
      const alert = screen.getByRole('alert')

      expect(alert).toBeInTheDocument()
    })

    it('success status has no role', () => {
      render(<Alert>Alert</Alert>)
      const alert = screen.getByTestId('Alert')

      expect(alert).not.toHaveAttribute('role')
    })

    it('info status has no role', () => {
      render(<Alert status="info">Alert</Alert>)
      const alert = screen.getByTestId('Alert')

      expect(alert).not.toHaveAttribute('role')
    })

    it('warning status has no role', () => {
      render(<Alert status="warning">Alert</Alert>)
      const alert = screen.getByTestId('Alert')

      expect(alert).not.toHaveAttribute('role')
    })

    it('renders title and children', () => {
      render(<Alert title="Alert title">Alert info</Alert>)
      const title = screen.getByText('Alert title')
      const info = screen.getByText('Alert info')

      expect(title).toBeInTheDocument()
      expect(info).toBeInTheDocument()
    })

    it('renders title only', () => {
      render(<Alert title="Alert title" />)
      const title = screen.getByText('Alert title')

      expect(title).toBeInTheDocument()
    })

    it('startIcon renders when status none', () => {
      render(
        <Alert status="none" startIcon={<svg role="img" />}>
          Alert
        </Alert>,
      )
      const icon = screen.getByRole('img')

      expect(icon).toBeInTheDocument()
    })

    it('startIcon hidden when status set', () => {
      render(
        <Alert status="success" startIcon={<svg data-testid="custom-icon" />}>
          Alert
        </Alert>,
      )
      const customIcon = screen.queryByTestId('custom-icon')

      expect(customIcon).not.toBeInTheDocument()
    })

    it('endIcon renders', () => {
      render(
        <Alert endIcon={<svg role="img" />}>
          Alert
        </Alert>,
      )
      const icon = screen.getByRole('img')

      expect(icon).toBeInTheDocument()
    })

    it('status icons are aria-hidden', () => {
      const { container } = render(<Alert status="error">Alert</Alert>)
      const svg = container.querySelector('svg')

      expect(svg).toHaveAttribute('aria-hidden', 'true')
    })
  })

  describe('Ref', () => {
    it('forwards ref', () => {
      const ref = createRef<HTMLDivElement>()
      render(<Alert ref={ref}>Alert</Alert>)

      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })
  })

  describe('Accessibility', () => {
    it('no axe violations', async () => {
      const { container } = render(<Alert>Alert</Alert>)

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
