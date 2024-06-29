import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'

import Input from '.'

describe('Input', () => {
  it('default', () => {
    render(
      <Input
        className="className"
        type="text"
        name="inputTest"
        label="label"
        onChange={() => {}}
      />,
    )
    expect(screen.getByRole('textbox')).toBeTruthy()
    expect(screen.getByTestId('LabelWrap')).toHaveClass('className')
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'inputTest')
    expect(screen.getByRole('textbox')).toHaveAttribute('name', 'inputTest')
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text')
    expect(screen.getByTestId('LabelWrap')).toHaveTextContent('label')
  })

  it('number', () => {
    render(<Input type="number" name="inputTest" label="label" onChange={() => {}} />)
    expect(screen.getByRole('spinbutton')).toHaveAttribute('type', 'number')
  })

  it('error', () => {
    render(<Input type="text" name="inputTest" label="label" error="error" onChange={() => {}} />)
    expect(screen.getByRole('alert')).toHaveTextContent('error')
  })

  it('description', () => {
    render(
      <Input
        type="text"
        name="inputTest"
        label="label"
        description="description"
        onChange={() => {}}
      />,
    )
    expect(screen.getByRole('alert')).toHaveTextContent('description')
  })

  it('value', () => {
    render(<Input name="name" label="label" value="value" onChange={() => {}} />)
    expect(screen.getByRole('textbox')).toHaveAttribute('value', 'value')
  })

  it('onChange', () => {
    const spy = jest.fn()
    render(<Input name="name" label="label" value="value" onChange={spy} />)
    fireEvent.change(screen.getByRole('textbox'), {
      target: {
        value: 'newvalue',
      },
    })
    expect(spy).toHaveBeenCalledWith('newvalue')
  })

  it('disabled', () => {
    render(<Input name="name" label="label" value="" disabled onChange={() => {}} />)
    expect(screen.getByRole('textbox')).toHaveAttribute('disabled', '')
  })
})
