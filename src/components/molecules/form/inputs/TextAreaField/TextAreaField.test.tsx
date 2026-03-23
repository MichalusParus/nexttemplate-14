import '@testing-library/jest-dom'

import { zodResolver } from '@hookform/resolvers/zod'
import { axe, toHaveNoViolations } from 'jest-axe'
import { act } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { fireEvent, render, screen, waitFor } from '../../../../../../.jest/customRender'
import { Form } from '../../forms/Form'
import { TextAreaField } from '.'

expect.extend(toHaveNoViolations)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FieldWithHooks = (props: any) => {
  const formSchema = z.object({
    fieldTest: z.string().min(3, 'min 3 characters'),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { fieldTest: 'value' },
  })
  return (
    <Form name="testForm" form={form} onSubmit={() => {}}>
      <TextAreaField
        className="className"
        name="fieldTest"
        label="Label"
        placeholder="placeholder"
        {...props}
      />
      <button form="testForm" type="submit" data-testid="submitButton">
        Submit
      </button>
    </Form>
  )
}

describe('TextAreaField', () => {
  describe('Semantics', () => {
    it('renders TextArea with Label', () => {
      render(<FieldWithHooks />)

      expect(screen.getByTestId('TextAreaWrap')).toBeInTheDocument()
      expect(screen.getByRole('textbox')).toBeInTheDocument()
    })

    it('forwards className', () => {
      render(<FieldWithHooks />)

      expect(screen.getByTestId('TextAreaWrap')).toHaveClass('className')
    })

    it('id and name from name prop', () => {
      render(<FieldWithHooks />)
      const input = screen.getByRole('textbox')

      expect(input).toHaveAttribute('id', 'fieldTest')
      expect(input).toHaveAttribute('name', 'fieldTest')
    })

    it('placeholder', () => {
      render(<FieldWithHooks />)

      expect(screen.getByRole('textbox')).toHaveAttribute('placeholder', 'placeholder')
    })

    it('label text with for attribute', () => {
      render(<FieldWithHooks />)
      const label = screen.getByTestId('Label')

      expect(label).toBeInTheDocument()
      expect(label).toHaveTextContent('Label')
      expect(label).toHaveAttribute('for', 'fieldTest')
      expect(label).toHaveAttribute('id', 'fieldTest-label')
    })

    it('alert with description id', () => {
      render(<FieldWithHooks />)
      const alert = screen.getByTestId('Alert')

      expect(alert).toBeInTheDocument()
      expect(alert).toHaveTextContent('')
      expect(alert).toHaveAttribute('id', 'fieldTest-description')
      expect(screen.queryByRole('alert')).toBeNull()
    })

    it('aria-invalid false when no error', () => {
      render(<FieldWithHooks />)

      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'false')
    })

    it('no aria-describedby when no error or description', () => {
      render(<FieldWithHooks />)

      expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-describedby')
    })

    it('description in aria-describedby', () => {
      render(<FieldWithHooks labelProps={{ description: 'description' }} />)
      const input = screen.getByRole('textbox')
      const alert = screen.getByTestId('Alert')

      expect(alert).toHaveTextContent('description')
      expect(input).toHaveAttribute('aria-describedby', 'fieldTest-description')
    })

    it('labelProps forwarded', () => {
      render(<FieldWithHooks labelProps={{ className: 'className' }} />)

      expect(screen.getByTestId('LabelWrap')).toHaveClass('className')
    })
  })

  describe('Interaction', () => {
    it('value change', async () => {
      render(<FieldWithHooks />)
      const input = screen.getByRole('textbox')

      expect(input).toHaveValue('value')

      await act(async () => {
        fireEvent.change(input, { target: { value: 'newValue' } })
      })

      expect(input).toHaveValue('newValue')
    })

    it('onChange fires with value', async () => {
      const onChange = jest.fn()
      render(<FieldWithHooks onChange={onChange} />)

      await act(async () => {
        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'newValue' } })
      })

      expect(onChange).toHaveBeenCalledWith('newValue')
    })

    it('error shown on invalid submit', async () => {
      render(<FieldWithHooks />)
      const input = screen.getByRole('textbox')
      const alert = screen.getByTestId('Alert')

      await act(async () => {
        fireEvent.change(input, { target: { value: '' } })
      })

      await act(async () => {
        fireEvent.submit(screen.getByTestId('submitButton'))
      })

      await waitFor(() => {
        expect(alert).toHaveTextContent('min 3 characters')
        expect(alert).toHaveAttribute('role', 'alert')
        expect(input).toHaveAttribute('aria-describedby', 'fieldTest-description')
        expect(input).toHaveAttribute('aria-invalid', 'true')
      })
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
