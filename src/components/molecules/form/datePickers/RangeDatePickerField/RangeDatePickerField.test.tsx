import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '../../../../../../.jest/customRender'
import { JestFormProvider } from '../../../../../../.storybook/helpers'
import { RangeDatePickerField } from '.'

describe('RangeDatePicker', () => {
  it('default', () => {
    render(
      <JestFormProvider fields={['datePickerTest']}>
        <RangeDatePickerField className="className" name="datePickerTest" label="label" />
      </JestFormProvider>,
    )
    fireEvent.click(screen.getByRole('combobox'))
    expect(screen.getByTestId('Calendar')).toBeInTheDocument()
    expect(screen.getByTestId('DatePicker')).toHaveClass('className')
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-controls', 'datePickerTest')
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-labelledby', 'datePickerTest-label')
    expect(screen.getByTestId('Label')).toBeInTheDocument()
    expect(screen.getByTestId('Label')).toHaveTextContent('label')
  })
  it('onSubmit', () => {
    const spy = jest.fn()
    render(
      <JestFormProvider fields={['datePickerTest']} onSubmit={spy}>
        <RangeDatePickerField className="className" name="datePickerTest" label="label" />
        <button type="submit" data-testid="submit" />
      </JestFormProvider>,
    )
    screen.getByTestId('Form').onsubmit = spy
    fireEvent.click(screen.getByTestId('submit'))
    expect(spy).toHaveBeenCalled()
  })
})
