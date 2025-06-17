import '@testing-library/jest-dom'

import { zodResolver } from '@hookform/resolvers/zod'
import { axe, toHaveNoViolations } from 'jest-axe'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { fireEvent, render, screen, waitFor } from '../../../../../../.jest/customRender'
import { getOptions } from '../../../../../../.storybook/helpers'
import { Form } from '../../Form'
import { RadioGroupField } from '.'

expect.extend(toHaveNoViolations)

const options = getOptions('fieldTest', 5)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FieldWithHooks = (props: any) => {
  const formSchema = z.object({
    fieldTest: z.string().min(3, 'select one'),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { fieldTest: '' },
  })
  return (
    <Form name="testForm" form={form} onSubmit={() => {}}>
      <RadioGroupField
        className="className"
        name="fieldTest"
        label="Label"
        options={options}
        {...props}
      />
      <button form="testForm" type="submit" data-testid="submitButton">
        Submit
      </button>
    </Form>
  )
}

describe('RadioGroupField', () => {
  it('default', () => {
    render(<FieldWithHooks />)
    const fieldsetRole = screen.getByRole('group')
    const inputRoles = screen.getAllByRole('radio')
    const fakeLabelTestId = screen.getByTestId('FakeLabel')
    const labelTestIds = screen.getAllByTestId('Label')

    expect(fieldsetRole).toBeInTheDocument()
    expect(fieldsetRole).toHaveClass('className')
    expect(fieldsetRole).toHaveAttribute('id', 'fieldTest')
    expect(fieldsetRole).toHaveAttribute('aria-invalid', 'false')
    expect(fakeLabelTestId).toBeInTheDocument()
    expect(fakeLabelTestId).toHaveTextContent('Label')
    expect(fakeLabelTestId.tagName).toBe('LEGEND')
    expect(inputRoles[0]).toHaveAttribute('id', options[0].value)
    expect(inputRoles[0]).toHaveAttribute('name', 'fieldTest')
    expect(inputRoles[0]).toHaveAttribute('type', 'radio')
    expect(inputRoles[0]).toHaveAttribute('value', options[0].value)
    expect(inputRoles[0]).not.toHaveAttribute('aria-describedby')
    expect(labelTestIds[0]).toBeInTheDocument()
    expect(labelTestIds[0]).toHaveTextContent(options[0].label)
    expect(labelTestIds[0]).toHaveAttribute('for', options[0].value)
    expect(labelTestIds[0]).toHaveAttribute('id', `${options[0].value}-label`)
  })

  it('error', async () => {
    render(<FieldWithHooks />)
    const fieldsetRole = screen.getByRole('group')
    const alertRole = screen.getByTestId('Alert')
    fireEvent.submit(screen.getByTestId('submitButton'))

    await waitFor(() => {
      expect(alertRole).toBeInTheDocument()
      expect(alertRole).toHaveTextContent('select one')
      expect(alertRole).toHaveAttribute('role', 'alert')
      expect(fieldsetRole).toHaveAttribute('aria-describedby', 'fieldTest-description')
      expect(fieldsetRole).toHaveAttribute('aria-invalid', 'true')
    })
  })

  it('value', () => {
    render(<FieldWithHooks />)
    const inputRoles = screen.getAllByRole('radio')

    expect(inputRoles[0]).toHaveAttribute('value', options[0].value)

    fireEvent.click(inputRoles[0])

    expect(inputRoles[0]).toHaveAttribute('value', undefined)
  })

  it('description', () => {
    render(<FieldWithHooks labelProps={{ description: 'description' }} />)
    const alertTestId = screen.getByTestId('Alert')

    expect(alertTestId).toBeInTheDocument()
    expect(alertTestId).toHaveTextContent('description')
  })

  it('onChange', () => {
    const spy = jest.fn()
    render(<FieldWithHooks onChange={spy} />)
    const inputRoles = screen.getAllByRole('radio')

    fireEvent.click(inputRoles[1])

    expect(spy).toHaveBeenCalled()
    expect(spy).toHaveBeenCalledWith(options[1].value)
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
