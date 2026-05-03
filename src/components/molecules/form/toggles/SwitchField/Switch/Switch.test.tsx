import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { fireEvent, render, screen } from '../../../../../../../.jest/customRender'
import { Switch } from '.'

expect.extend(toHaveNoViolations)

describe('Switch', () => {
  describe('Semantics', () => {
    it('renders wrapper with className', () => {
      render(
        <Switch
          className="className"
          name="switchTest"
          label="label"
          value="switchTest"
          isChecked={false}
          onChange={() => {}}
        />,
      )
      const wrap = screen.getByTestId('SwitchWrap')

      expect(wrap).toBeInTheDocument()
      expect(wrap).toHaveClass('className')
    })

    it('renders switch input with role, name and id', () => {
      render(
        <Switch name="switchTest" label="label" value="switchTest" isChecked={false} onChange={() => {}} />,
      )
      const switchInput = screen.getByRole('switch')

      expect(switchInput).toHaveAttribute('id', 'switchTest')
      expect(switchInput).toHaveAttribute('name', 'switchTest')
      expect(switchInput).toHaveAttribute('type', 'checkbox')
      expect(switchInput).toHaveAttribute('role', 'switch')
      expect(switchInput).toHaveAttribute('aria-checked', 'false')
    })

    it('on state sets aria-checked true', () => {
      render(
        <Switch name="switchTest" label="label" value="switchTest" isChecked onChange={() => {}} />,
      )
      const switchInput = screen.getByRole('switch')

      expect(switchInput).toHaveAttribute('aria-checked', 'true')
    })

    it('label links to input via htmlFor and has id', () => {
      render(
        <Switch name="switchTest" label="label" value="switchTest" isChecked={false} onChange={() => {}} />,
      )
      const label = screen.getByTestId('Label')

      expect(label).toBeInTheDocument()
      expect(label).toHaveTextContent('label')
      expect(label).toHaveAttribute('for', 'switchTest')
      expect(label).toHaveAttribute('id', 'switchTest-label')
    })

    it('renders content instead of label when provided', () => {
      render(
        <Switch
          name="switchTest"
          label="label"
          value="switchTest"
          content={<span>Custom content</span>}
          isChecked={false}
          onChange={() => {}}
        />,
      )
      const label = screen.getByTestId('Label')

      expect(label).toHaveTextContent('Custom content')
      expect(label).not.toHaveTextContent('label')
    })

    it('off state positions thumb at translate-x-0', () => {
      render(
        <Switch name="switchTest" label="label" value="switchTest" isChecked={false} onChange={() => {}} />,
      )
      const thumb = screen.getByTestId('SwitchThumb')

      expect(thumb).toBeInTheDocument()
      expect(thumb).toHaveClass('translate-x-0')
    })

    it('on state positions thumb at checked position', () => {
      render(
        <Switch name="switchTest" label="label" value="switchTest" isChecked onChange={() => {}} />,
      )
      const checkbox = screen.getByRole('switch')
      const thumb = screen.getByTestId('SwitchThumb')

      expect(checkbox).toHaveAttribute('checked')
      expect(thumb).toHaveClass('translate-x-4')
    })

    it('on state applies selected class to track', () => {
      render(
        <Switch name="switchTest" label="label" value="switchTest" isChecked onChange={() => {}} />,
      )
      const inputWrap = screen.getByTestId('SwitchInputWrap')

      expect(inputWrap).toHaveAttribute('data-selected')
    })

    it('error applies error class to input wrap', () => {
      render(
        <Switch name="switchTest" label="label" value="switchTest" error="error" isChecked={false} onChange={() => {}} />,
      )
      const inputWrap = screen.getByTestId('SwitchInputWrap')

      expect(inputWrap).toHaveAttribute('data-error')
    })

    it('disabled sets native disabled and aria-disabled', () => {
      render(
        <Switch name="switchTest" label="label" value="switchTest" isChecked={false} disabled onChange={() => {}} />,
      )
      const checkbox = screen.getByRole('switch')
      const inputWrap = screen.getByTestId('SwitchInputWrap')

      expect(checkbox).toHaveAttribute('disabled')
      expect(inputWrap).toHaveAttribute('aria-disabled', 'true')
      expect(inputWrap).toHaveClass('disabled')
    })

    it('disabled + error applies both classes', () => {
      render(
        <Switch name="switchTest" label="label" value="switchTest" isChecked={false} disabled error="error" onChange={() => {}} />,
      )
      const inputWrap = screen.getByTestId('SwitchInputWrap')

      expect(inputWrap).toHaveAttribute('data-error')
      expect(inputWrap).toHaveClass('disabled')
    })

    it('fake hides input and label', () => {
      render(
        <Switch name="switchTest" label="label" value="" isChecked={false} onChange={() => {}} fake />,
      )

      expect(screen.queryByRole('switch')).toBeNull()
      expect(screen.queryByTestId('Label')).toBeNull()
    })

    it('fake still renders thumb but no selected class', () => {
      render(
        <Switch name="switchTest" label="label" value="" isChecked onChange={() => {}} fake />,
      )
      const inputWrap = screen.getByTestId('SwitchInputWrap')

      expect(screen.getByTestId('SwitchThumb')).toBeInTheDocument()
      expect(inputWrap).not.toHaveAttribute('data-selected')
    })
  })

  describe('Keyboard', () => {
    it('Tab focuses the input', () => {
      render(
        <Switch name="switchTest" label="label" value="switchTest" isChecked={false} onChange={() => {}} />,
      )
      const checkbox = screen.getByRole('switch')

      checkbox.focus()
      expect(document.activeElement).toBe(checkbox)
    })

    it('click toggles via native behavior', () => {
      const onChange = jest.fn()
      render(
        <Switch name="switchTest" label="label" value="switchTest" isChecked={false} onChange={onChange} />,
      )
      const checkbox = screen.getByRole('switch')

      fireEvent.click(checkbox)
      expect(onChange).toHaveBeenCalledTimes(1)
    })

    it('disabled prevents focus', () => {
      render(
        <Switch name="switchTest" label="label" value="switchTest" isChecked={false} disabled onChange={() => {}} />,
      )
      const checkbox = screen.getByRole('switch')

      checkbox.focus()
      expect(document.activeElement).not.toBe(checkbox)
    })
  })

  describe('Interaction', () => {
    it('click triggers onChange', () => {
      const onChange = jest.fn()
      render(
        <Switch name="switchTest" label="label" value="switchTest" isChecked={false} onChange={onChange} />,
      )
      const checkbox = screen.getByRole('switch')

      fireEvent.click(checkbox)
      expect(onChange).toHaveBeenCalledTimes(1)
    })

    it('onChange receives value prop', () => {
      const onChange = jest.fn()
      render(
        <Switch name="switchTest" label="label" value="myValue" isChecked={false} onChange={onChange} />,
      )
      const checkbox = screen.getByRole('switch')

      fireEvent.click(checkbox)
      expect(onChange).toHaveBeenCalledWith('myValue')
    })

    it('disabled checkbox has disabled attribute', () => {
      render(
        <Switch name="switchTest" label="label" value="switchTest" isChecked={false} disabled onChange={() => {}} />,
      )
      const checkbox = screen.getByRole('switch')

      expect(checkbox).toBeDisabled()
    })
  })

  describe('Ref', () => {
    it('ref returns HTMLInputElement', () => {
      const ref = createRef<HTMLInputElement>()
      render(
        <Switch ref={ref} name="switchTest" label="label" value="switchTest" isChecked={false} onChange={() => {}} />,
      )

      expect(ref.current).toBeInstanceOf(HTMLInputElement)
    })
  })

  describe('Accessibility', () => {
    it('no axe violations', async () => {
      const { container } = render(
        <Switch name="switchTest" label="label" value="switchTest" isChecked={false} onChange={() => {}} />,
      )

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
