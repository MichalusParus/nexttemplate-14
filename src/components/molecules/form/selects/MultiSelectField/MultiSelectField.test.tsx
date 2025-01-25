import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '../../../../../../.jest/customRender'
import { getOptions, JestFormProvider } from '../../../../../../.storybook/helpers'
import { MultiSelectField } from '.'

describe('MultiSelectField', () => {
  it('default', () => {
    render(
      <JestFormProvider fields={['multiSelectTest']} values={[[]]}>
        <MultiSelectField
          className="className"
          name="multiSelectTest"
          label="label"
          options={getOptions('multiSelectTest', 20)}
        />
      </JestFormProvider>,
    )
    fireEvent.click(screen.getByRole('combobox'))
    expect(screen.getByRole('listbox')).toBeInTheDocument()
    expect(screen.getByTestId('Select')).toHaveClass('className')
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-controls', 'multiSelectTest')
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-labelledby', 'multiSelectTest-label')
    expect(screen.getByTestId('Label')).toBeInTheDocument()
    expect(screen.getByTestId('Label')).toHaveTextContent('label')
  })

  it('onSubmit', () => {
    const spy = jest.fn()
    render(
      <JestFormProvider fields={['multiSelectTest']} values={[[]]} onSubmit={spy}>
        <MultiSelectField
          className="className"
          name="multiSelectTest"
          label="label"
          options={getOptions('multiSelectTest', 20)}
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
      <JestFormProvider fields={['multiSelectTest']} values={[[]]}>
        <MultiSelectField
          className="className"
          name="multiSelectTest"
          label="label"
          options={getOptions('multiSelectTest', 20)}
          labelProps={{ description: 'description' }}
        />
        <button type="submit" data-testid="submit" />
      </JestFormProvider>,
    )
    expect(screen.getByTestId('Alert')).toBeInTheDocument()
    expect(screen.getByTestId('Alert')).toHaveTextContent('description')
  })
})
