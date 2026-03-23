import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { fireEvent, render, screen } from '../../../../../.jest/customRender'
import { accordionOptions } from '../../../../../.storybook/helpers'
import { Accordion } from '.'

expect.extend(toHaveNoViolations)

describe('Accordion', () => {
  describe('Semantics', () => {
    it('renders disclosures from options', () => {
      render(<Accordion options={accordionOptions} />)
      const disclosures = screen.getAllByTestId('Disclosure')
      const buttons = screen.getAllByRole('button')
      const dropdowns = screen.getAllByTestId('DisclosureDropdown')

      expect(disclosures).toHaveLength(accordionOptions.length)
      expect(buttons).toHaveLength(accordionOptions.length)
      expect(buttons[0]).toHaveTextContent(accordionOptions[0].title)
      expect(buttons[1]).toHaveTextContent(accordionOptions[1].title)
      expect(dropdowns).toHaveLength(accordionOptions.length)
      expect(dropdowns[0]).toHaveTextContent(accordionOptions[0].content)
      expect(dropdowns[1]).toHaveTextContent(accordionOptions[1].content)
    })

    it('forwards className', () => {
      render(<Accordion className="className" options={accordionOptions} />)
      const accordion = screen.getByTestId('Accordion')

      expect(accordion).toHaveClass('className')
    })

    it('disclosuresProps forwards to disclosures', () => {
      render(<Accordion options={accordionOptions} disclosuresProps={{ className: 'className' }} />)
      const disclosures = screen.getAllByTestId('Disclosure')

      expect(disclosures[0]).toHaveClass('className')
      expect(disclosures[1]).toHaveClass('className')
      expect(disclosures[2]).toHaveClass('className')
    })

    it('defaultExpanded opens disclosure', () => {
      render(<Accordion options={accordionOptions} />)
      const buttons = screen.getAllByRole('button')

      expect(buttons[0]).toHaveAttribute('aria-expanded', 'true')
      expect(buttons[1]).toHaveAttribute('aria-expanded', 'false')
    })

    it('no role attribute', () => {
      render(<Accordion options={accordionOptions} />)
      const accordion = screen.getByTestId('Accordion')

      expect(accordion).not.toHaveAttribute('role')
    })
  })

  describe('Keyboard', () => {
    it('Tab focuses disclosure buttons', () => {
      render(<Accordion options={accordionOptions} />)
      const buttons = screen.getAllByRole('button')

      buttons[0].focus()
      expect(document.activeElement).toBe(buttons[0])
    })
  })

  describe('Interaction', () => {
    it('click toggles disclosure', () => {
      render(<Accordion options={accordionOptions} />)
      const buttons = screen.getAllByRole('button')

      expect(buttons[1]).toHaveAttribute('aria-expanded', 'false')
      fireEvent.click(buttons[1])
      expect(buttons[1]).toHaveAttribute('aria-expanded', 'true')
    })

    it('exclusive mode closes others on open', () => {
      render(<Accordion options={accordionOptions} exclusive />)
      const buttons = screen.getAllByRole('button')

      expect(buttons[0]).toHaveAttribute('aria-expanded', 'true')
      expect(buttons[3]).toHaveAttribute('aria-expanded', 'false')
      fireEvent.click(buttons[3])
      expect(buttons[0]).toHaveAttribute('aria-expanded', 'false')
      expect(buttons[3]).toHaveAttribute('aria-expanded', 'true')
    })

    it('non-exclusive keeps others open', () => {
      render(<Accordion options={accordionOptions} />)
      const buttons = screen.getAllByRole('button')

      fireEvent.click(buttons[1])
      fireEvent.click(buttons[2])
      expect(buttons[0]).toHaveAttribute('aria-expanded', 'true')
      expect(buttons[1]).toHaveAttribute('aria-expanded', 'true')
      expect(buttons[2]).toHaveAttribute('aria-expanded', 'true')
    })

    it('exclusive mode switches between panels', () => {
      render(<Accordion options={accordionOptions} exclusive />)
      const buttons = screen.getAllByRole('button')

      fireEvent.click(buttons[3])
      fireEvent.click(buttons[2])
      expect(buttons[0]).toHaveAttribute('aria-expanded', 'false')
      expect(buttons[3]).toHaveAttribute('aria-expanded', 'false')
      expect(buttons[2]).toHaveAttribute('aria-expanded', 'true')
    })

    it('exclusive mode with multiple defaultExpanded opens only first', () => {
      const multiDefaultOptions = [
        { title: 'Item 1', content: 'Content 1', defaultExpanded: true },
        { title: 'Item 2', content: 'Content 2', defaultExpanded: true },
        { title: 'Item 3', content: 'Content 3' },
      ]
      render(<Accordion options={multiDefaultOptions} exclusive />)
      const buttons = screen.getAllByRole('button')

      expect(buttons[0]).toHaveAttribute('aria-expanded', 'true')
      expect(buttons[1]).toHaveAttribute('aria-expanded', 'false')
      expect(buttons[2]).toHaveAttribute('aria-expanded', 'false')
    })

    it('onToggle fires on exclusive toggle', () => {
      const onToggle = jest.fn()
      render(<Accordion options={accordionOptions} exclusive onToggle={onToggle} />)
      const buttons = screen.getAllByRole('button')

      fireEvent.click(buttons[1])
      expect(onToggle).toHaveBeenCalledWith(1, true)
      fireEvent.click(buttons[1])
      expect(onToggle).toHaveBeenCalledWith(1, false)
    })

    it('onToggle fires on non-exclusive toggle', () => {
      const onToggle = jest.fn()
      render(<Accordion options={accordionOptions} onToggle={onToggle} />)
      const buttons = screen.getAllByRole('button')

      fireEvent.click(buttons[1])
      expect(onToggle).toHaveBeenCalledWith(1, true)
      fireEvent.click(buttons[1])
      expect(onToggle).toHaveBeenCalledWith(1, false)
    })
  })

  describe('Ref', () => {
    it('forwards ref', () => {
      const ref = createRef<HTMLDivElement>()
      render(<Accordion ref={ref} options={accordionOptions} />)

      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })
  })

  describe('Accessibility', () => {
    it('no axe violations', async () => {
      const { container } = render(<Accordion options={accordionOptions} />)

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
