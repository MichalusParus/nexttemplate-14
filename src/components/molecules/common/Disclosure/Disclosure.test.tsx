import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef, useState } from 'react'

import { fireEvent, render, screen } from '../../../../../.jest/customRender'
import { Disclosure } from '.'

expect.extend(toHaveNoViolations)

describe('Disclosure', () => {
  it('default', () => {
    render(
      <Disclosure className="className" title="Disclosure">
        Children
      </Disclosure>,
    )
    const disclosureTestId = screen.getByTestId('Disclosure')
    const buttonRole = screen.getByRole('button')
    const dropdownTestId = screen.getByTestId('DisclosureDropdown')
    const startIconQuery = screen.queryByTestId('StartIcon')
    const endIconQuery = screen.queryByTestId('EndIcon')

    expect(disclosureTestId).toBeInTheDocument()
    expect(disclosureTestId).toHaveClass('className')
    expect(buttonRole).toBeInTheDocument()
    expect(buttonRole).toHaveTextContent('Disclosure')
    expect(buttonRole).toHaveAttribute('aria-expanded', 'false')
    expect(buttonRole).toHaveAttribute('aria-controls', dropdownTestId.getAttribute('id'))
    expect(dropdownTestId).toBeInTheDocument()
    expect(dropdownTestId).toHaveTextContent('Children')
    expect(dropdownTestId).toHaveAttribute('id', buttonRole.getAttribute('aria-controls'))
    expect(dropdownTestId).toHaveAttribute('hidden')
    expect(startIconQuery).toBeNull()
    expect(endIconQuery).toBeInTheDocument()
    buttonRole.focus()
    expect(document.activeElement).toBe(buttonRole)
  })

  it('chevronPosition', () => {
    render(
      <Disclosure title="Disclosure" chevronPosition="start">
        Children
      </Disclosure>,
    )
    const startIconQuery = screen.queryByTestId('StartIcon')
    const endIconQuery = screen.queryByTestId('EndIcon')

    expect(startIconQuery).toBeInTheDocument()
    expect(endIconQuery).toBeNull()
  })

  it('optionalProps', () => {
    render(
      <Disclosure title="Disclosure" height="max-h-96" expanded={true}>
        Children
      </Disclosure>,
    )
    const scrollContentWrapTestId = screen.getByTestId('ContentWrap')

    expect(scrollContentWrapTestId).toHaveClass('max-h-96')
  })

  it('expanded', () => {
    render(
      <Disclosure title="Disclosure" expanded>
        Children
      </Disclosure>,
    )
    const buttonRole = screen.getByRole('button')
    const dropdownTestId = screen.getByTestId('DisclosureDropdown')

    expect(dropdownTestId).not.toHaveAttribute('hidden')
    expect(buttonRole).toHaveAttribute('aria-expanded', 'true')
  })

  it('onClick', () => {
    render(<Disclosure title="Disclosure">Children</Disclosure>)
    const buttonRole = screen.getByRole('button')
    const dropdownTestId = screen.getByTestId('DisclosureDropdown')

    fireEvent.click(buttonRole)
    expect(dropdownTestId).not.toHaveAttribute('hidden')
    expect(buttonRole).toHaveAttribute('aria-expanded', 'true')
    fireEvent.click(buttonRole)
    expect(dropdownTestId).toHaveAttribute('hidden')
    expect(buttonRole).toHaveAttribute('aria-expanded', 'false')
  })

  it('controlled', () => {
    const ControlledDisclosure = () => {
      const [isOpen, setIsOpen] = useState(false)
      return (
        <Disclosure title="Controlled Disclosure" expanded={isOpen} setIsOpen={setIsOpen}>
          Controlled Children
        </Disclosure>
      )
    }
    render(<ControlledDisclosure />)
    const buttonRole = screen.getByRole('button')
    const dropdownTestId = screen.getByTestId('DisclosureDropdown')

    fireEvent.click(buttonRole)
    expect(dropdownTestId).not.toHaveAttribute('hidden')
    expect(buttonRole).toHaveAttribute('aria-expanded', 'true')
    fireEvent.click(buttonRole)
    expect(dropdownTestId).toHaveAttribute('hidden')
    expect(buttonRole).toHaveAttribute('aria-expanded', 'false')
  })

  it('buttonProps/paperProps/scrollShadowProps', () => {
    render(
      <Disclosure
        title="Disclosure"
        buttonProps={{ className: 'buttonClass' }}
        paperProps={{ className: 'paperClass' }}
        scrollShadowProps={{ className: 'scrollShadowClass' }}
      >
        Children
      </Disclosure>,
    )
    const buttonRole = screen.getByRole('button')
    const paperTestId = screen.getByTestId('Paper')
    const scrollShadowTestId = screen.getByTestId('ScrollShadow')

    expect(buttonRole).toHaveClass('buttonClass')
    expect(paperTestId).toHaveClass('paperClass')
    expect(scrollShadowTestId).toHaveClass('scrollShadowClass')
  })

  it('ref', () => {
    const ref = createRef<HTMLDivElement>()
    render(
      <Disclosure ref={ref} title="Disclosure">
        Children
      </Disclosure>,
    )

    expect(ref.current).not.toBeNull()
    expect(ref.current?.focus).toBeDefined()

    const focusMock = jest.spyOn(ref.current!, 'focus').mockImplementation(() => {})
    ref.current?.focus()

    expect(focusMock).toHaveBeenCalled()
    focusMock.mockRestore()
  })

  it('axe', async () => {
    const { container } = render(
      <Disclosure className="className" title="Disclosure">
        Children
      </Disclosure>,
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
