import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { render, screen } from '../../../../../.jest/customRender'
import { Badge } from '.'

expect.extend(toHaveNoViolations)

describe('Badge', () => {
  describe('Semantics', () => {
    it('renders wrapper with children', () => {
      render(
        <Badge>
          <button type="button">child</button>
        </Badge>,
      )

      expect(screen.getByText('child')).toBeInTheDocument()
      expect(screen.getByTestId('BadgeWrap')).toBeInTheDocument()
    })

    it('renders an empty dot when no value provided', () => {
      render(
        <Badge>
          <span>child</span>
        </Badge>,
      )
      const badge = screen.getByTestId('Badge')

      expect(badge).toBeInTheDocument()
      expect(badge).toBeEmptyDOMElement()
    })

    it('renders numeric value', () => {
      render(
        <Badge value={5}>
          <span>child</span>
        </Badge>,
      )

      expect(screen.getByTestId('Badge')).toHaveTextContent('5')
    })

    it('renders string value', () => {
      render(
        <Badge value="NEW">
          <span>child</span>
        </Badge>,
      )

      expect(screen.getByTestId('Badge')).toHaveTextContent('NEW')
    })

    it('forwards className to the badge element', () => {
      render(
        <Badge className="className">
          <span>child</span>
        </Badge>,
      )

      expect(screen.getByTestId('Badge')).toHaveClass('className')
    })

    it('forwards native props to the badge element', () => {
      render(
        <Badge data-custom="test">
          <span>child</span>
        </Badge>,
      )

      expect(screen.getByTestId('Badge')).toHaveAttribute('data-custom', 'test')
    })
  })

  describe('Visibility', () => {
    it('hides badge when value is numeric 0 (smart default)', () => {
      render(
        <Badge value={0}>
          <span>child</span>
        </Badge>,
      )

      expect(screen.getByTestId('Badge')).toHaveClass('hidden')
      expect(screen.getByText('child')).toBeInTheDocument()
    })

    it('show={true} forces render even when value is 0', () => {
      render(
        <Badge value={0} show>
          <span>child</span>
        </Badge>,
      )
      const badge = screen.getByTestId('Badge')

      expect(badge).not.toHaveClass('hidden')
      expect(badge).toHaveTextContent('0')
    })

    it('show={false} hides the dot mode', () => {
      render(
        <Badge show={false}>
          <span>child</span>
        </Badge>,
      )

      expect(screen.getByTestId('Badge')).toHaveClass('hidden')
    })

    it('show={false} hides string content', () => {
      render(
        <Badge value="NEW" show={false}>
          <span>child</span>
        </Badge>,
      )

      expect(screen.getByTestId('Badge')).toHaveClass('hidden')
    })

    it('show={false} hides numeric content (override)', () => {
      render(
        <Badge value={5} show={false}>
          <span>child</span>
        </Badge>,
      )

      expect(screen.getByTestId('Badge')).toHaveClass('hidden')
    })

    it('show={true} renders the dot when no value', () => {
      render(
        <Badge show>
          <span>child</span>
        </Badge>,
      )

      expect(screen.getByTestId('Badge')).not.toHaveClass('hidden')
    })
  })

  describe('Overflow', () => {
    it('renders raw number when below max', () => {
      render(
        <Badge value={42} max={99}>
          <span>child</span>
        </Badge>,
      )

      expect(screen.getByTestId('Badge')).toHaveTextContent('42')
    })

    it('renders +max when number exceeds max', () => {
      render(
        <Badge value={150} max={99}>
          <span>child</span>
        </Badge>,
      )

      expect(screen.getByTestId('Badge')).toHaveTextContent('+99')
    })

    it('default max is 99', () => {
      render(
        <Badge value={1000}>
          <span>child</span>
        </Badge>,
      )

      expect(screen.getByTestId('Badge')).toHaveTextContent('+99')
    })
  })

  describe('Defaults', () => {
    it('default has red background', () => {
      render(
        <Badge>
          <span>child</span>
        </Badge>,
      )

      expect(screen.getByTestId('Badge')).toHaveClass('bg-error-700')
    })

    it('default position is top-right', () => {
      render(
        <Badge>
          <span>child</span>
        </Badge>,
      )
      const badge = screen.getByTestId('Badge')

      expect(badge).toHaveClass('top-0')
      expect(badge).toHaveClass('right-0')
    })

    it('position prop applies passed tailwind classes', () => {
      render(
        <Badge position="bottom-0 left-0 -translate-x-1/2 translate-y-1/2">
          <span>child</span>
        </Badge>,
      )
      const badge = screen.getByTestId('Badge')

      expect(badge).toHaveClass('bottom-0')
      expect(badge).toHaveClass('left-0')
    })

    it('className overrides default color', () => {
      render(
        <Badge className="bg-primary-700">
          <span>child</span>
        </Badge>,
      )

      expect(screen.getByTestId('Badge')).toHaveClass('bg-primary-700')
    })
  })

  describe('Ref', () => {
    it('forwards ref to badge span', () => {
      const ref = createRef<HTMLSpanElement>()
      render(
        <Badge ref={ref}>
          <span>child</span>
        </Badge>,
      )

      expect(ref.current).toBeInstanceOf(HTMLSpanElement)
    })
  })

  describe('Accessibility', () => {
    it('aria-label passes through to badge', () => {
      render(
        <Badge value={3} aria-label="3 unread notifications" role="status">
          <span>child</span>
        </Badge>,
      )

      expect(screen.getByRole('status')).toHaveAccessibleName('3 unread notifications')
    })

    it('no axe violations (dot)', async () => {
      const { container } = render(
        <Badge>
          <button type="button">child</button>
        </Badge>,
      )

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('no axe violations (with value and label)', async () => {
      const { container } = render(
        <Badge value={5} aria-label="5 items" role="status">
          <button type="button">child</button>
        </Badge>,
      )

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
