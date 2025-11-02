import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { fireEvent, render, screen } from '../../../../../../../.jest/customRender'
import { Switch } from '.'

expect.extend(toHaveNoViolations)

describe('Switch', () => {
  it('default', () => {
    render(
      <Switch
        className="className"
        name="switchTest"
        label="label"
        isChecked={false}
        onChange={() => {}}
      />,
    )
    const switchWrapTestId = screen.getByTestId('SwitchWrap')
    const switchRole = screen.getByRole('checkbox')
    const labelTestId = screen.getByTestId('Label')
    const thumbTestId = screen.getByTestId('SwitchThumb')

    expect(switchWrapTestId).toBeInTheDocument()
    expect(switchWrapTestId).toHaveClass('className')
    expect(switchRole).toHaveAttribute('id', 'switchTest')
    expect(switchRole).toHaveAttribute('name', 'switchTest')
    expect(switchRole).toHaveAttribute('type', 'checkbox')
    expect(switchRole).not.toHaveAttribute('checked')
    expect(labelTestId).toBeInTheDocument()
    expect(labelTestId).toHaveTextContent('label')
    expect(labelTestId).toHaveAttribute('for', 'switchTest')
    expect(labelTestId).toHaveAttribute('id', 'switchTest-label')
    expect(thumbTestId).toBeInTheDocument()
    expect(thumbTestId).toHaveClass('-left-1')
    switchRole.focus()
    expect(document.activeElement).toBe(switchRole)
  })

  it('error', () => {
    render(
      <Switch
        name="switchTest"
        label="label"
        error="error"
        isChecked={false}
        onChange={() => {}}
      />,
    )
    const inputWrapTestId = screen.getByTestId('SwitchInputWrap')

    expect(inputWrapTestId).toHaveClass('error')
  })

  it('fake', () => {
    render(
      <Switch
        name="switchTest"
        label="label"
        error="error"
        isChecked={false}
        onChange={() => {}}
        fake
      />,
    )
    const switchQuery = screen.queryByRole('switch')

    expect(switchQuery).toBeNull()
  })

  it('isChecked', () => {
    render(
      <Switch
        className="className"
        name="switchTest"
        label="label"
        error="error"
        isChecked
        onChange={() => {}}
      />,
    )
    const switchRole = screen.getByRole('checkbox')
    const thumbTestId = screen.getByTestId('SwitchThumb')

    expect(switchRole).toHaveAttribute('checked')
    expect(thumbTestId).toHaveClass('left-4')
  })

  it('onChange', () => {
    const spy = jest.fn()
    render(
      <Switch
        className="className"
        name="switchTest"
        label="label"
        error="error"
        isChecked={false}
        onChange={spy}
      />,
    )
    const switchRole = screen.getByRole('checkbox')

    fireEvent.click(switchRole)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('disabled', () => {
    render(
      <Switch
        className="className"
        name="switchTest"
        label="label"
        error="error"
        isChecked={false}
        disabled
        onChange={() => {}}
      />,
    )
    const switchRole = screen.getByRole('checkbox')

    expect(switchRole).toHaveAttribute('disabled')
  })

  it('ref', () => {
    const ref = createRef<HTMLInputElement>()
    render(
      <Switch ref={ref} name="switchTest" label="label" isChecked={false} onChange={() => {}} />,
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
      <Switch name="switchTest" label="label" isChecked={false} onChange={() => {}} />,
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
