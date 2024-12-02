import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'

import { getOptions } from '../../../../../../.storybook/helpers'
import { RadioGroup } from '.'

describe('RadioGroup', () => {
  it('default', () => {
    render(
      <RadioGroup
        className="className"
        name="radioGroupTest"
        options={getOptions('radioGroupTest', 20)}
        onChange={() => {}}
      />,
    )
    expect(screen.getByRole('radiogroup')).toBeTruthy()
    expect(screen.getByRole('radiogroup')).toHaveClass('className')
    expect(screen.getAllByRole('radio')[0]).toHaveAttribute('id', 'value1radioGroupTest')
    expect(screen.getAllByRole('radio')[0]).toHaveAttribute('name', 'radioGroupTest')
    expect(screen.getAllByRole('radio')[0]).toHaveAttribute('type', 'radio')
    expect(screen.getAllByTestId('Radio')[0]).toHaveTextContent('label1')
  })

  it('value', () => {
    render(
      <RadioGroup
        className="className"
        name="textareaTest"
        value={'value1radioGroupTest'}
        options={getOptions('radioGroupTest', 20)}
        error="error"
        onChange={() => {}}
      />,
    )
    expect(screen.getAllByRole('radio')[0]).toHaveAttribute('value', 'value1radioGroupTest')
    expect(screen.getAllByRole('radio')[0]).toHaveAttribute('checked', '')
  })

  it('onChange', () => {
    const spy = jest.fn()
    render(
      <RadioGroup
        className="className"
        name="textareaTest"
        value={'value1'}
        options={getOptions('radioGroupTest', 20)}
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
        value={'value1'}
        options={getOptions('radioGroupTest', 20)}
        error="error"
        onChange={() => {}}
        disabled
      />,
    )
    expect(screen.getAllByRole('radio')[0]).toHaveAttribute('disabled', '')
  })
})
