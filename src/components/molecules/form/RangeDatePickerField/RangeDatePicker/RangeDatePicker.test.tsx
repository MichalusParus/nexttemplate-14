import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'
import { format } from 'date-fns'

import { JestMockProvider } from '../../../../../../.storybook/helpers'
import RangeDatePicker from '.'

describe('RangeDatePicker', () => {
  it('default', () => {
    render(
      <JestMockProvider>
        <RangeDatePicker
          className="className"
          name="datePickerTest"
          label="label"
          value={{ start: undefined, end: undefined }}
          onChange={() => {}}
        />
      </JestMockProvider>,
    )
    fireEvent.click(screen.getByRole('combobox'))
    expect(screen.getByTestId('Calendar')).toBeTruthy()
    expect(screen.getByTestId('DatePicker')).toHaveClass('className')
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-controls', 'datePickerTest')
    expect(screen.getByTestId('LabelWrap')).toHaveTextContent('label')
  })
  it('error', () => {
    render(
      <JestMockProvider>
        <RangeDatePicker
          name="datePickerTest"
          label="label"
          value={{ start: undefined, end: undefined }}
          error="error"
          onChange={() => {}}
        />
      </JestMockProvider>,
    )
    expect(screen.getByRole('alert')).toHaveTextContent('error')
  })
  it('description', () => {
    render(
      <JestMockProvider>
        <RangeDatePicker
          name="datePickerTest"
          label="label"
          value={{ start: undefined, end: undefined }}
          labelProps={{ description: 'description' }}
          onChange={() => {}}
        />
      </JestMockProvider>,
    )
    expect(screen.getByRole('alert')).toHaveTextContent('description')
  })
  it('value', () => {
    const date = new Date()
    render(
      <JestMockProvider>
        <RangeDatePicker
          name="datePickerTest"
          label="label"
          value={{ start: date, end: date }}
          onChange={() => {}}
        />
      </JestMockProvider>,
    )
    fireEvent.click(screen.getByRole('combobox'))
    expect(screen.getByRole('combobox')).toHaveTextContent(
      `${format(date, 'dd.M.y')} - ${format(date, 'dd.M.y')}`,
    )
  })
  it('onChange', () => {
    const spy = jest.fn()
    render(
      <JestMockProvider>
        <RangeDatePicker
          name="datePickerTest"
          label="label"
          value={{ start: undefined, end: undefined }}
          onChange={spy}
        />
      </JestMockProvider>,
    )
    fireEvent.click(screen.getByRole('combobox'))
    fireEvent.click(screen.getAllByRole('button')[4])
    expect(spy).toHaveBeenCalled()
  })
  it('disabled', () => {
    render(
      <JestMockProvider>
        <RangeDatePicker
          name="datePickerTest"
          label="label"
          value={{ start: undefined, end: undefined }}
          disabled
          onChange={() => {}}
        />
      </JestMockProvider>,
    )
    expect(screen.getByRole('combobox')).toHaveAttribute('disabled', '')
  })
})
