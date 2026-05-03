import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { fireEvent, render, screen } from '../../../../../../../.jest/customRender'
import { TextInput } from '.'

expect.extend(toHaveNoViolations)

describe('TextInput', () => {
  describe('Semantics', () => {
    it('renders native input with textbox role', () => {
      render(<TextInput name="test" placeholder="placeholder" onChange={() => {}} />)
      const input = screen.getByRole('textbox')

      expect(input).toBeInTheDocument()
      expect(input).toHaveAttribute('type', 'text')
    })

    it('sets id and name from name prop', () => {
      render(<TextInput name="firstName" onChange={() => {}} />)
      const input = screen.getByRole('textbox')

      expect(input).toHaveAttribute('id', 'firstName')
      expect(input).toHaveAttribute('name', 'firstName')
    })

    it('className lands on wrapper div', () => {
      render(<TextInput className="w-96" name="test" onChange={() => {}} />)
      const wrapper = screen.getByTestId('InputWrap')

      expect(wrapper).toHaveClass('w-96')
    })

    it('renders placeholder', () => {
      render(<TextInput name="test" placeholder="Enter text" onChange={() => {}} />)
      const input = screen.getByRole('textbox')

      expect(input).toHaveAttribute('placeholder', 'Enter text')
    })

    it('renders value', () => {
      render(<TextInput name="test" value="hello" onChange={() => {}} />)
      const input = screen.getByRole('textbox')

      expect(input).toHaveAttribute('value', 'hello')
    })

    it('renders startIcon', () => {
      render(
        <TextInput name="test" startIcon={<svg data-testid="startSvg" />} onChange={() => {}} />,
      )

      expect(screen.getByTestId('startSvg')).toBeInTheDocument()
    })

    it('renders endIcon', () => {
      render(
        <TextInput name="test" endIcon={<svg data-testid="endSvg" />} onChange={() => {}} />,
      )

      expect(screen.getByTestId('endSvg')).toBeInTheDocument()
    })

    it('error adds error class to wrapper', () => {
      render(<TextInput name="test" error="required" onChange={() => {}} />)
      const wrapper = screen.getByTestId('InputWrap')

      expect(wrapper).toHaveAttribute('data-error')
    })

    it('disabled sets native disabled and aria-disabled on wrapper', () => {
      render(<TextInput name="test" disabled onChange={() => {}} />)
      const input = screen.getByRole('textbox')
      const wrapper = screen.getByTestId('InputWrap')

      expect(input).toBeDisabled()
      expect(wrapper).toHaveAttribute('aria-disabled', 'true')
      expect(wrapper).toHaveClass('disabled')
    })

    it('not disabled omits aria-disabled', () => {
      render(<TextInput name="test" onChange={() => {}} />)
      const wrapper = screen.getByTestId('InputWrap')

      expect(wrapper).not.toHaveAttribute('aria-disabled')
    })
  })

  describe('Keyboard', () => {
    it('Tab focuses the input', () => {
      render(<TextInput name="test" onChange={() => {}} />)
      const input = screen.getByRole('textbox')

      input.focus()
      expect(document.activeElement).toBe(input)
    })
  })

  describe('Interaction', () => {
    it('onChange fires with string value', () => {
      const onChange = jest.fn()
      render(<TextInput name="test" value="" onChange={onChange} />)
      const input = screen.getByRole('textbox')

      fireEvent.change(input, { target: { value: 'hello' } })
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith('hello')
    })

    it('disabled input has disabled attribute', () => {
      render(<TextInput name="test" value="" disabled onChange={() => {}} />)
      const input = screen.getByRole('textbox')

      expect(input).toBeDisabled()
    })
  })

  describe('Ref', () => {
    it('forwards ref to input element', () => {
      const ref = createRef<HTMLInputElement>()
      render(<TextInput ref={ref} name="test" onChange={() => {}} />)

      expect(ref.current).toBeInstanceOf(HTMLInputElement)
    })
  })

  describe('Accessibility', () => {
    it('axe', async () => {
      const { container } = render(
        <TextInput name="test" placeholder="placeholder" onChange={() => {}} />,
      )
      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })
  })
})
