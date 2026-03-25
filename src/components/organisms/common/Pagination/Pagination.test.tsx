import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { fireEvent, render, screen } from '../../../../../.jest/customRender'
import { Pagination } from '.'
import { Breakpoints } from './useResponsivePageSpread'

expect.extend(toHaveNoViolations)

describe('Pagination', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: Breakpoints.lg,
    })
  })

  describe('Semantics', () => {
    it('renders ScreenPagination at lg breakpoint', () => {
      render(<Pagination className="className" count={5} page={3} onChange={() => {}} />)
      const screenPaginationWrap = screen.getByTestId('ScreenPaginationWrap')
      const screenPagination = screen.queryByTestId('ScreenPagination')
      const mobilePagination = screen.queryByTestId('MobilePagination')

      expect(screenPaginationWrap).toBeInTheDocument()
      expect(screenPaginationWrap).toHaveClass('className')
      expect(screenPagination).toBeInTheDocument()
      expect(mobilePagination).toBeNull()
    })

    it('renders nav element by default', () => {
      render(<Pagination count={5} page={3} onChange={() => {}} />)
      const nav = screen.queryByRole('navigation')

      expect(nav).toBeInTheDocument()
    })

    it('hideNav replaces nav with div', () => {
      const { container } = render(<Pagination count={5} page={3} onChange={() => {}} hideNav />)
      const nav = container.querySelector('nav')

      expect(nav).toBeNull()
    })

    it('renders all page buttons plus chevrons', () => {
      render(<Pagination count={5} page={3} onChange={() => {}} />)
      const buttons = screen.getAllByRole('button')

      expect(buttons).toHaveLength(7)
    })

    it('single page renders invisible', () => {
      render(<Pagination count={1} page={1} onChange={() => {}} />)
      const screenPagination = screen.getByTestId('ScreenPagination')

      expect(screenPagination).toHaveClass('invisible')
    })

    it('count=0 renders invisible', () => {
      render(<Pagination count={0} page={1} onChange={() => {}} />)
      const screenPaginationWrap = screen.getByTestId('ScreenPaginationWrap')
      const screenPagination = screen.getByTestId('ScreenPagination')

      expect(screenPaginationWrap).toBeInTheDocument()
      expect(screenPagination).toHaveClass('invisible')
    })

    it('renders MobilePagination below xs breakpoint', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 400,
      })

      render(<Pagination count={5} page={3} onChange={() => {}} />)
      const mobilePagination = screen.queryByTestId('MobilePagination')
      const screenPagination = screen.queryByTestId('ScreenPagination')

      expect(mobilePagination).toBeInTheDocument()
      expect(screenPagination).toBeNull()
    })

    it('renders ScreenPagination at xs breakpoint', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: Breakpoints.xs,
      })

      render(<Pagination count={5} page={3} onChange={() => {}} />)
      const screenPagination = screen.queryByTestId('ScreenPagination')

      expect(screenPagination).toBeInTheDocument()
    })

    it('renders ScreenPagination at sm breakpoint', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: Breakpoints.sm,
      })

      render(<Pagination count={5} page={3} onChange={() => {}} />)
      const screenPagination = screen.queryByTestId('ScreenPagination')

      expect(screenPagination).toBeInTheDocument()
    })

    it('renders ScreenPagination at md breakpoint', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: Breakpoints.md,
      })

      render(<Pagination count={5} page={3} onChange={() => {}} />)
      const screenPagination = screen.queryByTestId('ScreenPagination')

      expect(screenPagination).toBeInTheDocument()
    })

    it('renders ScreenPagination at xl breakpoint', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: Breakpoints.xl,
      })

      render(<Pagination count={5} page={3} onChange={() => {}} />)
      const screenPagination = screen.queryByTestId('ScreenPagination')

      expect(screenPagination).toBeInTheDocument()
    })

    it('renders ScreenPagination at 2xl breakpoint', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: Breakpoints['2xl'],
      })

      render(<Pagination count={5} page={3} onChange={() => {}} />)
      const screenPagination = screen.queryByTestId('ScreenPagination')

      expect(screenPagination).toBeInTheDocument()
    })
  })

  describe('Interaction', () => {
    it('onChange fires on page button click', () => {
      const onChange = jest.fn()
      render(<Pagination count={5} page={3} onChange={onChange} />)
      const buttons = screen.getAllByRole('button')

      fireEvent.click(buttons[0])
      expect(onChange).toHaveBeenCalled()
    })
  })

  describe('Ref', () => {
    it('forwards ref to HTMLDivElement', () => {
      const ref = createRef<HTMLDivElement>()
      render(<Pagination ref={ref} count={5} page={3} onChange={() => {}} />)

      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })
  })

  describe('Accessibility', () => {
    it('axe', async () => {
      const { container } = render(<Pagination count={5} page={3} onChange={() => {}} />)

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
