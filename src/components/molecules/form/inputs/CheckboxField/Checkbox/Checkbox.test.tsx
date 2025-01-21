import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'

import { Checkbox } from '.'

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
    expect(screen.getByRole('checkbox')).toBeInTheDocument()
    expect(screen.getByTestId('Checkbox')).toHaveClass('className')
    expect(screen.getByRole('checkbox')).toHaveAttribute('id', 'checkboxTest')
    expect(screen.getByRole('checkbox')).toHaveAttribute('name', 'checkboxTest')
    expect(screen.getByRole('checkbox')).toHaveAttribute('type', 'checkbox')
    expect(screen.getByTestId('Checkbox')).toHaveTextContent('label')
  })

  it('switch', () => {
    render(
      <Checkbox
        className="className"
        name="checkboxTest"
        label="label"
        variant="switch"
        error="error"
        isChecked={false}
        onChange={() => {}}
      />,
    )
    expect(screen.getByTestId('SwitchThumb')).toBeInTheDocument()
  })

  it('error', () => {
    render(
      <Checkbox
        className="className"
        name="checkboxTest"
        label="label"
        error="error"
        isChecked={false}
        onChange={() => {}}
      />,
    )
    expect(screen.getByTestId('CheckboxInputWrap')).toHaveClass('error')
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
    expect(screen.getByRole('checkbox')).toHaveAttribute('checked', '')
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
    fireEvent.click(screen.getByRole('checkbox'))
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
    expect(screen.getByRole('checkbox')).toHaveAttribute('disabled', '')
  })
})
