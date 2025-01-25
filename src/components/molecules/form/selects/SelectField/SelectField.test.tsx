import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '../../../../../../.jest/customRender'
import { getOptions, JestFormProvider } from '../../../../../../.storybook/helpers'
import { SelectField } from '.'

describe('SelectField', () => {
  it('default', () => {
    render(
      <JestFormProvider fields={['selectTest']}>
        <SelectField
          className="className"
          name="selectTest"
          label="label"
          options={getOptions('selectTest', 20)}
        />
      </JestFormProvider>,
    )
    fireEvent.click(screen.getByRole('combobox'))
    expect(screen.getByRole('listbox')).toBeInTheDocument()
    expect(screen.getByTestId('Select')).toHaveClass('className')
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-controls', 'selectTest')
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-labelledby', 'selectTest-label')
    expect(screen.getByTestId('Label')).toBeInTheDocument()
    expect(screen.getByTestId('Label')).toHaveTextContent('label')
  })

  it('onSubmit', () => {
    const spy = jest.fn()
    render(
      <JestFormProvider fields={['selectTest']} onSubmit={spy}>
        <SelectField
          className="className"
          name="selectTest"
          label="label"
          options={getOptions('selectTest', 20)}
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
      <JestFormProvider fields={['selectTest']}>
        <SelectField
          className="className"
          name="selectTest"
          label="label"
          options={getOptions('selectTest', 20)}
          labelProps={{ description: 'description' }}
        />
        <button type="submit" data-testid="submit" />
      </JestFormProvider>,
    )
    expect(screen.getByTestId('Alert')).toBeInTheDocument()
    expect(screen.getByTestId('Alert')).toHaveTextContent('description')
  })
})
