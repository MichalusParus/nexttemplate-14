import '@testing-library/jest-dom'

window.HTMLElement.prototype.scrollIntoView = jest.fn()

import { axe, toHaveNoViolations } from 'jest-axe'
import { act, createRef } from 'react'

import { fireEvent, render, screen } from '../../../../../../../../.jest/customRender'
import { defaultTestDate } from '../DatePicker.test'
import { DatePickerCombobox } from '.'

expect.extend(toHaveNoViolations)

describe('DatePickerCombobox', () => {
  it('default', () => {
    render(
      <DatePickerCombobox
        className="className"
        isOpen={false}
        name="datePickerTest"
        placeholder="placeholder"
        handleOpen={() => {}}
        handleOnChange={() => {}}
      />,
    )
    const comboboxRole = screen.getByRole('combobox')
    const calendarIcon = screen.getByTestId('CalendarIcon')

    expect(comboboxRole).toBeInTheDocument()
    expect(comboboxRole).toHaveClass('className')
    expect(comboboxRole).toHaveTextContent('placeholder')
    expect(comboboxRole).toHaveAttribute('id', 'datePickerTest')
    expect(comboboxRole).toHaveAttribute('name', 'datePickerTest')
    expect(comboboxRole).toHaveAttribute('type', 'button')
    expect(comboboxRole).toHaveAttribute('aria-expanded', 'false')
    expect(comboboxRole).toHaveAttribute('aria-haspopup', 'true')
    expect(comboboxRole).toHaveAttribute('aria-controls', 'datePickerTest-calendar')
    expect(comboboxRole).toHaveAttribute('aria-owns', 'datePickerTest-calendar')
    expect(calendarIcon).toBeInTheDocument()
    comboboxRole.focus()
    expect(document.activeElement).toBe(comboboxRole)
  })

  it('open', () => {
    render(
      <DatePickerCombobox
        isOpen={true}
        name="datePickerTest"
        value={defaultTestDate}
        handleOpen={() => {}}
        handleOnChange={() => {}}
      />,
    )
    const comboboxRole = screen.getByRole('combobox')

    expect(comboboxRole).toHaveAttribute('aria-expanded', 'true')
    expect(comboboxRole).toHaveClass('selected')
  })

  it('value', () => {
    render(
      <DatePickerCombobox
        isOpen={false}
        name="datePickerTest"
        value={defaultTestDate}
        handleOpen={() => {}}
        handleOnChange={() => {}}
      />,
    )
    const comboboxRole = screen.getByRole('combobox')

    expect(comboboxRole).toHaveTextContent('4.3.2023')
  })

  it('displayChips', async () => {
    const spy = jest.fn()
    render(
      <DatePickerCombobox
        isOpen={false}
        name="datePickerTest"
        displayChips
        calendarProps={{ multiValue: [defaultTestDate, new Date('2023-03-05')] }}
        handleOpen={() => {}}
        handleOnChange={spy}
      />,
    )
    const chipTestIds = screen.getAllByTestId('Chip')
    const clearTestIds = screen.getAllByTestId('ClearButton')

    expect(chipTestIds).toHaveLength(2)
    expect(chipTestIds[0]).toHaveTextContent('4.3.2023')
    expect(chipTestIds[1]).toHaveTextContent('5.3.2023')
    expect(clearTestIds).toHaveLength(2)

    await act(async () => {
      fireEvent.click(clearTestIds[0])
    })

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(defaultTestDate)
  })

  it('error', () => {
    render(
      <DatePickerCombobox
        isOpen={false}
        name="datePickerTest"
        error="error"
        handleOpen={() => {}}
        handleOnChange={() => {}}
      />,
    )
    const comboboxRole = screen.getByRole('combobox')

    expect(comboboxRole).toHaveClass('error')
  })

  it('chipProps', () => {
    render(
      <DatePickerCombobox
        isOpen={false}
        name="datePickerTest"
        displayChips
        calendarProps={{ multiValue: [defaultTestDate, new Date('2023-03-05')] }}
        chipProps={{ className: 'chipClass' }}
        handleOpen={() => {}}
        handleOnChange={() => {}}
      />,
    )
    const chipTestIds = screen.getAllByTestId('Chip')

    expect(chipTestIds[0]).toHaveClass('chipClass')
  })

  it('onClear', async () => {
    const spy = jest.fn()
    render(
      <DatePickerCombobox
        isOpen={false}
        name="datePickerTest"
        value={defaultTestDate}
        onClear={spy}
        handleOpen={() => {}}
        handleOnChange={() => {}}
      />,
    )
    const clearTestId = screen.getByTestId('ClearButton')

    expect(clearTestId).toBeInTheDocument()

    await act(async () => {
      fireEvent.click(clearTestId)
    })

    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('handleOpen', async () => {
    const spy = jest.fn()
    render(
      <DatePickerCombobox
        isOpen={false}
        name="datePickerTest"
        handleOpen={spy}
        handleOnChange={() => {}}
      />,
    )
    const comboboxRole = screen.getByRole('combobox')

    await act(async () => {
      fireEvent.click(comboboxRole)
    })

    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('disabled', () => {
    render(
      <DatePickerCombobox
        isOpen={false}
        name="datePickerTest"
        disabled
        handleOpen={() => {}}
        handleOnChange={() => {}}
      />,
    )
    const comboboxRole = screen.getByRole('combobox')

    expect(comboboxRole).toHaveAttribute('aria-disabled', 'true')
  })

  it('ref', () => {
    const ref = createRef<HTMLButtonElement>()
    render(
      <DatePickerCombobox
        ref={ref}
        isOpen={false}
        name="datePickerTest"
        handleOpen={() => {}}
        handleOnChange={() => {}}
      />,
    )

    expect(ref.current).not.toBeNull()
    expect(ref.current?.focus).toBeDefined()

    const focusMock = jest.spyOn(ref.current!, 'focus').mockImplementation(() => {})
    ref.current?.focus()

    expect(focusMock).toHaveBeenCalled()
    focusMock.mockRestore()
  })

  it('axe', async () => {
    const { container } = render(
      <DatePickerCombobox
        isOpen={false}
        name="datePickerTest"
        handleOpen={() => {}}
        handleOnChange={() => {}}
        title="title"
      />,
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
