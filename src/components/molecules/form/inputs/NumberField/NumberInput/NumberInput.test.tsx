import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { fireEvent, render, screen } from '../../../../../../../.jest/customRender'
import { NumberInput } from '.'

expect.extend(toHaveNoViolations)

describe('NumberInput', () => {
  describe('Semantics', () => {
    it('renders textbox with type text', () => {
      render(<NumberInput name="test" placeholder="placeholder" onChange={() => {}} />)
      const input = screen.getByRole('textbox')

      expect(input).toBeInTheDocument()
      expect(input).toHaveAttribute('type', 'text')
    })

    it('sets inputMode to decimal', () => {
      render(<NumberInput name="test" onChange={() => {}} />)
      const input = screen.getByRole('textbox')

      expect(input).toHaveAttribute('inputMode', 'decimal')
    })

    it('sets id and name from name prop', () => {
      render(<NumberInput name="inputTest" onChange={() => {}} />)
      const input = screen.getByRole('textbox')

      expect(input).toHaveAttribute('id', 'inputTest')
      expect(input).toHaveAttribute('name', 'inputTest')
    })

    it('className lands on wrapper div', () => {
      render(<NumberInput className="w-96" name="test" onChange={() => {}} />)
      const wrapper = screen.getByTestId('InputWrap')

      expect(wrapper).toHaveClass('w-96')
    })

    it('renders placeholder', () => {
      render(<NumberInput name="test" placeholder="Enter number" onChange={() => {}} />)
      const input = screen.getByRole('textbox')

      expect(input).toHaveAttribute('placeholder', 'Enter number')
    })

    it('renders formatted value', () => {
      render(<NumberInput name="test" value={6666.67} onChange={() => {}} />)
      const input = screen.getByRole('textbox')

      expect(input).toHaveValue('6,666.67')
    })

    it('renders startIcon', () => {
      render(
        <NumberInput name="test" startIcon={<svg data-testid="startSvg" />} onChange={() => {}} />,
      )

      expect(screen.getByTestId('startSvg')).toBeInTheDocument()
    })

    it('renders endIcon', () => {
      render(
        <NumberInput name="test" endIcon={<svg data-testid="endSvg" />} onChange={() => {}} />,
      )

      expect(screen.getByTestId('endSvg')).toBeInTheDocument()
    })

    it('error adds error class to wrapper', () => {
      render(<NumberInput name="test" error="required" onChange={() => {}} />)
      const wrapper = screen.getByTestId('InputWrap')

      expect(wrapper).toHaveAttribute('data-error')
    })

    it('disabled sets native disabled', () => {
      render(<NumberInput name="test" disabled onChange={() => {}} />)
      const input = screen.getByRole('textbox')

      expect(input).toBeDisabled()
    })
  })

  describe('Keyboard', () => {
    it('Tab focuses the input', () => {
      render(<NumberInput name="test" onChange={() => {}} />)
      const input = screen.getByRole('textbox')

      input.focus()
      expect(document.activeElement).toBe(input)
    })
  })

  describe('Interaction', () => {
    it('onChange fires with parsed number', () => {
      const onChange = jest.fn()
      render(<NumberInput name="test" value={33} onChange={onChange} />)
      const input = screen.getByRole('textbox')

      fireEvent.change(input, { target: { value: '22' } })
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith(22)
    })

    it('clearing input calls onChange with undefined', () => {
      const onChange = jest.fn()
      render(<NumberInput name="test" value={33} onChange={onChange} />)
      const input = screen.getByRole('textbox')

      fireEvent.change(input, { target: { value: '' } })
      expect(onChange).toHaveBeenCalledWith(undefined)
    })

    it('onChange fires unclamped value during typing', () => {
      const onChange = jest.fn()
      render(<NumberInput name="test" value={66} min={5} max={70} onChange={onChange} />)
      const input = screen.getByRole('textbox')

      fireEvent.change(input, { target: { value: '3' } })
      expect(onChange).toHaveBeenCalledWith(3)

      fireEvent.change(input, { target: { value: '100' } })
      expect(onChange).toHaveBeenCalledWith(100)
    })

    it('clamps below min on blur', () => {
      const onChange = jest.fn()
      render(<NumberInput name="test" value={3} min={5} max={70} onChange={onChange} />)
      const input = screen.getByRole('textbox')

      fireEvent.blur(input)
      expect(onChange).toHaveBeenCalledWith(5)
    })

    it('clamps above max on blur', () => {
      const onChange = jest.fn()
      render(<NumberInput name="test" value={100} min={5} max={70} onChange={onChange} />)
      const input = screen.getByRole('textbox')

      fireEvent.blur(input)
      expect(onChange).toHaveBeenCalledWith(70)
    })

    it('allows typing below min during input', () => {
      const onChange = jest.fn()
      render(<NumberInput name="test" value={50} min={100} onChange={onChange} />)
      const input = screen.getByRole('textbox')

      fireEvent.change(input, { target: { value: '5' } })
      expect(onChange).toHaveBeenCalledWith(5)
    })

    it('integral mode rounds value', () => {
      render(<NumberInput name="test" value={66.67} decimalPlaces={0} onChange={() => {}} />)
      const input = screen.getByRole('textbox')

      expect(input).toHaveValue('67')
    })

    it('negative values display correctly', () => {
      render(<NumberInput name="test" value={-66} allowNegative onChange={() => {}} />)
      const input = screen.getByRole('textbox')

      expect(input).toHaveValue('-66')

      fireEvent.blur(input)

      expect(input).toHaveValue('-66')
    })

    it('no grouping format', () => {
      render(
        <NumberInput
          name="test"
          value={6666.67}
          formatOptions={{ useGrouping: false }}
          onChange={() => {}}
        />,
      )
      const input = screen.getByRole('textbox')

      expect(input).toHaveValue('6666.67')

      fireEvent.blur(input)

      expect(input).toHaveValue('6666.67')
    })

    it('localized formatting', () => {
      render(<NumberInput name="test" value={6666.67} locale="cs-CZ" onChange={() => {}} />)
      const input = screen.getByRole('textbox')

      expect(input).toHaveValue('6\u00A0666,67')
    })

    it('blur reformats value', () => {
      render(<NumberInput name="test" value={1234} onChange={() => {}} />)
      const input = screen.getByRole('textbox')

      expect(input).toHaveValue('1,234')

      fireEvent.focus(input)

      expect(input).toHaveValue('1234')

      fireEvent.blur(input)

      expect(input).toHaveValue('1,234')
    })

    it('focus shows raw value', () => {
      render(<NumberInput name="test" value={1234.56} onChange={() => {}} />)
      const input = screen.getByRole('textbox')

      expect(input).toHaveValue('1,234.56')

      fireEvent.focus(input)

      expect(input).toHaveValue('1234.56')
    })

    it('disabled prevents interaction', () => {
      const onChange = jest.fn()
      render(<NumberInput name="test" disabled onChange={onChange} />)
      const input = screen.getByRole('textbox')

      expect(input).toBeDisabled()
    })
  })

  describe('Ref', () => {
    it('forwards ref to input element', () => {
      const ref = createRef<HTMLInputElement>()
      render(<NumberInput ref={ref} name="test" onChange={() => {}} />)

      expect(ref.current).toBeInstanceOf(HTMLInputElement)
    })
  })

  describe('Accessibility', () => {
    it('axe', async () => {
      const { container } = render(
        <NumberInput name="test" placeholder="placeholder" onChange={() => {}} />,
      )
      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })
  })
})
