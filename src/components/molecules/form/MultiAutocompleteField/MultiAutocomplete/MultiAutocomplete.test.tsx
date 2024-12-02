import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'

import { getOptions, JestMockProvider } from '../../../../../../.storybook/helpers'
import { MultiAutocomplete } from '.'

describe('MultiAutocomplete', () => {
  it('default', () => {
    render(
      <JestMockProvider>
        <MultiAutocomplete
          className="className"
          name="MultiAutocompleteTest"
          value={['value']}
          options={getOptions('MultiAutocompleteTest', 20)}
          onInputChange={() => {}}
          onChange={() => {}}
        />
      </JestMockProvider>,
    )
    fireEvent.click(screen.getByRole('combobox'))
    expect(screen.getByRole('listbox')).toBeTruthy()
    expect(screen.getByTestId('Autocomplete')).toHaveClass('className')
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-controls', 'MultiAutocompleteTest')
  })

  it('onInputChange', () => {
    const spy = jest.fn()
    render(
      <JestMockProvider>
        <MultiAutocomplete
          className="className"
          name="MultiAutocompleteTest"
          value={['value1']}
          options={getOptions('MultiAutocompleteTest', 20)}
          onInputChange={spy}
          onChange={() => {}}
        />
      </JestMockProvider>,
    )
    fireEvent.change(screen.getByRole('combobox'), {
      target: {
        value: 'newvalue',
      },
    })
    expect(spy).toHaveBeenCalledWith('newvalue')
  })

  it('onChange', () => {
    const spy = jest.fn()
    render(
      <JestMockProvider>
        <MultiAutocomplete
          className="className"
          name="MultiAutocompleteTest"
          value={[]}
          options={getOptions('MultiAutocompleteTest', 20)}
          onInputChange={spy}
          onChange={spy}
        />
      </JestMockProvider>,
    )
    fireEvent.click(screen.getByRole('combobox'))
    fireEvent.click(screen.getAllByRole('option')[0])
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('disabled', () => {
    render(
      <JestMockProvider>
        <MultiAutocomplete
          className="className"
          name="MultiAutocompleteTest"
          value={['value1']}
          disabled
          options={getOptions('MultiAutocompleteTest', 20)}
          onInputChange={() => {}}
          onChange={() => {}}
        />
      </JestMockProvider>,
    )
    expect(screen.getByRole('combobox')).toHaveAttribute('disabled', '')
  })
})
