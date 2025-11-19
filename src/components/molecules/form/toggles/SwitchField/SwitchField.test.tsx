import '@testing-library/jest-dom'

import { zodResolver } from '@hookform/resolvers/zod'
import { axe, toHaveNoViolations } from 'jest-axe'
import { act } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { fireEvent, render, screen } from '../../../../../../.jest/customRender'
import { Form } from '../../forms/Form'
import { SwitchField } from '.'

expect.extend(toHaveNoViolations)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FieldWithHooks = (props: any) => {
  const formSchema = z.object({
    fieldTest: z.string().min(3, 'min 3 characters'),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { fieldTest: 'fieldTest' },
  })
  return (
    <Form name="testForm" form={form} onSubmit={() => {}}>
      <SwitchField className="className" name="fieldTest" label="Label" {...props} />
      <button form="testForm" type="submit" data-testid="submitButton">
        Submit
      </button>
    </Form>
  )
}

describe('SwitchField', () => {
  it('default', () => {
    render(<FieldWithHooks />)
    const fieldWrapTestId = screen.getByTestId('SwitchWrap')
    const inputRole = screen.getByRole('checkbox')
    const labelTestId = screen.getByTestId('Label')

    expect(fieldWrapTestId).toBeInTheDocument()
    expect(fieldWrapTestId).toHaveClass('className')
    expect(inputRole).toHaveAttribute('id', 'fieldTest')
    expect(inputRole).toHaveAttribute('name', 'fieldTest')
    expect(inputRole).toHaveAttribute('type', 'checkbox')
    expect(inputRole).toHaveAttribute('value', 'fieldTest')
    expect(inputRole).toHaveAttribute('aria-invalid', 'false')
    expect(inputRole).not.toHaveAttribute('aria-describedby')
    expect(labelTestId).toBeInTheDocument()
    expect(labelTestId).toHaveTextContent('Label')
    expect(labelTestId).toHaveAttribute('for', 'fieldTest')
    expect(labelTestId).toHaveAttribute('id', 'fieldTest-label')
  })

  it('value', async () => {
    render(<FieldWithHooks />)
    const inputRole = screen.getByRole('checkbox')

    expect(inputRole).toHaveAttribute('value', 'fieldTest')

    await act(async () => {
      fireEvent.click(inputRole)
    })

    expect(inputRole).toHaveAttribute('value', '')
  })

  it('onChange', async () => {
    const spy = jest.fn()
    render(<FieldWithHooks onChange={spy} />)
    const inputRole = screen.getByRole('checkbox')

    await act(async () => {
      fireEvent.click(inputRole)
    })

    expect(spy).toHaveBeenCalled()
    expect(spy).toHaveBeenCalledWith('')
  })

  it('onSubmit', async () => {
    const spy = jest.fn()
    render(<FieldWithHooks />)
    screen.getByTestId('Form').onsubmit = spy

    await act(async () => {
      fireEvent.click(screen.getByTestId('submitButton'))
    })
    // TODO beenCalledWith, spy return native event and not values
    expect(spy).toHaveBeenCalled()
  })

  it('axe', async () => {
    const { container } = render(<FieldWithHooks />)

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
