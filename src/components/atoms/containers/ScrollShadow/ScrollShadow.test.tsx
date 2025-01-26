import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { render, screen } from '../../../../../.jest/customRender'
import { textContent } from '../../../../../.storybook/helpers'
import { ScrollShadow } from '.'

expect.extend(toHaveNoViolations)

describe('ScrollShadow', () => {
  it('default', () => {
    render(<ScrollShadow className="className" color="from-primary-800" />)
    const scrollShadowTestId = screen.getByTestId('ScrollShadow')

    expect(scrollShadowTestId).toBeInTheDocument()
    expect(scrollShadowTestId).toHaveClass('className')
    expect(scrollShadowTestId).toHaveClass('from-primary-800')
  })

  it('vertical', () => {
    Object.defineProperty(HTMLElement.prototype, 'clientHeight', { configurable: true, value: 100 })
    Object.defineProperty(HTMLElement.prototype, 'scrollHeight', { configurable: true, value: 200 })
    render(<ScrollShadow>{textContent}</ScrollShadow>)
    const topShadowTestId = screen.getByTestId('TopShadow')
    const bottomShadowTestId = screen.getByTestId('BottomShadow')

    expect(topShadowTestId).toBeInTheDocument()
    expect(bottomShadowTestId).toBeInTheDocument()
    expect(topShadowTestId).toHaveAttribute('aria-hidden', 'true')
    expect(bottomShadowTestId).toHaveAttribute('aria-hidden', 'true')
  })

  it('horizontal', () => {
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', { configurable: true, value: 100 })
    Object.defineProperty(HTMLElement.prototype, 'scrollWidth', { configurable: true, value: 200 })
    render(<ScrollShadow>{textContent}</ScrollShadow>)
    const leftShadowTestId = screen.getByTestId('LeftShadow')
    const rightShadowTestId = screen.getByTestId('RightShadow')

    expect(leftShadowTestId).toBeInTheDocument()
    expect(rightShadowTestId).toBeInTheDocument()
    expect(leftShadowTestId).toHaveAttribute('aria-hidden', 'true')
    expect(rightShadowTestId).toHaveAttribute('aria-hidden', 'true')
  })

  it('fullScroll', () => {
    Object.defineProperty(HTMLElement.prototype, 'clientHeight', { configurable: true, value: 100 })
    Object.defineProperty(HTMLElement.prototype, 'scrollHeight', { configurable: true, value: 200 })
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', { configurable: true, value: 100 })
    Object.defineProperty(HTMLElement.prototype, 'scrollWidth', { configurable: true, value: 200 })
    render(<ScrollShadow>{textContent}</ScrollShadow>)
    const topShadowTestId = screen.getByTestId('TopShadow')
    const bottomShadowTestId = screen.getByTestId('BottomShadow')
    const leftShadowTestId = screen.getByTestId('LeftShadow')
    const rightShadowTestId = screen.getByTestId('RightShadow')

    expect(leftShadowTestId).toBeInTheDocument()
    expect(rightShadowTestId).toBeInTheDocument()
    expect(topShadowTestId).toBeInTheDocument()
    expect(bottomShadowTestId).toBeInTheDocument()
    expect(topShadowTestId).toHaveAttribute('aria-hidden', 'true')
    expect(bottomShadowTestId).toHaveAttribute('aria-hidden', 'true')
    expect(leftShadowTestId).toHaveAttribute('aria-hidden', 'true')
    expect(rightShadowTestId).toHaveAttribute('aria-hidden', 'true')
  })

  it('disableHorizontal', () => {
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', { configurable: true, value: 100 })
    Object.defineProperty(HTMLElement.prototype, 'scrollWidth', { configurable: true, value: 200 })
    render(<ScrollShadow disableHorizontal>{textContent}</ScrollShadow>)
    const leftShadowQuery = screen.queryByTestId('LeftShadow')
    const rightShadowQuery = screen.queryByTestId('RightShadow')

    expect(leftShadowQuery).toBeNull()
    expect(rightShadowQuery).toBeNull()
  })

  it('ref', () => {
    const ref = createRef<HTMLDivElement>()
    render(<ScrollShadow ref={ref} />)

    expect(ref.current).not.toBeNull()
    expect(ref.current?.focus).toBeDefined()

    const focusMock = jest.spyOn(ref.current!, 'focus').mockImplementation(() => {})
    ref.current?.focus()

    expect(focusMock).toHaveBeenCalled()
    focusMock.mockRestore()
  })

  it('axe', async () => {
    const { container } = render(<ScrollShadow />)

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
