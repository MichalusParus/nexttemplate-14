import '@testing-library/jest-dom'

window.HTMLElement.prototype.scrollIntoView = jest.fn()

import { startOfDay } from 'date-fns'
import { axe, toHaveNoViolations } from 'jest-axe'
import { act, createRef } from 'react'

import { defaultTestDate } from '../../DatePickerField/DatePicker/DatePicker.test'
import { fireEvent, render, screen } from '.././../../../../../../.jest/customRender'
import { RangeDatePicker } from '.'

expect.extend(toHaveNoViolations)

describe('RangeDatePicker', () => {
  it('default', async () => {
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
      <RangeDatePicker
        name="datePickerTest"
        value={{ start: defaultTestDate, end: new Date('2023-03-06') }}
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

  it('onOpen/onClose', async () => {
    const spyOpen = jest.fn()
    const spyClose = jest.fn()

    render(
      <RangeDatePicker
        name="datePickerTest"
        value={{}}
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

  it('dropdownProps/calendarProps', async () => {
    render(
      <RangeDatePicker
        name="datePickerTest"
        value={{}}
        onChange={() => {}}
        dropdownProps={{ className: 'dropdownClass' }}
        calendarProps={{ className: 'calendarClass' }}
      />,
    )
    const comboboxRole = screen.getByRole('combobox')

    await act(async () => {
      fireEvent.click(comboboxRole)
    })

    const dropdownTestId = screen.getByTestId('Dropdown')
    const calendarTestId = screen.getByTestId('Calendar')

    expect(dropdownTestId).toHaveClass('dropdownClass')
    expect(calendarTestId).toHaveClass('calendarClass')
  })

  it('uncompleteSelection', async () => {
    const spy = jest.fn()
    render(
      <RangeDatePicker
        name="datePickerTest"
        placeholder="placeholder"
        value={{ start: defaultTestDate }}
        onChange={spy}
      />,
    )
    const comboboxRole = screen.getByRole('combobox')

    await act(async () => {
      fireEvent.click(comboboxRole)
    })

    await act(async () => {
      fireEvent.click(comboboxRole)
    })

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith({})
  })

  it('onChange', async () => {
    const spy = jest.fn()
    render(
      <RangeDatePicker
        name="datePickerTest"
        placeholder="placeholder"
        value={{ start: defaultTestDate }}
        onChange={spy}
      />,
    )
    const comboboxRole = screen.getByRole('combobox')

    await act(async () => {
      fireEvent.click(comboboxRole)
    })

    await act(async () => {
      fireEvent.click(screen.getAllByRole('gridcell')[8])
    })

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith({
      start: defaultTestDate,
      end: startOfDay(new Date('2023-03-07')),
    })
  })

  it('disabled', () => {
    render(<RangeDatePicker name="datePickerTest" value={{}} disabled onChange={() => {}} />)
    const comboboxRole = screen.getByRole('combobox')

    expect(comboboxRole).toHaveAttribute('aria-disabled', 'true')
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
      <RangeDatePicker name="datePickerTest" value={{}} onChange={() => {}} title="title" />,
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
