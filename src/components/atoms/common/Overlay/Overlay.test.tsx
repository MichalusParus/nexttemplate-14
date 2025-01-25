import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { fireEvent, render, screen } from '../../../../../.jest/customRender'
import { Overlay } from '.'

expect.extend(toHaveNoViolations)

describe('Overlay', () => {
  it('default', () => {
    render(<Overlay isOpen={false} onClose={() => {}} className="className" />)
    const overlayTestId = screen.getByTestId('Overlay')

    expect(overlayTestId).toBeInTheDocument()
    expect(overlayTestId).toHaveClass('className')
    expect(overlayTestId).toHaveAttribute('type', 'button')
  })

  it('onClose', () => {
    const spy = jest.fn()
    render(<Overlay isOpen={false} onClose={spy} />)
    const overlayTestId = screen.getByTestId('Overlay')

    fireEvent.click(overlayTestId)
    expect(spy).toHaveBeenCalled()
  })

  it('ref', () => {
    const ref = createRef<HTMLButtonElement>()
    render(<Overlay isOpen={false} onClose={() => {}} ref={ref} />)

    expect(ref.current).not.toBeNull()
    expect(ref.current?.focus).toBeDefined()

    const focusMock = jest.spyOn(ref.current!, 'focus').mockImplementation(() => {})
    ref.current?.focus()

    expect(focusMock).toHaveBeenCalled()
    focusMock.mockRestore()
  })

  it('axe', async () => {
    const { container } = render(<Overlay isOpen={false} onClose={() => {}} />)

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
