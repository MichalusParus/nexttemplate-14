import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { fireEvent, render, screen } from '../../../../../.jest/customRender'
import { APP_ROOT_ID, Overlay } from '.'

expect.extend(toHaveNoViolations)

describe('Overlay', () => {
  describe('Semantics', () => {
    it('renders as button', () => {
      render(<Overlay isOpen={false} onClose={() => {}} />)
      const overlay = screen.getByTestId('Overlay')

      expect(overlay).toBeInTheDocument()
      expect(overlay).toHaveAttribute('type', 'button')
    })

    it('forwards className', () => {
      render(<Overlay isOpen={false} onClose={() => {}} className="className" />)
      const overlay = screen.getByTestId('Overlay')

      expect(overlay).toHaveClass('className')
    })

    it('aria-hidden true when closed', () => {
      render(<Overlay isOpen={false} onClose={() => {}} />)
      const overlay = screen.getByTestId('Overlay')

      expect(overlay).toHaveAttribute('aria-hidden', 'true')
    })

    it('aria-hidden false when open', () => {
      render(<Overlay isOpen onClose={() => {}} />)
      const overlay = screen.getByRole('button')

      expect(overlay).toHaveAttribute('aria-hidden', 'false')
    })

    it('has close aria-label when open', () => {
      render(<Overlay isOpen onClose={() => {}} />)
      const overlay = screen.getByRole('button')

      expect(overlay).toHaveAttribute('aria-label')
    })

    it('no aria-label when closed', () => {
      render(<Overlay isOpen={false} onClose={() => {}} />)
      const overlay = screen.getByTestId('Overlay')

      expect(overlay).not.toHaveAttribute('aria-label')
    })

    it('dark adds background', () => {
      render(<Overlay isOpen dark onClose={() => {}} />)
      const overlay = screen.getByRole('button')

      expect(overlay).toHaveClass('bg-dark-950/25')
    })
  })

  describe('Keyboard', () => {
    it('not in tab order', () => {
      render(<Overlay isOpen onClose={() => {}} />)
      const overlay = screen.getByRole('button')

      expect(overlay).toHaveAttribute('tabindex', '-1')
    })
  })

  describe('Interaction', () => {
    it('click fires onClose', () => {
      const onClose = jest.fn()
      render(<Overlay isOpen={false} onClose={onClose} />)
      const overlay = screen.getByTestId('Overlay')

      fireEvent.click(overlay)
      expect(onClose).toHaveBeenCalled()
    })

    it('sets inert when open', () => {
      const appRoot = document.createElement('div')
      appRoot.id = APP_ROOT_ID
      document.body.appendChild(appRoot)

      const { rerender } = render(<Overlay isOpen onClose={() => {}} />)
      expect(appRoot.inert).toBe(true)

      rerender(<Overlay isOpen={false} onClose={() => {}} />)
      expect(appRoot.inert).toBe(false)

      document.body.removeChild(appRoot)
    })

    it('renders without app root', () => {
      expect(() => render(<Overlay isOpen onClose={() => {}} />)).not.toThrow()
    })

    it('keeps inert for nested modals', () => {
      const appRoot = document.createElement('div')
      appRoot.id = APP_ROOT_ID
      document.body.appendChild(appRoot)

      const { unmount: unmountOuter } = render(<Overlay isOpen onClose={() => {}} />)
      const { unmount: unmountInner } = render(<Overlay isOpen onClose={() => {}} />)
      expect(appRoot.inert).toBe(true)

      unmountInner()
      expect(appRoot.inert).toBe(true)

      unmountOuter()
      expect(appRoot.inert).toBe(false)

      document.body.removeChild(appRoot)
    })
  })

  describe('Ref', () => {
    it('forwards ref', () => {
      const ref = createRef<HTMLButtonElement>()
      render(<Overlay isOpen={false} onClose={() => {}} ref={ref} />)

      expect(ref.current).toBeInstanceOf(HTMLButtonElement)
    })
  })

  describe('Accessibility', () => {
    it('no axe violations', async () => {
      const { container } = render(<Overlay isOpen={false} onClose={() => {}} />)

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
