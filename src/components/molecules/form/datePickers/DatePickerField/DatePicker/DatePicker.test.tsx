import '@testing-library/jest-dom'

import { format } from 'date-fns'

import { fireEvent, render, screen } from '.././../../../../../../.jest/customRender'
import { DatePicker } from '.'

describe('DatePicker', () => {
  it('default', () => {
    render(
      <DatePicker
        className="className"
        name="datePickerTest"
        value={new Date()}
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
    render(<DatePicker name="datePickerTest" value={new Date()} onChange={() => {}} />)
    fireEvent.click(screen.getByRole('combobox'))
    expect(screen.getByRole('combobox')).toHaveTextContent(format(date, 'dd.M.y'))
  })

  it('onChange', () => {
    const spy = jest.fn()
    render(<DatePicker name="datePickerTest" value={new Date()} onChange={spy} />)
    fireEvent.click(screen.getByRole('combobox'))
    fireEvent.click(screen.getAllByRole('button')[4])
    expect(spy).toHaveBeenCalled()
  })

  it('disabled', () => {
    render(<DatePicker name="datePickerTest" value={new Date()} disabled onChange={() => {}} />)
    expect(screen.getByRole('combobox')).toHaveAttribute('disabled', '')
  })
})
