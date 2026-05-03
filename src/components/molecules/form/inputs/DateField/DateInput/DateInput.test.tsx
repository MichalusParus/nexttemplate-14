import '@testing-library/jest-dom'

import { startOfDay } from 'date-fns'
import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { fireEvent, render, screen } from '../../../../../../../.jest/customRender'
import { DateInput } from '.'

expect.extend(toHaveNoViolations)

const testDate = new Date('2023-03-04')

describe('DateInput', () => {
  describe('Semantics', () => {
    it('renders textbox with type text', () => {
      render(<DateInput name="test" onChange={() => {}} />)
      const input = screen.getByRole('textbox')

      expect(input).toBeInTheDocument()
      expect(input).toHaveAttribute('type', 'text')
    })

    it('sets inputMode to numeric', () => {
      render(<DateInput name="test" onChange={() => {}} />)
      const input = screen.getByRole('textbox')

      expect(input).toHaveAttribute('inputMode', 'numeric')
    })

    it('sets id and name from name prop', () => {
      render(<DateInput name="inputTest" onChange={() => {}} />)
      const input = screen.getByRole('textbox')

      expect(input).toHaveAttribute('id', 'inputTest')
      expect(input).toHaveAttribute('name', 'inputTest')
    })

    it('className lands on wrapper div', () => {
      render(<DateInput className="w-96" name="test" onChange={() => {}} />)
      const wrapper = screen.getByTestId('InputWrap')

      expect(wrapper).toHaveClass('w-96')
    })

    it('renders locale placeholder when none provided', () => {
      render(<DateInput name="test" onChange={() => {}} />)
      const input = screen.getByRole('textbox')

      expect(input).toHaveAttribute('placeholder', 'MM/DD/YYYY')
    })

    it('renders custom placeholder', () => {
      render(<DateInput name="test" placeholder="Enter date" onChange={() => {}} />)
      const input = screen.getByRole('textbox')

      expect(input).toHaveAttribute('placeholder', 'Enter date')
    })

    it('renders formatted value', () => {
      render(<DateInput name="test" value={testDate} onChange={() => {}} />)
      const input = screen.getByRole('textbox')

      expect(input).toHaveValue('03/04/2023')
    })

    it('error adds error class to wrapper', () => {
      render(<DateInput name="test" error="required" onChange={() => {}} />)
      const wrapper = screen.getByTestId('InputWrap')

      expect(wrapper).toHaveAttribute('data-error')
    })

    it('disabled sets native disabled', () => {
      render(<DateInput name="test" disabled onChange={() => {}} />)
      const input = screen.getByRole('textbox')

      expect(input).toBeDisabled()
    })
  })

  describe('Keyboard', () => {
    it('Tab focuses the input', () => {
      render(<DateInput name="test" onChange={() => {}} />)
      const input = screen.getByRole('textbox')

      input.focus()
      expect(document.activeElement).toBe(input)
    })
  })

  describe('Interaction', () => {
    it('onChange fires with parsed Date on complete input', () => {
      const onChange = jest.fn()
      render(<DateInput name="test" onChange={onChange} />)
      const input = screen.getByRole('textbox')

      fireEvent.change(input, { target: { value: '03042023' } })
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith(startOfDay(new Date(2023, 2, 4)))
    })

    it('clearing input calls onChange with undefined', () => {
      const onChange = jest.fn()
      render(<DateInput name="test" value={testDate} onChange={onChange} />)
      const input = screen.getByRole('textbox')

      fireEvent.change(input, { target: { value: '' } })
      expect(onChange).toHaveBeenCalledWith(undefined)
    })

    it('mask auto-inserts separators', () => {
      render(<DateInput name="test" onChange={() => {}} />)
      const input = screen.getByRole('textbox')

      fireEvent.change(input, { target: { value: '0304' } })
      expect(input).toHaveValue('03/04')

      fireEvent.change(input, { target: { value: '03042023' } })
      expect(input).toHaveValue('03/04/2023')
    })

    it('strips non-digit characters', () => {
      render(<DateInput name="test" onChange={() => {}} />)
      const input = screen.getByRole('textbox')

      fireEvent.change(input, { target: { value: 'abc12def34' } })
      expect(input).toHaveValue('12/34')
    })

    it('does not fire onChange for incomplete input', () => {
      const onChange = jest.fn()
      render(<DateInput name="test" onChange={onChange} />)
      const input = screen.getByRole('textbox')

      fireEvent.change(input, { target: { value: '0304' } })
      expect(onChange).not.toHaveBeenCalled()
    })

    it('blur reverts incomplete input', () => {
      render(<DateInput name="test" onChange={() => {}} />)
      const input = screen.getByRole('textbox')

      fireEvent.change(input, { target: { value: '0304' } })
      expect(input).toHaveValue('03/04')

      fireEvent.blur(input)
      expect(input).toHaveValue('')
    })

    it('blur keeps formatted value when value prop set', () => {
      render(<DateInput name="test" value={testDate} onChange={() => {}} />)
      const input = screen.getByRole('textbox')

      fireEvent.focus(input)
      fireEvent.blur(input)
      expect(input).toHaveValue('03/04/2023')
    })

    it('does not fire onChange for invalid date', () => {
      const onChange = jest.fn()
      render(<DateInput name="test" onChange={onChange} />)
      const input = screen.getByRole('textbox')

      fireEvent.change(input, { target: { value: '13322023' } })
      expect(onChange).not.toHaveBeenCalled()
    })

    it('disabled prevents interaction', () => {
      const onChange = jest.fn()
      render(<DateInput name="test" disabled onChange={onChange} />)
      const input = screen.getByRole('textbox')

      expect(input).toBeDisabled()
    })

    it('clamps below min on blur', () => {
      const onChange = jest.fn()
      const minDate = new Date(2023, 5, 1) // June 1 2023
      render(<DateInput name="test" min={minDate} onChange={onChange} />)
      const input = screen.getByRole('textbox')

      fireEvent.change(input, { target: { value: '01012023' } }) // Jan 1 2023
      fireEvent.blur(input)

      expect(onChange).toHaveBeenLastCalledWith(startOfDay(minDate))
    })

    it('clamps above max on blur', () => {
      const onChange = jest.fn()
      const maxDate = new Date(2023, 5, 1) // June 1 2023
      render(<DateInput name="test" max={maxDate} onChange={onChange} />)
      const input = screen.getByRole('textbox')

      fireEvent.change(input, { target: { value: '12312023' } }) // Dec 31 2023
      fireEvent.blur(input)

      expect(onChange).toHaveBeenLastCalledWith(startOfDay(maxDate))
    })

    it('clamps existing value on blur when out of range', () => {
      const onChange = jest.fn()
      const minDate = new Date(2023, 5, 1)
      const outOfRange = new Date(2023, 0, 1)
      render(<DateInput name="test" value={outOfRange} min={minDate} onChange={onChange} />)
      const input = screen.getByRole('textbox')

      fireEvent.blur(input)

      expect(onChange).toHaveBeenCalledWith(startOfDay(minDate))
    })
  })

  describe('Ref', () => {
    it('forwards ref to input element', () => {
      const ref = createRef<HTMLInputElement>()
      render(<DateInput ref={ref} name="test" onChange={() => {}} />)

      expect(ref.current).toBeInstanceOf(HTMLInputElement)
    })
  })

  describe('Accessibility', () => {
    it('axe', async () => {
      const { container } = render(
        <DateInput name="test" placeholder="placeholder" onChange={() => {}} />,
      )
      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })
  })
})
