import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { fireEvent, render, screen } from '../../../../../.jest/customRender'
import { Drawer } from '.'

expect.extend(toHaveNoViolations)

describe('Drawer', () => {
  const anchorRef = createRef<HTMLButtonElement>()
  it('default', () => {
    render(
      <Drawer
        className="className"
        name="drawerTest"
        label="drawerTest"
        width="w-1/3"
        padding="p-8"
        offsetY="top-0 bottom-0"
        isOpen={true}
        anchorRef={anchorRef}
        onClose={() => {}}
      >
        Children
      </Drawer>,
    )
    const drawerTestId = screen.getByTestId('Drawer')
    const paperTestId = screen.getByTestId('Paper')
    const scrollShadowTestId = screen.getByTestId('ScrollShadow')

    expect(drawerTestId).toBeInTheDocument()
    expect(drawerTestId).toHaveClass('className')
    expect(drawerTestId).toHaveClass('w-1/3')
    expect(drawerTestId).toHaveClass('top-0 bottom-0')
    expect(drawerTestId).toHaveClass('left-0 opacity-100')
    expect(drawerTestId).toHaveTextContent('Children')
    expect(drawerTestId.tagName).toBe('ASIDE')
    expect(drawerTestId).toHaveAttribute('id', 'drawerTest')
    expect(drawerTestId).toHaveAttribute('aria-label', 'drawerTest')
    expect(drawerTestId).toHaveAttribute('aria-modal', 'false')
    expect(paperTestId).toBeInTheDocument()
    expect(paperTestId).toHaveClass('p-8')
    expect(scrollShadowTestId).toBeInTheDocument()
  })

  it('closed', () => {
    render(
      <Drawer name="drawerTest" isOpen={false} anchorRef={anchorRef} onClose={() => {}}>
        Children
      </Drawer>,
    )
    const drawerQuery = screen.queryByTestId('Drawer')

    expect(drawerQuery).toBeNull()
  })

  it('modal', () => {
    const spy = jest.fn()
    render(
      <Drawer
        name="drawerTest"
        isOpen={true}
        anchorRef={anchorRef}
        modal
        placement="right"
        onClose={spy}
      >
        Children
      </Drawer>,
    )
    const dialogRole = screen.getByRole('dialog')
    const overlayTestId = screen.getByTestId('Overlay')

    expect(dialogRole).toBeInTheDocument()
    expect(dialogRole).toHaveAttribute('aria-modal', 'true')
    expect(overlayTestId).toBeInTheDocument()

    fireEvent.click(overlayTestId)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('right', () => {
    render(
      <Drawer
        name="drawerTest"
        isOpen={true}
        anchorRef={anchorRef}
        placement="right"
        onClose={() => {}}
      >
        Children
      </Drawer>,
    )
    const drawerTestId = screen.getByTestId('Drawer')

    expect(drawerTestId).toHaveClass('right-0')
  })

  it('portalContainerId', () => {
    const portalContainer = document.createElement('div')
    portalContainer.setAttribute('id', 'portalContainer')
    document.body.appendChild(portalContainer)
    render(
      <Drawer
        name="drawerTest"
        isOpen={true}
        anchorRef={anchorRef}
        portalContainerId="portalContainer"
        onClose={() => {}}
      >
        Children
      </Drawer>,
    )
    const drawerTestId = screen.getByTestId('Drawer')

    expect(drawerTestId.parentElement).toBe(portalContainer)
  })

  it('onClose', () => {
    const spy = jest.fn()
    render(
      <>
        <Drawer name="drawerTest" isOpen={true} anchorRef={anchorRef} onClose={spy}>
          <button data-testid="option" />
        </Drawer>
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
      <Drawer
        name="drawerTest"
        isOpen={true}
        anchorRef={anchorRef}
        paperProps={{ className: 'paperClass' }}
        scrollShadowProps={{ className: 'scrollShadowClass' }}
        onClose={() => {}}
      >
        Children
      </Drawer>,
    )
    const paperTestId = screen.getByTestId('Paper')
    const scrollShadowTestId = screen.getByTestId('ScrollShadow')

    expect(paperTestId).toHaveClass('paperClass')
    expect(scrollShadowTestId).toHaveClass('scrollShadowClass')
  })

  it('ref', () => {
    const ref = createRef<HTMLDivElement>()
    render(
      <Drawer
        name="drawerTest"
        label="drawerTest"
        isOpen={true}
        anchorRef={anchorRef}
        ref={ref}
        onClose={() => {}}
      >
        Children
      </Drawer>,
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
      <Drawer name="drawerTest" isOpen={true} anchorRef={anchorRef} onClose={() => {}}>
        Children
      </Drawer>,
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
