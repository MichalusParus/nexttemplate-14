import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { render, screen } from '../../../../../.jest/customRender'
import { Ellipsis } from '.'

expect.extend(toHaveNoViolations)

describe('Ellipsis', () => {
  it('default', () => {
    render(<Ellipsis className="className">text</Ellipsis>)
    const ellipsisTestId = screen.getByTestId('Ellipsis')
    const tooltipQuery = screen.queryByRole('tooltip')

    expect(ellipsisTestId).toBeInTheDocument()
    expect(ellipsisTestId).toHaveClass('className')
    expect(ellipsisTestId).toHaveTextContent('text')
    expect(tooltipQuery).toBeNull()
  })

  it('ref', () => {
    const ref = createRef<HTMLDivElement>()
    render(<Ellipsis ref={ref}>text</Ellipsis>)

    expect(ref.current).not.toBeNull()
    expect(ref.current?.focus).toBeDefined()

    const focusMock = jest.spyOn(ref.current!, 'focus').mockImplementation(() => {})
    ref.current?.focus()

    expect(focusMock).toHaveBeenCalled()
    focusMock.mockRestore()
  })

  it('axe', async () => {
    const { container } = render(<Ellipsis>text</Ellipsis>)

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('overflow', async () => {
    Object.defineProperty(HTMLElement.prototype, 'clientHeight', { configurable: true, value: 100 })
    Object.defineProperty(HTMLElement.prototype, 'scrollHeight', { configurable: true, value: 200 })
    render(<Ellipsis>text</Ellipsis>)
    setTimeout(() => {
      const tooltipQuery = screen.getByRole('tooltip')

      expect(tooltipQuery).toBeInTheDocument()
      expect(tooltipQuery).toHaveTextContent('text')
    }, 0)
  })
})
