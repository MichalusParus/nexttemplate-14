import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { act, createRef } from 'react'

import { fireEvent, render, screen } from '../../../../../.jest/customRender'
import { defaultDelay, Tooltip } from '.'

expect.extend(toHaveNoViolations)

describe('Tooltip', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.clearAllTimers()
    jest.useRealTimers()
  })

  it('default', async () => {
    render(
      <Tooltip title="tooltip" className="className">
        <button data-testid="button">Children</button>
      </Tooltip>,
    )
    const tooltipWrapTestId = screen.getByTestId('TooltipWrap')
    const buttonTestId = screen.getByTestId('button')

    await act(async () => {
      fireEvent.mouseEnter(buttonTestId)
      jest.advanceTimersByTime(defaultDelay + 100)
      jest.advanceTimersByTime(50)
    })

    const tooltipRole = screen.getByRole('tooltip')

    expect(tooltipWrapTestId).toBeInTheDocument()
    expect(tooltipWrapTestId).toHaveTextContent('Children')
    expect(tooltipRole).toBeInTheDocument()
    expect(tooltipRole).toHaveClass('className')
    expect(tooltipRole).toHaveTextContent('tooltip')
  })

  it('delay', async () => {
    const customDelay = 1000
    render(
      <Tooltip title="tooltip" delay={1000}>
        <button data-testid="button">Children</button>
      </Tooltip>,
    )
    const buttonTestId = screen.getByTestId('button')

    await act(async () => {
      fireEvent.mouseEnter(buttonTestId)
      jest.advanceTimersByTime(customDelay - 100)
    })
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()

    await act(async () => {
      jest.advanceTimersByTime(200)
    })
    expect(screen.getByRole('tooltip')).toBeInTheDocument()
  })

  it('focus', async () => {
    render(
      <Tooltip title="tooltip">
        <button data-testid="button">Children</button>
      </Tooltip>,
    )
    const buttonTestId = screen.getByTestId('button')

    await act(async () => {
      fireEvent.focus(buttonTestId)
      jest.advanceTimersByTime(defaultDelay + 100)
    })

    const tooltip = screen.getByRole('tooltip')
    expect(tooltip).toBeInTheDocument()

    await act(async () => {
      fireEvent.blur(buttonTestId)
      jest.advanceTimersByTime(150)
    })

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })

  it('portalContainerId', async () => {
    const portalContainer = document.createElement('div')
    portalContainer.setAttribute('id', 'portalContainer')
    document.body.appendChild(portalContainer)
    render(
      <Tooltip title="tooltip" portalContainerId="portalContainer">
        <button data-testid="button">Children</button>
      </Tooltip>,
    )

    const buttonTestId = screen.getByTestId('button')

    await act(async () => {
      fireEvent.mouseEnter(buttonTestId)
      jest.advanceTimersByTime(defaultDelay + 100)
      jest.advanceTimersByTime(50)
    })

    const tooltipRole = screen.getByRole('tooltip')

    expect(tooltipRole.parentElement).toBe(portalContainer)
  })

  it('ref', async () => {
    const ref = createRef<HTMLDivElement>()
    render(
      <Tooltip title="tooltip" ref={ref}>
        <button data-testid="button">Children</button>
      </Tooltip>,
    )
    const buttonTestId = screen.getByTestId('button')

    await act(async () => {
      fireEvent.mouseEnter(buttonTestId)
      jest.advanceTimersByTime(defaultDelay + 100)
      jest.advanceTimersByTime(50)
    })

    expect(ref.current).not.toBeNull()
    expect(ref.current?.focus).toBeDefined()

    const focusMock = jest.spyOn(ref.current!, 'focus').mockImplementation(() => {})
    ref.current?.focus()

    expect(focusMock).toHaveBeenCalled()
    focusMock.mockRestore()
  })

  it('axe', async () => {
    jest.setTimeout(10000)
    jest.useRealTimers()

    const { container } = render(
      <Tooltip title="tooltip">
        <button data-testid="button">Children</button>
      </Tooltip>,
    )

    await new Promise(resolve => setTimeout(resolve, 100))

    const results = await axe(container)
    expect(results).toHaveNoViolations()

    jest.useFakeTimers()
  }, 10000)
})
