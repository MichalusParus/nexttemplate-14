import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'

import { JestMockProvider, options } from '../../../../../../.storybook/helpers'
import { Autocomplete } from '.'

describe('Autocomplete', () => {
  it('default', () => {
    render(
      <JestMockProvider>
        <Autocomplete
          className="className"
          name="autocompleteTest"
          label="label"
          value="value"
          options={options}
          onInputChange={() => {}}
          onChange={() => {}}
        />
      </JestMockProvider>,
    )
    fireEvent.click(screen.getByRole('combobox'))
    expect(screen.getByRole('listbox')).toBeTruthy()
    expect(screen.getByTestId('Autocomplete')).toHaveClass('className')
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-controls', 'autocompleteTest')
    expect(screen.getAllByTestId('LabelWrap')[0]).toHaveTextContent('label')
  })

  it('error', () => {
    render(
      <JestMockProvider>
        <Autocomplete
          className="className"
          name="autocompleteTest"
          label="label"
          value="value"
          error="error"
          options={options}
          onInputChange={() => {}}
          onChange={() => {}}
        />
      </JestMockProvider>,
    )
    expect(screen.getByRole('alert')).toHaveTextContent('error')
  })

  it('description', () => {
    render(
      <JestMockProvider>
        <Autocomplete
          className="className"
          name="autocompleteTest"
          label="label"
          value="value"
          options={options}
          labelProps={{ description: 'description' }}
          onInputChange={() => {}}
          onChange={() => {}}
        />
      </JestMockProvider>,
    )
    expect(screen.getByRole('alert')).toHaveTextContent('description')
  })

  it('onInputChange', () => {
    const spy = jest.fn()
    render(
      <JestMockProvider>
        <Autocomplete
          className="className"
          name="autocompleteTest"
          label="label"
          value="value1"
          options={options}
          onInputChange={spy}
          onChange={() => {}}
        />
      </JestMockProvider>,
    )
    fireEvent.change(screen.getByRole('textbox'), {
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
        <Autocomplete
          className="className"
          name="autocompleteTest"
          label="label"
          value="value1"
          options={options}
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
          label="label"
          value="value1"
          disabled
          options={options}
          onInputChange={() => {}}
          onChange={() => {}}
        />
      </JestMockProvider>,
    )
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-disabled', 'true')
  })
})
