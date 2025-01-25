import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '../../../../../../../.jest/customRender'
import { PasswordInput } from '.'

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
    expect(screen.getByTestId('InputWrap')).toBeInTheDocument()
    expect(screen.getByTestId('InputWrap')).toHaveClass('className')
    expect(screen.getByTestId('PasswordInput')).toHaveAttribute('type', 'password')
    expect(screen.getByTestId('PasswordInput')).toHaveAttribute('id', 'passwordTest')
    expect(screen.getByTestId('PasswordInput')).toHaveAttribute('name', 'passwordTest')
    expect(screen.getByTestId('PasswordInput')).toHaveAttribute('placeholder', 'placeholder')
  })

  it('value', () => {
    render(<PasswordInput name="name" value="value" onChange={() => {}} />)
    expect(screen.getByTestId('PasswordInput')).toHaveValue('value')
  })

  it('onChange', () => {
    const spy = jest.fn()
    render(<PasswordInput name="name" value="value" onChange={spy} />)
    fireEvent.change(screen.getByTestId('PasswordInput'), {
      target: {
        value: 'newvalue',
      },
    })
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('visible', () => {
    render(<PasswordInput name="name" value="value" onChange={() => {}} />)
    fireEvent.click(screen.getByRole('button'))
    expect(screen.getByTestId('PasswordInput')).toHaveAttribute('type', 'text')
  })

  it('error', () => {
    render(<PasswordInput name="name" error="error" onChange={() => {}} />)
    expect(screen.getByTestId('InputWrap')).toHaveClass('error')
  })

  it('disabled', () => {
    render(<PasswordInput name="name" value="" disabled onChange={() => {}} />)
    expect(screen.getByTestId('PasswordInput')).toHaveAttribute('disabled', '')
  })
})
