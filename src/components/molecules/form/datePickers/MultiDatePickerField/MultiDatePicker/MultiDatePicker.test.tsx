import '@testing-library/jest-dom'

import { format } from 'date-fns'

import { fireEvent, render, screen } from '../../../../../../../.jest/customRender'
import { MultiDatePicker } from '.'

describe('MultiDatePicker', () => {
  it('default', () => {
    const date = new Date()
    render(
      <MultiDatePicker
        className="className"
        name="datePickerTest"
        value={[date]}
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
    render(<MultiDatePicker name="datePickerTest" value={[date]} onChange={() => {}} />)
    fireEvent.click(screen.getByRole('combobox'))
    expect(screen.getByRole('combobox')).toHaveTextContent(format(date, 'dd.M.y'))
  })

  it('onChange', () => {
    const spy = jest.fn()
    const date = new Date()
    render(<MultiDatePicker name="datePickerTest" value={[date]} onChange={spy} />)
    fireEvent.click(screen.getByRole('combobox'))
    fireEvent.click(screen.getAllByRole('button')[4])
    expect(spy).toHaveBeenCalled()
  })

  it('disabled', () => {
    render(<MultiDatePicker name="datePickerTest" value={[]} disabled onChange={() => {}} />)
    expect(screen.getByRole('combobox')).toHaveAttribute('disabled', '')
  })
})
