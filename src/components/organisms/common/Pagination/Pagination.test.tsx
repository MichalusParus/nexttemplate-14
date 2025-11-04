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

  it('default', () => {
    render(<Pagination className="className" count={5} page={3} onChange={() => {}} />)
    const screenPaginationWrap = screen.getByTestId('ScreenPaginationWrap')
    const screenPaginationTestId = screen.queryByTestId('ScreenPagination')
    const mobilePaginationTestId = screen.queryByTestId('MobilePagination')
    const navElement = screen.queryByRole('navigation')
    const buttonRoles = screen.getAllByRole('button')

    expect(screenPaginationWrap).toBeInTheDocument()
    expect(screenPaginationWrap).toHaveClass('className')
    expect(screenPaginationTestId).toBeInTheDocument()
    expect(mobilePaginationTestId).toBeNull()
    expect(navElement).toBeInTheDocument()
    expect(buttonRoles).toHaveLength(7)
  })

  it('hideNav', () => {
    const { container } = render(<Pagination count={5} page={3} onChange={() => {}} hideNav />)
    const navQuery = container.querySelector('nav')

    expect(navQuery).toBeNull()
  })

  it('responsive - xs', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: Breakpoints.xs,
    })

    render(<Pagination count={5} page={3} onChange={() => {}} />)
    const screenPaginationTestId = screen.queryByTestId('ScreenPagination')

    expect(screenPaginationTestId).toBeInTheDocument()
  })

  it('responsive - mobile', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 400,
    })

    render(<Pagination count={5} page={3} onChange={() => {}} />)
    const mobilePaginationTestId = screen.queryByTestId('MobilePagination')
    const screenPaginationTestId = screen.queryByTestId('ScreenPagination')

    expect(mobilePaginationTestId).toBeInTheDocument()
    expect(screenPaginationTestId).toBeNull()
  })

  it('responsive - sm', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: Breakpoints.sm,
    })

    render(<Pagination count={5} page={3} onChange={() => {}} />)
    const screenPaginationTestId = screen.queryByTestId('ScreenPagination')

    expect(screenPaginationTestId).toBeInTheDocument()
  })

  it('responsive - md', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: Breakpoints.md,
    })

    render(<Pagination count={5} page={3} onChange={() => {}} />)
    const screenPaginationTestId = screen.queryByTestId('ScreenPagination')

    expect(screenPaginationTestId).toBeInTheDocument()
  })

  it('responsive - lg', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: Breakpoints.lg,
    })

    render(<Pagination count={5} page={3} onChange={() => {}} />)
    const screenPaginationTestId = screen.queryByTestId('ScreenPagination')

    expect(screenPaginationTestId).toBeInTheDocument()
  })

  it('responsive - xl', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: Breakpoints.xl,
    })

    render(<Pagination count={5} page={3} onChange={() => {}} />)
    const screenPaginationTestId = screen.queryByTestId('ScreenPagination')

    expect(screenPaginationTestId).toBeInTheDocument()
  })

  it('responsive - 2xl', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: Breakpoints['2xl'],
    })

    render(<Pagination count={5} page={3} onChange={() => {}} />)
    const screenPaginationTestId = screen.queryByTestId('ScreenPagination')

    expect(screenPaginationTestId).toBeInTheDocument()
  })

  it('onChange', () => {
    const onChangeMock = jest.fn()
    render(<Pagination count={5} page={3} onChange={onChangeMock} />)
    const buttonRoles = screen.getAllByRole('button')

    fireEvent.click(buttonRoles[0])
    expect(onChangeMock).toHaveBeenCalled()
  })

  it('ref', () => {
    const ref = createRef<HTMLDivElement>()
    render(<Pagination ref={ref} count={5} page={3} onChange={() => {}} />)

    expect(ref.current).not.toBeNull()
    expect(ref.current?.focus).toBeDefined()

    const focusMock = jest.spyOn(ref.current!, 'focus').mockImplementation(() => {})
    ref.current?.focus()

    expect(focusMock).toHaveBeenCalled()
    focusMock.mockRestore()
  })

  it('axe', async () => {
    const { container } = render(<Pagination count={5} page={3} onChange={() => {}} />)

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('handles single page', () => {
    render(<Pagination count={1} page={1} onChange={() => {}} />)
    const screenPagination = screen.getByTestId('ScreenPagination')

    expect(screenPagination).toHaveClass('invisible')
  })

  it('handles count=0', () => {
    render(<Pagination count={0} page={1} onChange={() => {}} />)
    const screenPaginationWrap = screen.getByTestId('ScreenPaginationWrap')
    const screenPagination = screen.getByTestId('ScreenPagination')

    expect(screenPaginationWrap).toBeInTheDocument()
    expect(screenPagination).toHaveClass('invisible')
  })
})
