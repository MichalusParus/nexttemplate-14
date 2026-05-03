import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { fireEvent, render, screen } from '../../../../../../../.jest/customRender'
import { Checkbox } from '.'

expect.extend(toHaveNoViolations)

describe('Checkbox', () => {
  describe('Semantics', () => {
    it('renders wrapper with className', () => {
      render(
        <Checkbox
          className="className"
          name="checkboxTest"
          label="label"
          value="checkboxTest"
          isChecked={false}
          onChange={() => {}}
        />,
      )
      const wrap = screen.getByTestId('CheckboxWrap')

      expect(wrap).toBeInTheDocument()
      expect(wrap).toHaveClass('className')
    })

    it('renders native checkbox with name and id', () => {
      render(
        <Checkbox name="checkboxTest" label="label" value="checkboxTest" isChecked={false} onChange={() => {}} />,
      )
      const checkbox = screen.getByRole('checkbox')

      expect(checkbox).toHaveAttribute('id', 'checkboxTest')
      expect(checkbox).toHaveAttribute('name', 'checkboxTest')
      expect(checkbox).toHaveAttribute('type', 'checkbox')
    })

    it('label links to input via htmlFor and has id', () => {
      render(
        <Checkbox name="checkboxTest" label="label" value="checkboxTest" isChecked={false} onChange={() => {}} />,
      )
      const label = screen.getByTestId('Label')

      expect(label).toBeInTheDocument()
      expect(label).toHaveTextContent('label')
      expect(label).toHaveAttribute('for', 'checkboxTest')
      expect(label).toHaveAttribute('id', 'checkboxTest-label')
    })

    it('renders content instead of label when provided', () => {
      render(
        <Checkbox
          name="checkboxTest"
          label="label"
          value="checkboxTest"
          content={<span>Custom content</span>}
          isChecked={false}
          onChange={() => {}}
        />,
      )
      const label = screen.getByTestId('Label')

      expect(label).toHaveTextContent('Custom content')
      expect(label).not.toHaveTextContent('label')
    })

    it('unchecked shows CheckIcon at opacity-0', () => {
      render(
        <Checkbox name="checkboxTest" label="label" value="checkboxTest" isChecked={false} onChange={() => {}} />,
      )
      const checkIcon = screen.getByTestId('CheckIcon')

      expect(checkIcon).toBeInTheDocument()
      expect(checkIcon).toHaveClass('opacity-0')
    })

    it('checked shows CheckIcon at opacity-100', () => {
      render(
        <Checkbox name="checkboxTest" label="label" value="checkboxTest" isChecked onChange={() => {}} />,
      )
      const checkbox = screen.getByRole('checkbox')
      const checkIcon = screen.getByTestId('CheckIcon')

      expect(checkbox).toHaveAttribute('checked')
      expect(checkIcon).toHaveClass('opacity-100')
    })

    it('indeterminate shows MinusIcon instead of CheckIcon', () => {
      render(
        <Checkbox
          name="checkboxTest"
          label="label"
          value="checkboxTest"
          isChecked={false}
          isIndeterminate
          onChange={() => {}}
        />,
      )
      const inputWrap = screen.getByTestId('CheckboxInputWrap')
      const minusIcon = screen.getByTestId('MinusIcon')
      const checkIcon = screen.queryByTestId('CheckIcon')

      expect(inputWrap).toHaveAttribute('data-selected')
      expect(minusIcon).toBeInTheDocument()
      expect(minusIcon).toHaveClass('opacity-100')
      expect(checkIcon).toBeNull()
    })

    it('indeterminate sets native DOM property', () => {
      const ref = createRef<HTMLInputElement>()
      render(
        <Checkbox
          ref={ref}
          name="checkboxTest"
          label="label"
          value="checkboxTest"
          isChecked={false}
          isIndeterminate
          onChange={() => {}}
        />,
      )

      expect(ref.current?.indeterminate).toBe(true)
    })

    it('checked + indeterminate shows MinusIcon and sets native indeterminate', () => {
      const ref = createRef<HTMLInputElement>()
      render(
        <Checkbox
          ref={ref}
          name="checkboxTest"
          label="label"
          value="checkboxTest"
          isChecked
          isIndeterminate
          onChange={() => {}}
        />,
      )

      expect(screen.getByTestId('MinusIcon')).toBeInTheDocument()
      expect(screen.queryByTestId('CheckIcon')).toBeNull()
      expect(ref.current?.indeterminate).toBe(true)
      expect(ref.current?.checked).toBe(true)
    })

    it('indeterminate + disabled applies both states', () => {
      render(
        <Checkbox
          name="checkboxTest"
          label="label"
          value="checkboxTest"
          isChecked={false}
          isIndeterminate
          disabled
          onChange={() => {}}
        />,
      )
      const inputWrap = screen.getByTestId('CheckboxInputWrap')
      const minusIcon = screen.getByTestId('MinusIcon')

      expect(inputWrap).toHaveAttribute('data-selected')
      expect(inputWrap).toHaveClass('disabled')
      expect(minusIcon).toHaveClass('disabled')
    })

    it('error applies error class to input wrap', () => {
      render(
        <Checkbox
          name="checkboxTest"
          label="label"
          value="checkboxTest"
          error="error"
          isChecked={false}
          onChange={() => {}}
        />,
      )
      const inputWrap = screen.getByTestId('CheckboxInputWrap')

      expect(inputWrap).toHaveAttribute('data-error')
    })

    it('disabled sets native disabled and aria-disabled', () => {
      render(
        <Checkbox
          name="checkboxTest"
          label="label"
          value="checkboxTest"
          isChecked={false}
          disabled
          onChange={() => {}}
        />,
      )
      const checkbox = screen.getByRole('checkbox')
      const inputWrap = screen.getByTestId('CheckboxInputWrap')

      expect(checkbox).toHaveAttribute('disabled')
      expect(inputWrap).toHaveAttribute('aria-disabled', 'true')
      expect(inputWrap).toHaveClass('disabled')
    })

    it('disabled + error applies both classes', () => {
      render(
        <Checkbox
          name="checkboxTest"
          label="label"
          value="checkboxTest"
          isChecked={false}
          disabled
          error="error"
          onChange={() => {}}
        />,
      )
      const inputWrap = screen.getByTestId('CheckboxInputWrap')

      expect(inputWrap).toHaveAttribute('data-error')
      expect(inputWrap).toHaveClass('disabled')
    })

    it('fake hides input and label', () => {
      render(
        <Checkbox
          name="checkboxTest"
          label="label"
          value=""
          isChecked={false}
          onChange={() => {}}
          fake
        />,
      )

      expect(screen.queryByRole('checkbox')).toBeNull()
      expect(screen.queryByTestId('Label')).toBeNull()
    })

    it('fake still renders icon but no selected class', () => {
      render(
        <Checkbox
          name="checkboxTest"
          label="label"
          value=""
          isChecked
          onChange={() => {}}
          fake
        />,
      )
      const inputWrap = screen.getByTestId('CheckboxInputWrap')

      expect(screen.getByTestId('CheckIcon')).toBeInTheDocument()
      expect(screen.getByTestId('CheckIcon')).toHaveClass('opacity-100')
      expect(inputWrap).not.toHaveAttribute('data-selected')
    })
  })

  describe('Keyboard', () => {
    it('Tab focuses the input', () => {
      render(
        <Checkbox name="checkboxTest" label="label" value="checkboxTest" isChecked={false} onChange={() => {}} />,
      )
      const checkbox = screen.getByRole('checkbox')

      checkbox.focus()
      expect(document.activeElement).toBe(checkbox)
    })

    it('click toggles via native behavior', () => {
      const onChange = jest.fn()
      render(
        <Checkbox name="checkboxTest" label="label" value="checkboxTest" isChecked={false} onChange={onChange} />,
      )
      const checkbox = screen.getByRole('checkbox')

      fireEvent.click(checkbox)
      expect(onChange).toHaveBeenCalledTimes(1)
    })

    it('disabled prevents focus', () => {
      render(
        <Checkbox
          name="checkboxTest"
          label="label"
          value="checkboxTest"
          isChecked={false}
          disabled
          onChange={() => {}}
        />,
      )
      const checkbox = screen.getByRole('checkbox')

      checkbox.focus()
      expect(document.activeElement).not.toBe(checkbox)
    })
  })

  describe('Interaction', () => {
    it('click triggers onChange', () => {
      const onChange = jest.fn()
      render(
        <Checkbox name="checkboxTest" label="label" value="checkboxTest" isChecked={false} onChange={onChange} />,
      )
      const checkbox = screen.getByRole('checkbox')

      fireEvent.click(checkbox)
      expect(onChange).toHaveBeenCalledTimes(1)
    })

    it('onChange receives value prop', () => {
      const onChange = jest.fn()
      render(
        <Checkbox
          name="checkboxTest"
          label="label"
          value="myValue"
          isChecked={false}
          onChange={onChange}
        />,
      )
      const checkbox = screen.getByRole('checkbox')

      fireEvent.click(checkbox)
      expect(onChange).toHaveBeenCalledWith('myValue')
    })

    it('disabled checkbox has disabled attribute', () => {
      render(
        <Checkbox
          name="checkboxTest"
          label="label"
          value="checkboxTest"
          isChecked={false}
          disabled
          onChange={() => {}}
        />,
      )
      const checkbox = screen.getByRole('checkbox')

      expect(checkbox).toBeDisabled()
    })
  })

  describe('Ref', () => {
    it('ref returns HTMLInputElement', () => {
      const ref = createRef<HTMLInputElement>()
      render(
        <Checkbox
          ref={ref}
          name="checkboxTest"
          label="label"
          value="checkboxTest"
          isChecked={false}
          onChange={() => {}}
        />,
      )

      expect(ref.current).toBeInstanceOf(HTMLInputElement)
    })
  })

  describe('Accessibility', () => {
    it('no axe violations', async () => {
      const { container } = render(
        <Checkbox name="checkboxTest" label="label" value="checkboxTest" isChecked={false} onChange={() => {}} />,
      )

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
