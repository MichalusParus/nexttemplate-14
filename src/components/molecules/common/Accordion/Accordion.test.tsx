import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { fireEvent, render, screen } from '../../../../../.jest/customRender'
import { accordionOptions } from '../../../../../.storybook/helpers'
import { Accordion } from '.'

expect.extend(toHaveNoViolations)

describe('Accordion', () => {
  it('default', () => {
    render(<Accordion className="className" gap="gap-6" options={accordionOptions} />)
    const accordionTestId = screen.getByTestId('Accordion')
    const disclosureTestIds = screen.getAllByTestId('Disclosure')
    const disclosureButtonRole = screen.getAllByRole('button')
    const disclosureDropdownTestIds = screen.getAllByTestId('DisclosureDropdown')

    expect(accordionTestId).toBeInTheDocument()
    expect(accordionTestId).toHaveClass('className')
    expect(accordionTestId).toHaveClass('gap-6')
    expect(disclosureTestIds).toHaveLength(accordionOptions.length)
    expect(disclosureButtonRole).toHaveLength(accordionOptions.length)
    expect(disclosureButtonRole[0]).toHaveTextContent(accordionOptions[0].title)
    expect(disclosureButtonRole[1]).toHaveTextContent(accordionOptions[1].title)
    expect(disclosureDropdownTestIds).toHaveLength(accordionOptions.length)
    expect(disclosureDropdownTestIds[0]).toHaveTextContent(accordionOptions[0].content)
    expect(disclosureDropdownTestIds[1]).toHaveTextContent(accordionOptions[1].content)
    disclosureButtonRole[0].focus()
    expect(document.activeElement).toBe(disclosureButtonRole[0])
  })

  it('expanded/click', () => {
    render(<Accordion options={accordionOptions} />)
    const disclosureButtonRole = screen.getAllByRole('button')
    const disclosureDropdownTestIds = screen.getAllByTestId('DisclosureDropdown')

    expect(disclosureDropdownTestIds[0]).not.toHaveAttribute('hidden')
    expect(disclosureButtonRole[0]).toHaveAttribute('aria-expanded', 'true')
    expect(disclosureDropdownTestIds[1]).toHaveAttribute('hidden')
    expect(disclosureButtonRole[1]).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(disclosureButtonRole[1])
    expect(disclosureDropdownTestIds[1]).not.toHaveAttribute('hidden')
    expect(disclosureButtonRole[1]).toHaveAttribute('aria-expanded', 'true')
  })

  it('exclusive', () => {
    render(<Accordion options={accordionOptions} exclusive />)
    const disclosureButtonRole = screen.getAllByRole('button')
    const disclosureDropdownTestIds = screen.getAllByTestId('DisclosureDropdown')

    expect(disclosureDropdownTestIds[0]).not.toHaveAttribute('hidden')
    expect(disclosureButtonRole[0]).toHaveAttribute('aria-expanded', 'true')
    expect(disclosureDropdownTestIds[3]).toHaveAttribute('hidden')
    expect(disclosureButtonRole[3]).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(disclosureButtonRole[3])
    expect(disclosureDropdownTestIds[0]).toHaveAttribute('hidden')
    expect(disclosureButtonRole[0]).toHaveAttribute('aria-expanded', 'false')
    expect(disclosureDropdownTestIds[3]).not.toHaveAttribute('hidden')
    expect(disclosureButtonRole[3]).toHaveAttribute('aria-expanded', 'true')
    fireEvent.click(disclosureButtonRole[2])
    expect(disclosureDropdownTestIds[0]).toHaveAttribute('hidden')
    expect(disclosureButtonRole[0]).toHaveAttribute('aria-expanded', 'false')
    expect(disclosureDropdownTestIds[3]).toHaveAttribute('hidden')
    expect(disclosureButtonRole[3]).toHaveAttribute('aria-expanded', 'false')
    expect(disclosureDropdownTestIds[2]).not.toHaveAttribute('hidden')
    expect(disclosureButtonRole[2]).toHaveAttribute('aria-expanded', 'true')
  })

  it('disclosuresProps', () => {
    render(<Accordion options={accordionOptions} disclosuresProps={{ className: 'className' }} />)
    const disclosureTestIds = screen.getAllByTestId('Disclosure')

    expect(disclosureTestIds[0]).toHaveClass('className')
    expect(disclosureTestIds[1]).toHaveClass('className')
    expect(disclosureTestIds[2]).toHaveClass('className')
  })

  it('ref', () => {
    const ref = createRef<HTMLDivElement>()
    render(<Accordion ref={ref} options={accordionOptions} />)

    expect(ref.current).not.toBeNull()
    expect(ref.current?.focus).toBeDefined()

    const focusMock = jest.spyOn(ref.current!, 'focus').mockImplementation(() => {})
    ref.current?.focus()

    expect(focusMock).toHaveBeenCalled()
    focusMock.mockRestore()
  })

  it('axe', async () => {
    const { container } = render(<Accordion options={accordionOptions} />)

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
