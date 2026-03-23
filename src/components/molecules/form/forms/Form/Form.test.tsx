import '@testing-library/jest-dom'

import { zodResolver } from '@hookform/resolvers/zod'
import { axe, toHaveNoViolations } from 'jest-axe'
import { useContext } from 'react'
import { act } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { fireEvent, render, screen } from '../../../../../../.jest/customRender'
import { TextField } from '../../inputs/TextField'
import { Form, FormStyleContext } from './Form'

expect.extend(toHaveNoViolations)

const formSchema = z.object({
  fieldTest: z.string().min(3, 'min 3 characters'),
})

const FormWithHooks = ({
  onSubmit = jest.fn(),
  className,
  variant,
  color,
  size,
  ...rest
}: {
  onSubmit?: (values: z.infer<typeof formSchema>) => void
  className?: string
  variant?: 'text' | 'outlined' | 'contained'
  color?: 'primary' | 'secondary' | 'terciary' | 'none'
  size?: 'sm' | 'md' | 'lg' | 'none'
  [key: string]: unknown
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { fieldTest: 'value' },
  })
  return (
    <Form
      className={className}
      name="formTest"
      form={form}
      onSubmit={onSubmit}
      variant={variant}
      color={color}
      size={size}
      {...rest}
    >
      <TextField name="fieldTest" label="Label" />
      <button type="submit" data-testid="submitButton">
        Submit
      </button>
    </Form>
  )
}

const StyleContextReader = () => {
  const { formVariant, formColor, formSize } = useContext(FormStyleContext)
  return (
    <div
      data-testid="contextReader"
      data-variant={formVariant}
      data-color={formColor}
      data-size={formSize}
    />
  )
}

const FormWithContext = ({
  variant,
  color,
  size,
}: {
  variant?: 'text' | 'outlined' | 'contained'
  color?: 'primary' | 'secondary' | 'terciary' | 'none'
  size?: 'sm' | 'md' | 'lg' | 'none'
}) => {
  const form = useForm({ defaultValues: { fieldTest: 'value' } })
  return (
    <Form name="formTest" form={form} onSubmit={jest.fn()} variant={variant} color={color} size={size}>
      <StyleContextReader />
    </Form>
  )
}

describe('Form', () => {
  describe('Semantics', () => {
    it('renders form element', () => {
      render(<FormWithHooks />)
      expect(screen.getByTestId('Form')).toBeInTheDocument()
      expect(screen.getByTestId('Form').tagName).toBe('FORM')
    })

    it('forwards className', () => {
      render(<FormWithHooks className="custom-class" />)
      expect(screen.getByTestId('Form')).toHaveClass('custom-class')
    })

    it('sets id from name', () => {
      render(<FormWithHooks />)
      expect(screen.getByTestId('Form')).toHaveAttribute('id', 'formTest')
    })

    it('spreads native form attributes', () => {
      render(<FormWithHooks noValidate autoComplete="off" />)
      const form = screen.getByTestId('Form')
      expect(form).toHaveAttribute('novalidate')
      expect(form).toHaveAttribute('autocomplete', 'off')
    })

    it('provides FormStyleContext to children', () => {
      render(<FormWithContext variant="outlined" color="secondary" size="lg" />)
      const reader = screen.getByTestId('contextReader')
      expect(reader).toHaveAttribute('data-variant', 'outlined')
      expect(reader).toHaveAttribute('data-color', 'secondary')
      expect(reader).toHaveAttribute('data-size', 'lg')
    })
  })

  describe('Interaction', () => {
    it('calls onSubmit with values on valid submission', async () => {
      const onSubmit = jest.fn()
      render(<FormWithHooks onSubmit={onSubmit} />)

      await act(async () => {
        fireEvent.click(screen.getByTestId('submitButton'))
      })

      expect(onSubmit).toHaveBeenCalledWith(
        { fieldTest: 'value' },
        expect.anything(),
      )
    })

    it('blocks onSubmit on invalid submission', async () => {
      const onSubmit = jest.fn()
      render(<FormWithHooks onSubmit={onSubmit} />)
      const input = screen.getByRole('textbox')

      await act(async () => {
        fireEvent.change(input, { target: { value: 'ab' } })
      })
      await act(async () => {
        fireEvent.click(screen.getByTestId('submitButton'))
      })

      expect(onSubmit).not.toHaveBeenCalled()
    })

    it('field value change updates form state', async () => {
      render(<FormWithHooks />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('value', 'value')

      await act(async () => {
        fireEvent.change(input, { target: { value: 'new value' } })
      })

      expect(input).toHaveAttribute('value', 'new value')
    })
  })

  describe('Accessibility', () => {
    it('no axe violations', async () => {
      const { container } = render(<FormWithHooks />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
