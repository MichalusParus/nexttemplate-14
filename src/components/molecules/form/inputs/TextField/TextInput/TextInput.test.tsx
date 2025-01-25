import '@testing-library/jest-dom'

import { createRef } from 'react'

import { fireEvent, render, screen } from '../../../../../../../.jest/customRender'
import { TextInput } from '.'

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
    expect(screen.getByTestId('InputWrap')).toBeInTheDocument()
    expect(screen.getByTestId('InputWrap')).toHaveClass('className')
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text')
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'inputTest')
    expect(screen.getByRole('textbox')).toHaveAttribute('name', 'inputTest')
    expect(screen.getByRole('textbox')).toHaveAttribute('placeholder', 'placeholder')
    screen.getByRole('textbox').focus()
    expect(screen.getByRole('textbox')).toHaveFocus()
  })

  it('value', () => {
    render(<TextInput name="name" value="value" onChange={() => {}} />)
    expect(screen.getByRole('textbox')).toHaveAttribute('value', 'value')
  })

  it('onChange', () => {
    const spy = jest.fn()
    render(<TextInput name="name" value="value" onChange={spy} />)
    fireEvent.change(screen.getByRole('textbox'), {
      target: {
        value: 'newvalue',
      },
    })
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('startIcon', () => {
    render(
      <TextInput name="inputTest" startIcon={<svg data-testid="testSvg" />} onChange={() => {}} />,
    )
    expect(screen.getByTestId('testSvg')).toBeInTheDocument()
  })

  it('endIcon', () => {
    render(
      <TextInput name="inputTest" endIcon={<svg data-testid="testSvg" />} onChange={() => {}} />,
    )
    expect(screen.getByTestId('testSvg')).toBeInTheDocument()
  })

  it('error', () => {
    render(<TextInput name="inputTest" error="error" onChange={() => {}} />)
    expect(screen.getByTestId('InputWrap')).toHaveClass('error')
  })

  it('disabled', () => {
    render(<TextInput name="name" value="" disabled onChange={() => {}} />)
    expect(screen.getByRole('textbox')).toHaveAttribute('disabled', '')
    expect(screen.getByRole('textbox')).toHaveAttribute('tabindex', '-1')
  })

  it('ref', () => {
    const ref = createRef<HTMLInputElement>()
    render(<TextInput name="name" value="" ref={ref} onChange={() => {}} />)
    expect(ref.current).toBe(screen.getByRole('textbox'))
  })
})
