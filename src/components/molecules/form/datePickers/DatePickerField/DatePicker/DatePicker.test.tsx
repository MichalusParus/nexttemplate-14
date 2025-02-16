import '@testing-library/jest-dom'

import { startOfDay } from 'date-fns'
import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { fireEvent, render, screen } from '.././../../../../../../.jest/customRender'
import { DatePicker } from '.'

expect.extend(toHaveNoViolations)

describe('DatePicker', () => {
  it('default', () => {
    render(
      <DatePicker
        className="className"
        name="datePickerTest"
        placeholder="placeholder"
        value={undefined}
        onChange={() => {}}
      />,
    )
    const datePickerTestId = screen.getByTestId('DatePicker')
    const comboboxRole = screen.getByRole('combobox')
    const dropdownTestId = screen.getByTestId('Dropdown')
    const calendarTestId = screen.getByTestId('Calendar')

    expect(datePickerTestId).toBeInTheDocument()
    expect(comboboxRole).toBeInTheDocument()
    expect(comboboxRole).toBeInTheDocument()
    expect(comboboxRole).toHaveClass('className')
    expect(comboboxRole).toHaveTextContent('placeholder')
    expect(comboboxRole).toHaveAttribute('id', 'datePickerTest')
    expect(comboboxRole).toHaveAttribute('name', 'datePickerTest')
    expect(comboboxRole).toHaveAttribute('type', 'button')
    expect(comboboxRole).toHaveAttribute('aria-expanded', 'false')
    expect(comboboxRole).toHaveAttribute('aria-haspopup', 'true')
    expect(comboboxRole).toHaveAttribute('aria-controls', calendarTestId.getAttribute('id'))
    expect(comboboxRole).toHaveAttribute('aria-owns', calendarTestId.getAttribute('id'))
    expect(dropdownTestId).toBeInTheDocument()
    expect(calendarTestId).toBeInTheDocument()
    expect(calendarTestId).toHaveAttribute('id', comboboxRole.getAttribute('aria-controls'))
    expect(calendarTestId).toHaveAttribute('aria-hidden')
    comboboxRole.focus()
    expect(document.activeElement).toBe(comboboxRole)

    fireEvent.click(comboboxRole)
    expect(comboboxRole).toHaveAttribute('aria-expanded', 'true')
    expect(calendarTestId).toHaveAttribute('aria-hidden', 'false')
  })

  it('value', () => {
    render(<DatePicker name="datePickerTest" value={new Date('2023-03-04')} onChange={() => {}} />)
    const comboboxRole = screen.getByRole('combobox')

    expect(comboboxRole).toHaveTextContent('4.3.2023')
  })

  it('error', () => {
    render(<DatePicker name="datePickerTest" error="error" onChange={() => {}} />)
    const comboboxRole = screen.getByRole('combobox')

    expect(comboboxRole).toHaveClass('error')
  })

  it('dropdownProps/calendarProps', () => {
    render(
      <DatePicker
        name="datePickerTest"
        value={new Date('2023-03-04')}
        onChange={() => {}}
        dropdownProps={{ className: 'dropdownClass' }}
        calendarProps={{ className: 'calendarClass' }}
      />,
    )
    const dropdownTestId = screen.getByTestId('Dropdown')
    const calendarTestId = screen.getByTestId('Calendar')

    expect(dropdownTestId).toHaveClass('dropdownClass')
    expect(calendarTestId).toHaveClass('calendarClass')
  })

  it('onClose', () => {
    const spy = jest.fn()
    render(
      <DatePicker
        name="datePickerTest"
        value={new Date('2023-03-04')}
        onChange={() => {}}
        onClose={spy}
      />,
    )
    const comboboxRole = screen.getByRole('combobox')

    fireEvent.click(comboboxRole)
    fireEvent.click(comboboxRole)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('onChange', () => {
    const spy = jest.fn()
    render(<DatePicker name="datePickerTest" value={new Date('2023-03-04')} onChange={spy} />)
    const comboboxRole = screen.getByRole('combobox')

    expect(comboboxRole).toHaveTextContent('4.3.2023')
    fireEvent.click(comboboxRole)
    const cellTestId = screen.getAllByRole('gridcell')
    fireEvent.click(cellTestId[8])
    expect(spy).toHaveBeenCalled()
    expect(spy).toHaveBeenCalledWith(startOfDay(new Date('2023-03-07')))
    expect(comboboxRole).toHaveTextContent('4.3.2023')
  })

  it('disabled', () => {
    render(<DatePicker name="datePickerTest" value={new Date()} disabled onChange={() => {}} />)
    const comboboxRole = screen.getByRole('combobox')

    expect(comboboxRole).toHaveAttribute('disabled')
    expect(comboboxRole).toHaveAttribute('tabindex', '-1')
  })

  it('ref', () => {
    const ref = createRef<HTMLButtonElement>()
    render(<DatePicker ref={ref} name="datePickerTest" value={undefined} onChange={() => {}} />)

    expect(ref.current).not.toBeNull()
    expect(ref.current?.focus).toBeDefined()

    const focusMock = jest.spyOn(ref.current!, 'focus').mockImplementation(() => {})
    ref.current?.focus()

    expect(focusMock).toHaveBeenCalled()
    focusMock.mockRestore()
  })

  it('axe', async () => {
    const { container } = render(
      <DatePicker name="datePickerTest" value={undefined} onChange={() => {}} />,
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
