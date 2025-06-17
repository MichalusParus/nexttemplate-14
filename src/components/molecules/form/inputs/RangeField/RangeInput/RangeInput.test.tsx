import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { fireEvent, render, screen } from '../../../../../../../.jest/customRender'
import { RangeInput } from './RangeInput'

expect.extend(toHaveNoViolations)

describe('RangeInput', () => {
  it('default', () => {
    render(
      <RangeInput className="className" name="rangeTest" min={30} max={60} onChange={() => {}} />,
    )
    const rangeWrapTestId = screen.getByTestId('RangeWrap')
    const rangeRole = screen.getByRole('slider')
    const spanTestId = screen.getByTestId('Span')

    expect(rangeWrapTestId).toBeInTheDocument()
    expect(rangeWrapTestId).toHaveClass('className')
    expect(rangeRole).toHaveAttribute('type', 'range')
    expect(rangeRole).toHaveAttribute('id', 'rangeTest')
    expect(rangeRole).toHaveAttribute('name', 'rangeTest')
    expect(rangeRole).toHaveAttribute('min', '30')
    expect(rangeRole).toHaveAttribute('max', '60')
    expect(spanTestId).toHaveTextContent('0')
    rangeRole.focus()
    expect(document.activeElement).toBe(rangeRole)
  })

  it('value', () => {
    render(<RangeInput name="rangeTest" value={50} onChange={() => {}} />)
    const rangeRole = screen.getByRole('slider')
    const spanTestId = screen.getByTestId('Span')

    expect(rangeRole).toHaveAttribute('value', '50')
    expect(spanTestId).toBeInTheDocument()
    expect(spanTestId).toHaveTextContent('50')
  })

  it('error', () => {
    render(<RangeInput name="rangeTest" error="error" onChange={() => {}} />)
    const rangeRole = screen.getByRole('slider')

    expect(rangeRole).toHaveClass('error')
  })

  it('onChange', () => {
    const spy = jest.fn()
    render(<RangeInput name="rangeTest" onChange={spy} />)
    const rangeRole = screen.getByRole('slider')

    fireEvent.change(rangeRole, {
      target: {
        value: 50,
      },
    })
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(50)
  })

  it('disabled', () => {
    render(<RangeInput className="className" name="rangeTest" disabled onChange={() => {}} />)
    const rangeRole = screen.getByRole('slider')

    expect(rangeRole).toHaveAttribute('disabled')
  })

  it('ref', () => {
    const ref = createRef<HTMLInputElement>()
    render(<RangeInput ref={ref} name="rangeTest" min={30} max={60} onChange={() => {}} />)

    expect(ref.current).not.toBeNull()
    expect(ref.current?.focus).toBeDefined()

    const focusMock = jest.spyOn(ref.current!, 'focus').mockImplementation(() => {})
    ref.current?.focus()

    expect(focusMock).toHaveBeenCalled()
    focusMock.mockRestore()
  })

  it('axe', async () => {
    const { container } = render(
      <label htmlFor="rangeTest">
        <RangeInput name="rangeTest" min={30} max={60} onChange={() => {}} />
      </label>,
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
