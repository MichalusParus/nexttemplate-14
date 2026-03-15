import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { fireEvent, render, screen } from '../../../../../.jest/customRender'
import { Dropdown } from '.'

expect.extend(toHaveNoViolations)

describe('Dropdown', () => {
  const anchorRef = createRef<HTMLDivElement>()

  it('default', () => {
    render(
      <Dropdown
        className="className"
        isOpen
        anchorRef={anchorRef}
        width={500}
        height="max-h-[40vh]"
        paddingX="px-4"
        paddingY="p-8"
        onClose={() => {}}
      >
        Children
      </Dropdown>,
    )
    const dropdownTestId = screen.getByTestId('Dropdown')
    const paperTestId = screen.getByTestId('Paper')
    const scrollShadowTestId = screen.getByTestId('ScrollShadow')
    const contentWrapTestId = screen.getByTestId('ContentWrap')

    expect(dropdownTestId).toBeInTheDocument()
    expect(dropdownTestId).toHaveClass('className')
    expect(dropdownTestId).toHaveStyle('width: 500px')
    expect(contentWrapTestId).toHaveClass('max-h-[40vh]')
    expect(dropdownTestId).toHaveTextContent('Children')
    expect(paperTestId).toHaveClass('p-8')
    expect(contentWrapTestId).toHaveClass('px-4')
    expect(scrollShadowTestId).toBeInTheDocument()
  })

  it('closed', () => {
    render(
      <Dropdown isOpen={false} anchorRef={anchorRef} onClose={() => {}}>
        Children
      </Dropdown>,
    )
    const dropdownQuery = screen.queryByTestId('Dropdown')

    expect(dropdownQuery).toBeNull()
  })

  it('modal', () => {
    const spy = jest.fn()
    render(
      <Dropdown isOpen anchorRef={anchorRef} modal onClose={spy}>
        Children
      </Dropdown>,
    )
    const dialogRole = screen.getByRole('dialog')
    const overlayTestId = screen.getByTestId('Overlay')

    expect(dialogRole).toBeInTheDocument()
    expect(dialogRole).toHaveAttribute('aria-modal', 'true')
    expect(overlayTestId).toBeInTheDocument()

    fireEvent.click(overlayTestId)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('portalContainerId', () => {
    const portalContainer = document.createElement('div')
    portalContainer.setAttribute('id', 'portalContainer')
    document.body.appendChild(portalContainer)
    render(
      <Dropdown isOpen anchorRef={anchorRef} portalContainerId="portalContainer" onClose={() => {}}>
        Children
      </Dropdown>,
    )
    const dropdownTestId = screen.getByTestId('Dropdown')

    expect(dropdownTestId.parentElement).toBe(portalContainer)
  })

  it('onClose', () => {
    const spy = jest.fn()
    render(
      <>
        <Dropdown isOpen anchorRef={anchorRef} onClose={spy}>
          <button data-testid="option" />
        </Dropdown>
        <button data-testid="next-button" />
      </>,
    )
    const optionTestId = screen.getByTestId('option')
    const nextButtonTestId = screen.getByTestId('next-button')

    optionTestId.focus()
    nextButtonTestId.focus()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('paperProps/scrollShadowProps', () => {
    render(
      <Dropdown
        isOpen
        anchorRef={anchorRef}
        paperProps={{ className: 'paperClass' }}
        scrollShadowProps={{ className: 'scrollShadowClass' }}
        onClose={() => {}}
      >
        Children
      </Dropdown>,
    )
    const paperTestId = screen.getByTestId('Paper')
    const scrollShadowTestId = screen.getByTestId('ScrollShadow')

    expect(paperTestId).toHaveClass('paperClass')
    expect(scrollShadowTestId).toHaveClass('scrollShadowClass')
  })

  it('ref', () => {
    const ref = createRef<HTMLDivElement>()
    render(
      <Dropdown isOpen anchorRef={anchorRef} onClose={() => {}} ref={ref}>
        Children
      </Dropdown>,
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
      <Dropdown isOpen anchorRef={anchorRef} onClose={() => {}}>
        Children
      </Dropdown>,
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
