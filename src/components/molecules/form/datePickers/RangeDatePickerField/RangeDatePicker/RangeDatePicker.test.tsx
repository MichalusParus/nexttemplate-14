import '@testing-library/jest-dom'

import { format } from 'date-fns'

import { fireEvent, render, screen } from '../../../../../../../.jest/customRender'
import { RangeDatePicker } from '.'

describe('RangeDatePicker', () => {
  it('default', () => {
    render(
      <RangeDatePicker
        className="className"
        name="datePickerTest"
        value={{ start: undefined, end: undefined }}
        onChange={() => {}}
      />,
    )
    fireEvent.click(screen.getByRole('combobox'))
    expect(screen.getByTestId('Calendar')).toBeInTheDocument()
    expect(screen.getByTestId('DatePicker')).toHaveClass('className')
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-controls', 'datePickerTest')
  })

  it('value', () => {
    const date = new Date()
    render(
      <RangeDatePicker
        name="datePickerTest"
        value={{ start: date, end: date }}
        onChange={() => {}}
      />,
    )
    fireEvent.click(screen.getByRole('combobox'))
    expect(screen.getByRole('combobox')).toHaveTextContent(
      `${format(date, 'dd.M.y')} - ${format(date, 'dd.M.y')}`,
    )
  })

  it('onChange', () => {
    const spy = jest.fn()
    render(
      <RangeDatePicker
        name="datePickerTest"
        value={{ start: undefined, end: undefined }}
        onChange={spy}
      />,
    )
    fireEvent.click(screen.getByRole('combobox'))
    fireEvent.click(screen.getAllByRole('gridcell')[8])
    expect(spy).toHaveBeenCalled()
  })

  it('disabled', () => {
    render(
      <RangeDatePicker
        name="datePickerTest"
        value={{ start: undefined, end: undefined }}
        disabled
        onChange={() => {}}
      />,
    )
    expect(screen.getByRole('combobox')).toHaveAttribute('disabled', '')
  })
})
