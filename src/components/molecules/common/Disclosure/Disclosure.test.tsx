import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef, useState } from 'react'

import { fireEvent, render, screen } from '../../../../../.jest/customRender'
import { Disclosure } from '.'

expect.extend(toHaveNoViolations)

describe('Disclosure', () => {
  describe('Semantics', () => {
    it('renders wrapper div', () => {
      render(
        <Disclosure title="Disclosure">
          Children
        </Disclosure>,
      )
      const wrapper = screen.getByTestId('Disclosure')

      expect(wrapper).toBeInTheDocument()
    })

    it('forwards className', () => {
      render(
        <Disclosure className="className" title="Disclosure">
          Children
        </Disclosure>,
      )
      const wrapper = screen.getByTestId('Disclosure')

      expect(wrapper).toHaveClass('className')
    })

    it('button shows title', () => {
      render(
        <Disclosure title="Disclosure">
          Children
        </Disclosure>,
      )
      const button = screen.getByRole('button')

      expect(button).toHaveTextContent('Disclosure')
    })

    it('default chevron at end', () => {
      render(
        <Disclosure title="Disclosure">
          Children
        </Disclosure>,
      )
      const startIcon = screen.queryByTestId('StartIcon')
      const endIcon = screen.queryByTestId('EndIcon')

      expect(startIcon).toBeNull()
      expect(endIcon).toBeInTheDocument()
    })

    it('chevron at start', () => {
      render(
        <Disclosure title="Disclosure" chevronPosition="start">
          Children
        </Disclosure>,
      )
      const startIcon = screen.queryByTestId('StartIcon')
      const endIcon = screen.queryByTestId('EndIcon')

      expect(startIcon).toBeInTheDocument()
      expect(endIcon).toBeNull()
    })

    it('aria-expanded false by default', () => {
      render(
        <Disclosure title="Disclosure">
          Children
        </Disclosure>,
      )
      const button = screen.getByRole('button')

      expect(button).toHaveAttribute('aria-expanded', 'false')
    })

    it('aria-controls links to dropdown', () => {
      render(
        <Disclosure title="Disclosure">
          Children
        </Disclosure>,
      )
      const button = screen.getByRole('button')
      const dropdown = screen.getByTestId('DisclosureDropdown')

      expect(button).toHaveAttribute('aria-controls', dropdown.getAttribute('id'))
      expect(dropdown).toHaveAttribute('id', button.getAttribute('aria-controls'))
    })

    it('dropdown has children', () => {
      render(
        <Disclosure title="Disclosure">
          Children
        </Disclosure>,
      )
      const dropdown = screen.getByTestId('DisclosureDropdown')

      expect(dropdown).toHaveTextContent('Children')
    })

    it('dropdown hidden when collapsed', () => {
      render(
        <Disclosure title="Disclosure">
          Children
        </Disclosure>,
      )
      const dropdown = screen.getByTestId('DisclosureDropdown')

      expect(dropdown).toHaveClass('grid-rows-[0fr]')
      expect(dropdown).toHaveClass('invisible')
    })

    it('expanded prop opens disclosure', () => {
      render(
        <Disclosure title="Disclosure" expanded>
          Children
        </Disclosure>,
      )
      const button = screen.getByRole('button')
      const dropdown = screen.getByTestId('DisclosureDropdown')

      expect(dropdown).toHaveClass('grid-rows-[1fr]')
      expect(button).toHaveAttribute('aria-expanded', 'true')
    })

    it('height prop applies', () => {
      render(
        <Disclosure title="Disclosure" height="max-h-96" expanded={true}>
          Children
        </Disclosure>,
      )
      const contentWrap = screen.getByTestId('ContentWrap')

      expect(contentWrap).toHaveClass('max-h-96')
    })

    it('buttonProps forwarding', () => {
      render(
        <Disclosure title="Disclosure" buttonProps={{ className: 'buttonClass' }}>
          Children
        </Disclosure>,
      )
      const button = screen.getByRole('button')

      expect(button).toHaveClass('buttonClass')
    })

    it('paperProps forwarding', () => {
      render(
        <Disclosure title="Disclosure" paperProps={{ className: 'paperClass' }}>
          Children
        </Disclosure>,
      )
      const paper = screen.getByTestId('Paper')

      expect(paper).toHaveClass('paperClass')
    })

    it('scrollShadowProps forwarding', () => {
      render(
        <Disclosure title="Disclosure" scrollShadowProps={{ className: 'scrollShadowClass' }}>
          Children
        </Disclosure>,
      )
      const scrollShadow = screen.getByTestId('ScrollShadow')

      expect(scrollShadow).toHaveClass('scrollShadowClass')
    })

    it('region with aria-labelledby', () => {
      render(
        <Disclosure title="Disclosure" expanded>
          Children
        </Disclosure>,
      )
      const button = screen.getByRole('button')
      const region = screen.getByRole('region')

      expect(region).toHaveAttribute('aria-labelledby', button.getAttribute('id'))
    })
  })

  describe('Keyboard', () => {
    it('tab focuses trigger button', () => {
      render(
        <Disclosure title="Disclosure">
          Children
        </Disclosure>,
      )
      const button = screen.getByRole('button')

      button.focus()
      expect(document.activeElement).toBe(button)
    })
  })

  describe('Interaction', () => {
    it('click toggles disclosure', () => {
      render(
        <Disclosure title="Disclosure">
          Children
        </Disclosure>,
      )
      const button = screen.getByRole('button')
      const dropdown = screen.getByTestId('DisclosureDropdown')

      fireEvent.click(button)
      expect(dropdown).toHaveClass('grid-rows-[1fr]')
      expect(button).toHaveAttribute('aria-expanded', 'true')
      fireEvent.click(button)
      expect(dropdown).toHaveClass('grid-rows-[0fr]')
      expect(button).toHaveAttribute('aria-expanded', 'false')
    })

    it('controlled mode', () => {
      const ControlledDisclosure = () => {
        const [isOpen, setIsOpen] = useState(false)
        return (
          <Disclosure title="Controlled Disclosure" expanded={isOpen} setIsOpen={setIsOpen}>
            Controlled Children
          </Disclosure>
        )
      }
      render(<ControlledDisclosure />)
      const button = screen.getByRole('button')
      const dropdown = screen.getByTestId('DisclosureDropdown')

      fireEvent.click(button)
      expect(dropdown).toHaveClass('grid-rows-[1fr]')
      expect(button).toHaveAttribute('aria-expanded', 'true')
      fireEvent.click(button)
      expect(dropdown).toHaveClass('grid-rows-[0fr]')
      expect(button).toHaveAttribute('aria-expanded', 'false')
    })
  })

  describe('Ref', () => {
    it('forwards ref', () => {
      const ref = createRef<HTMLDivElement>()
      render(
        <Disclosure ref={ref} title="Disclosure">
          Children
        </Disclosure>,
      )

      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })
  })

  describe('Accessibility', () => {
    it('no axe violations', async () => {
      const { container } = render(
        <Disclosure title="Disclosure">
          Children
        </Disclosure>,
      )

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
