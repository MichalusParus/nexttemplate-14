import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'

import { options } from '../../../../../../.storybook/helpers'
import CheckboxGroup from '.'

describe('CheckboxGroup', () => {
  it('default', () => {
    render(
      <CheckboxGroup
        name="checkboxGroupTest"
        label="label"
        value={[]}
        options={options}
        onChange={() => {}}
        className="className"
      />,
    )
    expect(screen.getByTestId('LabelWrap')).toBeTruthy()
    expect(screen.getByTestId('LabelWrap')).toHaveClass('className')
    expect(screen.getAllByRole('checkbox')[0]).toHaveAttribute('id', 'value1')
    expect(screen.getAllByRole('checkbox')[0]).toHaveAttribute('name', 'value1')
    expect(screen.getAllByRole('checkbox')[0]).toHaveAttribute('type', 'checkbox')
    expect(screen.getAllByTestId('CheckboxLabel')[0]).toHaveTextContent('label1')
    expect(screen.getByTestId('LabelWrap')).toHaveTextContent('label')
  })

  it('switch', () => {
    render(
      <CheckboxGroup
        name="checkboxGroupTest"
        label="label"
        value={[]}
        options={options}
        variant="switch"
        onChange={() => {}}
      />,
    )
    expect(screen.getAllByTestId('SwitchThumb')[0]).toBeTruthy()
  })

  it('error', () => {
    render(
      <CheckboxGroup
        name="checkboxGroupTest"
        label="label"
        value={[]}
        options={options}
        error="error"
        onChange={() => {}}
      />,
    )
    expect(screen.getByRole('alert')).toHaveTextContent('error')
  })

  it('description', () => {
    render(
      <CheckboxGroup
        name="checkboxGroupTest"
        label="label"
        value={[]}
        options={options}
        description="description"
        onChange={() => {}}
      />,
    )
    expect(screen.getByRole('alert')).toHaveTextContent('description')
  })

  it('value', () => {
    render(
      <CheckboxGroup
        name="checkboxGroupTest"
        label="label"
        value={['value1']}
        options={options}
        onChange={() => {}}
      />,
    )
    expect(screen.getAllByRole('checkbox')[0]).toHaveAttribute('value', 'value1')
    expect(screen.getAllByRole('checkbox')[0]).toHaveAttribute('checked', '')
  })

  it('onChange', () => {
    const spy = jest.fn()
    render(
      <CheckboxGroup
        name="checkboxGroupTest"
        label="label"
        value={['value1']}
        options={options}
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
        label="label"
        value={['value1']}
        options={options}
        onChange={() => {}}
        disabled
      />,
    )
    expect(screen.getAllByRole('checkbox')[0]).toHaveAttribute('disabled', '')
  })
})
