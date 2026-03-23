import '@testing-library/jest-dom'

import { startOfDay } from 'date-fns'
import { axe, toHaveNoViolations } from 'jest-axe'
import { act, createRef } from 'react'

import { fireEvent, render, screen } from '../../../../../.jest/customRender'
import { defaultTestDate } from '../../form/comboboxes/DatePickerField/DatePicker/DatePicker.test'
import { Calendar } from '.'
import { CalendarProps } from './Calendar'

expect.extend(toHaveNoViolations)


describe('Calendar', () => {
  describe('Semantics', () => {
    it('renders calendar container', () => {
      render(<Calendar date={defaultTestDate} onChange={() => {}} />)
      const calendar = screen.getByTestId('Calendar')

      expect(calendar).toBeInTheDocument()
    })

    it('forwards className', () => {
      render(<Calendar className="className" date={defaultTestDate} onChange={() => {}} />)
      const calendar = screen.getByTestId('Calendar')

      expect(calendar).toHaveClass('className')
    })

    it('name sets id', () => {
      render(<Calendar name="calendarTest" date={defaultTestDate} onChange={() => {}} />)
      const calendar = screen.getByTestId('Calendar')

      expect(calendar).toHaveAttribute('id', 'calendarTest')
    })

    it('renders header', () => {
      render(<Calendar date={defaultTestDate} onChange={() => {}} />)
      const header = screen.getByTestId('CalendarHeader')

      expect(header).toBeInTheDocument()
    })

    it('renders day picker', () => {
      render(<Calendar date={defaultTestDate} onChange={() => {}} />)
      const dayPicker = screen.getByTestId('DayPicker')

      expect(dayPicker).toBeInTheDocument()
    })

    it('selected date marked', () => {
      render(<Calendar date={defaultTestDate} onChange={() => {}} />)
      const selected = screen.getByText('4')

      expect(selected).toHaveClass('selected')
      expect(selected).toHaveAttribute('aria-selected')
    })

    it('column headers start with Monday', () => {
      render(<Calendar date={defaultTestDate} onChange={() => {}} />)
      const headers = screen.getAllByRole('columnheader')
      const cells = screen.getAllByRole('gridcell')

      expect(headers[0]).toHaveTextContent('Mon')
      expect(cells[0]).toHaveTextContent('27')
    })

    it('weekStart changes first day', () => {
      render(<Calendar date={defaultTestDate} onChange={() => {}} weekStart={0} />)
      const headers = screen.getAllByRole('columnheader')
      const cells = screen.getAllByRole('gridcell')

      expect(headers[0]).toHaveTextContent('Sun')
      expect(cells[0]).toHaveTextContent('26')
    })

    it('range selection marks days', () => {
      render(
        <Calendar
          date={defaultTestDate}
          range={{ start: new Date('2023-03-03'), end: new Date('2023-03-05') }}
          onChange={() => {}}
        />,
      )
      const cells = screen.getAllByRole('gridcell')
      const selected1 = screen.getByText('3')
      const selected2 = screen.getByText('4')
      const selected3 = screen.getByText('5')

      expect(cells[0]).not.toHaveClass('selected')
      expect(cells[0]).toHaveAttribute('aria-selected', 'false')
      expect(selected1).toHaveClass('selected')
      expect(selected1).toHaveAttribute('aria-selected')
      expect(selected2).toHaveClass('selected')
      expect(selected2).toHaveAttribute('aria-selected')
      expect(selected3).toHaveClass('selected')
      expect(selected3).toHaveAttribute('aria-selected')
      expect(cells[20]).not.toHaveClass('selected')
      expect(cells[20]).toHaveAttribute('aria-selected', 'false')
    })

    it('multiValue marks days', () => {
      render(
        <Calendar
          date={new Date('2023-04-07')}
          multiValue={[new Date('2023-04-07'), new Date('2023-04-10'), new Date('2023-04-13')]}
          onChange={() => {}}
        />,
      )
      const cells = screen.getAllByRole('gridcell')
      const selected1 = screen.getByText('7')
      const selected2 = screen.getByText('10')
      const selected3 = screen.getByText('13')

      expect(cells[0]).not.toHaveClass('selected')
      expect(cells[0]).toHaveAttribute('aria-selected', 'false')
      expect(selected1).toHaveClass('selected')
      expect(selected1).toHaveAttribute('aria-selected')
      expect(selected2).toHaveClass('selected')
      expect(selected2).toHaveAttribute('aria-selected')
      expect(selected3).toHaveClass('selected')
      expect(selected3).toHaveAttribute('aria-selected')
      expect(cells[20]).not.toHaveClass('selected')
      expect(cells[20]).toHaveAttribute('aria-selected', 'false')
    })

    it('unavailable dates aria-disabled', () => {
      render(
        <Calendar
          date={new Date('2023-04-07')}
          unavailable={[new Date('2023-04-07'), new Date('2023-04-10'), new Date('2023-04-13')]}
          onChange={() => {}}
        />,
      )
      const cells = screen.getAllByRole('gridcell')
      const selected1 = screen.getByText('7')
      const selected2 = screen.getByText('10')
      const selected3 = screen.getByText('13')

      expect(cells[0]).not.toHaveAttribute('aria-disabled')
      expect(selected1).toHaveAttribute('aria-disabled', 'true')
      expect(selected2).toHaveAttribute('aria-disabled', 'true')
      expect(selected3).toHaveAttribute('aria-disabled', 'true')
      expect(cells[20]).not.toHaveAttribute('aria-disabled')
    })

    it('minMax disables edge dates and buttons', () => {
      render(
        <Calendar
          date={defaultTestDate}
          onChange={() => {}}
          minMaxDate={{ min: new Date('2023-03-01'), max: new Date('2023-03-31') }}
        />,
      )
      const cells = screen.getAllByRole('gridcell')
      const buttons = screen.getAllByRole('button')

      expect(cells[1]).toHaveAttribute('aria-disabled', 'true')
      expect(cells[34]).toHaveAttribute('aria-disabled', 'true')
      expect(buttons[0]).toHaveAttribute('aria-disabled', 'true')
      expect(buttons[1]).toHaveAttribute('aria-disabled', 'true')
      expect(buttons[2]).toHaveAttribute('aria-disabled', 'true')
    })

    it('buttonProps and paperProps forwarding', () => {
      render(
        <Calendar
          date={defaultTestDate}
          onChange={() => {}}
          paperProps={{ className: 'paperClass' }}
          buttonProps={{ className: 'buttonClass' }}
        />,
      )
      const paper = screen.getByTestId('Paper')
      const cells = screen.getAllByRole('gridcell')

      expect(paper).toHaveClass('paperClass')
      expect(cells[1]).toHaveClass('buttonClass')
      expect(cells[20]).toHaveClass('buttonClass')
    })

    it('month label has aria-live for screen reader announcements', () => {
      render(<Calendar date={defaultTestDate} onChange={() => {}} />)
      const header = screen.getByTestId('CalendarHeader')
      const liveRegion = header.querySelector('[aria-live="polite"]')

      expect(liveRegion).toBeInTheDocument()
      expect(liveRegion).toHaveTextContent(/March/i)
    })
  })

  describe('Keyboard', () => {
    const initCalendar = async (props: Partial<CalendarProps> = {}) => {
      const onChange = jest.fn()
      const onClose = jest.fn()
      render(
        <Calendar
          date={defaultTestDate}
          onChange={props.onChange ?? onChange}
          onClose={props.onClose ?? onClose}
          focusOnOpen
          {...props}
        />,
      )
      await act(async () => {})
      await act(async () => {})
      return { onChange, onClose }
    }

    const pressKey = async (key: string, options?: { shiftKey?: boolean }) => {
      await act(async () => {
        fireEvent.keyDown(document.activeElement!, { key, code: key, ...options })
      })
    }

    // -- Focus initialization --

    it('standalone sets tabindex without stealing focus', async () => {
      render(<Calendar date={defaultTestDate} onChange={() => {}} />)
      await act(async () => {})
      await act(async () => {})

      const cells = screen.getAllByRole('gridcell')
      expect(document.activeElement).toBe(document.body)
      expect(cells[5]).toHaveAttribute('tabindex', '0')
      expect(cells[0]).toHaveAttribute('tabindex', '-1')
    })

    it('Tab-in then arrow navigates correctly', async () => {
      render(<Calendar date={defaultTestDate} onChange={() => {}} />)
      await act(async () => {})
      await act(async () => {})

      const cells = screen.getAllByRole('gridcell')
      await act(async () => { cells[5].focus() })

      await act(async () => {
        fireEvent.keyDown(cells[5], { key: 'ArrowRight', code: 'ArrowRight' })
      })

      const updatedCells = screen.getAllByRole('gridcell')
      expect(document.activeElement).toBe(updatedCells[6])
      expect(screen.getByTestId('CalendarHeader')).toHaveTextContent(/March/i)
    })

    it('focusOnOpen focuses selected cell with tabindex', async () => {
      await initCalendar()
      const cells = screen.getAllByRole('gridcell')

      expect(document.activeElement).toBe(cells[5])
      expect(cells[5]).toHaveAttribute('tabindex', '0')
      expect(cells[0]).toHaveAttribute('tabindex', '-1')
    })

    // -- Grid arrow navigation --

    it('ArrowRight moves to next cell', async () => {
      await initCalendar()

      await pressKey('ArrowRight')

      const cells = screen.getAllByRole('gridcell')
      expect(document.activeElement).toBe(cells[6])
      expect(cells[6]).toHaveAttribute('tabindex', '0')
      expect(cells[5]).toHaveAttribute('tabindex', '-1')
    })

    it('ArrowLeft moves to previous cell', async () => {
      await initCalendar()

      await pressKey('ArrowLeft')

      const cells = screen.getAllByRole('gridcell')
      expect(document.activeElement).toBe(cells[4])
    })

    it('ArrowDown moves down one row', async () => {
      await initCalendar()

      await pressKey('ArrowDown')

      const cells = screen.getAllByRole('gridcell')
      expect(document.activeElement).toBe(cells[12])
    })

    it('ArrowUp from first row crosses to previous month', async () => {
      await initCalendar()

      await pressKey('ArrowUp')

      const cells = screen.getAllByRole('gridcell')
      expect(document.activeElement).toBe(cells[cells.length - 7 + 5])
      expect(screen.getByTestId('CalendarHeader')).toHaveTextContent(/February/i)
    })

    // -- Cross-month boundary --

    it('ArrowRight at last cell crosses to next month', async () => {
      await initCalendar()
      const cells = screen.getAllByRole('gridcell')

      for (let i = 5; i < cells.length - 1; i++) {
        await pressKey('ArrowRight')
      }

      await pressKey('ArrowRight')

      const newCells = screen.getAllByRole('gridcell')
      expect(document.activeElement).toBe(newCells[0])
      expect(screen.getByTestId('CalendarHeader')).toHaveTextContent(/April/i)
    })

    it('ArrowLeft at first cell crosses to previous month', async () => {
      await initCalendar()

      for (let i = 0; i < 5; i++) {
        await pressKey('ArrowLeft')
      }

      await pressKey('ArrowLeft')

      const newCells = screen.getAllByRole('gridcell')
      expect(document.activeElement).toBe(newCells[newCells.length - 1])
      expect(screen.getByTestId('CalendarHeader')).toHaveTextContent(/February/i)
    })

    it('ArrowDown at last row crosses to next month', async () => {
      await initCalendar()

      await pressKey('ArrowDown') // Mar11
      await pressKey('ArrowDown') // Mar18
      await pressKey('ArrowDown') // Mar25
      await pressKey('ArrowDown') // Apr1
      await pressKey('ArrowDown') // crosses

      expect(screen.getByTestId('CalendarHeader')).toHaveTextContent(/April/i)
    })

    // -- Row navigation --

    it('Home moves to first cell in row', async () => {
      await initCalendar()

      await pressKey('Home')

      const cells = screen.getAllByRole('gridcell')
      expect(document.activeElement).toBe(cells[0])
    })

    it('End moves to last cell in row', async () => {
      await initCalendar()

      await pressKey('End')

      const cells = screen.getAllByRole('gridcell')
      expect(document.activeElement).toBe(cells[6])
    })

    // -- Page navigation --

    it('PageDown preserves day-of-month', async () => {
      await initCalendar()

      await pressKey('PageDown')

      expect(screen.getByTestId('CalendarHeader')).toHaveTextContent(/April/i)
      expect(document.activeElement).toHaveAttribute('aria-label', expect.stringContaining('April'))
      expect(document.activeElement).toHaveTextContent('4')
    })

    it('PageUp preserves day-of-month', async () => {
      await initCalendar()

      await pressKey('PageUp')

      expect(screen.getByTestId('CalendarHeader')).toHaveTextContent(/February/i)
      expect(document.activeElement).toHaveAttribute('aria-label', expect.stringContaining('February'))
      expect(document.activeElement).toHaveTextContent('4')
    })

    it('Shift+PageDown changes to next year', async () => {
      await initCalendar()

      await pressKey('PageDown', { shiftKey: true })

      expect(screen.getByTestId('CalendarHeader')).toHaveTextContent(/2024/i)
    })

    it('Shift+PageUp changes to previous year', async () => {
      await initCalendar()

      await pressKey('PageUp', { shiftKey: true })

      expect(screen.getByTestId('CalendarHeader')).toHaveTextContent(/2022/i)
    })

    // -- Selection --

    it('Enter selects focused cell', async () => {
      const { onChange } = await initCalendar()

      await pressKey('Enter')

      expect(onChange).toHaveBeenCalledWith(startOfDay(defaultTestDate))
    })

    it('Space selects focused cell', async () => {
      const { onChange } = await initCalendar()

      await pressKey('ArrowRight')
      await pressKey('Space')

      expect(onChange).toHaveBeenCalledWith(startOfDay(new Date('2023-03-05')))
    })

    it('Enter on disabled cell blocked', async () => {
      const onChange = jest.fn()
      await initCalendar({
        date: new Date('2023-04-07'),
        unavailable: [new Date('2023-04-07')],
        onChange,
      })

      await pressKey('Enter')

      expect(onChange).not.toHaveBeenCalled()
    })

    // -- Tab / Escape --

    it('standalone Tab does not loop to header', async () => {
      render(<Calendar date={defaultTestDate} onChange={() => {}} focusOnOpen />)
      await act(async () => {})
      await act(async () => {})

      await act(async () => {
        fireEvent.keyDown(document.activeElement!, { key: 'Tab', code: 'Tab' })
      })

      const monthSelect = document.querySelector('.MonthSelect') as HTMLElement
      expect(document.activeElement).not.toBe(monthSelect)
    })

    it('dropdown Tab from grid moves to MonthSelect', async () => {
      await initCalendar()

      await pressKey('Tab')

      const monthSelect = document.querySelector('.MonthSelect') as HTMLElement
      expect(document.activeElement).toBe(monthSelect)
    })

    it('dropdown Shift+Tab from grid calls onClose', async () => {
      const { onClose } = await initCalendar()

      await pressKey('Tab', { shiftKey: true })

      expect(onClose).toHaveBeenCalled()
    })

    it('dropdown Tab from header calls onClose', async () => {
      const { onClose } = await initCalendar()
      const monthSelect = document.querySelector('.MonthSelect') as HTMLElement

      await act(async () => { monthSelect.focus() })
      await act(async () => {
        fireEvent.keyDown(monthSelect, { key: 'Tab', code: 'Tab' })
      })

      expect(onClose).toHaveBeenCalled()
    })

    it('Escape calls onClose', async () => {
      const { onClose } = await initCalendar()

      await pressKey('Escape')

      expect(onClose).toHaveBeenCalled()
    })

    // -- Header navigation --

    it('ArrowRight moves between header buttons', async () => {
      await initCalendar()
      const monthSelect = document.querySelector('.MonthSelect') as HTMLElement

      await act(async () => { monthSelect.focus() })
      await act(async () => {
        fireEvent.keyDown(monthSelect, { key: 'ArrowRight', code: 'ArrowRight' })
      })

      const nextMonth = document.querySelector('.NextMonthButton') as HTMLElement
      expect(document.activeElement).toBe(nextMonth)
    })

    it('ArrowDown from header enters grid', async () => {
      await initCalendar()
      const monthSelect = document.querySelector('.MonthSelect') as HTMLElement

      await act(async () => { monthSelect.focus() })
      await act(async () => {
        fireEvent.keyDown(monthSelect, { key: 'ArrowDown', code: 'ArrowDown' })
      })

      expect(document.activeElement?.getAttribute('role')).toBe('gridcell')
    })

    it('ArrowLeft from first header button enters grid', async () => {
      await initCalendar()
      const prevMonth = document.querySelector('.PreviousMonthButton') as HTMLElement

      await act(async () => { prevMonth.focus() })
      await act(async () => {
        fireEvent.keyDown(prevMonth, { key: 'ArrowLeft', code: 'ArrowLeft' })
      })

      expect(document.activeElement?.getAttribute('role')).toBe('gridcell')
    })

    // -- MonthPicker / YearPicker --

    it('MonthPicker arrow stops at edge', async () => {
      await initCalendar()
      const buttons = screen.getAllByRole('button')

      await act(async () => { fireEvent.click(buttons[1]) })
      await act(async () => {})
      await act(async () => {})

      const yearCells = screen.getAllByRole('gridcell')
      await act(async () => { fireEvent.click(yearCells[0]) })
      await act(async () => {})
      await act(async () => {})

      for (let i = 0; i < 9; i++) {
        await pressKey('ArrowRight')
      }

      const lastCell = screen.getAllByRole('gridcell')[11]
      expect(document.activeElement).toBe(lastCell)

      await pressKey('ArrowRight')
      expect(document.activeElement).toBe(lastCell)
    })

    it('MonthPicker ArrowDown navigates by 3 columns', async () => {
      await initCalendar()
      const buttons = screen.getAllByRole('button')

      await act(async () => { fireEvent.click(buttons[1]) })
      await act(async () => {})
      await act(async () => {})

      const yearCells = screen.getAllByRole('gridcell')
      await act(async () => { fireEvent.click(yearCells[0]) })
      await act(async () => {})
      await act(async () => {})

      await pressKey('ArrowDown')

      const monthCells = screen.getAllByRole('gridcell')
      expect(document.activeElement).toBe(monthCells[5])
    })

    it('YearPicker arrow stops at edge', async () => {
      await initCalendar()
      const buttons = screen.getAllByRole('button')

      await act(async () => { fireEvent.click(buttons[1]) })
      await act(async () => {})
      await act(async () => {})

      const yearCells = screen.getAllByRole('gridcell')
      const firstCell = yearCells[0]

      for (let i = 0; i < 60 && document.activeElement !== firstCell; i++) {
        await pressKey('ArrowLeft')
      }

      await pressKey('ArrowLeft')
      expect(document.activeElement).toBe(firstCell)
    })
  })

  describe('Interaction', () => {
    it('onChange fires on click', () => {
      const onChange = jest.fn()
      render(<Calendar date={defaultTestDate} onChange={onChange} />)
      const cells = screen.getAllByRole('gridcell')

      fireEvent.click(cells[5])
      expect(onChange).toHaveBeenCalledWith(startOfDay(defaultTestDate))
    })

    it('calendarStates toggle', () => {
      render(<Calendar date={defaultTestDate} onChange={() => {}} />)
      const buttons = screen.getAllByRole('button')

      fireEvent.click(buttons[1])
      const yearPicker = screen.getByTestId('YearPicker')
      expect(yearPicker).toBeInTheDocument()

      const cells = screen.getAllByRole('gridcell')
      fireEvent.click(cells[0])
      const monthPicker = screen.getByTestId('MonthPicker')
      expect(monthPicker).toBeInTheDocument()
    })
  })

  describe('Ref', () => {
    it('forwards ref', () => {
      const ref = createRef<HTMLDivElement>()
      render(<Calendar ref={ref} date={defaultTestDate} onChange={() => {}} />)

      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })
  })

  describe('Accessibility', () => {
    it('no axe violations', async () => {
      const { container } = render(<Calendar date={defaultTestDate} onChange={() => {}} />)

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
