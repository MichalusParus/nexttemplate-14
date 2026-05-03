import '@testing-library/jest-dom'

import { startOfDay } from 'date-fns'
import { axe, toHaveNoViolations } from 'jest-axe'
import { act, createRef } from 'react'

import { fireEvent, render, screen } from '.././../../../../../../.jest/customRender'
import { DatePicker } from '.'

expect.extend(toHaveNoViolations)

export const defaultTestDate = new Date('2023-03-04')

describe('DatePicker', () => {
  describe('Semantics', () => {
    it('renders wrapper', () => {
      render(<DatePicker name="datePickerTest" value={undefined} onChange={() => {}} />)
      const wrapper = screen.getByTestId('DatePicker')

      expect(wrapper).toBeInTheDocument()
    })

    it('forwards className', () => {
      render(
        <DatePicker className="className" name="datePickerTest" value={undefined} onChange={() => {}} />,
      )
      const combobox = screen.getByRole('combobox')

      expect(combobox).toHaveClass('className')
    })

    it('id and name from name prop', () => {
      render(<DatePicker name="datePickerTest" value={undefined} onChange={() => {}} />)
      const combobox = screen.getByRole('combobox')

      expect(combobox).toHaveAttribute('id', 'datePickerTest')
      expect(combobox).toHaveAttribute('name', 'datePickerTest')
    })

    it('type="button"', () => {
      render(<DatePicker name="datePickerTest" value={undefined} onChange={() => {}} />)
      const combobox = screen.getByRole('combobox')

      expect(combobox).toHaveAttribute('type', 'button')
    })

    it('placeholder when no value', () => {
      render(
        <DatePicker name="datePickerTest" placeholder="placeholder" value={undefined} onChange={() => {}} />,
      )
      const combobox = screen.getByRole('combobox')

      expect(combobox).toHaveTextContent('placeholder')
    })

    it('displays formatted date', () => {
      render(<DatePicker name="datePickerTest" value={defaultTestDate} onChange={() => {}} />)
      const combobox = screen.getByRole('combobox')

      expect(combobox).toHaveTextContent('3/4/2023')
    })

    it('error class', () => {
      render(<DatePicker name="datePickerTest" error="error" onChange={() => {}} />)
      const combobox = screen.getByRole('combobox')

      expect(combobox).toHaveAttribute('data-error')
    })

    it('aria-expanded false when closed', () => {
      render(<DatePicker name="datePickerTest" value={undefined} onChange={() => {}} />)
      const combobox = screen.getByRole('combobox')

      expect(combobox).toHaveAttribute('aria-expanded', 'false')
    })

    it('aria-expanded true when open', async () => {
      render(<DatePicker name="datePickerTest" value={undefined} onChange={() => {}} />)
      const combobox = screen.getByRole('combobox')

      await act(async () => {
        fireEvent.click(combobox)
      })

      expect(combobox).toHaveAttribute('aria-expanded', 'true')
    })

    it('aria-haspopup', () => {
      render(<DatePicker name="datePickerTest" value={undefined} onChange={() => {}} />)
      const combobox = screen.getByRole('combobox')

      expect(combobox).toHaveAttribute('aria-haspopup', 'true')
    })

    it('aria-controls and aria-owns link to calendar', async () => {
      render(<DatePicker name="datePickerTest" value={undefined} onChange={() => {}} />)
      const combobox = screen.getByRole('combobox')

      await act(async () => {
        fireEvent.click(combobox)
      })

      const calendar = screen.getByTestId('Calendar')

      expect(combobox).toHaveAttribute('aria-controls', calendar.getAttribute('id'))
      expect(combobox).toHaveAttribute('aria-owns', calendar.getAttribute('id'))
      expect(calendar).toHaveAttribute('id', combobox.getAttribute('aria-controls'))
    })

    it('calendar aria-hidden false when open', async () => {
      render(<DatePicker name="datePickerTest" value={undefined} onChange={() => {}} />)
      const combobox = screen.getByRole('combobox')

      await act(async () => {
        fireEvent.click(combobox)
      })

      const calendar = screen.getByTestId('Calendar')

      expect(calendar).toHaveAttribute('aria-hidden', 'false')
    })

    it('dropdown renders when open', async () => {
      render(<DatePicker name="datePickerTest" value={undefined} onChange={() => {}} />)
      const combobox = screen.getByRole('combobox')

      await act(async () => {
        fireEvent.click(combobox)
      })

      expect(screen.getByTestId('Dropdown')).toBeInTheDocument()
      expect(screen.getByTestId('Calendar')).toBeInTheDocument()
    })

    it('disabled sets aria-disabled', () => {
      render(<DatePicker name="datePickerTest" value={new Date()} disabled onChange={() => {}} />)
      const combobox = screen.getByRole('combobox')

      expect(combobox).toHaveAttribute('aria-disabled', 'true')
    })

    it('dropdownProps forwarded', async () => {
      render(
        <DatePicker
          name="datePickerTest"
          value={defaultTestDate}
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
        <DatePicker
          name="datePickerTest"
          value={defaultTestDate}
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
  })

  describe('Keyboard', () => {
    const initDatePicker = async (props: Partial<Parameters<typeof DatePicker>[0]> = {}) => {
      const onChange = jest.fn()
      render(
        <DatePicker
          name="datePickerTest"
          value={defaultTestDate}
          onChange={props.onChange ?? onChange}
          {...props}
        />,
      )
      const combobox = screen.getByRole('combobox')
      await act(async () => { fireEvent.click(combobox) })
      await act(async () => {})
      await act(async () => {})
      return { combobox, onChange }
    }

    const pressKey = async (key: string, options?: { shiftKey?: boolean }) => {
      await act(async () => {
        fireEvent.keyDown(document.activeElement!, { key, code: key, ...options })
      })
    }

    it('combobox is focusable', () => {
      render(<DatePicker name="datePickerTest" value={undefined} onChange={() => {}} />)
      const combobox = screen.getByRole('combobox')

      combobox.focus()
      expect(document.activeElement).toBe(combobox)
    })

    // -- Open via keyboard --

    it('ArrowDown on closed combobox opens dropdown', async () => {
      render(<DatePicker name="datePickerTest" value={defaultTestDate} onChange={() => {}} />)
      const combobox = screen.getByRole('combobox')

      await act(async () => { combobox.focus() })
      await act(async () => {})

      await act(async () => {
        fireEvent.keyDown(combobox, { key: 'ArrowDown', code: 'ArrowDown' })
      })

      expect(combobox).toHaveAttribute('aria-expanded', 'true')
    })

    // -- Focus on open --

    it('opening focuses selected date cell', async () => {
      await initDatePicker()

      const cells = screen.getAllByRole('gridcell')
      const selected = cells.find(c => c.getAttribute('aria-selected') === 'true')

      expect(document.activeElement).toBe(selected)
      expect(selected).toHaveTextContent('4')
    })

    it('opening without value focuses first date cell', async () => {
      await initDatePicker({ value: undefined })

      expect(document.activeElement?.getAttribute('role')).toBe('gridcell')
    })

    // -- Selection closes dropdown --

    it('Enter on calendar cell selects date and closes dropdown', async () => {
      const { combobox, onChange } = await initDatePicker()

      await pressKey('Enter')

      expect(onChange).toHaveBeenCalledWith(startOfDay(defaultTestDate))
      expect(combobox).toHaveAttribute('aria-expanded', 'false')
      expect(document.activeElement).toBe(combobox)
    })

    it('Space on calendar cell selects date and closes dropdown', async () => {
      const { combobox, onChange } = await initDatePicker()

      await pressKey('ArrowRight')
      await pressKey('Space')

      expect(onChange).toHaveBeenCalledWith(startOfDay(new Date('2023-03-05')))
      expect(combobox).toHaveAttribute('aria-expanded', 'false')
      expect(document.activeElement).toBe(combobox)
    })

    // -- Tab behavior --

    it('Tab from calendar grid moves to MonthSelect header', async () => {
      await initDatePicker()

      await pressKey('Tab')

      const monthSelect = document.querySelector('.MonthSelect') as HTMLElement
      expect(document.activeElement).toBe(monthSelect)
    })

    it('Shift+Tab from calendar grid closes dropdown', async () => {
      const { combobox } = await initDatePicker()

      await pressKey('Tab', { shiftKey: true })

      expect(combobox).toHaveAttribute('aria-expanded', 'false')
    })

    // -- Escape --

    it('Escape closes dropdown and returns focus to combobox', async () => {
      const { combobox } = await initDatePicker()

      expect(document.activeElement).not.toBe(combobox)

      await act(async () => {
        fireEvent.keyDown(screen.getByTestId('Dropdown'), { key: 'Escape', code: 'Escape' })
      })

      expect(combobox).toHaveAttribute('aria-expanded', 'false')
      expect(document.activeElement).toBe(combobox)
    })
  })

  describe('Interaction', () => {
    it('click opens dropdown', async () => {
      render(<DatePicker name="datePickerTest" value={undefined} onChange={() => {}} />)
      const combobox = screen.getByRole('combobox')

      await act(async () => {
        fireEvent.click(combobox)
      })

      expect(combobox).toHaveAttribute('aria-expanded', 'true')
      expect(screen.getByTestId('Dropdown')).toBeInTheDocument()
    })

    it('click toggles closed', async () => {
      const onClose = jest.fn()
      render(
        <DatePicker name="datePickerTest" value={defaultTestDate} onChange={() => {}} onClose={onClose} />,
      )
      const combobox = screen.getByRole('combobox')

      await act(async () => {
        fireEvent.click(combobox)
      })

      await act(async () => {
        fireEvent.click(combobox)
      })

      expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('onChange fires with selected date', async () => {
      const onChange = jest.fn()
      render(<DatePicker name="datePickerTest" value={defaultTestDate} onChange={onChange} />)
      const combobox = screen.getByRole('combobox')

      expect(combobox).toHaveTextContent('3/4/2023')

      await act(async () => {
        fireEvent.click(combobox)
      })

      await act(async () => {
        fireEvent.click(screen.getAllByRole('gridcell')[8])
      })

      expect(onChange).toHaveBeenCalled()
      expect(onChange).toHaveBeenCalledWith(startOfDay(new Date('2023-03-07')))
      expect(combobox).toHaveTextContent('3/4/2023')
    })

    it('onOpen callback', async () => {
      const onOpen = jest.fn()
      const onClose = jest.fn()
      render(
        <DatePicker
          name="datePickerTest"
          value={defaultTestDate}
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
        <DatePicker
          name="datePickerTest"
          value={defaultTestDate}
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
      render(<DatePicker ref={ref} name="datePickerTest" value={undefined} onChange={() => {}} />)

      expect(ref.current).toBeInstanceOf(HTMLButtonElement)
    })
  })

  describe('Accessibility', () => {
    it('no axe violations', async () => {
      const { container } = render(
        <DatePicker name="datePickerTest" value={undefined} onChange={() => {}} title="title" />,
      )

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
