import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { act, fireEvent, render, screen, waitFor } from '../../../../../.jest/customRender'
import { Ellipsis } from '.'

expect.extend(toHaveNoViolations)

describe('Ellipsis', () => {
  describe('Semantics', () => {
    it('renders with data-testid', () => {
      render(<Ellipsis>text</Ellipsis>)
      const ellipsis = screen.getByTestId('Ellipsis')

      expect(ellipsis).toBeInTheDocument()
    })

    it('forwards className', () => {
      render(<Ellipsis className="className">text</Ellipsis>)
      const ellipsis = screen.getByTestId('Ellipsis')

      expect(ellipsis).toHaveClass('className')
    })

    it('renders children', () => {
      render(<Ellipsis>text</Ellipsis>)
      const ellipsis = screen.getByTestId('Ellipsis')

      expect(ellipsis).toHaveTextContent('text')
    })

    it('no role attribute', () => {
      render(<Ellipsis>text</Ellipsis>)
      const ellipsis = screen.getByTestId('Ellipsis')

      expect(ellipsis).not.toHaveAttribute('role')
    })

    it('no tooltip when not overflowing', async () => {
      jest.useFakeTimers()
      render(<Ellipsis>text</Ellipsis>)
      const ellipsis = screen.getByTestId('Ellipsis')

      await act(async () => {
        fireEvent.mouseEnter(ellipsis)
        jest.advanceTimersByTime(600)
      })

      expect(screen.queryByRole('tooltip')).toBeNull()
      jest.useRealTimers()
    })

    describe('overflow', () => {
      beforeEach(() => {
        Object.defineProperty(HTMLElement.prototype, 'clientHeight', { configurable: true, value: 100 })
        Object.defineProperty(HTMLElement.prototype, 'scrollHeight', { configurable: true, value: 200 })
      })

      afterEach(() => {
        Object.defineProperty(HTMLElement.prototype, 'clientHeight', { configurable: true, value: 0 })
        Object.defineProperty(HTMLElement.prototype, 'scrollHeight', { configurable: true, value: 0 })
      })

      it('shows tooltip on hover when overflowing', async () => {
        jest.useFakeTimers()
        render(<Ellipsis>text</Ellipsis>)
        const ellipsis = screen.getByTestId('Ellipsis')

        await act(async () => {
          fireEvent.mouseEnter(ellipsis)
          jest.advanceTimersByTime(600)
        })

        await waitFor(() => {
          expect(screen.getByRole('tooltip')).toBeInTheDocument()
        })
        expect(screen.getByRole('tooltip')).toHaveTextContent('text')

        jest.useRealTimers()
      })
    })
  })

  describe('Ref', () => {
    it('forwards ref', () => {
      const ref = createRef<HTMLSpanElement>()
      render(<Ellipsis ref={ref}>text</Ellipsis>)

      expect(ref.current).toBeInstanceOf(HTMLSpanElement)
    })
  })

  describe('Accessibility', () => {
    it('no axe violations', async () => {
      const { container } = render(<Ellipsis>text</Ellipsis>)

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
