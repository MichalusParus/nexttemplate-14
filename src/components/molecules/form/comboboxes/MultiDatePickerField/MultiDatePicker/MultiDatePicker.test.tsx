import '@testing-library/jest-dom'

import { startOfDay } from 'date-fns'
import { axe, toHaveNoViolations } from 'jest-axe'
import { act, createRef } from 'react'

import { defaultTestDate } from '../../DatePickerField/DatePicker/DatePicker.test'
import { fireEvent, render, screen } from '.././../../../../../../.jest/customRender'
import { MultiDatePicker } from '.'

expect.extend(toHaveNoViolations)

describe('MultiDatePicker', () => {
  it('default', async () => {
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

    await act(async () => {
      fireEvent.click(comboboxRole)
    })

    const dropdownTestId = screen.getByTestId('Dropdown')
    const calendarTestId = screen.getByTestId('Calendar')

    expect(comboboxRole).toHaveAttribute('aria-controls', calendarTestId.getAttribute('id'))
    expect(comboboxRole).toHaveAttribute('aria-owns', calendarTestId.getAttribute('id'))
    expect(dropdownTestId).toBeInTheDocument()
    expect(calendarTestId).toBeInTheDocument()
    expect(calendarTestId).toHaveAttribute('id', comboboxRole.getAttribute('aria-controls'))
    expect(calendarTestId).toHaveAttribute('aria-hidden')
    expect(comboboxRole).toHaveAttribute('aria-expanded', 'true')
    expect(calendarTestId).toHaveAttribute('aria-hidden', 'false')
    comboboxRole.focus()
    expect(document.activeElement).toBe(comboboxRole)
  })

  it('value', () => {
    render(
      <MultiDatePicker
        name="datePickerTest"
        value={[defaultTestDate, new Date('2023-03-06')]}
        onChange={() => {}}
      />,
    )
    const comboboxRole = screen.getByRole('combobox')

    expect(comboboxRole).toHaveTextContent('4.3.2023, 6.3.2023')
  })

  it('displayChips', async () => {
    const spy = jest.fn()
    render(
      <MultiDatePicker
        name="datePickerTest"
        value={[defaultTestDate, new Date('2023-03-06')]}
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

    await act(async () => {
      fireEvent.click(clearTestIds[0])
    })

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith([new Date('2023-03-06')])
  })

  it('error', () => {
    render(<MultiDatePicker name="datePickerTest" value={[]} error="error" onChange={() => {}} />)
    const comboboxRole = screen.getByRole('combobox')

    expect(comboboxRole).toHaveClass('error')
  })

  it('dropdownProps/calendarProps/chipProps', async () => {
    render(
      <MultiDatePicker
        name="datePickerTest"
        value={[defaultTestDate, new Date('2023-03-06')]}
        onChange={() => {}}
        displayChips
        dropdownProps={{ className: 'dropdownClass' }}
        calendarProps={{ className: 'calendarClass' }}
        chipProps={{ className: 'chipClass' }}
      />,
    )
    const comboboxRole = screen.getByRole('combobox')

    await act(async () => {
      fireEvent.click(comboboxRole)
    })

    const dropdownTestId = screen.getByTestId('Dropdown')
    const calendarTestId = screen.getByTestId('Calendar')
    const chipTestIds = screen.getAllByTestId('Chip')

    expect(dropdownTestId).toHaveClass('dropdownClass')
    expect(calendarTestId).toHaveClass('calendarClass')
    expect(chipTestIds[0]).toHaveClass('chipClass')
  })

  it('onClear', async () => {
    const spy = jest.fn()
    render(
      <MultiDatePicker
        name="datePickerTest"
        value={[startOfDay(defaultTestDate)]}
        onChange={spy}
      />,
    )
    const clearButtonTestId = screen.getByTestId('ClearButton')

    expect(clearButtonTestId).toBeInTheDocument()

    await act(async () => {
      fireEvent.click(clearButtonTestId)
    })

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith([])
  })

  it('onOpen/onClose', async () => {
    const spyOpen = jest.fn()
    const spyClose = jest.fn()

    render(
      <MultiDatePicker
        name="datePickerTest"
        value={[startOfDay(defaultTestDate)]}
        onChange={() => {}}
        onOpen={spyOpen}
        onClose={spyClose}
      />,
    )
    const comboboxRole = screen.getByRole('combobox')

    await act(async () => {
      fireEvent.click(comboboxRole)
    })

    expect(spyOpen).toHaveBeenCalledTimes(1)
    expect(spyClose).toHaveBeenCalledTimes(0)

    spyOpen.mockClear()

    await act(async () => {
      fireEvent.click(comboboxRole)
    })

    expect(spyClose).toHaveBeenCalledTimes(1)
    expect(spyOpen).toHaveBeenCalledTimes(0)
  })

  it('onChange', async () => {
    const spy = jest.fn()
    render(
      <MultiDatePicker
        name="datePickerTest"
        value={[startOfDay(defaultTestDate)]}
        onChange={spy}
      />,
    )
    const comboboxRole = screen.getByRole('combobox')

    expect(comboboxRole).toHaveTextContent('4.3.2023')

    await act(async () => {
      fireEvent.click(comboboxRole)
    })

    await act(async () => {
      fireEvent.click(screen.getAllByRole('gridcell')[8])
    })

    expect(spy).toHaveBeenCalled()
    expect(spy).toHaveBeenCalledWith([
      startOfDay(defaultTestDate),
      startOfDay(new Date('2023-03-07')),
    ])
    expect(comboboxRole).toHaveTextContent('4.3.2023')
  })

  it('disabled', () => {
    render(<MultiDatePicker name="datePickerTest" value={[]} disabled onChange={() => {}} />)
    const comboboxRole = screen.getByRole('combobox')

    expect(comboboxRole).toHaveAttribute('disabled')
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
      <MultiDatePicker name="datePickerTest" value={[]} onChange={() => {}} title="title" />,
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
