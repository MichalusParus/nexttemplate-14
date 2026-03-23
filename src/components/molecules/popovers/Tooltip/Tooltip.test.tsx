import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { act, createRef } from 'react'

import { fireEvent, render, screen } from '../../../../../.jest/customRender'
import { defaultDelay, Tooltip } from '.'

expect.extend(toHaveNoViolations)

const showTooltip = async (element: HTMLElement) => {
  await act(async () => {
    fireEvent.mouseEnter(element)
    jest.advanceTimersByTime(defaultDelay + 100)
  })
}

describe('Tooltip', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.clearAllTimers()
    jest.useRealTimers()
  })

  describe('Semantics', () => {
    it('role tooltip on popover', async () => {
      render(
        <Tooltip title="tooltip">
          <button>Children</button>
        </Tooltip>,
      )
      await showTooltip(screen.getByRole('button'))

      expect(screen.getByRole('tooltip')).toBeInTheDocument()
    })

    it('className forwarded to tooltip', async () => {
      render(
        <Tooltip title="tooltip" className="custom">
          <button>Children</button>
        </Tooltip>,
      )
      await showTooltip(screen.getByRole('button'))

      expect(screen.getByRole('tooltip')).toHaveClass('custom')
    })

    it('title renders as content', async () => {
      render(
        <Tooltip title="tooltip content">
          <button>Children</button>
        </Tooltip>,
      )
      await showTooltip(screen.getByRole('button'))

      expect(screen.getByRole('tooltip')).toHaveTextContent('tooltip content')
    })

    it('wrapper div present in normal mode', () => {
      render(
        <Tooltip title="tooltip">
          <button>Children</button>
        </Tooltip>,
      )
      const wrap = screen.getByTestId('TooltipWrap')

      expect(wrap).toBeInTheDocument()
      expect(wrap).toHaveTextContent('Children')
    })

    it('no wrapper div in lazy mode', () => {
      render(
        <Tooltip title="tooltip" lazy>
          <button>Children</button>
        </Tooltip>,
      )

      expect(screen.queryByTestId('TooltipWrap')).not.toBeInTheDocument()
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('aria-describedby set when open', async () => {
      render(
        <Tooltip title="tooltip">
          <button>Children</button>
        </Tooltip>,
      )
      await showTooltip(screen.getByRole('button'))

      const tooltip = screen.getByRole('tooltip')
      const wrap = screen.getByTestId('TooltipWrap')

      expect(wrap).toHaveAttribute('aria-describedby', tooltip.id)
    })

    it('aria-describedby absent when closed', () => {
      render(
        <Tooltip title="tooltip">
          <button>Children</button>
        </Tooltip>,
      )
      const wrap = screen.getByTestId('TooltipWrap')

      expect(wrap).not.toHaveAttribute('aria-describedby')
    })

    it('aria-owns set on wrapper when open', async () => {
      render(
        <Tooltip title="tooltip">
          <button>Children</button>
        </Tooltip>,
      )
      await showTooltip(screen.getByRole('button'))

      const tooltip = screen.getByRole('tooltip')
      const wrap = screen.getByTestId('TooltipWrap')

      expect(wrap).toHaveAttribute('aria-owns', tooltip.id)
    })

    it('lazy mode aria-owns set when open', async () => {
      render(
        <Tooltip title="tooltip" lazy>
          <button>Children</button>
        </Tooltip>,
      )
      await showTooltip(screen.getByRole('button'))

      const tooltip = screen.getByRole('tooltip')
      const button = screen.getByRole('button')

      expect(button).toHaveAttribute('aria-owns', tooltip.id)
    })

    it('aria-hidden reflects open state', async () => {
      render(
        <Tooltip title="tooltip">
          <button>Children</button>
        </Tooltip>,
      )
      await showTooltip(screen.getByRole('button'))

      expect(screen.getByRole('tooltip')).toHaveAttribute('aria-hidden', 'false')
    })

    it('aria-live polite on tooltip', async () => {
      render(
        <Tooltip title="tooltip">
          <button>Children</button>
        </Tooltip>,
      )
      await showTooltip(screen.getByRole('button'))

      expect(screen.getByRole('tooltip')).toHaveAttribute('aria-live', 'polite')
    })

    it('hidePointer hides pointer', async () => {
      render(
        <Tooltip title="tooltip" hidePointer>
          <button>Children</button>
        </Tooltip>,
      )
      await showTooltip(screen.getByRole('button'))

      const tooltip = screen.getByRole('tooltip')

      expect(tooltip.className).not.toMatch(/after:/)
    })

    it('portalContainerId renders into custom container', async () => {
      const portalContainer = document.createElement('div')
      portalContainer.setAttribute('id', 'portalContainer')
      document.body.appendChild(portalContainer)

      render(
        <Tooltip title="tooltip" portalContainerId="portalContainer">
          <button>Children</button>
        </Tooltip>,
      )
      await showTooltip(screen.getByRole('button'))

      expect(screen.getByRole('tooltip').parentElement).toBe(portalContainer)

      document.body.removeChild(portalContainer)
    })

    it('lazy mode aria-describedby set when open', async () => {
      render(
        <Tooltip title="tooltip" lazy>
          <button>Children</button>
        </Tooltip>,
      )
      await showTooltip(screen.getByRole('button'))

      const tooltip = screen.getByRole('tooltip')
      const button = screen.getByRole('button')

      expect(button).toHaveAttribute('aria-describedby', tooltip.id)
    })

    it('closed state returns null', () => {
      render(
        <Tooltip title="tooltip">
          <button>Children</button>
        </Tooltip>,
      )

      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
    })
  })

  describe('Keyboard', () => {
    it('Escape closes tooltip', async () => {
      render(
        <Tooltip title="tooltip">
          <button>Children</button>
        </Tooltip>,
      )
      await showTooltip(screen.getByRole('button'))

      expect(screen.getByRole('tooltip')).toBeInTheDocument()

      await act(async () => {
        fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' })
        jest.advanceTimersByTime(150)
      })

      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
    })
  })

  describe('Interaction', () => {
    it('hover shows tooltip after delay', async () => {
      render(
        <Tooltip title="tooltip">
          <button>Children</button>
        </Tooltip>,
      )
      const button = screen.getByRole('button')

      await act(async () => {
        fireEvent.mouseEnter(button)
        jest.advanceTimersByTime(defaultDelay - 100)
      })

      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()

      await act(async () => {
        jest.advanceTimersByTime(200)
      })

      expect(screen.getByRole('tooltip')).toBeInTheDocument()
    })

    it('hover hides tooltip', async () => {
      render(
        <Tooltip title="tooltip">
          <button>Children</button>
        </Tooltip>,
      )
      const button = screen.getByRole('button')
      await showTooltip(button)

      expect(screen.getByRole('tooltip')).toBeInTheDocument()

      await act(async () => {
        fireEvent.mouseLeave(button)
        jest.advanceTimersByTime(150)
      })

      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
    })

    it('focus shows tooltip', async () => {
      render(
        <Tooltip title="tooltip">
          <button>Children</button>
        </Tooltip>,
      )
      const button = screen.getByRole('button')

      await act(async () => {
        fireEvent.focus(button)
        jest.advanceTimersByTime(defaultDelay + 100)
      })

      expect(screen.getByRole('tooltip')).toBeInTheDocument()
    })

    it('blur hides tooltip', async () => {
      render(
        <Tooltip title="tooltip">
          <button>Children</button>
        </Tooltip>,
      )
      const button = screen.getByRole('button')

      await act(async () => {
        fireEvent.focus(button)
        jest.advanceTimersByTime(defaultDelay + 100)
      })

      expect(screen.getByRole('tooltip')).toBeInTheDocument()

      await act(async () => {
        fireEvent.blur(button)
        jest.advanceTimersByTime(150)
      })

      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
    })

    it('focus moving between children does not hide tooltip', async () => {
      render(
        <Tooltip title="tooltip">
          <div>
            <button data-testid="btn1">First</button>
            <button data-testid="btn2">Second</button>
          </div>
        </Tooltip>,
      )
      const btn1 = screen.getByTestId('btn1')
      const btn2 = screen.getByTestId('btn2')

      await act(async () => {
        fireEvent.focus(btn1)
        jest.advanceTimersByTime(defaultDelay + 100)
      })

      expect(screen.getByRole('tooltip')).toBeInTheDocument()

      // Move focus from btn1 to btn2 — blur with relatedTarget inside wrapper
      await act(async () => {
        fireEvent.blur(btn1, { relatedTarget: btn2 })
        fireEvent.focus(btn2)
      })

      expect(screen.getByRole('tooltip')).toBeInTheDocument()
    })

    it('custom delay timing', async () => {
      const customDelay = 1000
      render(
        <Tooltip title="tooltip" delay={customDelay}>
          <button>Children</button>
        </Tooltip>,
      )
      const button = screen.getByRole('button')

      await act(async () => {
        fireEvent.mouseEnter(button)
        jest.advanceTimersByTime(customDelay - 100)
      })

      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()

      await act(async () => {
        jest.advanceTimersByTime(200)
      })

      expect(screen.getByRole('tooltip')).toBeInTheDocument()
    })

    it('beforeShow returning false prevents tooltip', async () => {
      render(
        <Tooltip title="tooltip" beforeShow={() => false}>
          <button>Children</button>
        </Tooltip>,
      )
      await showTooltip(screen.getByRole('button'))

      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
    })

    it('aria-expanded suppression', async () => {
      render(
        <Tooltip title="tooltip">
          <button aria-expanded="true">Children</button>
        </Tooltip>,
      )
      await showTooltip(screen.getByRole('button'))

      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
    })

    it('outside click dismisses tooltip', async () => {
      render(
        <Tooltip title="tooltip">
          <button>Children</button>
        </Tooltip>,
      )
      await showTooltip(screen.getByRole('button'))

      expect(screen.getByRole('tooltip')).toBeInTheDocument()

      await act(async () => {
        fireEvent.mouseDown(document.body)
        jest.advanceTimersByTime(150)
      })

      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
    })

    it('scroll dismisses tooltip', async () => {
      render(
        <Tooltip title="tooltip">
          <button>Children</button>
        </Tooltip>,
      )
      await showTooltip(screen.getByRole('button'))

      expect(screen.getByRole('tooltip')).toBeInTheDocument()

      await act(async () => {
        fireEvent.scroll(window)
        jest.advanceTimersByTime(150)
      })

      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
    })

    it('lazy mode shows tooltip on hover', async () => {
      render(
        <Tooltip title="lazy tooltip" lazy>
          <button>Children</button>
        </Tooltip>,
      )
      await showTooltip(screen.getByRole('button'))

      expect(screen.getByRole('tooltip')).toHaveTextContent('lazy tooltip')
    })

    it('rapid mouseEnter/mouseLeave cancels show', async () => {
      render(
        <Tooltip title="tooltip">
          <button>Children</button>
        </Tooltip>,
      )
      const button = screen.getByRole('button')

      await act(async () => {
        fireEvent.mouseEnter(button)
        jest.advanceTimersByTime(100)
        fireEvent.mouseLeave(button)
        jest.advanceTimersByTime(defaultDelay + 100)
      })

      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
    })
  })

  describe('Ref', () => {
    it('exposes popover element', async () => {
      const ref = createRef<HTMLDivElement>()
      render(
        <Tooltip title="tooltip" ref={ref}>
          <button>Children</button>
        </Tooltip>,
      )
      await showTooltip(screen.getByRole('button'))

      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })
  })

  describe('Accessibility', () => {
    it('no axe violations', async () => {
      jest.useRealTimers()

      const { container } = render(
        <Tooltip title="tooltip">
          <button>Children</button>
        </Tooltip>,
      )

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
