import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '../../../../../../../.jest/customRender'
import { getOptions } from '../../../../../../../.storybook/helpers'
import { Autocomplete } from '.'

describe('Autocomplete', () => {
  it('default', () => {
    render(
      <Autocomplete
        className="className"
        name="autocompleteTest"
        value="value"
        options={getOptions('autocompleteTest', 20)}
        onInputChange={() => {}}
        onChange={() => {}}
      />,
    )
    fireEvent.click(screen.getByRole('combobox'))
    expect(screen.getByRole('listbox')).toBeInTheDocument()
    expect(screen.getByTestId('Autocomplete')).toHaveClass('className')
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-controls', 'autocompleteTest')
  })

  it('onInputChange', () => {
    const spy = jest.fn()
    render(
      <Autocomplete
        className="className"
        name="autocompleteTest"
        value="value1"
        options={getOptions('autocompleteTest', 20)}
        onInputChange={spy}
        onChange={() => {}}
      />,
    )
    fireEvent.change(screen.getByRole('combobox'), {
      target: {
        value: 'newvalue',
      },
    })
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('onChange', () => {
    const spy = jest.fn()
    render(
      <Autocomplete
        className="className"
        name="autocompleteTest"
        value="value1"
        options={getOptions('autocompleteTest', 20)}
        onInputChange={spy}
        onChange={spy}
      />,
    )
    fireEvent.click(screen.getByRole('combobox'))
    fireEvent.click(screen.getAllByRole('option')[0])
    expect(spy).toHaveBeenCalledTimes(2)
  })

  it('disabled', () => {
    render(
      <Autocomplete
        className="className"
        name="autocompleteTest"
        value="value1"
        disabled
        options={getOptions('autocompleteTest', 20)}
        onInputChange={() => {}}
        onChange={() => {}}
      />,
    )
    expect(screen.getByRole('combobox')).toHaveAttribute('disabled', '')
  })
})
