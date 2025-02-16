import '@testing-library/jest-dom'

import { startOfDay } from 'date-fns'
import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { fireEvent, render, screen } from '.././../../../../../../.jest/customRender'
import { RangeDatePicker } from '.'

expect.extend(toHaveNoViolations)

describe('RangeDatePicker', () => {
  it('default', () => {
    render(
      <RangeDatePicker
        className="className"
        name="datePickerTest"
        placeholder="placeholder"
        value={{}}
        onChange={() => {}}
      />,
    )
    const datePickerTestId = screen.getByTestId('DatePicker')
    const comboboxRole = screen.getByRole('combobox')
    const dropdownTestId = screen.getByTestId('Dropdown')
    const calendarTestId = screen.getByTestId('Calendar')

    expect(datePickerTestId).toBeInTheDocument()
    expect(comboboxRole).toBeInTheDocument()
    expect(comboboxRole).toHaveClass('className')
    expect(comboboxRole).toBeInTheDocument()
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
    render(
      <RangeDatePicker
        name="datePickerTest"
        value={{ start: new Date('2023-03-04'), end: new Date('2023-03-06') }}
        onChange={() => {}}
      />,
    )
    const comboboxRole = screen.getByRole('combobox')

    expect(comboboxRole).toHaveTextContent('4.3.2023 - 6.3.2023')
  })

  it('error', () => {
    render(<RangeDatePicker name="datePickerTest" value={{}} error="error" onChange={() => {}} />)
    const comboboxRole = screen.getByRole('combobox')

    expect(comboboxRole).toHaveClass('error')
  })

  it('dropdownProps/calendarProps', () => {
    render(
      <RangeDatePicker
        name="datePickerTest"
        value={{}}
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

  it('uncompleteSelection', () => {
    const spy = jest.fn()
    render(
      <RangeDatePicker
        name="datePickerTest"
        placeholder="placeholder"
        value={{ start: new Date('2023-03-04') }}
        onChange={spy}
      />,
    )
    const comboboxRole = screen.getByRole('combobox')

    fireEvent.click(comboboxRole)
    fireEvent.click(comboboxRole)

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith({})
  })

  it('onChange', () => {
    const spy = jest.fn()
    render(
      <RangeDatePicker
        name="datePickerTest"
        placeholder="placeholder"
        value={{ start: new Date('2023-03-04') }}
        onChange={spy}
      />,
    )
    const comboboxRole = screen.getByRole('combobox')

    fireEvent.click(comboboxRole)
    fireEvent.click(screen.getAllByRole('gridcell')[8])
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith({
      start: new Date('2023-03-04'),
      end: startOfDay(new Date('2023-03-07')),
    })
  })

  it('disabled', () => {
    render(<RangeDatePicker name="datePickerTest" value={{}} disabled onChange={() => {}} />)
    const comboboxRole = screen.getByRole('combobox')

    expect(comboboxRole).toHaveAttribute('disabled')
    expect(comboboxRole).toHaveAttribute('tabindex', '-1')
  })

  it('ref', () => {
    const ref = createRef<HTMLButtonElement>()
    render(<RangeDatePicker ref={ref} name="datePickerTest" value={{}} onChange={() => {}} />)

    expect(ref.current).not.toBeNull()
    expect(ref.current?.focus).toBeDefined()

    const focusMock = jest.spyOn(ref.current!, 'focus').mockImplementation(() => {})
    ref.current?.focus()

    expect(focusMock).toHaveBeenCalled()
    focusMock.mockRestore()
  })

  it('axe', async () => {
    const { container } = render(
      <RangeDatePicker name="datePickerTest" value={{}} onChange={() => {}} />,
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
