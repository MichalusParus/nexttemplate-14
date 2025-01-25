import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '../../../../../../.jest/customRender'
import { getOptions, JestFormProvider } from '../../../../../../.storybook/helpers'
import { MultiAutocompleteField } from '.'

describe('MultiAutocompleteField', () => {
  it('default', () => {
    render(
      <JestFormProvider fields={['MultiAutocompleteTest']} values={[[]]}>
        <MultiAutocompleteField
          className="className"
          name="MultiAutocompleteTest"
          label="label"
          options={getOptions('MultiAutocompleteTest', 20)}
          onInputChange={() => {}}
        />
      </JestFormProvider>,
    )
    fireEvent.click(screen.getByRole('combobox'))
    expect(screen.getByRole('listbox')).toBeInTheDocument()
    expect(screen.getByTestId('Autocomplete')).toHaveClass('className')
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-controls', 'MultiAutocompleteTest')
    expect(screen.getByRole('combobox')).toHaveAttribute(
      'aria-labelledby',
      'MultiAutocompleteTest-label',
    )
    expect(screen.getAllByTestId('LabelWrap')[0]).toHaveTextContent('label')
  })

  it('onSubmit', () => {
    const spy = jest.fn()
    render(
      <JestFormProvider fields={['MultiAutocompleteTest']} values={[[]]} onSubmit={spy}>
        <MultiAutocompleteField
          className="className"
          name="MultiAutocompleteTest"
          label="label"
          options={getOptions('MultiAutocompleteTest', 20)}
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
      </JestFormProvider>,
    )
    expect(screen.getByTestId('Alert')).toBeInTheDocument()
    expect(screen.getByTestId('Alert')).toHaveTextContent('description')
  })
})
