import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '../../../../../../.jest/customRender'
import { getOptions, JestFormProvider } from '../../../../../../.storybook/helpers'
import { AutocompleteField } from '.'

describe('AutocompleteField', () => {
  it('default', () => {
    render(
      <JestFormProvider fields={['autocompleteTest']}>
        <AutocompleteField
          className="className"
          name="autocompleteTest"
          label="label"
          options={getOptions('autocompleteTest', 20)}
          onInputChange={() => {}}
        />
      </JestFormProvider>,
    )
    fireEvent.click(screen.getByRole('combobox'))
    expect(screen.getByRole('listbox')).toBeInTheDocument()
    expect(screen.getByTestId('Autocomplete')).toHaveClass('className')
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-controls', 'autocompleteTest')
    expect(screen.getByRole('combobox')).toHaveAttribute(
      'aria-labelledby',
      'autocompleteTest-label',
    )
    expect(screen.getAllByTestId('LabelWrap')[0]).toHaveTextContent('label')
  })

  it('onSubmit', () => {
    const spy = jest.fn()
    render(
      <JestFormProvider fields={['autocompleteTest']} onSubmit={spy}>
        <AutocompleteField
          className="className"
          name="autocompleteTest"
          label="label"
          options={getOptions('autocompleteTest', 20)}
          onInputChange={() => {}}
        />
        <button type="submit" data-testid="submit" />
      </JestFormProvider>,
    )
    screen.getByTestId('Form').onsubmit = spy
    fireEvent.click(screen.getByTestId('submit'))
    expect(spy).toHaveBeenCalled()
  })

  it('description', () => {
    render(
      <JestFormProvider fields={['autocompleteTest']}>
        <AutocompleteField
          className="className"
          name="autocompleteTest"
          label="label"
          options={getOptions('autocompleteTest', 20)}
          onInputChange={() => {}}
          labelProps={{ description: 'description' }}
        />
        <button type="submit" data-testid="submit" />
      </JestFormProvider>,
    )
    expect(screen.getByTestId('Alert')).toBeInTheDocument()
    expect(screen.getByTestId('Alert')).toHaveTextContent('description')
  })
})
