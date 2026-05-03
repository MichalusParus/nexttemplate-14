import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { fireEvent, render, screen } from '../../../../../../../.jest/customRender'
import { TextArea } from '.'

expect.extend(toHaveNoViolations)

describe('TextArea', () => {
  describe('Semantics', () => {
    it('renders native textarea with textbox role', () => {
      render(<TextArea name="test" placeholder="placeholder" onChange={() => {}} />)
      const textarea = screen.getByRole('textbox')

      expect(textarea).toBeInTheDocument()
      expect(textarea.tagName).toBe('TEXTAREA')
    })

    it('sets id and name from name prop', () => {
      render(<TextArea name="bio" onChange={() => {}} />)
      const textarea = screen.getByRole('textbox')

      expect(textarea).toHaveAttribute('id', 'bio')
      expect(textarea).toHaveAttribute('name', 'bio')
    })

    it('className lands on wrapper div', () => {
      render(<TextArea className="w-96" name="test" onChange={() => {}} />)
      const wrapper = screen.getByTestId('TextAreaWrap')

      expect(wrapper).toHaveClass('w-96')
    })

    it('renders placeholder', () => {
      render(<TextArea name="test" placeholder="Enter text" onChange={() => {}} />)
      const textarea = screen.getByRole('textbox')

      expect(textarea).toHaveAttribute('placeholder', 'Enter text')
    })

    it('renders value', () => {
      render(<TextArea name="test" value="hello" onChange={() => {}} />)
      const textarea = screen.getByRole('textbox')

      expect(textarea).toHaveValue('hello')
    })

    it('error adds error class to wrapper', () => {
      render(<TextArea name="test" error="required" onChange={() => {}} />)
      const wrapper = screen.getByTestId('TextAreaWrap')

      expect(wrapper).toHaveAttribute('data-error')
    })

    it('disabled sets native disabled and aria-disabled on wrapper', () => {
      render(<TextArea name="test" disabled onChange={() => {}} />)
      const textarea = screen.getByRole('textbox')
      const wrapper = screen.getByTestId('TextAreaWrap')

      expect(textarea).toBeDisabled()
      expect(wrapper).toHaveAttribute('aria-disabled', 'true')
      expect(wrapper).toHaveClass('disabled')
    })

    it('not disabled omits aria-disabled', () => {
      render(<TextArea name="test" onChange={() => {}} />)
      const wrapper = screen.getByTestId('TextAreaWrap')

      expect(wrapper).not.toHaveAttribute('aria-disabled')
    })
  })

  describe('Keyboard', () => {
    it('Tab focuses the textarea', () => {
      render(<TextArea name="test" onChange={() => {}} />)
      const textarea = screen.getByRole('textbox')

      textarea.focus()
      expect(document.activeElement).toBe(textarea)
    })
  })

  describe('Interaction', () => {
    it('onChange fires with string value', () => {
      const onChange = jest.fn()
      render(<TextArea name="test" value="" onChange={onChange} />)
      const textarea = screen.getByRole('textbox')

      fireEvent.change(textarea, { target: { value: 'hello' } })
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith('hello')
    })

    it('disabled textarea has disabled attribute', () => {
      render(<TextArea name="test" value="" disabled onChange={() => {}} />)
      const textarea = screen.getByRole('textbox')

      expect(textarea).toBeDisabled()
    })
  })

  describe('Ref', () => {
    it('forwards ref to textarea element', () => {
      const ref = createRef<HTMLTextAreaElement>()
      render(<TextArea ref={ref} name="test" onChange={() => {}} />)

      expect(ref.current).toBeInstanceOf(HTMLTextAreaElement)
    })
  })

  describe('Accessibility', () => {
    it('axe', async () => {
      const { container } = render(
        <TextArea name="test" placeholder="placeholder" onChange={() => {}} />,
      )
      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })
  })
})
