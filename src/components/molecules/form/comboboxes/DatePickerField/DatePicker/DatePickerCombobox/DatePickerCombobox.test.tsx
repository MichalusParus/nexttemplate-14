import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { act, createRef } from 'react'

import { fireEvent, render, screen } from '../../../../../../../../.jest/customRender'
import { defaultTestDate } from '../DatePicker.test'
import { DatePickerCombobox } from '.'

expect.extend(toHaveNoViolations)

describe('DatePickerCombobox', () => {
  describe('Semantics', () => {
    it('renders combobox role', () => {
      render(
        <DatePickerCombobox
          isOpen={false}
          name="datePickerTest"
          handleOpen={() => {}}
          handleOnChange={() => {}}
        />,
      )
      const combobox = screen.getByRole('combobox')

      expect(combobox).toBeInTheDocument()
    })

    it('forwards className', () => {
      render(
        <DatePickerCombobox
          className="className"
          isOpen={false}
          name="datePickerTest"
          handleOpen={() => {}}
          handleOnChange={() => {}}
        />,
      )
      const combobox = screen.getByRole('combobox')

      expect(combobox).toHaveClass('className')
    })

    it('placeholder when no value', () => {
      render(
        <DatePickerCombobox
          isOpen={false}
          name="datePickerTest"
          placeholder="placeholder"
          handleOpen={() => {}}
          handleOnChange={() => {}}
        />,
      )
      const combobox = screen.getByRole('combobox')

      expect(combobox).toHaveTextContent('placeholder')
    })

    it('id and name from name prop', () => {
      render(
        <DatePickerCombobox
          isOpen={false}
          name="datePickerTest"
          handleOpen={() => {}}
          handleOnChange={() => {}}
        />,
      )
      const combobox = screen.getByRole('combobox')

      expect(combobox).toHaveAttribute('id', 'datePickerTest')
      expect(combobox).toHaveAttribute('name', 'datePickerTest')
    })

    it('type="button"', () => {
      render(
        <DatePickerCombobox
          isOpen={false}
          name="datePickerTest"
          handleOpen={() => {}}
          handleOnChange={() => {}}
        />,
      )
      const combobox = screen.getByRole('combobox')

      expect(combobox).toHaveAttribute('type', 'button')
    })

    it('aria-expanded false when closed', () => {
      render(
        <DatePickerCombobox
          isOpen={false}
          name="datePickerTest"
          handleOpen={() => {}}
          handleOnChange={() => {}}
        />,
      )
      const combobox = screen.getByRole('combobox')

      expect(combobox).toHaveAttribute('aria-expanded', 'false')
    })

    it('aria-expanded true when open', () => {
      render(
        <DatePickerCombobox
          isOpen={true}
          name="datePickerTest"
          value={defaultTestDate}
          handleOpen={() => {}}
          handleOnChange={() => {}}
        />,
      )
      const combobox = screen.getByRole('combobox')

      expect(combobox).toHaveAttribute('aria-expanded', 'true')
    })

    it('aria-haspopup', () => {
      render(
        <DatePickerCombobox
          isOpen={false}
          name="datePickerTest"
          handleOpen={() => {}}
          handleOnChange={() => {}}
        />,
      )
      const combobox = screen.getByRole('combobox')

      expect(combobox).toHaveAttribute('aria-haspopup', 'true')
    })

    it('aria-controls and aria-owns link to calendar', () => {
      render(
        <DatePickerCombobox
          isOpen={false}
          name="datePickerTest"
          handleOpen={() => {}}
          handleOnChange={() => {}}
        />,
      )
      const combobox = screen.getByRole('combobox')

      expect(combobox).toHaveAttribute('aria-controls', 'datePickerTest-calendar')
      expect(combobox).toHaveAttribute('aria-owns', 'datePickerTest-calendar')
    })

    it('selected class when open', () => {
      render(
        <DatePickerCombobox
          isOpen={true}
          name="datePickerTest"
          value={defaultTestDate}
          handleOpen={() => {}}
          handleOnChange={() => {}}
        />,
      )
      const combobox = screen.getByRole('combobox')

      expect(combobox).toHaveClass('selected')
    })

    it('displays formatted date', () => {
      render(
        <DatePickerCombobox
          isOpen={false}
          name="datePickerTest"
          value={defaultTestDate}
          handleOpen={() => {}}
          handleOnChange={() => {}}
        />,
      )
      const combobox = screen.getByRole('combobox')

      expect(combobox).toHaveTextContent('3/4/2023')
    })

    it('locale changes date format', () => {
      render(
        <DatePickerCombobox
          isOpen={false}
          name="datePickerTest"
          value={defaultTestDate}
          locale="de-DE"
          handleOpen={() => {}}
          handleOnChange={() => {}}
        />,
      )
      const combobox = screen.getByRole('combobox')

      expect(combobox).toHaveTextContent('4.3.2023')
    })

    it('displays chips for multiValue', () => {
      render(
        <DatePickerCombobox
          isOpen={false}
          name="datePickerTest"
          displayChips
          calendarProps={{ multiValue: [defaultTestDate, new Date('2023-03-05')] }}
          handleOpen={() => {}}
          handleOnChange={() => {}}
        />,
      )
      const chips = screen.getAllByTestId('Chip')

      expect(chips).toHaveLength(2)
      expect(chips[0]).toHaveTextContent('3/4/2023')
      expect(chips[1]).toHaveTextContent('3/5/2023')
    })

    it('chipProps forwarded', () => {
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
      const chips = screen.getAllByTestId('Chip')

      expect(chips[0]).toHaveClass('chipClass')
    })

    it('renders ClearButton when onClear and value', () => {
      render(
        <DatePickerCombobox
          isOpen={false}
          name="datePickerTest"
          value={defaultTestDate}
          onClear={() => {}}
          handleOpen={() => {}}
          handleOnChange={() => {}}
        />,
      )

      expect(screen.getByTestId('ClearButton')).toBeInTheDocument()
    })

    it('renders CalendarIcon', () => {
      render(
        <DatePickerCombobox
          isOpen={false}
          name="datePickerTest"
          handleOpen={() => {}}
          handleOnChange={() => {}}
        />,
      )

      expect(screen.getByTestId('CalendarIcon')).toBeInTheDocument()
    })

    it('error class', () => {
      render(
        <DatePickerCombobox
          isOpen={false}
          name="datePickerTest"
          error="error"
          handleOpen={() => {}}
          handleOnChange={() => {}}
        />,
      )
      const combobox = screen.getByRole('combobox')

      expect(combobox).toHaveClass('error')
    })

    it('disabled sets aria-disabled', () => {
      render(
        <DatePickerCombobox
          isOpen={false}
          name="datePickerTest"
          disabled
          handleOpen={() => {}}
          handleOnChange={() => {}}
        />,
      )
      const combobox = screen.getByRole('combobox')

      expect(combobox).toHaveAttribute('aria-disabled', 'true')
    })
  })

  describe('Keyboard', () => {
    it('combobox is focusable', () => {
      render(
        <DatePickerCombobox
          isOpen={false}
          name="datePickerTest"
          handleOpen={() => {}}
          handleOnChange={() => {}}
        />,
      )
      const combobox = screen.getByRole('combobox')

      combobox.focus()
      expect(document.activeElement).toBe(combobox)
    })
  })

  describe('Interaction', () => {
    it('handleOpen called on click', async () => {
      const handleOpen = jest.fn()
      render(
        <DatePickerCombobox
          isOpen={false}
          name="datePickerTest"
          handleOpen={handleOpen}
          handleOnChange={() => {}}
        />,
      )
      const combobox = screen.getByRole('combobox')

      await act(async () => {
        fireEvent.click(combobox)
      })

      expect(handleOpen).toHaveBeenCalledTimes(1)
    })

    it('onClear fires on clear button click', async () => {
      const onClear = jest.fn()
      render(
        <DatePickerCombobox
          isOpen={false}
          name="datePickerTest"
          value={defaultTestDate}
          onClear={onClear}
          handleOpen={() => {}}
          handleOnChange={() => {}}
        />,
      )

      await act(async () => {
        fireEvent.click(screen.getByTestId('ClearButton'))
      })

      expect(onClear).toHaveBeenCalledTimes(1)
    })

    it('chip clear fires handleOnChange', async () => {
      const handleOnChange = jest.fn()
      render(
        <DatePickerCombobox
          isOpen={false}
          name="datePickerTest"
          displayChips
          calendarProps={{ multiValue: [defaultTestDate, new Date('2023-03-05')] }}
          handleOpen={() => {}}
          handleOnChange={handleOnChange}
        />,
      )
      const clearButtons = screen.getAllByTestId('ClearButton')

      await act(async () => {
        fireEvent.click(clearButtons[0])
      })

      expect(handleOnChange).toHaveBeenCalledTimes(1)
      expect(handleOnChange).toHaveBeenCalledWith(defaultTestDate)
    })
  })

  describe('Ref', () => {
    it('forwards ref to combobox', () => {
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

      expect(ref.current).toBeInstanceOf(HTMLButtonElement)
    })
  })

  describe('Accessibility', () => {
    it('no axe violations', async () => {
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
})
