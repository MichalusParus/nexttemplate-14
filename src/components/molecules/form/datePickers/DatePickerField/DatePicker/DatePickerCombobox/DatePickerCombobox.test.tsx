import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { fireEvent, render, screen } from '../../../../../../../../.jest/customRender'
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
        value={new Date('2023-03-04')}
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
        value={new Date('2023-03-04')}
        handleOpen={() => {}}
        handleOnChange={() => {}}
      />,
    )
    const comboboxRole = screen.getByRole('combobox')

    expect(comboboxRole).toHaveTextContent('4.3.2023')
  })

  it('displayChips', () => {
    const spy = jest.fn()
    render(
      <DatePickerCombobox
        isOpen={false}
        name="datePickerTest"
        displayChips
        calendarProps={{ multiValue: [new Date('2023-03-04'), new Date('2023-03-05')] }}
        handleOpen={() => {}}
        handleOnChange={spy}
      />,
    )
    const chipTestIds = screen.getAllByTestId('Chip')
    const clearTestIds = screen.getAllByTestId('ClearButton')

    expect(chipTestIds).toHaveLength(2)
    expect(chipTestIds[0]).toHaveTextContent('4.3.2023')
    expect(chipTestIds[1]).toHaveTextContent('5.3.2023')
    expect(clearTestIds).toHaveLength(3)

    fireEvent.click(clearTestIds[0])
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(new Date('2023-03-04'))
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

  it('onClear', () => {
    const spy = jest.fn()
    render(
      <DatePickerCombobox
        isOpen={false}
        name="datePickerTest"
        calendarProps={{ multiValue: [new Date('2023-03-04'), new Date('2023-03-05')] }}
        onClear={spy}
        handleOpen={() => {}}
        handleOnChange={() => {}}
      />,
    )
    const clearTestId = screen.getByTestId('ClearButton')

    expect(clearTestId).toBeInTheDocument()
    fireEvent.click(clearTestId)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('handleOpen', () => {
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

    fireEvent.click(comboboxRole)
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

    expect(comboboxRole).toHaveAttribute('disabled')
    expect(comboboxRole).toHaveAttribute('tabindex', '-1')
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
      />,
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
