import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'

import { JestMockProvider, options } from '../../../../../../.storybook/helpers'
import MultiAutocomplete from '.'

describe('MultiAutocomplete', () => {
  it('default', () => {
    render(
      <JestMockProvider>
        <MultiAutocomplete
          className="className"
          name="MultiAutocompleteTest"
          label="label"
          value={['value']}
          inputValue="inputValue"
          options={options}
          onInputChange={() => {}}
          onChange={() => {}}
        />
      </JestMockProvider>,
    )
    expect(screen.getByRole('listbox')).toBeTruthy()
    expect(screen.getAllByTestId('LabelWrap')[0]).toHaveClass('className')
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-controls', 'MultiAutocompleteTest')
    expect(screen.getAllByTestId('LabelWrap')[0]).toHaveTextContent('label')
  })

  it('error', () => {
    render(
      <JestMockProvider>
        <MultiAutocomplete
          className="className"
          name="MultiAutocompleteTest"
          label="label"
          value={['value']}
          error="error"
          inputValue="inputValue"
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
        <MultiAutocomplete
          className="className"
          name="MultiAutocompleteTest"
          label="label"
          value={['value']}
          inputValue="inputValue"
          description="description"
          options={options}
          onInputChange={() => {}}
          onChange={() => {}}
        />
      </JestMockProvider>,
    )
    expect(screen.getByRole('alert')).toHaveTextContent('description')
  })

  it('inputValue', () => {
    render(
      <JestMockProvider>
        <MultiAutocomplete
          className="className"
          name="MultiAutocompleteTest"
          label="label"
          value={['value1']}
          inputValue="value2"
          options={options}
          onInputChange={() => {}}
          onChange={() => {}}
        />
      </JestMockProvider>,
    )
    expect(screen.getByRole('combobox')).toHaveValue('value2')
    expect(screen.getAllByRole('option')[0]).toHaveAttribute('aria-selected', 'true')
  })

  it('onInputChange', () => {
    const spy = jest.fn()
    render(
      <JestMockProvider>
        <MultiAutocomplete
          className="className"
          name="MultiAutocompleteTest"
          label="label"
          value={['value1']}
          inputValue="value1"
          options={options}
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
          label="label"
          value={[]}
          inputValue="value1"
          options={options}
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
          label="label"
          value={['value1']}
          inputValue="value1"
          disabled
          options={options}
          onInputChange={() => {}}
          onChange={() => {}}
        />
      </JestMockProvider>,
    )
    expect(screen.getByRole('combobox')).toHaveAttribute('disabled', '')
  })
})
