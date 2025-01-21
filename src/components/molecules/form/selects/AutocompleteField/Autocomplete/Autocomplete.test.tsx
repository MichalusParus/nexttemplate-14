import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'

import { getOptions, JestMockProvider } from '../../../../../../../.storybook/helpers'
import { Autocomplete } from '.'

describe('Autocomplete', () => {
  it('default', () => {
    render(
      <JestMockProvider>
        <Autocomplete
          className="className"
          name="autocompleteTest"
          value="value"
          options={getOptions('autocompleteTest', 20)}
          onInputChange={() => {}}
          onChange={() => {}}
        />
      </JestMockProvider>,
    )
    fireEvent.click(screen.getByRole('combobox'))
    expect(screen.getByRole('listbox')).toBeInTheDocument()
    expect(screen.getByTestId('Autocomplete')).toHaveClass('className')
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-controls', 'autocompleteTest')
  })

  it('onInputChange', () => {
    const spy = jest.fn()
    render(
      <JestMockProvider>
        <Autocomplete
          className="className"
          name="autocompleteTest"
          value="value1"
          options={getOptions('autocompleteTest', 20)}
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
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('onChange', () => {
    const spy = jest.fn()
    render(
      <JestMockProvider>
        <Autocomplete
          className="className"
          name="autocompleteTest"
          value="value1"
          options={getOptions('autocompleteTest', 20)}
          onInputChange={spy}
          onChange={spy}
        />
      </JestMockProvider>,
    )
    fireEvent.click(screen.getByRole('combobox'))
    fireEvent.click(screen.getAllByRole('option')[0])
    expect(spy).toHaveBeenCalledTimes(2)
  })

  it('disabled', () => {
    render(
      <JestMockProvider>
        <Autocomplete
          className="className"
          name="autocompleteTest"
          value="value1"
          disabled
          options={getOptions('autocompleteTest', 20)}
          onInputChange={() => {}}
          onChange={() => {}}
        />
      </JestMockProvider>,
    )
    expect(screen.getByRole('combobox')).toHaveAttribute('disabled', '')
  })
})
