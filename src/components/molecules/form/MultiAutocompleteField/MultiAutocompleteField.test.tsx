import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'

import { getOptions, JestFormProvider, JestMockProvider } from '../../../../../.storybook/helpers'
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
            options={getOptions('MultiAutocompleteTest', 20)}
            onInputChange={() => {}}
          />
        </JestFormProvider>
      </JestMockProvider>,
    )
    fireEvent.click(screen.getByRole('combobox'))
    expect(screen.getByRole('listbox')).toBeTruthy()
    expect(screen.getByTestId('Autocomplete')).toHaveClass('className')
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
            options={getOptions('MultiAutocompleteTest', 20)}
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

  it('description', () => {
    render(
      <JestMockProvider>
        <JestFormProvider fields={['MultiAutocompleteTest']} values={[[]]}>
          <MultiAutocompleteField
            className="className"
            name="MultiAutocompleteTest"
            label="label"
            options={getOptions('MultiAutocompleteTest', 20)}
            onInputChange={() => {}}
            labelProps={{ description: 'description' }}
          />
          <button type="submit" data-testid="submit" />
        </JestFormProvider>
      </JestMockProvider>,
    )
    expect(screen.getByRole('alert')).toHaveTextContent('description')
  })
})
