import '@testing-library/jest-dom'

import { zodResolver } from '@hookform/resolvers/zod'
import { axe, toHaveNoViolations } from 'jest-axe'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { fireEvent, render, screen } from '../../../../../.jest/customRender'
import { TextField } from '../inputs/TextField'
import { Form } from './Form'

expect.extend(toHaveNoViolations)

const FormWithHooks = () => {
  const formSchema = z.object({
    fieldTest: z.string().min(3, 'min 3 characters'),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { fieldTest: 'value' },
  })
  return (
    <Form className="className" name="formTest" form={form} onSubmit={() => {}}>
      <TextField name="fieldTest" label="Label" />
      <button type="submit" data-testid="submitButton">
        Submit
      </button>
    </Form>
  )
}

describe('Form', () => {
  it('default', async () => {
    render(<FormWithHooks />)
    const formTestId = screen.getByTestId('Form')
    const inputRole = screen.getByRole('textbox')

    expect(formTestId).toBeInTheDocument()
    expect(formTestId).toHaveClass('className')
    expect(formTestId).toHaveAttribute('id', 'formTest')
    expect(inputRole).toBeInTheDocument()
    expect(inputRole).toHaveAttribute('value', 'value')

    fireEvent.change(inputRole, { target: { value: 'new value' } })
    expect(inputRole).toHaveAttribute('value', 'new value')
  })

  it('submit', async () => {
    const spy = jest.fn()
    render(<FormWithHooks />)
    const formTestId = screen.getByTestId('Form')
    const submitButtonTestId = screen.getByTestId('submitButton')

    formTestId.onsubmit = spy
    fireEvent.click(submitButtonTestId)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('axe', async () => {
    const { container } = render(<FormWithHooks />)

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
