import '@testing-library/jest-dom'

import { startOfDay } from 'date-fns'
import { axe, toHaveNoViolations } from 'jest-axe'
import { act, createRef } from 'react'

import { defaultTestDate } from '../../DatePickerField/DatePicker/DatePicker.test'
import { fireEvent, render, screen } from '.././../../../../../../.jest/customRender'
import { MultiDatePicker } from '.'

expect.extend(toHaveNoViolations)

describe('MultiDatePicker', () => {
  describe('Semantics', () => {
    it('renders wrapper', () => {
      render(<MultiDatePicker name="datePickerTest" value={[]} onChange={() => {}} />)

      expect(screen.getByTestId('DatePicker')).toBeInTheDocument()
    })

    it('forwards className', () => {
      render(
        <MultiDatePicker className="className" name="datePickerTest" value={[]} onChange={() => {}} />,
      )
      const combobox = screen.getByRole('combobox')

      expect(combobox).toHaveClass('className')
    })

    it('id and name from name prop', () => {
      render(<MultiDatePicker name="datePickerTest" value={[]} onChange={() => {}} />)
      const combobox = screen.getByRole('combobox')

      expect(combobox).toHaveAttribute('id', 'datePickerTest')
      expect(combobox).toHaveAttribute('name', 'datePickerTest')
      expect(combobox).toHaveAttribute('type', 'button')
    })

    it('placeholder when empty', () => {
      render(
        <MultiDatePicker
          name="datePickerTest"
          placeholder="placeholder"
          value={[]}
          onChange={() => {}}
        />,
      )
      const combobox = screen.getByRole('combobox')

      expect(combobox).toHaveTextContent('placeholder')
    })

    it('aria-expanded false when closed', () => {
      render(<MultiDatePicker name="datePickerTest" value={[]} onChange={() => {}} />)
      const combobox = screen.getByRole('combobox')

      expect(combobox).toHaveAttribute('aria-expanded', 'false')
    })

    it('aria-expanded true when open', async () => {
      render(<MultiDatePicker name="datePickerTest" value={[]} onChange={() => {}} />)
      const combobox = screen.getByRole('combobox')

      await act(async () => {
        fireEvent.click(combobox)
      })

      expect(combobox).toHaveAttribute('aria-expanded', 'true')
    })

    it('aria-haspopup', () => {
      render(<MultiDatePicker name="datePickerTest" value={[]} onChange={() => {}} />)
      const combobox = screen.getByRole('combobox')

      expect(combobox).toHaveAttribute('aria-haspopup', 'true')
    })

    it('aria-controls and aria-owns link to calendar', async () => {
      render(<MultiDatePicker name="datePickerTest" value={[]} onChange={() => {}} />)
      const combobox = screen.getByRole('combobox')

      await act(async () => {
        fireEvent.click(combobox)
      })

      const calendar = screen.getByTestId('Calendar')

      expect(combobox).toHaveAttribute('aria-controls', calendar.getAttribute('id'))
      expect(combobox).toHaveAttribute('aria-owns', calendar.getAttribute('id'))
      expect(calendar).toHaveAttribute('id', combobox.getAttribute('aria-controls'))
    })

    it('displays multi-value', () => {
      render(
        <MultiDatePicker
          name="datePickerTest"
          value={[defaultTestDate, new Date('2023-03-06')]}
          onChange={() => {}}
        />,
      )
      const combobox = screen.getByRole('combobox')

      expect(combobox).toHaveTextContent('3/4/2023, 3/6/2023')
    })

    it('displayChips renders chips', () => {
      render(
        <MultiDatePicker
          name="datePickerTest"
          value={[defaultTestDate, new Date('2023-03-06')]}
          displayChips
          onChange={() => {}}
        />,
      )
      const chips = screen.getAllByTestId('Chip')

      expect(chips).toHaveLength(2)
      expect(chips[0]).toHaveTextContent('3/4/2023')
      expect(chips[1]).toHaveTextContent('3/6/2023')
    })

    it('error class', () => {
      render(<MultiDatePicker name="datePickerTest" value={[]} error="error" onChange={() => {}} />)
      const combobox = screen.getByRole('combobox')

      expect(combobox).toHaveAttribute('data-error')
    })

    it('dropdownProps forwarded', async () => {
      render(
        <MultiDatePicker
          name="datePickerTest"
          value={[defaultTestDate, new Date('2023-03-06')]}
          onChange={() => {}}
          dropdownProps={{ className: 'dropdownClass' }}
        />,
      )
      const combobox = screen.getByRole('combobox')

      await act(async () => {
        fireEvent.click(combobox)
      })

      expect(screen.getByTestId('Dropdown')).toHaveClass('dropdownClass')
    })

    it('calendarProps forwarded', async () => {
      render(
        <MultiDatePicker
          name="datePickerTest"
          value={[defaultTestDate, new Date('2023-03-06')]}
          onChange={() => {}}
          calendarProps={{ className: 'calendarClass' }}
        />,
      )
      const combobox = screen.getByRole('combobox')

      await act(async () => {
        fireEvent.click(combobox)
      })

      expect(screen.getByTestId('Calendar')).toHaveClass('calendarClass')
    })

    it('chipProps forwarded', () => {
      render(
        <MultiDatePicker
          name="datePickerTest"
          value={[defaultTestDate, new Date('2023-03-06')]}
          onChange={() => {}}
          displayChips
          chipProps={{ className: 'chipClass' }}
        />,
      )
      const chips = screen.getAllByTestId('Chip')

      expect(chips[0]).toHaveClass('chipClass')
    })

    it('disabled sets aria-disabled', () => {
      render(<MultiDatePicker name="datePickerTest" value={[]} disabled onChange={() => {}} />)
      const combobox = screen.getByRole('combobox')

      expect(combobox).toHaveAttribute('aria-disabled', 'true')
    })

    it('calendar aria-hidden false when open', async () => {
      render(<MultiDatePicker name="datePickerTest" value={[]} onChange={() => {}} />)
      const combobox = screen.getByRole('combobox')

      await act(async () => {
        fireEvent.click(combobox)
      })

      const calendar = screen.getByTestId('Calendar')

      expect(calendar).toHaveAttribute('aria-hidden', 'false')
    })
  })

  describe('Keyboard', () => {
    it('combobox is focusable', () => {
      render(<MultiDatePicker name="datePickerTest" value={[]} onChange={() => {}} />)
      const combobox = screen.getByRole('combobox')

      combobox.focus()
      expect(document.activeElement).toBe(combobox)
    })

    it('ArrowDown on closed combobox opens dropdown', async () => {
      render(<MultiDatePicker name="datePickerTest" value={[]} onChange={() => {}} />)
      const combobox = screen.getByRole('combobox')

      await act(async () => { combobox.focus() })
      await act(async () => {})

      await act(async () => {
        fireEvent.keyDown(combobox, { key: 'ArrowDown', code: 'ArrowDown' })
      })

      expect(combobox).toHaveAttribute('aria-expanded', 'true')
    })

    it('Escape closes dropdown', async () => {
      render(<MultiDatePicker name="datePickerTest" value={[]} onChange={() => {}} />)
      const combobox = screen.getByRole('combobox')

      await act(async () => { fireEvent.click(combobox) })
      await act(async () => {})
      await act(async () => {})

      expect(combobox).toHaveAttribute('aria-expanded', 'true')

      await act(async () => {
        fireEvent.keyDown(screen.getByTestId('Dropdown'), { key: 'Escape', code: 'Escape' })
      })

      expect(combobox).toHaveAttribute('aria-expanded', 'false')
    })

    it('selecting date does not close dropdown', async () => {
      const onChange = jest.fn()
      render(
        <MultiDatePicker
          name="datePickerTest"
          value={[startOfDay(defaultTestDate)]}
          onChange={onChange}
        />,
      )
      const combobox = screen.getByRole('combobox')

      await act(async () => { fireEvent.click(combobox) })

      await act(async () => {
        fireEvent.click(screen.getAllByRole('gridcell')[8])
      })

      expect(onChange).toHaveBeenCalled()
      expect(combobox).toHaveAttribute('aria-expanded', 'true')
    })
  })

  describe('Interaction', () => {
    it('onChange fires with added date', async () => {
      const onChange = jest.fn()
      render(
        <MultiDatePicker
          name="datePickerTest"
          value={[startOfDay(defaultTestDate)]}
          onChange={onChange}
        />,
      )
      const combobox = screen.getByRole('combobox')

      expect(combobox).toHaveTextContent('3/4/2023')

      await act(async () => {
        fireEvent.click(combobox)
      })

      await act(async () => {
        fireEvent.click(screen.getAllByRole('gridcell')[8])
      })

      expect(onChange).toHaveBeenCalled()
      expect(onChange).toHaveBeenCalledWith([
        startOfDay(defaultTestDate),
        startOfDay(new Date('2023-03-07')),
      ])
      expect(combobox).toHaveTextContent('3/4/2023')
    })

    it('chip clear removes date', async () => {
      const onChange = jest.fn()
      render(
        <MultiDatePicker
          name="datePickerTest"
          value={[defaultTestDate, new Date('2023-03-06')]}
          displayChips
          onChange={onChange}
        />,
      )
      const clearButtons = screen.getAllByTestId('ClearButton')

      await act(async () => {
        fireEvent.click(clearButtons[0])
      })

      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith([new Date('2023-03-06')])
    })

    it('onClear resets to empty array', async () => {
      const onChange = jest.fn()
      render(
        <MultiDatePicker
          name="datePickerTest"
          value={[startOfDay(defaultTestDate)]}
          onChange={onChange}
        />,
      )

      await act(async () => {
        fireEvent.click(screen.getByTestId('ClearButton'))
      })

      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith([])
    })

    it('onOpen callback', async () => {
      const onOpen = jest.fn()
      const onClose = jest.fn()
      render(
        <MultiDatePicker
          name="datePickerTest"
          value={[startOfDay(defaultTestDate)]}
          onChange={() => {}}
          onOpen={onOpen}
          onClose={onClose}
        />,
      )
      const combobox = screen.getByRole('combobox')

      await act(async () => {
        fireEvent.click(combobox)
      })

      expect(onOpen).toHaveBeenCalledTimes(1)
      expect(onClose).toHaveBeenCalledTimes(0)
    })

    it('onClose callback', async () => {
      const onOpen = jest.fn()
      const onClose = jest.fn()
      render(
        <MultiDatePicker
          name="datePickerTest"
          value={[startOfDay(defaultTestDate)]}
          onChange={() => {}}
          onOpen={onOpen}
          onClose={onClose}
        />,
      )
      const combobox = screen.getByRole('combobox')

      await act(async () => {
        fireEvent.click(combobox)
      })

      onOpen.mockClear()

      await act(async () => {
        fireEvent.click(combobox)
      })

      expect(onClose).toHaveBeenCalledTimes(1)
      expect(onOpen).toHaveBeenCalledTimes(0)
    })
  })

  describe('Ref', () => {
    it('forwards ref to combobox', () => {
      const ref = createRef<HTMLButtonElement>()
      render(<MultiDatePicker ref={ref} name="datePickerTest" value={[]} onChange={() => {}} />)

      expect(ref.current).toBeInstanceOf(HTMLButtonElement)
    })
  })

  describe('Accessibility', () => {
    it('no axe violations', async () => {
      const { container } = render(
        <MultiDatePicker name="datePickerTest" value={[]} onChange={() => {}} title="title" />,
      )

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
