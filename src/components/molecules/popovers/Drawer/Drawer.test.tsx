import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { fireEvent, render, screen } from '../../../../../.jest/customRender'
import { Drawer } from '.'

expect.extend(toHaveNoViolations)

describe('Drawer', () => {
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
        onClose={() => {}}
      >
        Children
      </Drawer>,
    )
    const drawerRole = screen.getByRole('dialog')
    const paperTestId = screen.getByTestId('Paper')
    const scrollShadowTestId = screen.getByTestId('ScrollShadow')

    expect(drawerRole).toBeInTheDocument()
    expect(drawerRole).toHaveClass('className')
    expect(drawerRole).toHaveClass('w-1/3')
    expect(drawerRole).toHaveClass('top-0 bottom-0')
    expect(drawerRole).toHaveClass('left-0 opacity-100')
    expect(drawerRole).toHaveTextContent('Children')
    expect(drawerRole.tagName).toBe('ASIDE')
    expect(drawerRole).toHaveAttribute('id', 'drawerTest')
    expect(drawerRole).toHaveAttribute('aria-label', 'drawerTest')
    expect(drawerRole).toHaveAttribute('aria-modal', 'true')
    expect(drawerRole).toHaveAttribute('aria-hidden', 'false')
    expect(paperTestId).toBeInTheDocument()
    expect(paperTestId).toHaveClass('p-8')
    expect(scrollShadowTestId).toBeInTheDocument()
  })

  it('closed', () => {
    render(
      <Drawer name="drawerTest" isOpen={false} onClose={() => {}}>
        Children
      </Drawer>,
    )
    const drawerQuery = screen.queryByRole('dialog')

    expect(drawerQuery).toBeNull()
  })

  it('right', () => {
    render(
      <Drawer name="drawerTest" isOpen={true} placement="right" onClose={() => {}}>
        Children
      </Drawer>,
    )
    const drawerRole = screen.getByRole('dialog')

    expect(drawerRole).toHaveClass('right-0')
  })

  it('portalContainerId', () => {
    const portalContainer = document.createElement('div')
    portalContainer.setAttribute('id', 'portalContainer')
    document.body.appendChild(portalContainer)
    render(
      <Drawer
        name="drawerTest"
        isOpen={true}
        portalContainerId="portalContainer"
        onClose={() => {}}
      >
        Children
      </Drawer>,
    )
    const drawerRole = screen.getByRole('dialog')

    expect(drawerRole.parentElement).toBe(portalContainer)
  })

  it('onClose', () => {
    const spy = jest.fn()
    render(
      <Drawer name="drawerTest" isOpen={true} onClose={spy}>
        Children
      </Drawer>,
    )
    const overlayTestId = screen.getByTestId('Overlay')

    fireEvent.click(overlayTestId)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('paperProps/scrollShadowProps', () => {
    render(
      <Drawer
        name="drawerTest"
        isOpen={true}
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
      <Drawer name="drawerTest" label="drawerTest" isOpen={true} ref={ref} onClose={() => {}}>
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
      <Drawer name="drawerTest" isOpen={true} onClose={() => {}}>
        Children
      </Drawer>,
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
