import '@testing-library/jest-dom'

import { zodResolver } from '@hookform/resolvers/zod'
import { axe, toHaveNoViolations } from 'jest-axe'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { fireEvent, render, screen, waitFor } from '../../../../../../.jest/customRender'
import { Form } from '../../Form'
import { SearchField } from '.'

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
      <SearchField
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

describe('SearchField', () => {
  it('default', () => {
    render(<FieldWithHooks />)
    const fieldWrapTestId = screen.getByTestId('InputWrap')
    const inputRole = screen.getByRole('searchbox')
    const labelTestId = screen.getByTestId('Label')
    const alertTestId = screen.getByTestId('Alert')
    const alertQuery = screen.queryByRole('alert')

    expect(fieldWrapTestId).toBeInTheDocument()
    expect(fieldWrapTestId).toHaveClass('className')
    expect(inputRole).toHaveAttribute('id', 'fieldTest')
    expect(inputRole).toHaveAttribute('name', 'fieldTest')
    expect(inputRole).toHaveAttribute('type', 'search')
    expect(inputRole).toHaveAttribute('value', 'value')
    expect(inputRole).toHaveAttribute('placeholder', 'placeholder')
    expect(inputRole).toHaveAttribute('aria-labelledby', 'fieldTest-label')
    expect(inputRole).toHaveAttribute('aria-invalid', 'false')
    expect(inputRole).not.toHaveAttribute('aria-describedby')
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
    const inputRole = screen.getByRole('searchbox')

    expect(inputRole).toHaveAttribute('value', 'value')

    fireEvent.change(inputRole, {
      target: {
        value: 'newValue',
      },
    })

    expect(inputRole).toHaveAttribute('value', 'newValue')
  })

  it('description', () => {
    render(<FieldWithHooks labelProps={{ description: 'description' }} />)
    const inputRole = screen.getByRole('searchbox')
    const alertTestId = screen.getByTestId('Alert')

    expect(alertTestId).toBeInTheDocument()
    expect(alertTestId).toHaveTextContent('description')
    expect(inputRole).toHaveAttribute('aria-describedby', 'fieldTest-description')
  })

  it('error', async () => {
    render(<FieldWithHooks />)
    const inputRole = screen.getByRole('searchbox')
    const alertRole = screen.getByTestId('Alert')
    fireEvent.change(inputRole, {
      target: {
        value: '',
      },
    })
    fireEvent.submit(screen.getByTestId('submitButton'))

    await waitFor(() => {
      expect(alertRole).toBeInTheDocument()
      expect(alertRole).toHaveTextContent('min 3 characters')
      expect(alertRole).toHaveAttribute('role', 'alert')
      expect(inputRole).toHaveAttribute('aria-describedby', 'fieldTest-description')
      expect(inputRole).toHaveAttribute('aria-invalid', 'true')
    })
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
