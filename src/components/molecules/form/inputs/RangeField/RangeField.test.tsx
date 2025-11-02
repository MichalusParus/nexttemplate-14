import '@testing-library/jest-dom'

import { zodResolver } from '@hookform/resolvers/zod'
import { axe, toHaveNoViolations } from 'jest-axe'
import { act } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { fireEvent, render, screen, waitFor } from '../../../../../../.jest/customRender'
import { Form } from '../../forms/Form'
import { RangeField } from '.'

expect.extend(toHaveNoViolations)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FieldWithHooks = (props: any) => {
  const formSchema = z.object({
    fieldTest: z.number().min(3, 'min 3 characters'),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { fieldTest: 50 },
  })
  return (
    <Form name="testForm" form={form} onSubmit={() => {}}>
      <RangeField
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

describe('RangeField', () => {
  it('default', () => {
    render(<FieldWithHooks />)
    const fieldWrapTestId = screen.getByTestId('RangeWrap')
    const inputRole = screen.getByRole('slider')
    const labelTestId = screen.getByTestId('Label')
    const alertTestId = screen.getByTestId('Alert')
    const alertQuery = screen.queryByRole('alert')

    expect(fieldWrapTestId).toBeInTheDocument()
    expect(fieldWrapTestId).toHaveClass('className')
    expect(inputRole).toHaveAttribute('id', 'fieldTest')
    expect(inputRole).toHaveAttribute('name', 'fieldTest')
    expect(inputRole).toHaveAttribute('type', 'range')
    expect(inputRole).toHaveAttribute('value', '50')
    expect(inputRole).toHaveAttribute('placeholder', 'placeholder')
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

  it('value', async () => {
    render(<FieldWithHooks />)
    const inputRole = screen.getByRole('slider')

    expect(inputRole).toHaveAttribute('value', '50')

    await act(async () => {
      fireEvent.change(inputRole, {
        target: {
          value: '100',
        },
      })
    })

    expect(inputRole).toHaveAttribute('value', '100')
  })

  it('description', () => {
    render(<FieldWithHooks labelProps={{ description: 'description' }} />)
    const inputRole = screen.getByRole('slider')
    const alertTestId = screen.getByTestId('Alert')

    expect(alertTestId).toBeInTheDocument()
    expect(alertTestId).toHaveTextContent('description')
    expect(inputRole).toHaveAttribute('aria-describedby', 'fieldTest-description')
  })

  it('error', async () => {
    render(<FieldWithHooks />)
    const inputRole = screen.getByRole('slider')
    const alertRole = screen.getByTestId('Alert')

    await act(async () => {
      fireEvent.change(inputRole, {
        target: {
          value: 0,
        },
      })
    })

    await act(async () => {
      fireEvent.submit(screen.getByTestId('submitButton'))
    })

    await waitFor(() => {
      expect(alertRole).toBeInTheDocument()
      expect(alertRole).toHaveTextContent('min 3 characters')
      expect(alertRole).toHaveAttribute('role', 'alert')
      expect(inputRole).toHaveAttribute('aria-describedby', 'fieldTest-description')
      expect(inputRole).toHaveAttribute('aria-invalid', 'true')
    })
  })

  it('onChange', async () => {
    const spy = jest.fn()
    render(<FieldWithHooks onChange={spy} />)
    const inputRole = screen.getByRole('slider')

    await act(async () => {
      fireEvent.change(inputRole, {
        target: {
          value: '100',
        },
      })
    })

    expect(spy).toHaveBeenCalled()
    expect(spy).toHaveBeenCalledWith(100)
  })

  it('labelProps', () => {
    render(<FieldWithHooks labelProps={{ className: 'className' }} />)
    const labelWrapTestId = screen.getByTestId('LabelWrap')

    expect(labelWrapTestId).toHaveClass('className')
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
