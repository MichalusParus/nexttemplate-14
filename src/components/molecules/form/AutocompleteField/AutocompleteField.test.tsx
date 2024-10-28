import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'

import { JestFormProvider, JestMockProvider, options } from '../../../../../.storybook/helpers'
import AutocompleteField from '.'

describe('AutocompleteField', () => {
  it('default', () => {
    render(
      <JestMockProvider>
        <JestFormProvider fields={['autocompleteTest']}>
          <AutocompleteField
            className="className"
            name="autocompleteTest"
            label="label"
            options={options}
            onInputChange={() => {}}
          />
        </JestFormProvider>
      </JestMockProvider>,
    )
    fireEvent.click(screen.getByRole('combobox'))
    expect(screen.getByRole('listbox')).toBeTruthy()
    expect(screen.getByTestId('Autocomplete')).toHaveClass('className')
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-controls', 'autocompleteTest')
    expect(screen.getAllByTestId('LabelWrap')[0]).toHaveTextContent('label')
  })

  it('onSubmit', () => {
    const spy = jest.fn()
    render(
      <JestMockProvider>
        <JestFormProvider fields={['autocompleteTest']} onSubmit={spy}>
          <AutocompleteField
            className="className"
            name="autocompleteTest"
            label="label"
            options={options}
            onInputChange={() => {}}
          />
          <button type="submit" data-testid="submit" />
        </JestFormProvider>
      </JestMockProvider>,
    )
    screen.getByTestId('Form').onsubmit = spy
    fireEvent.click(screen.getByTestId('submit'))
    expect(spy).toHaveBeenCalled()
  })
})
