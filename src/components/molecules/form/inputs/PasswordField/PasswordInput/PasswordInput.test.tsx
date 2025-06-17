import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { fireEvent, render, screen } from '../../../../../../../.jest/customRender'
import { PasswordInput } from '.'

expect.extend(toHaveNoViolations)

describe('PasswordInput', () => {
  it('default', () => {
    render(
      <PasswordInput
        className="className"
        name="passwordTest"
        placeholder="placeholder"
        onChange={() => {}}
      />,
    )
    const inputWrapTestId = screen.getByTestId('InputWrap')
    const passwordtestId = screen.getByTestId('PasswordInput')

    expect(inputWrapTestId).toBeInTheDocument()
    expect(inputWrapTestId).toHaveClass('className')
    expect(passwordtestId).toHaveAttribute('type', 'password')
    expect(passwordtestId).toHaveAttribute('id', 'passwordTest')
    expect(passwordtestId).toHaveAttribute('name', 'passwordTest')
    expect(passwordtestId).toHaveAttribute('placeholder', 'placeholder')
    passwordtestId.focus()
    expect(document.activeElement).toBe(passwordtestId)
  })

  it('value', () => {
    render(<PasswordInput name="name" value="value" onChange={() => {}} />)
    const passwordtestId = screen.getByTestId('PasswordInput')

    expect(passwordtestId).toHaveValue('value')
  })

  it('unmask', () => {
    render(<PasswordInput name="name" value="value" onChange={() => {}} />)
    const buttonRole = screen.getByRole('button')
    const passwordtestId = screen.getByTestId('PasswordInput')

    expect(passwordtestId).toHaveAttribute('type', 'password')
    expect(buttonRole).toBeInTheDocument()
    expect(buttonRole).toHaveAttribute('aria-label')
    fireEvent.click(buttonRole)
    expect(passwordtestId).toHaveAttribute('type', 'text')
  })

  it('error', () => {
    render(<PasswordInput name="name" error="error" onChange={() => {}} />)
    const inputWrapTestId = screen.getByTestId('InputWrap')

    expect(inputWrapTestId).toHaveClass('error')
  })

  it('onChange', () => {
    const spy = jest.fn()
    render(<PasswordInput name="name" value="value" onChange={spy} />)
    const passwordtestId = screen.getByTestId('PasswordInput')

    fireEvent.change(passwordtestId, {
      target: {
        value: 'newvalue',
      },
    })
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith('newvalue')
  })

  it('disabled', () => {
    render(<PasswordInput name="name" value="" disabled onChange={() => {}} />)
    const passwordtestId = screen.getByTestId('PasswordInput')

    expect(passwordtestId).toHaveAttribute('disabled')
  })

  it('ref', () => {
    const ref = createRef<HTMLInputElement>()
    render(
      <PasswordInput ref={ref} name="passwordTest" placeholder="placeholder" onChange={() => {}} />,
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
      <PasswordInput name="passwordTest" placeholder="placeholder" onChange={() => {}} />,
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
