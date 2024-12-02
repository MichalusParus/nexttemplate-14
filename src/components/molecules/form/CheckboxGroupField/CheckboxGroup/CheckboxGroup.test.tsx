import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'

import { getOptions } from '../../../../../../.storybook/helpers'
import { CheckboxGroup } from '.'

describe('CheckboxGroup', () => {
  it('default', () => {
    render(
      <CheckboxGroup
        name="checkboxGroupTest"
        value={[]}
        options={getOptions('checkboxGroupTest', 20)}
        onChange={() => {}}
        className="className"
      />,
    )
    expect(screen.getByTestId('CheckboxGroup')).toBeTruthy()
    expect(screen.getByTestId('CheckboxGroup')).toHaveClass('className')
    expect(screen.getAllByRole('checkbox')[0]).toHaveAttribute('id', 'value1checkboxGroupTest')
    expect(screen.getAllByRole('checkbox')[0]).toHaveAttribute('name', 'value1checkboxGroupTest')
    expect(screen.getAllByRole('checkbox')[0]).toHaveAttribute('type', 'checkbox')
    expect(screen.getAllByTestId('Checkbox')[0]).toHaveTextContent('label1')
  })

  it('switch', () => {
    render(
      <CheckboxGroup
        name="checkboxGroupTest"
        value={[]}
        options={getOptions('checkboxGroupTest', 20)}
        variant="switch"
        onChange={() => {}}
      />,
    )
    expect(screen.getAllByTestId('SwitchThumb')[0]).toBeTruthy()
  })

  it('value', () => {
    render(
      <CheckboxGroup
        name="checkboxGroupTest"
        value={['value1checkboxGroupTest']}
        options={getOptions('checkboxGroupTest', 20)}
        onChange={() => {}}
      />,
    )
    expect(screen.getAllByRole('checkbox')[0]).toHaveAttribute('value', 'value1checkboxGroupTest')
    expect(screen.getAllByRole('checkbox')[0]).toHaveAttribute('checked', '')
  })

  it('onChange', () => {
    const spy = jest.fn()
    render(
      <CheckboxGroup
        name="checkboxGroupTest"
        value={['value1']}
        options={getOptions('checkboxGroupTest', 20)}
        onChange={spy}
      />,
    )
    fireEvent.click(screen.getAllByRole('checkbox')[0])
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('disabled', () => {
    render(
      <CheckboxGroup
        name="checkboxGroupTest"
        value={['value1']}
        options={getOptions('checkboxGroupTest', 20)}
        onChange={() => {}}
        disabled
      />,
    )
    expect(screen.getAllByRole('checkbox')[0]).toHaveAttribute('disabled', '')
  })
})
