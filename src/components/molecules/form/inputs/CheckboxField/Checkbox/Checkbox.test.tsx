import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { fireEvent, render, screen } from '../../../../../../../.jest/customRender'
import { Checkbox } from '.'

expect.extend(toHaveNoViolations)

describe('Checkbox', () => {
  it('default', () => {
    render(
      <Checkbox
        className="className"
        name="checkboxTest"
        label="label"
        isChecked={false}
        onChange={() => {}}
      />,
    )
    const checkboxWrapTestId = screen.getByTestId('CheckboxWrap')
    const checkboxRole = screen.getByRole('checkbox')
    const labelTestId = screen.getByTestId('Label')
    const checkTestId = screen.getByTestId('CheckIcon')

    expect(checkboxWrapTestId).toBeInTheDocument()
    expect(checkboxWrapTestId).toHaveClass('className')
    expect(checkboxRole).toHaveAttribute('id', 'checkboxTest')
    expect(checkboxRole).toHaveAttribute('name', 'checkboxTest')
    expect(checkboxRole).toHaveAttribute('type', 'checkbox')
    expect(checkboxRole).not.toHaveAttribute('checked')
    expect(labelTestId).toBeInTheDocument()
    expect(labelTestId).toHaveTextContent('label')
    expect(labelTestId).toHaveAttribute('for', 'checkboxTest')
    expect(labelTestId).toHaveAttribute('id', 'checkboxTest-label')
    expect(checkTestId).toBeInTheDocument()
    expect(checkTestId).toHaveClass('opacity-0')
    checkboxRole.focus()
    expect(document.activeElement).toBe(checkboxRole)
  })

  it('switch', () => {
    render(
      <Checkbox
        name="checkboxTest"
        label="label"
        variant="switch"
        error="error"
        isChecked={false}
        onChange={() => {}}
      />,
    )
    const switchThumbTestId = screen.getByTestId('SwitchThumb')
    const checkboxRole = screen.getByRole('checkbox')

    expect(switchThumbTestId).toBeInTheDocument()
    expect(checkboxRole).toHaveAttribute('id', 'checkboxTest')
    expect(checkboxRole).toHaveAttribute('name', 'checkboxTest')
    expect(checkboxRole).toHaveAttribute('type', 'checkbox')
    expect(checkboxRole).not.toHaveAttribute('checked')
  })

  it('error', () => {
    render(
      <Checkbox
        name="checkboxTest"
        label="label"
        error="error"
        isChecked={false}
        onChange={() => {}}
      />,
    )
    const inputWrapTestId = screen.getByTestId('CheckboxInputWrap')

    expect(inputWrapTestId).toHaveClass('error')
  })

  it('fake', () => {
    render(
      <Checkbox
        name="checkboxTest"
        label="label"
        error="error"
        isChecked={false}
        onChange={() => {}}
        fake
      />,
    )
    const checkboxQuery = screen.queryByRole('checkbox')

    expect(checkboxQuery).toBeNull()
  })

  it('isChecked', () => {
    render(
      <Checkbox
        className="className"
        name="checkboxTest"
        label="label"
        error="error"
        isChecked
        onChange={() => {}}
      />,
    )
    const checkboxRole = screen.getByRole('checkbox')
    const checkTestId = screen.getByTestId('CheckIcon')

    expect(checkboxRole).toHaveAttribute('checked')
    expect(checkTestId).toHaveClass('opacity-100')
  })

  it('onChange', () => {
    const spy = jest.fn()
    render(
      <Checkbox
        className="className"
        name="checkboxTest"
        label="label"
        error="error"
        isChecked={false}
        onChange={spy}
      />,
    )
    const checkboxRole = screen.getByRole('checkbox')

    fireEvent.click(checkboxRole)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('disabled', () => {
    render(
      <Checkbox
        className="className"
        name="checkboxTest"
        label="label"
        error="error"
        isChecked={false}
        disabled
        onChange={() => {}}
      />,
    )
    const checkboxRole = screen.getByRole('checkbox')

    expect(checkboxRole).toHaveAttribute('disabled')
  })

  it('ref', () => {
    const ref = createRef<HTMLInputElement>()
    render(
      <Checkbox
        ref={ref}
        name="checkboxTest"
        label="label"
        isChecked={false}
        onChange={() => {}}
      />,
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
      <Checkbox name="checkboxTest" label="label" isChecked={false} onChange={() => {}} />,
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
