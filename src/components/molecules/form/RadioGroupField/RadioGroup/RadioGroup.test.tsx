import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'

import { options } from '../../../../../../.storybook/helpers'
import RadioGroup from '.'

describe('RadioGroup', () => {
  it('default', () => {
    render(
      <RadioGroup
        className="className"
        name="radioGroupTest"
        label="label"
        options={options}
        onChange={() => {}}
      />,
    )
    expect(screen.getByRole('radiogroup')).toBeTruthy()
    expect(screen.getByTestId('LabelWrap')).toHaveClass('className')
    expect(screen.getAllByRole('radio')[0]).toHaveAttribute('id', 'value1')
    expect(screen.getAllByRole('radio')[0]).toHaveAttribute('name', 'radioGroupTest')
    expect(screen.getAllByRole('radio')[0]).toHaveAttribute('type', 'radio')
    expect(screen.getAllByTestId('Radio')[0]).toHaveTextContent('label1')
    expect(screen.getByTestId('LabelWrap')).toHaveTextContent('label')
  })

  it('error', () => {
    render(
      <RadioGroup
        className="className"
        name="textareaTest"
        label="label"
        options={options}
        error="error"
        onChange={() => {}}
      />,
    )
    expect(screen.getByRole('alert')).toHaveTextContent('error')
  })

  it('description', () => {
    render(
      <RadioGroup
        className="className"
        name="textareaTest"
        label="label"
        options={options}
        description="description"
        onChange={() => {}}
      />,
    )
    expect(screen.getByRole('alert')).toHaveTextContent('description')
  })

  it('value', () => {
    render(
      <RadioGroup
        className="className"
        name="textareaTest"
        label="label"
        value={'value1'}
        options={options}
        error="error"
        onChange={() => {}}
      />,
    )
    expect(screen.getAllByRole('radio')[0]).toHaveAttribute('value', 'value1')
    expect(screen.getAllByRole('radio')[0]).toHaveAttribute('checked', '')
  })

  it('onChange', () => {
    const spy = jest.fn()
    render(
      <RadioGroup
        className="className"
        name="textareaTest"
        label="label"
        value={'value1'}
        options={options}
        error="error"
        onChange={spy}
      />,
    )
    fireEvent.click(screen.getAllByRole('radio')[1])
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('disabled', () => {
    render(
      <RadioGroup
        className="className"
        name="textareaTest"
        label="label"
        value={'value1'}
        options={options}
        error="error"
        onChange={() => {}}
        disabled
      />,
    )
    expect(screen.getAllByRole('radio')[0]).toHaveAttribute('disabled', '')
  })
})
