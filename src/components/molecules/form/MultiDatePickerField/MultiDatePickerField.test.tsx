import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'

import { JestFormProvider, JestMockProvider } from '../../../../../.storybook/helpers'
import { MultiDatePickerField } from '.'

describe('MultiDatePicker', () => {
  it('default', () => {
    render(
      <JestMockProvider>
        <JestFormProvider fields={['datePickerTest']} values={[[]]}>
          <MultiDatePickerField className="className" name="datePickerTest" label="label" />
        </JestFormProvider>
      </JestMockProvider>,
    )
    fireEvent.click(screen.getByRole('combobox'))
    expect(screen.getByTestId('Calendar')).toBeTruthy()
    expect(screen.getByTestId('DatePicker')).toHaveClass('className')
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-controls', 'datePickerTest')
    expect(screen.getByTestId('LabelWrap')).toHaveTextContent('label')
  })

  it('onSubmit', () => {
    const spy = jest.fn()
    render(
      <JestMockProvider>
        <JestFormProvider fields={['datePickerTest']} values={[[]]} onSubmit={spy}>
          <MultiDatePickerField className="className" name="datePickerTest" label="label" />
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
        <JestFormProvider fields={['datePickerTest']} values={[[]]}>
          <MultiDatePickerField
            className="className"
            name="datePickerTest"
            label="label"
            labelProps={{ description: 'description' }}
          />
          <button type="submit" data-testid="submit" />
        </JestFormProvider>
      </JestMockProvider>,
    )
    expect(screen.getByRole('alert')).toHaveTextContent('description')
  })
})
