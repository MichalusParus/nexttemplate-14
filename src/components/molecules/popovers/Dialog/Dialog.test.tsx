import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { fireEvent, render, screen } from '../../../../../.jest/customRender'
import { Dialog } from '.'

expect.extend(toHaveNoViolations)

describe('Dialog', () => {
  it('default', () => {
    const spy = jest.fn()
    render(
      <Dialog
        className="className"
        name="test"
        label="label"
        paddingX="px-4" paddingY="py-4"
        width="w-64"
        isOpen
        setIsOpen={spy}
      >
        Children
      </Dialog>,
    )
    const dialogRole = screen.getByRole('dialog')
    const paperTestId = screen.getByTestId('Paper')
    const contentWrapTestId = screen.getByTestId('ContentWrap')
    const XButtonTestId = screen.getByTestId('XButton')

    expect(dialogRole).toBeInTheDocument()
    expect(dialogRole).toHaveClass('className')
    expect(dialogRole).toHaveAttribute('id', 'test')
    expect(dialogRole).toHaveTextContent('Children')
    expect(dialogRole).toHaveAttribute('aria-modal', 'true')
    expect(dialogRole).toHaveAttribute('aria-label', 'label')
    expect(dialogRole).toHaveClass('w-64')
    expect(paperTestId).toHaveClass('py-4')
    expect(contentWrapTestId).toHaveClass('px-4')
    expect(XButtonTestId).toBeInTheDocument()

    fireEvent.click(XButtonTestId)
    expect(spy).toHaveBeenCalled()
  })

  it('closed', () => {
    render(
      <Dialog className="className" name="test" isOpen={false} setIsOpen={() => {}}>
        Children
      </Dialog>,
    )
    const dialogQuery = screen.queryByRole('dialog')

    expect(dialogQuery).toBeNull()
  })

  it('title', () => {
    render(
      <Dialog className="className" name="test" title="Title" isOpen setIsOpen={() => {}}>
        Children
      </Dialog>,
    )
    const dialogRole = screen.getByRole('dialog')
    const headingRole = screen.getByRole('heading')

    expect(dialogRole).toHaveAttribute('aria-labelledby', 'test-title')
    expect(headingRole).toHaveTextContent('Title')
  })

  it('hideXButton', () => {
    render(
      <Dialog className="className" name="test" hideXButton isOpen setIsOpen={() => {}}>
        Children
      </Dialog>,
    )
    const XButtonQuery = screen.queryByTestId('XButton')

    expect(XButtonQuery).toBeNull()
  })

  it('actions', () => {
    const spy = jest.fn()
    render(
      <Dialog
        className="className"
        name="test"
        dialogActions={<button data-testid="button">Action</button>}
        closeButton
        isOpen
        setIsOpen={spy}
      >
        Children
      </Dialog>,
    )
    const closeButtonTestId = screen.getByTestId('CloseButton')
    const buttonTestId = screen.getByTestId('button')

    expect(closeButtonTestId).toBeInTheDocument()
    expect(buttonTestId).toBeInTheDocument()

    fireEvent.click(closeButtonTestId)
    expect(spy).toHaveBeenCalled()
  })

  it('paperProps/titleProps', () => {
    render(
      <Dialog
        className="className"
        name="test"
        title="title"
        isOpen
        setIsOpen={() => {}}
        paperProps={{ className: 'paperClass' }}
        titleProps={{ className: 'titleClass' }}
      >
        Children
      </Dialog>,
    )
    const paperTestId = screen.getByTestId('Paper')
    const headingRole = screen.getByRole('heading')

    expect(paperTestId).toHaveClass('paperClass')
    expect(headingRole).toHaveClass('titleClass')
  })

  it('ref', () => {
    const ref = createRef<HTMLDivElement>()
    render(
      <Dialog className="className" name="test" isOpen setIsOpen={() => {}} ref={ref}>
        Children
      </Dialog>,
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
      <Dialog className="className" name="test" isOpen setIsOpen={() => {}}>
        Children
      </Dialog>,
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
