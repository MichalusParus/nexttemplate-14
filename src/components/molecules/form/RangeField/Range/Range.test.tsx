import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'

import Range from '.'

describe('Range', () => {
  it('default', () => {
    render(
      <Range
        className="className"
        name="rangeTest"
        label="label"
        min={30}
        max={60}
        onChange={() => {}}
      />,
    )
    expect(screen.getByRole('slider')).toBeTruthy()
    expect(screen.getByTestId('LabelWrap')).toHaveClass('className')
    expect(screen.getByRole('slider')).toHaveAttribute('id', 'rangeTest')
    expect(screen.getByRole('slider')).toHaveAttribute('name', 'rangeTest')
    expect(screen.getByRole('slider')).toHaveAttribute('type', 'range')
    expect(screen.getByRole('slider')).toHaveAttribute('min', '30')
    expect(screen.getByRole('slider')).toHaveAttribute('max', '60')
    expect(screen.getByTestId('LabelWrap')).toHaveTextContent('label')
  })

  it('error', () => {
    render(
      <Range
        className="className"
        name="rangeTest"
        label="label"
        error="error"
        onChange={() => {}}
      />,
    )
    expect(screen.getByRole('alert')).toHaveTextContent('error')
  })

  it('description', () => {
    render(
      <Range
        className="className"
        name="rangeTest"
        label="label"
        description="description"
        onChange={() => {}}
      />,
    )
    expect(screen.getByRole('alert')).toHaveTextContent('description')
  })

  it('value', () => {
    render(
      <Range className="className" name="rangeTest" label="label" value={50} onChange={() => {}} />,
    )
    expect(screen.getByRole('slider')).toHaveAttribute('value', '50')
  })

  it('onChange', () => {
    const spy = jest.fn()
    render(<Range className="className" name="rangeTest" label="label" onChange={spy} />)
    fireEvent.change(screen.getByRole('slider'), {
      target: {
        value: 50,
      },
    })
    expect(spy).toHaveBeenCalledWith('50')
  })

  it('disabled', () => {
    render(
      <Range className="className" name="rangeTest" label="label" disabled onChange={() => {}} />,
    )
    expect(screen.getByRole('slider')).toHaveAttribute('disabled', '')
  })
})
