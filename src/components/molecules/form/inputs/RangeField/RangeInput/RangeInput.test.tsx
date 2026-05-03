import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { fireEvent, render, screen } from '../../../../../../../.jest/customRender'
import { RangeInput } from '.'

expect.extend(toHaveNoViolations)

describe('RangeInput', () => {
  describe('Semantics', () => {
    it('renders slider with type range', () => {
      render(<RangeInput name="rangeTest" onChange={() => {}} />)
      const slider = screen.getByRole('slider')

      expect(slider).toBeInTheDocument()
      expect(slider).toHaveAttribute('type', 'range')
    })

    it('sets id and name from name prop', () => {
      render(<RangeInput name="rangeTest" onChange={() => {}} />)
      const slider = screen.getByRole('slider')

      expect(slider).toHaveAttribute('id', 'rangeTest')
      expect(slider).toHaveAttribute('name', 'rangeTest')
    })

    it('className lands on wrapper div', () => {
      render(<RangeInput className="w-96" name="rangeTest" onChange={() => {}} />)
      const wrapper = screen.getByTestId('RangeWrap')

      expect(wrapper).toHaveClass('w-96')
    })

    it('renders min and max attributes', () => {
      render(<RangeInput name="rangeTest" min={30} max={60} onChange={() => {}} />)
      const slider = screen.getByRole('slider')

      expect(slider).toHaveAttribute('min', '30')
      expect(slider).toHaveAttribute('max', '60')
    })

    it('renders value and displays in Span', () => {
      render(<RangeInput name="rangeTest" value={50} onChange={() => {}} />)
      const slider = screen.getByRole('slider')
      const valueDisplay = screen.getByTestId('Span')

      expect(slider).toHaveAttribute('value', '50')
      expect(valueDisplay).toHaveTextContent('50')
    })

    it('displays 0 in Span when no value', () => {
      render(<RangeInput name="rangeTest" onChange={() => {}} />)
      const valueDisplay = screen.getByTestId('Span')

      expect(valueDisplay).toHaveTextContent('0')
    })

    it('value Span is hidden from screen readers', () => {
      render(<RangeInput name="rangeTest" value={50} onChange={() => {}} />)
      const valueDisplay = screen.getByTestId('Span')

      expect(valueDisplay).toHaveAttribute('aria-hidden', 'true')
    })

    it('sets aria-orientation horizontal', () => {
      render(<RangeInput name="rangeTest" onChange={() => {}} />)
      const slider = screen.getByRole('slider')

      expect(slider).toHaveAttribute('aria-orientation', 'horizontal')
    })

    it('error adds error class to slider', () => {
      render(<RangeInput name="rangeTest" error="error" onChange={() => {}} />)
      const slider = screen.getByRole('slider')

      expect(slider).toHaveAttribute('data-error')
    })

    it('disabled sets native disabled', () => {
      render(<RangeInput name="rangeTest" disabled onChange={() => {}} />)
      const slider = screen.getByRole('slider')

      expect(slider).toBeDisabled()
    })
  })

  describe('Keyboard', () => {
    it('Tab focuses the input', () => {
      render(<RangeInput name="rangeTest" onChange={() => {}} />)
      const slider = screen.getByRole('slider')

      slider.focus()
      expect(document.activeElement).toBe(slider)
    })
  })

  describe('Interaction', () => {
    it('onChange fires with parsed number', () => {
      const onChange = jest.fn()
      render(<RangeInput name="rangeTest" onChange={onChange} />)
      const slider = screen.getByRole('slider')

      fireEvent.change(slider, { target: { value: 50 } })
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith(50)
    })

    it('disabled prevents interaction', () => {
      const onChange = jest.fn()
      render(<RangeInput name="rangeTest" disabled onChange={onChange} />)
      const slider = screen.getByRole('slider')

      expect(slider).toBeDisabled()
    })
  })

  describe('Ref', () => {
    it('forwards ref to input element', () => {
      const ref = createRef<HTMLInputElement>()
      render(<RangeInput ref={ref} name="rangeTest" onChange={() => {}} />)

      expect(ref.current).toBeInstanceOf(HTMLInputElement)
    })
  })

  describe('Accessibility', () => {
    it('axe', async () => {
      const { container } = render(
        <label htmlFor="rangeTest">
          Range
          <RangeInput name="rangeTest" min={30} max={60} onChange={() => {}} />
        </label>,
      )
      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })
  })
})
