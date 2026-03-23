import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { fireEvent, render, screen } from '../../../../../.jest/customRender'
import { Dropdown } from '.'

expect.extend(toHaveNoViolations)

describe('Dropdown', () => {
  const anchorRef = createRef<HTMLDivElement>()

  describe('Semantics', () => {
    it('renders with className', () => {
      render(
        <Dropdown className="className" isOpen anchorRef={anchorRef} onClose={() => {}}>
          Children
        </Dropdown>,
      )
      const dropdown = screen.getByTestId('Dropdown')

      expect(dropdown).toBeInTheDocument()
      expect(dropdown).toHaveClass('className')
    })

    it('applies width as inline style', () => {
      render(
        <Dropdown isOpen anchorRef={anchorRef} width={500} onClose={() => {}}>
          Children
        </Dropdown>,
      )
      const dropdown = screen.getByTestId('Dropdown')

      expect(dropdown).toHaveStyle('width: 500px')
    })

    it('applies height on content wrap', () => {
      render(
        <Dropdown isOpen anchorRef={anchorRef} height="max-h-[40vh]" onClose={() => {}}>
          Children
        </Dropdown>,
      )
      const contentWrap = screen.getByTestId('ContentWrap')

      expect(contentWrap).toHaveClass('max-h-[40vh]')
    })

    it('applies paddingY on Paper', () => {
      render(
        <Dropdown isOpen anchorRef={anchorRef} paddingY="p-8" onClose={() => {}}>
          Children
        </Dropdown>,
      )
      const paper = screen.getByTestId('Paper')

      expect(paper).toHaveClass('p-8')
    })

    it('applies paddingX on content wrap', () => {
      render(
        <Dropdown isOpen anchorRef={anchorRef} paddingX="px-4" onClose={() => {}}>
          Children
        </Dropdown>,
      )
      const contentWrap = screen.getByTestId('ContentWrap')

      expect(contentWrap).toHaveClass('px-4')
    })

    it('renders children', () => {
      render(
        <Dropdown isOpen anchorRef={anchorRef} onClose={() => {}}>
          Children
        </Dropdown>,
      )
      const dropdown = screen.getByTestId('Dropdown')

      expect(dropdown).toHaveTextContent('Children')
    })

    it('renders ScrollShadow', () => {
      render(
        <Dropdown isOpen anchorRef={anchorRef} onClose={() => {}}>
          Children
        </Dropdown>,
      )
      const scrollShadow = screen.getByTestId('ScrollShadow')

      expect(scrollShadow).toBeInTheDocument()
    })

    it('returns null when closed', () => {
      render(
        <Dropdown isOpen={false} anchorRef={anchorRef} onClose={() => {}}>
          Children
        </Dropdown>,
      )

      expect(screen.queryByTestId('Dropdown')).toBeNull()
    })

    it('modal sets role dialog', () => {
      render(
        <Dropdown isOpen anchorRef={anchorRef} modal onClose={() => {}}>
          Children
        </Dropdown>,
      )
      const dialog = screen.getByRole('dialog')

      expect(dialog).toBeInTheDocument()
    })

    it('modal sets aria-modal true', () => {
      render(
        <Dropdown isOpen anchorRef={anchorRef} modal onClose={() => {}}>
          Children
        </Dropdown>,
      )
      const dialog = screen.getByRole('dialog')

      expect(dialog).toHaveAttribute('aria-modal', 'true')
    })

    it('modal renders Overlay', () => {
      render(
        <Dropdown isOpen anchorRef={anchorRef} modal onClose={() => {}}>
          Children
        </Dropdown>,
      )
      const overlay = screen.getByTestId('Overlay')

      expect(overlay).toBeInTheDocument()
    })

    it('non-modal has no role', () => {
      render(
        <Dropdown isOpen anchorRef={anchorRef} onClose={() => {}}>
          Children
        </Dropdown>,
      )
      const dropdown = screen.getByTestId('Dropdown')

      expect(dropdown).not.toHaveAttribute('role')
    })

    it('aria-label from label prop', () => {
      render(
        <Dropdown isOpen anchorRef={anchorRef} label="Custom Label" onClose={() => {}}>
          Children
        </Dropdown>,
      )
      const dropdown = screen.getByTestId('Dropdown')

      expect(dropdown).toHaveAttribute('aria-label', 'Custom Label')
    })

    it('aria-label falls back to i18n', () => {
      render(
        <Dropdown isOpen anchorRef={anchorRef} onClose={() => {}}>
          Children
        </Dropdown>,
      )
      const dropdown = screen.getByTestId('Dropdown')

      expect(dropdown).toHaveAttribute('aria-label', 'Dropdown')
    })

    it('renders in portal container', () => {
      const portalContainer = document.createElement('div')
      portalContainer.setAttribute('id', 'portalContainer')
      document.body.appendChild(portalContainer)

      render(
        <Dropdown isOpen anchorRef={anchorRef} portalContainerId="portalContainer" onClose={() => {}}>
          Children
        </Dropdown>,
      )
      const dropdown = screen.getByTestId('Dropdown')

      expect(dropdown.parentElement).toBe(portalContainer)
    })

    it('forwards paperProps className', () => {
      render(
        <Dropdown isOpen anchorRef={anchorRef} paperProps={{ className: 'paperClass' }} onClose={() => {}}>
          Children
        </Dropdown>,
      )
      const paper = screen.getByTestId('Paper')

      expect(paper).toHaveClass('paperClass')
    })

    it('forwards scrollShadowProps className', () => {
      render(
        <Dropdown
          isOpen
          anchorRef={anchorRef}
          scrollShadowProps={{ className: 'scrollShadowClass' }}
          onClose={() => {}}
        >
          Children
        </Dropdown>,
      )
      const scrollShadow = screen.getByTestId('ScrollShadow')

      expect(scrollShadow).toHaveClass('scrollShadowClass')
    })

    it('disablePortal renders inline', () => {
      const { container } = render(
        <Dropdown isOpen anchorRef={anchorRef} disablePortal onClose={() => {}}>
          Children
        </Dropdown>,
      )
      const dropdown = screen.getByTestId('Dropdown')

      expect(container.contains(dropdown)).toBe(true)
    })
  })

  describe('Interaction', () => {
    it('modal Overlay click calls onClose', () => {
      const onClose = jest.fn()
      render(
        <Dropdown isOpen anchorRef={anchorRef} modal onClose={onClose}>
          Children
        </Dropdown>,
      )
      const overlay = screen.getByTestId('Overlay')

      fireEvent.click(overlay)
      expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('non-modal focus-out calls onClose', () => {
      const onClose = jest.fn()
      render(
        <>
          <Dropdown isOpen anchorRef={anchorRef} onClose={onClose}>
            <button data-testid="option" />
          </Dropdown>
          <button data-testid="next-button" />
        </>,
      )
      const option = screen.getByTestId('option')
      const nextButton = screen.getByTestId('next-button')

      option.focus()
      nextButton.focus()
      expect(onClose).toHaveBeenCalledTimes(1)
    })
  })

  describe('Ref', () => {
    it('exposes DOM element via ref', () => {
      const ref = createRef<HTMLDivElement>()
      render(
        <Dropdown isOpen anchorRef={anchorRef} onClose={() => {}} ref={ref}>
          Children
        </Dropdown>,
      )

      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })
  })

  describe('Accessibility', () => {
    it('no axe violations', async () => {
      const { container } = render(
        <Dropdown isOpen anchorRef={anchorRef} onClose={() => {}}>
          Children
        </Dropdown>,
      )

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
