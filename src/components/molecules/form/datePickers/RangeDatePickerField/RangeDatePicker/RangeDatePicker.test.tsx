import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'
import { format } from 'date-fns'

import { JestMockProvider } from '../../../../../../../.storybook/helpers'
import { RangeDatePicker } from '.'

describe('RangeDatePicker', () => {
  it('default', () => {
    render(
      <JestMockProvider>
        <RangeDatePicker
          className="className"
          name="datePickerTest"
          value={{ start: undefined, end: undefined }}
          onChange={() => {}}
        />
      </JestMockProvider>,
    )
    fireEvent.click(screen.getByRole('combobox'))
    expect(screen.getByTestId('Calendar')).toBeInTheDocument()
    expect(screen.getByTestId('DatePicker')).toHaveClass('className')
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-controls', 'datePickerTest')
  })

  it('value', () => {
    const date = new Date()
    render(
      <JestMockProvider>
        <RangeDatePicker
          name="datePickerTest"
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
          value={{ start: undefined, end: undefined }}
          disabled
          onChange={() => {}}
        />
      </JestMockProvider>,
    )
    expect(screen.getByRole('combobox')).toHaveAttribute('disabled', '')
  })
})
