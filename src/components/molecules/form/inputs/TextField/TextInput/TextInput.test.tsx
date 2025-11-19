import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { fireEvent, render, screen } from '../../../../../../../.jest/customRender'
import { TextInput } from '.'

expect.extend(toHaveNoViolations)

describe('TextInput', () => {
  it('default', () => {
    render(
      <TextInput
        className="className"
        name="inputTest"
        placeholder="placeholder"
        onChange={() => {}}
      />,
    )
    const inputWrapTestId = screen.getByTestId('InputWrap')
    const inputRole = screen.getByRole('textbox')

    expect(inputWrapTestId).toBeInTheDocument()
    expect(inputWrapTestId).toHaveClass('className')
    expect(inputRole).toHaveAttribute('type', 'text')
    expect(inputRole).toHaveAttribute('id', 'inputTest')
    expect(inputRole).toHaveAttribute('name', 'inputTest')
    expect(inputRole).toHaveAttribute('placeholder', 'placeholder')
    inputRole.focus()
    expect(document.activeElement).toBe(inputRole)
  })

  it('value', () => {
    render(<TextInput name="name" value="value" onChange={() => {}} />)
    const inputRole = screen.getByRole('textbox')

    expect(inputRole).toHaveAttribute('value', 'value')
  })

  it('startIcon', () => {
    render(
      <TextInput name="inputTest" startIcon={<svg data-testid="testSvg" />} onChange={() => {}} />,
    )
    const svgTestId = screen.getByTestId('testSvg')

    expect(svgTestId).toBeInTheDocument()
  })

  it('endIcon', () => {
    render(
      <TextInput name="inputTest" endIcon={<svg data-testid="testSvg" />} onChange={() => {}} />,
    )
    const svgTestId = screen.getByTestId('testSvg')

    expect(svgTestId).toBeInTheDocument()
  })

  it('error', () => {
    render(<TextInput name="inputTest" error="error" onChange={() => {}} />)
    const inputWrapTestId = screen.getByTestId('InputWrap')

    expect(inputWrapTestId).toHaveClass('error')
  })

  it('onChange', () => {
    const spy = jest.fn()
    render(<TextInput name="name" value="value" onChange={spy} />)
    const inputRole = screen.getByRole('textbox')

    fireEvent.change(inputRole, {
      target: {
        value: 'newvalue',
      },
    })
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith('newvalue')
  })

  it('disabled', () => {
    render(<TextInput name="name" value="" disabled onChange={() => {}} />)
    const inputRole = screen.getByRole('textbox')
    const inputWrapTestId = screen.getByTestId('InputWrap')

    expect(inputRole).toHaveAttribute('disabled')
    expect(inputWrapTestId).toHaveAttribute('aria-disabled', 'true')
    expect(inputWrapTestId).toHaveClass('disabled')
  })

  it('ref', () => {
    const ref = createRef<HTMLInputElement>()
    render(<TextInput ref={ref} name="inputTest" placeholder="placeholder" onChange={() => {}} />)

    expect(ref.current).not.toBeNull()
    expect(ref.current?.focus).toBeDefined()

    const focusMock = jest.spyOn(ref.current!, 'focus').mockImplementation(() => {})
    ref.current?.focus()

    expect(focusMock).toHaveBeenCalled()
    focusMock.mockRestore()
  })

  it('axe', async () => {
    const { container } = render(
      <TextInput name="inputTest" placeholder="placeholder" onChange={() => {}} />,
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
