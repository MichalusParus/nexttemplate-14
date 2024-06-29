import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'

import { options } from '../../../../../../.storybook/helpers'
import Autocomplete from '.'

describe('Autocomplete', () => {
  it('default', () => {
    render(
      <Autocomplete
        className="className"
        name="autocompleteTest"
        label="label"
        value="value"
        inputValue="inputValue"
        options={options}
        onInputChange={() => {}}
        onChange={() => {}}
      />,
    )
    expect(screen.getByRole('listbox')).toBeTruthy()
    expect(screen.getAllByTestId('LabelWrap')[0]).toHaveClass('className')
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-controls', 'autocompleteTest')
    expect(screen.getAllByTestId('LabelWrap')[0]).toHaveTextContent('label')
  })

  it('error', () => {
    render(
      <Autocomplete
        className="className"
        name="autocompleteTest"
        label="label"
        value="value"
        error="error"
        inputValue="inputValue"
        options={options}
        onInputChange={() => {}}
        onChange={() => {}}
      />,
    )
    expect(screen.getByRole('alert')).toHaveTextContent('error')
  })

  it('description', () => {
    render(
      <Autocomplete
        className="className"
        name="autocompleteTest"
        label="label"
        value="value"
        inputValue="inputValue"
        description="description"
        options={options}
        onInputChange={() => {}}
        onChange={() => {}}
      />,
    )
    expect(screen.getByRole('alert')).toHaveTextContent('description')
  })

  it('inputValue', () => {
    render(
      <Autocomplete
        className="className"
        name="autocompleteTest"
        label="label"
        value="value1"
        inputValue="value2"
        options={options}
        onInputChange={() => {}}
        onChange={() => {}}
      />,
    )
    expect(screen.getByRole('combobox')).toHaveValue('value2')
    expect(screen.getAllByRole('option')[0]).toHaveAttribute('aria-selected', 'true')
  })

  it('onInputChange', () => {
    const spy = jest.fn()
    render(
      <Autocomplete
        className="className"
        name="autocompleteTest"
        label="label"
        value="value1"
        inputValue="value1"
        options={options}
        onInputChange={spy}
        onChange={() => {}}
      />,
    )
    fireEvent.click(screen.getByRole('combobox'))
    fireEvent.click(screen.getAllByRole('button')[0])
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('onChange', () => {
    const spy = jest.fn()
    render(
      <Autocomplete
        className="className"
        name="autocompleteTest"
        label="label"
        value="value1"
        inputValue="value1"
        options={options}
        onInputChange={() => {}}
        onChange={spy}
      />,
    )
    fireEvent.click(screen.getByRole('combobox'))
    fireEvent.click(screen.getAllByRole('button')[0])
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('disabled', () => {
    render(
      <Autocomplete
        className="className"
        name="autocompleteTest"
        label="label"
        value="value1"
        inputValue="value1"
        disabled
        options={options}
        onInputChange={() => {}}
        onChange={() => {}}
      />,
    )
    expect(screen.getByRole('combobox')).toHaveAttribute('disabled', '')
  })
})
