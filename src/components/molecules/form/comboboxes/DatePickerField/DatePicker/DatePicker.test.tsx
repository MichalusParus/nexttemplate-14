import '@testing-library/jest-dom'

import { startOfDay } from 'date-fns'
import { axe, toHaveNoViolations } from 'jest-axe'
import { act, createRef } from 'react'

import { fireEvent, render, screen } from '.././../../../../../../.jest/customRender'
import { DatePicker } from '.'

expect.extend(toHaveNoViolations)

export const defaultTestDate = new Date('2023-03-04')

describe('DatePicker', () => {
  it('default', async () => {
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
    render(<DatePicker name="datePickerTest" value={defaultTestDate} onChange={() => {}} />)
    const comboboxRole = screen.getByRole('combobox')

    expect(comboboxRole).toHaveTextContent('4.3.2023')
  })

  it('error', () => {
    render(<DatePicker name="datePickerTest" error="error" onChange={() => {}} />)
    const comboboxRole = screen.getByRole('combobox')

    expect(comboboxRole).toHaveClass('error')
  })

  it('dropdownProps/calendarProps', async () => {
    render(
      <DatePicker
        name="datePickerTest"
        value={defaultTestDate}
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

  it('onClose', async () => {
    const spy = jest.fn()
    render(
      <DatePicker
        name="datePickerTest"
        value={defaultTestDate}
        onChange={() => {}}
        onClose={spy}
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
  })

  it('onOpen/onClose', async () => {
    const spyOpen = jest.fn()
    const spyClose = jest.fn()

    render(
      <DatePicker
        name="datePickerTest"
        value={defaultTestDate}
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
    render(<DatePicker name="datePickerTest" value={defaultTestDate} onChange={spy} />)
    const comboboxRole = screen.getByRole('combobox')

    expect(comboboxRole).toHaveTextContent('4.3.2023')

    await act(async () => {
      fireEvent.click(comboboxRole)
    })

    const cellTestId = screen.getAllByRole('gridcell')

    await act(async () => {
      fireEvent.click(cellTestId[8])
    })

    expect(spy).toHaveBeenCalled()
    expect(spy).toHaveBeenCalledWith(startOfDay(new Date('2023-03-07')))
    expect(comboboxRole).toHaveTextContent('4.3.2023')
  })

  it('disabled', () => {
    render(<DatePicker name="datePickerTest" value={new Date()} disabled onChange={() => {}} />)
    const comboboxRole = screen.getByRole('combobox')

    expect(comboboxRole).toHaveAttribute('disabled')
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
      <DatePicker name="datePickerTest" value={undefined} onChange={() => {}} title="title" />,
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
