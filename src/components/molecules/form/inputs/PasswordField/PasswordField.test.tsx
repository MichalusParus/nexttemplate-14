import '@testing-library/jest-dom'

import { zodResolver } from '@hookform/resolvers/zod'
import { axe, toHaveNoViolations } from 'jest-axe'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { fireEvent, render, screen, waitFor } from '../../../../../../.jest/customRender'
import { Form } from '../../Form'
import { PasswordField } from '.'

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
      <PasswordField
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

describe('PasswordField', () => {
  it('default', () => {
    render(<FieldWithHooks />)
    const fieldWrapTestId = screen.getByTestId('InputWrap')
    const inputTestId = screen.getByTestId('PasswordInput')
    const labelTestId = screen.getByTestId('Label')
    const alertTestId = screen.getByTestId('Alert')
    const alertQuery = screen.queryByRole('alert')

    expect(fieldWrapTestId).toBeInTheDocument()
    expect(fieldWrapTestId).toHaveClass('className')
    expect(inputTestId).toHaveAttribute('id', 'fieldTest')
    expect(inputTestId).toHaveAttribute('name', 'fieldTest')
    expect(inputTestId).toHaveAttribute('type', 'password')
    expect(inputTestId).toHaveAttribute('value', 'value')
    expect(inputTestId).toHaveAttribute('placeholder', 'placeholder')
    expect(inputTestId).toHaveAttribute('aria-invalid', 'false')
    expect(inputTestId).not.toHaveAttribute('aria-describedby')
    expect(labelTestId).toBeInTheDocument()
    expect(labelTestId).toHaveTextContent('Label')
    expect(labelTestId).toHaveAttribute('for', 'fieldTest')
    expect(labelTestId).toHaveAttribute('id', 'fieldTest-label')
    expect(alertTestId).toBeInTheDocument()
    expect(alertTestId).toHaveTextContent('')
    expect(alertTestId).toHaveAttribute('id', 'fieldTest-description')
    expect(alertQuery).toBeNull()
  })

  it('value', () => {
    render(<FieldWithHooks />)
    const inputTestId = screen.getByTestId('PasswordInput')

    expect(inputTestId).toHaveAttribute('value', 'value')

    fireEvent.change(inputTestId, {
      target: {
        value: 'newValue',
      },
    })

    expect(inputTestId).toHaveAttribute('value', 'newValue')
  })

  it('description', () => {
    render(<FieldWithHooks labelProps={{ description: 'description' }} />)
    const inputTestId = screen.getByTestId('PasswordInput')
    const alertTestId = screen.getByTestId('Alert')

    expect(alertTestId).toBeInTheDocument()
    expect(alertTestId).toHaveTextContent('description')
    expect(inputTestId).toHaveAttribute('aria-describedby', 'fieldTest-description')
  })

  it('error', async () => {
    render(<FieldWithHooks />)
    const inputTestId = screen.getByTestId('PasswordInput')
    const alertRole = screen.getByTestId('Alert')
    fireEvent.change(inputTestId, {
      target: {
        value: '',
      },
    })
    fireEvent.submit(screen.getByTestId('submitButton'))

    await waitFor(() => {
      expect(alertRole).toBeInTheDocument()
      expect(alertRole).toHaveTextContent('min 3 characters')
      expect(alertRole).toHaveAttribute('role', 'alert')
      expect(inputTestId).toHaveAttribute('aria-describedby', 'fieldTest-description')
      expect(inputTestId).toHaveAttribute('aria-invalid', 'true')
    })
  })

  it('onChange', () => {
    const spy = jest.fn()
    render(<FieldWithHooks onChange={spy} />)
    const inputTestId = screen.getByTestId('PasswordInput')

    fireEvent.change(inputTestId, {
      target: {
        value: 'newValue',
      },
    })

    expect(spy).toHaveBeenCalled()
    expect(spy).toHaveBeenCalledWith('newValue')
  })

  it('labelProps', () => {
    render(<FieldWithHooks labelProps={{ className: 'className' }} />)
    const labelWrapTestId = screen.getByTestId('LabelWrap')

    expect(labelWrapTestId).toHaveClass('className')
  })

  it('onSubmit', () => {
    const spy = jest.fn()
    render(<FieldWithHooks />)
    screen.getByTestId('Form').onsubmit = spy
    fireEvent.click(screen.getByTestId('submitButton'))
    // TODO beenCalledWith, spy return native event and not values
    expect(spy).toHaveBeenCalled()
  })

  it('axe', async () => {
    const { container } = render(<FieldWithHooks />)

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
