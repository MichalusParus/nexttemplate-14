import '@testing-library/jest-dom'

import { zodResolver } from '@hookform/resolvers/zod'
import { axe, toHaveNoViolations } from 'jest-axe'
import { act } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { fireEvent, render, screen } from '../../../../../../.jest/customRender'
import { Form } from '../../forms/Form'
import { CheckboxField } from '.'

expect.extend(toHaveNoViolations)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FieldWithHooks = (props: any) => {
  const formSchema = z.object({
    fieldTest: z.boolean().refine(v => v, 'required'),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { fieldTest: true },
  })
  return (
    <Form name="testForm" form={form} onSubmit={() => {}}>
      <CheckboxField className="className" name="fieldTest" label="Label" {...props} />
      <button form="testForm" type="submit" data-testid="submitButton">
        Submit
      </button>
    </Form>
  )
}

describe('CheckboxField', () => {
  describe('Semantics', () => {
    it('renders Checkbox with inline label', () => {
      render(<FieldWithHooks />)

      expect(screen.getByTestId('CheckboxWrap')).toBeInTheDocument()
      expect(screen.getByRole('checkbox')).toBeInTheDocument()
    })

    it('forwards className', () => {
      render(<FieldWithHooks />)

      expect(screen.getByTestId('CheckboxWrap')).toHaveClass('className')
    })

    it('id and name from name prop', () => {
      render(<FieldWithHooks />)
      const input = screen.getByRole('checkbox')

      expect(input).toHaveAttribute('id', 'fieldTest')
      expect(input).toHaveAttribute('name', 'fieldTest')
      expect(input).toHaveAttribute('type', 'checkbox')
    })

    it('label text with for attribute', () => {
      render(<FieldWithHooks />)
      const label = screen.getByTestId('Label')

      expect(label).toBeInTheDocument()
      expect(label).toHaveTextContent('Label')
      expect(label).toHaveAttribute('for', 'fieldTest')
      expect(label).toHaveAttribute('id', 'fieldTest-label')
    })

    it('aria-invalid false when no error', () => {
      render(<FieldWithHooks />)

      expect(screen.getByRole('checkbox')).toHaveAttribute('aria-invalid', 'false')
    })

    it('no aria-describedby', () => {
      render(<FieldWithHooks />)

      expect(screen.getByRole('checkbox')).not.toHaveAttribute('aria-describedby')
    })
  })

  describe('Interaction', () => {
    it('value toggle', async () => {
      render(<FieldWithHooks />)
      const input = screen.getByRole('checkbox')

      expect(input).toBeChecked()

      await act(async () => {
        fireEvent.click(input)
      })

      expect(input).not.toBeChecked()
    })

    it('onChange fires with value', async () => {
      const onChange = jest.fn()
      render(<FieldWithHooks onChange={onChange} />)

      await act(async () => {
        fireEvent.click(screen.getByRole('checkbox'))
      })

      expect(onChange).toHaveBeenCalledWith('')
    })

    it('form submit works', async () => {
      const onSubmit = jest.fn()
      render(<FieldWithHooks />)
      screen.getByTestId('Form').onsubmit = onSubmit

      await act(async () => {
        fireEvent.click(screen.getByTestId('submitButton'))
      })

      expect(onSubmit).toHaveBeenCalled()
    })
  })

  describe('Accessibility', () => {
    it('no axe violations', async () => {
      const { container } = render(<FieldWithHooks />)

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
