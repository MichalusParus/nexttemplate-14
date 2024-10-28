import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'

import { JestFormProvider, JestMockProvider, options } from '../../../../../.storybook/helpers'
import { MultiAutocompleteField } from '.'

describe('MultiAutocompleteField', () => {
  it('default', () => {
    render(
      <JestMockProvider>
        <JestFormProvider fields={['MultiAutocompleteTest']} values={[[]]}>
          <MultiAutocompleteField
            className="className"
            name="MultiAutocompleteTest"
            label="label"
            options={options}
            onInputChange={() => {}}
          />
        </JestFormProvider>
      </JestMockProvider>,
    )
    fireEvent.click(screen.getByRole('combobox'))
    expect(screen.getByRole('listbox')).toBeTruthy()
    expect(screen.getByTestId('MultiAutocomplete')).toHaveClass('className')
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-controls', 'MultiAutocompleteTest')
    expect(screen.getAllByTestId('LabelWrap')[0]).toHaveTextContent('label')
  })

  it('onSubmit', () => {
    const spy = jest.fn()
    render(
      <JestMockProvider>
        <JestFormProvider fields={['MultiAutocompleteTest']} values={[[]]} onSubmit={spy}>
          <MultiAutocompleteField
            className="className"
            name="MultiAutocompleteTest"
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
