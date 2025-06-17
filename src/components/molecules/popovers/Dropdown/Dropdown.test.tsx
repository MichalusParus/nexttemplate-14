import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { fireEvent, render, screen } from '../../../../../.jest/customRender'
import { Dropdown } from '.'

expect.extend(toHaveNoViolations)

// modal,

describe('Dropdown', () => {
  it('default', () => {
    const ref = createRef<HTMLDivElement>()
    render(
      <Dropdown
        className="className"
        isOpen
        parentRef={ref}
        width={500}
        height="max-h-[40vh]"
        padding="p-8"
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
    expect(dropdownTestId).toHaveAttribute('aria-hidden', 'false')
    expect(paperTestId).toBeInTheDocument()
    expect(paperTestId).toHaveClass('p-8')
    expect(scrollShadowTestId).toBeInTheDocument()
  })

  it('closed', () => {
    const ref = createRef<HTMLDivElement>()
    render(
      <Dropdown isOpen={false} parentRef={ref} onClose={() => {}}>
        Children
      </Dropdown>,
    )
    const dropdownQuery = screen.queryByTestId('Dropdown')

    expect(dropdownQuery).toBeNull()
  })

  it('portalContainerId', () => {
    const ref = createRef<HTMLDivElement>()
    const portalContainer = document.createElement('div')
    portalContainer.setAttribute('id', 'portalContainer')
    document.body.appendChild(portalContainer)
    render(
      <Dropdown isOpen parentRef={ref} portalContainerId="portalContainer" onClose={() => {}}>
        Children
      </Dropdown>,
    )
    const dropdownTestId = screen.getByTestId('Dropdown')

    expect(dropdownTestId.parentElement).toBe(portalContainer)
  })

  it('onClose', () => {
    const spy = jest.fn()
    const ref = createRef<HTMLDivElement>()
    render(
      <Dropdown isOpen modal parentRef={ref} onClose={spy}>
        Children
      </Dropdown>,
    )
    const overlayTestId = screen.getByTestId('Overlay')

    fireEvent.click(overlayTestId)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('paperProps/scrollShadowProps', () => {
    const ref = createRef<HTMLDivElement>()
    render(
      <Dropdown
        isOpen
        parentRef={ref}
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
      <Dropdown isOpen parentRef={ref} onClose={() => {}} ref={ref}>
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
    const ref = createRef<HTMLDivElement>()
    const { container } = render(
      <Dropdown isOpen parentRef={ref} onClose={() => {}}>
        Children
      </Dropdown>,
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
