import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { fireEvent, render, screen } from '../../../../../../../.jest/customRender'
import { PasswordInput } from '.'

expect.extend(toHaveNoViolations)

describe('PasswordInput', () => {
  describe('Semantics', () => {
    it('renders input with type password', () => {
      render(<PasswordInput name="password" placeholder="Password" onChange={() => {}} />)
      const input = screen.getByTestId('PasswordInput')

      expect(input).toHaveAttribute('type', 'password')
      expect(input).toHaveAttribute('id', 'password')
      expect(input).toHaveAttribute('name', 'password')
    })

    it('renders visibility toggle button with aria-label', () => {
      render(<PasswordInput name="password" onChange={() => {}} />)
      const toggle = screen.getByRole('button')

      expect(toggle).toBeInTheDocument()
      expect(toggle).toHaveAttribute('aria-label')
    })

    it('className lands on TextInput wrapper', () => {
      render(<PasswordInput className="w-96" name="password" onChange={() => {}} />)
      const wrapper = screen.getByTestId('InputWrap')

      expect(wrapper).toHaveClass('w-96')
    })

    it('error adds error class to wrapper', () => {
      render(<PasswordInput name="password" error="required" onChange={() => {}} />)
      const wrapper = screen.getByTestId('InputWrap')

      expect(wrapper).toHaveClass('error')
    })

    it('disabled disables both input and toggle button', () => {
      render(<PasswordInput name="password" disabled onChange={() => {}} />)
      const input = screen.getByTestId('PasswordInput')
      const toggle = screen.getByRole('button')

      expect(input).toBeDisabled()
      expect(toggle).toHaveAttribute('aria-disabled', 'true')
    })
  })

  describe('Keyboard', () => {
    it('Tab focuses the input', () => {
      render(<PasswordInput name="password" onChange={() => {}} />)
      const input = screen.getByTestId('PasswordInput')

      input.focus()
      expect(document.activeElement).toBe(input)
    })
  })

  describe('Interaction', () => {
    it('toggle button switches type to text', () => {
      render(<PasswordInput name="password" value="secret" onChange={() => {}} />)
      const input = screen.getByTestId('PasswordInput')
      const toggle = screen.getByRole('button')

      expect(input).toHaveAttribute('type', 'password')
      fireEvent.click(toggle)
      expect(input).toHaveAttribute('type', 'text')
    })

    it('toggle button switches back to password', () => {
      render(<PasswordInput name="password" value="secret" onChange={() => {}} />)
      const toggle = screen.getByRole('button')
      const input = screen.getByTestId('PasswordInput')

      fireEvent.click(toggle)
      fireEvent.click(toggle)
      expect(input).toHaveAttribute('type', 'password')
    })

    it('toggle aria-label changes with visibility state', () => {
      render(<PasswordInput name="password" onChange={() => {}} />)
      const toggle = screen.getByRole('button')
      const initialLabel = toggle.getAttribute('aria-label')

      fireEvent.click(toggle)
      const toggledLabel = toggle.getAttribute('aria-label')

      expect(initialLabel).not.toBe(toggledLabel)
    })

    it('onChange fires with string value', () => {
      const onChange = jest.fn()
      render(<PasswordInput name="password" value="" onChange={onChange} />)
      const input = screen.getByTestId('PasswordInput')

      fireEvent.change(input, { target: { value: 'secret' } })
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith('secret')
    })
  })

  describe('Ref', () => {
    it('forwards ref to input element', () => {
      const ref = createRef<HTMLInputElement>()
      render(<PasswordInput ref={ref} name="password" onChange={() => {}} />)

      expect(ref.current).toBeInstanceOf(HTMLInputElement)
    })
  })

  describe('Accessibility', () => {
    it('axe', async () => {
      const { container } = render(
        <PasswordInput name="password" placeholder="Password" onChange={() => {}} />,
      )
      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })
  })
})
