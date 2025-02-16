import '@testing-library/jest-dom'

import { startOfDay } from 'date-fns'
import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { fireEvent, render, screen } from '.././../../../../../../.jest/customRender'
import { MultiDatePicker } from '.'

expect.extend(toHaveNoViolations)

describe('MultiDatePicker', () => {
  it('default', () => {
    render(
      <MultiDatePicker
        className="className"
        name="datePickerTest"
        placeholder="placeholder"
        value={[]}
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
      <MultiDatePicker
        name="datePickerTest"
        value={[new Date('2023-03-04'), new Date('2023-03-06')]}
        onChange={() => {}}
      />,
    )
    const comboboxRole = screen.getByRole('combobox')

    expect(comboboxRole).toHaveTextContent('4.3.2023, 6.3.2023')
  })

  it('displayChips', () => {
    const spy = jest.fn()
    render(
      <MultiDatePicker
        name="datePickerTest"
        value={[new Date('2023-03-04'), new Date('2023-03-06')]}
        displayChips
        onChange={spy}
      />,
    )
    const chipTestIds = screen.getAllByTestId('Chip')
    const clearTestIds = screen.getAllByTestId('ClearButton')

    expect(chipTestIds).toHaveLength(2)
    expect(chipTestIds[0]).toHaveTextContent('4.3.2023')
    expect(chipTestIds[1]).toHaveTextContent('6.3.2023')
    expect(clearTestIds).toHaveLength(3)

    fireEvent.click(clearTestIds[0])
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith([new Date('2023-03-06')])
  })

  it('error', () => {
    render(<MultiDatePicker name="datePickerTest" value={[]} error="error" onChange={() => {}} />)
    const comboboxRole = screen.getByRole('combobox')

    expect(comboboxRole).toHaveClass('error')
  })

  it('dropdownProps/calendarProps/chipProps', () => {
    render(
      <MultiDatePicker
        name="datePickerTest"
        value={[new Date('2023-03-04'), new Date('2023-03-06')]}
        onChange={() => {}}
        displayChips
        dropdownProps={{ className: 'dropdownClass' }}
        calendarProps={{ className: 'calendarClass' }}
        chipProps={{ className: 'chipClass' }}
      />,
    )
    const dropdownTestId = screen.getByTestId('Dropdown')
    const calendarTestId = screen.getByTestId('Calendar')
    const chipTestIds = screen.getAllByTestId('Chip')

    expect(dropdownTestId).toHaveClass('dropdownClass')
    expect(calendarTestId).toHaveClass('calendarClass')
    expect(chipTestIds[0]).toHaveClass('chipClass')
  })

  it('onClear', () => {
    const spy = jest.fn()
    render(
      <MultiDatePicker
        name="datePickerTest"
        value={[startOfDay(new Date('2023-03-04'))]}
        onChange={spy}
      />,
    )
    const clearButtonTestId = screen.getByTestId('ClearButton')

    expect(clearButtonTestId).toBeInTheDocument()
    fireEvent.click(clearButtonTestId)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith([])
  })

  it('onChange', () => {
    const spy = jest.fn()
    render(
      <MultiDatePicker
        name="datePickerTest"
        value={[startOfDay(new Date('2023-03-04'))]}
        onChange={spy}
      />,
    )
    const comboboxRole = screen.getByRole('combobox')

    expect(comboboxRole).toHaveTextContent('4.3.2023')
    fireEvent.click(comboboxRole)
    fireEvent.click(screen.getAllByRole('gridcell')[8])
    expect(spy).toHaveBeenCalled()
    expect(spy).toHaveBeenCalledWith([
      startOfDay(new Date('2023-03-04')),
      startOfDay(new Date('2023-03-07')),
    ])
    expect(comboboxRole).toHaveTextContent('4.3.2023')
  })

  it('disabled', () => {
    render(<MultiDatePicker name="datePickerTest" value={[]} disabled onChange={() => {}} />)
    const comboboxRole = screen.getByRole('combobox')

    expect(comboboxRole).toHaveAttribute('disabled')
    expect(comboboxRole).toHaveAttribute('tabindex', '-1')
  })

  it('ref', () => {
    const ref = createRef<HTMLButtonElement>()
    render(<MultiDatePicker ref={ref} name="datePickerTest" value={[]} onChange={() => {}} />)

    expect(ref.current).not.toBeNull()
    expect(ref.current?.focus).toBeDefined()

    const focusMock = jest.spyOn(ref.current!, 'focus').mockImplementation(() => {})
    ref.current?.focus()

    expect(focusMock).toHaveBeenCalled()
    focusMock.mockRestore()
  })

  it('axe', async () => {
    const { container } = render(
      <MultiDatePicker name="datePickerTest" value={[]} onChange={() => {}} />,
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
