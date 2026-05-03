import '@testing-library/jest-dom'

import { startOfDay } from 'date-fns'
import { axe, toHaveNoViolations } from 'jest-axe'
import { act, createRef } from 'react'

import { defaultTestDate } from '../../DatePickerField/DatePicker/DatePicker.test'
import { fireEvent, render, screen } from '.././../../../../../../.jest/customRender'
import { RangeDatePicker } from '.'

expect.extend(toHaveNoViolations)

describe('RangeDatePicker', () => {
  describe('Semantics', () => {
    it('renders wrapper', () => {
      render(<RangeDatePicker name="datePickerTest" value={{}} onChange={() => {}} />)

      expect(screen.getByTestId('DatePicker')).toBeInTheDocument()
    })

    it('forwards className', () => {
      render(
        <RangeDatePicker className="className" name="datePickerTest" value={{}} onChange={() => {}} />,
      )
      const combobox = screen.getByRole('combobox')

      expect(combobox).toHaveClass('className')
    })

    it('id and name from name prop', () => {
      render(<RangeDatePicker name="datePickerTest" value={{}} onChange={() => {}} />)
      const combobox = screen.getByRole('combobox')

      expect(combobox).toHaveAttribute('id', 'datePickerTest')
      expect(combobox).toHaveAttribute('name', 'datePickerTest')
      expect(combobox).toHaveAttribute('type', 'button')
    })

    it('placeholder when empty', () => {
      render(
        <RangeDatePicker
          name="datePickerTest"
          placeholder="placeholder"
          value={{}}
          onChange={() => {}}
        />,
      )
      const combobox = screen.getByRole('combobox')

      expect(combobox).toHaveTextContent('placeholder')
    })

    it('aria-expanded false when closed', () => {
      render(<RangeDatePicker name="datePickerTest" value={{}} onChange={() => {}} />)
      const combobox = screen.getByRole('combobox')

      expect(combobox).toHaveAttribute('aria-expanded', 'false')
    })

    it('aria-expanded true when open', async () => {
      render(<RangeDatePicker name="datePickerTest" value={{}} onChange={() => {}} />)
      const combobox = screen.getByRole('combobox')

      await act(async () => {
        fireEvent.click(combobox)
      })

      expect(combobox).toHaveAttribute('aria-expanded', 'true')
    })

    it('aria-haspopup', () => {
      render(<RangeDatePicker name="datePickerTest" value={{}} onChange={() => {}} />)
      const combobox = screen.getByRole('combobox')

      expect(combobox).toHaveAttribute('aria-haspopup', 'true')
    })

    it('aria-controls and aria-owns link to calendar', async () => {
      render(<RangeDatePicker name="datePickerTest" value={{}} onChange={() => {}} />)
      const combobox = screen.getByRole('combobox')

      await act(async () => {
        fireEvent.click(combobox)
      })

      const calendar = screen.getByTestId('Calendar')

      expect(combobox).toHaveAttribute('aria-controls', calendar.getAttribute('id'))
      expect(combobox).toHaveAttribute('aria-owns', calendar.getAttribute('id'))
      expect(calendar).toHaveAttribute('id', combobox.getAttribute('aria-controls'))
    })

    it('displays range value', () => {
      render(
        <RangeDatePicker
          name="datePickerTest"
          value={{ start: defaultTestDate, end: new Date('2023-03-06') }}
          onChange={() => {}}
        />,
      )
      const combobox = screen.getByRole('combobox')

      expect(combobox).toHaveTextContent('3/4/2023 - 3/6/2023')
    })

    it('error class', () => {
      render(<RangeDatePicker name="datePickerTest" value={{}} error="error" onChange={() => {}} />)
      const combobox = screen.getByRole('combobox')

      expect(combobox).toHaveAttribute('data-error')
    })

    it('dropdownProps forwarded', async () => {
      render(
        <RangeDatePicker
          name="datePickerTest"
          value={{}}
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
        <RangeDatePicker
          name="datePickerTest"
          value={{}}
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

    it('disabled sets aria-disabled', () => {
      render(<RangeDatePicker name="datePickerTest" value={{}} disabled onChange={() => {}} />)
      const combobox = screen.getByRole('combobox')

      expect(combobox).toHaveAttribute('aria-disabled', 'true')
    })

    it('calendar aria-hidden false when open', async () => {
      render(<RangeDatePicker name="datePickerTest" value={{}} onChange={() => {}} />)
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
      render(<RangeDatePicker name="datePickerTest" value={{}} onChange={() => {}} />)
      const combobox = screen.getByRole('combobox')

      combobox.focus()
      expect(document.activeElement).toBe(combobox)
    })

    it('ArrowDown on closed combobox opens dropdown', async () => {
      render(<RangeDatePicker name="datePickerTest" value={{}} onChange={() => {}} />)
      const combobox = screen.getByRole('combobox')

      await act(async () => { combobox.focus() })
      await act(async () => {})

      await act(async () => {
        fireEvent.keyDown(combobox, { key: 'ArrowDown', code: 'ArrowDown' })
      })

      expect(combobox).toHaveAttribute('aria-expanded', 'true')
    })

    it('Escape closes dropdown', async () => {
      render(
        <RangeDatePicker name="datePickerTest" value={{}} onChange={() => {}} />,
      )
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

    it('selecting date keeps dropdown open', async () => {
      const onChange = jest.fn()
      render(
        <RangeDatePicker
          name="datePickerTest"
          value={{}}
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

    it('Escape with incomplete range resets selection', async () => {
      const onChange = jest.fn()
      render(
        <RangeDatePicker
          name="datePickerTest"
          value={{ start: defaultTestDate }}
          onChange={onChange}
        />,
      )
      const combobox = screen.getByRole('combobox')

      await act(async () => { fireEvent.click(combobox) })
      await act(async () => {})
      await act(async () => {})

      await act(async () => {
        fireEvent.keyDown(screen.getByTestId('Dropdown'), { key: 'Escape', code: 'Escape' })
      })

      expect(combobox).toHaveAttribute('aria-expanded', 'false')
      expect(onChange).toHaveBeenCalledWith({})
    })
  })

  describe('Interaction', () => {
    it('onOpen callback', async () => {
      const onOpen = jest.fn()
      const onClose = jest.fn()
      render(
        <RangeDatePicker
          name="datePickerTest"
          value={{}}
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
        <RangeDatePicker
          name="datePickerTest"
          value={{}}
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

    it('onChange fires with range', async () => {
      const onChange = jest.fn()
      render(
        <RangeDatePicker
          name="datePickerTest"
          placeholder="placeholder"
          value={{ start: defaultTestDate }}
          onChange={onChange}
        />,
      )
      const combobox = screen.getByRole('combobox')

      await act(async () => {
        fireEvent.click(combobox)
      })

      await act(async () => {
        fireEvent.click(screen.getAllByRole('gridcell')[8])
      })

      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith({
        start: defaultTestDate,
        end: startOfDay(new Date('2023-03-07')),
      })
    })

    it('incomplete selection resets on close', async () => {
      const onChange = jest.fn()
      render(
        <RangeDatePicker
          name="datePickerTest"
          placeholder="placeholder"
          value={{ start: defaultTestDate }}
          onChange={onChange}
        />,
      )
      const combobox = screen.getByRole('combobox')

      await act(async () => {
        fireEvent.click(combobox)
      })

      await act(async () => {
        fireEvent.click(combobox)
      })

      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith({})
    })
  })

  describe('Ref', () => {
    it('forwards ref to combobox', () => {
      const ref = createRef<HTMLButtonElement>()
      render(<RangeDatePicker ref={ref} name="datePickerTest" value={{}} onChange={() => {}} />)

      expect(ref.current).toBeInstanceOf(HTMLButtonElement)
    })
  })

  describe('Accessibility', () => {
    it('no axe violations', async () => {
      const { container } = render(
        <RangeDatePicker name="datePickerTest" value={{}} onChange={() => {}} title="title" />,
      )

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
