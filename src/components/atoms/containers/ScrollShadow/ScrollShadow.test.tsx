import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { render, screen } from '../../../../../.jest/customRender'
import { textContent } from '../../../../../.storybook/helpers'
import { ScrollShadow } from '.'

expect.extend(toHaveNoViolations)

const mockOverflow = (options: {
  scrollHeight?: number
  clientHeight?: number
  scrollWidth?: number
  clientWidth?: number
  scrollTop?: number
  scrollLeft?: number
}) => {
  if (options.scrollHeight !== undefined)
    Object.defineProperty(HTMLElement.prototype, 'scrollHeight', { configurable: true, value: options.scrollHeight })
  if (options.clientHeight !== undefined)
    Object.defineProperty(HTMLElement.prototype, 'clientHeight', { configurable: true, value: options.clientHeight })
  if (options.scrollWidth !== undefined)
    Object.defineProperty(HTMLElement.prototype, 'scrollWidth', { configurable: true, value: options.scrollWidth })
  if (options.clientWidth !== undefined)
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', { configurable: true, value: options.clientWidth })
  if (options.scrollTop !== undefined)
    Object.defineProperty(HTMLElement.prototype, 'scrollTop', { configurable: true, value: options.scrollTop })
  if (options.scrollLeft !== undefined)
    Object.defineProperty(HTMLElement.prototype, 'scrollLeft', { configurable: true, value: options.scrollLeft })
}

describe('ScrollShadow', () => {
  describe('Semantics', () => {
    it('renders with className', () => {
      render(<ScrollShadow className="className" />)
      const scrollShadow = screen.getByTestId('ScrollShadow')

      expect(scrollShadow).toHaveClass('className')
    })

    it('forwards color to outer div', () => {
      render(<ScrollShadow color="from-primary-800" />)
      const scrollShadow = screen.getByTestId('ScrollShadow')

      expect(scrollShadow).toHaveClass('from-primary-800')
    })

    it('forwards padding to content wrap', () => {
      render(<ScrollShadow padding="px-4" />)
      const contentWrap = screen.getByTestId('ContentWrap')

      expect(contentWrap).toHaveClass('px-4')
    })

    it('vertical shadows render with aria-hidden', () => {
      mockOverflow({ scrollHeight: 200, clientHeight: 100, scrollTop: 0 })
      render(<ScrollShadow>{textContent}</ScrollShadow>)
      const topShadow = screen.getByTestId('TopShadow')
      const bottomShadow = screen.getByTestId('BottomShadow')

      expect(topShadow).toBeInTheDocument()
      expect(bottomShadow).toBeInTheDocument()
      expect(topShadow).toHaveAttribute('aria-hidden', 'true')
      expect(bottomShadow).toHaveAttribute('aria-hidden', 'true')
    })

    it('horizontal shadows render with aria-hidden', () => {
      mockOverflow({ scrollWidth: 200, clientWidth: 100, scrollLeft: 0 })
      render(<ScrollShadow>{textContent}</ScrollShadow>)
      const leftShadow = screen.getByTestId('LeftShadow')
      const rightShadow = screen.getByTestId('RightShadow')

      expect(leftShadow).toBeInTheDocument()
      expect(rightShadow).toBeInTheDocument()
      expect(leftShadow).toHaveAttribute('aria-hidden', 'true')
      expect(rightShadow).toHaveAttribute('aria-hidden', 'true')
    })

    it('all four shadows render on full scroll', () => {
      mockOverflow({ scrollHeight: 200, clientHeight: 100, scrollWidth: 200, clientWidth: 100, scrollTop: 0, scrollLeft: 0 })
      render(<ScrollShadow>{textContent}</ScrollShadow>)

      expect(screen.getByTestId('TopShadow')).toBeInTheDocument()
      expect(screen.getByTestId('BottomShadow')).toBeInTheDocument()
      expect(screen.getByTestId('LeftShadow')).toBeInTheDocument()
      expect(screen.getByTestId('RightShadow')).toBeInTheDocument()
    })

    it('disableHorizontal suppresses left and right shadows', () => {
      mockOverflow({ scrollWidth: 200, clientWidth: 100 })
      render(<ScrollShadow disableHorizontal>{textContent}</ScrollShadow>)

      expect(screen.queryByTestId('LeftShadow')).toBeNull()
      expect(screen.queryByTestId('RightShadow')).toBeNull()
    })

    it('top shadow hidden at scroll top', () => {
      mockOverflow({ scrollHeight: 200, clientHeight: 100, scrollTop: 0 })
      render(<ScrollShadow>{textContent}</ScrollShadow>)
      const topShadow = screen.getByTestId('TopShadow')

      expect(topShadow.style.opacity).toBe('0')
    })

    it('bottom shadow visible at scroll top', () => {
      mockOverflow({ scrollHeight: 200, clientHeight: 100, scrollTop: 0 })
      render(<ScrollShadow>{textContent}</ScrollShadow>)
      const bottomShadow = screen.getByTestId('BottomShadow')

      expect(Number(bottomShadow.style.opacity)).toBeGreaterThan(0)
    })

    it('shadowSize sets shadow dimensions', () => {
      mockOverflow({ scrollHeight: 200, clientHeight: 100, scrollTop: 0 })
      render(<ScrollShadow shadowSize="2rem">{textContent}</ScrollShadow>)
      const topShadow = screen.getByTestId('TopShadow')

      expect(topShadow.style.height).toBe('2rem')
    })

    it('no role on outer div', () => {
      render(<ScrollShadow />)
      const scrollShadow = screen.getByTestId('ScrollShadow')

      expect(scrollShadow).not.toHaveAttribute('role')
    })

    it('gutter prop sets scrollbar-gutter style', () => {
      render(<ScrollShadow gutter />)
      const contentWrap = screen.getByTestId('ContentWrap')

      expect(contentWrap.style.scrollbarGutter).toBe('stable')
    })

    it('default height class applied', () => {
      render(<ScrollShadow />)
      const contentWrap = screen.getByTestId('ContentWrap')

      expect(contentWrap).toHaveClass('h-full')
    })

    it('renders children', () => {
      render(<ScrollShadow>test content</ScrollShadow>)

      expect(screen.getByText('test content')).toBeInTheDocument()
    })

    it('content wrap has tabIndex -1', () => {
      render(<ScrollShadow />)
      const contentWrap = screen.getByTestId('ContentWrap')

      expect(contentWrap).toHaveAttribute('tabindex', '-1')
    })

    it('disableHorizontal sets overflow-x-hidden', () => {
      render(<ScrollShadow disableHorizontal />)
      const contentWrap = screen.getByTestId('ContentWrap')

      expect(contentWrap).toHaveClass('overflow-x-hidden')
    })

    it('scrollPadding matches shadowSize', () => {
      render(<ScrollShadow shadowSize="3rem" />)
      const contentWrap = screen.getByTestId('ContentWrap')

      expect(contentWrap.style.scrollPadding).toBe('3rem')
    })

    it('default color is from-inherit', () => {
      render(<ScrollShadow />)
      const scrollShadow = screen.getByTestId('ScrollShadow')

      expect(scrollShadow).toHaveClass('from-inherit')
    })
  })

  describe('Ref', () => {
    it('forwards ref', () => {
      const ref = createRef<HTMLDivElement>()
      render(<ScrollShadow ref={ref} />)

      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })
  })

  describe('Accessibility', () => {
    it('no axe violations', async () => {
      const { container } = render(<ScrollShadow />)

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
