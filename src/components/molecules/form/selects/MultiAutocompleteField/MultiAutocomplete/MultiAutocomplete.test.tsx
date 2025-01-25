import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '../../../../../../../.jest/customRender'
import { getOptions } from '../../../../../../../.storybook/helpers'
import { MultiAutocomplete } from '.'

describe('MultiAutocomplete', () => {
  it('default', () => {
    render(
      <MultiAutocomplete
        className="className"
        name="MultiAutocompleteTest"
        value={['value']}
        options={getOptions('MultiAutocompleteTest', 20)}
        onInputChange={() => {}}
        onChange={() => {}}
      />,
    )
    fireEvent.click(screen.getByRole('combobox'))
    expect(screen.getByRole('listbox')).toBeInTheDocument()
    expect(screen.getByTestId('Autocomplete')).toHaveClass('className')
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-controls', 'MultiAutocompleteTest')
  })

  it('onInputChange', () => {
    const spy = jest.fn()
    render(
      <MultiAutocomplete
        className="className"
        name="MultiAutocompleteTest"
        value={['value1']}
        options={getOptions('MultiAutocompleteTest', 20)}
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
      <MultiAutocomplete
        className="className"
        name="MultiAutocompleteTest"
        value={[]}
        options={getOptions('MultiAutocompleteTest', 20)}
        onInputChange={spy}
        onChange={spy}
      />,
    )
    fireEvent.click(screen.getByRole('combobox'))
    fireEvent.click(screen.getAllByRole('option')[0])
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('disabled', () => {
    render(
      <MultiAutocomplete
        className="className"
        name="MultiAutocompleteTest"
        value={['value1']}
        disabled
        options={getOptions('MultiAutocompleteTest', 20)}
        onInputChange={() => {}}
        onChange={() => {}}
      />,
    )
    expect(screen.getByRole('combobox')).toHaveAttribute('disabled', '')
  })
})
