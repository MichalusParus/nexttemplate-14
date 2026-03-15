import '@testing-library/jest-dom'

window.HTMLElement.prototype.scrollIntoView = jest.fn()

import { zodResolver } from '@hookform/resolvers/zod'
import { startOfDay } from 'date-fns'
import { axe, toHaveNoViolations } from 'jest-axe'
import { act } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { fireEvent, render, screen, waitFor } from '../../../../../../.jest/customRender'
import { Form } from '../../forms/Form'
import { defaultTestDate } from '../DatePickerField/DatePicker/DatePicker.test'
import { MultiDatePickerField } from '.'

expect.extend(toHaveNoViolations)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FieldWithHooks = (props: any) => {
  const formSchema = z.object({
    fieldTest: z.array(z.coerce.date()).min(1),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { fieldTest: props.value || undefined },
  })
  return (
    <Form name="testForm" form={form} onSubmit={() => {}}>
      <MultiDatePickerField
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

describe('MultiDatePickerField', () => {
  it('default', () => {
    render(<FieldWithHooks />)
    const fieldWrapTestId = screen.getByTestId('DatePicker')
    const comboboxRole = screen.getByRole('combobox')
    const labelTestId = screen.getByTestId('Label')
    const alertTestId = screen.getByTestId('Alert')
    const alertQuery = screen.queryByRole('alert')

    expect(fieldWrapTestId).toBeInTheDocument()
    expect(comboboxRole).toBeInTheDocument()
    expect(comboboxRole).toHaveClass('className')
    expect(comboboxRole).toHaveAttribute('id', 'fieldTest')
    expect(comboboxRole).toHaveAttribute('name', 'fieldTest')
    expect(comboboxRole).toHaveAttribute('type', 'button')
    expect(comboboxRole).toHaveTextContent('placeholder')
    expect(comboboxRole).toHaveAttribute('aria-invalid', 'false')
    expect(comboboxRole).not.toHaveAttribute('aria-describedby')
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
    render(<FieldWithHooks value={[defaultTestDate, new Date('2023-03-05')]} />)
    const comboboxRole = screen.getByRole('combobox')

    expect(comboboxRole).toHaveTextContent('4.3.2023, 5.3.2023')
  })

  it('description', () => {
    render(<FieldWithHooks labelProps={{ description: 'description' }} />)
    const comboboxRole = screen.getByRole('combobox')
    const alertTestId = screen.getByTestId('Alert')

    expect(alertTestId).toBeInTheDocument()
    expect(alertTestId).toHaveTextContent('description')
    expect(comboboxRole).toHaveAttribute('aria-describedby', 'fieldTest-description')
  })

  it('error', async () => {
    render(<FieldWithHooks />)
    const comboboxRole = screen.getByRole('combobox')
    const alertRole = screen.getByTestId('Alert')

    await act(async () => {
      fireEvent.change(comboboxRole, {
        target: {
          value: '',
        },
      })
    })

    await act(async () => {
      fireEvent.submit(screen.getByTestId('submitButton'))
    })

    await waitFor(() => {
      expect(alertRole).toBeInTheDocument()
      expect(alertRole).toHaveTextContent('Required')
      expect(alertRole).toHaveAttribute('role', 'alert')
      expect(comboboxRole).toHaveAttribute('aria-describedby', 'fieldTest-description')
      expect(comboboxRole).toHaveAttribute('aria-invalid', 'true')
    })
  })

  it('onChange', async () => {
    const spy = jest.fn()
    render(<FieldWithHooks value={[startOfDay(defaultTestDate)]} onChange={spy} />)
    const comboboxRole = screen.getByRole('combobox')

    await act(async () => {
      fireEvent.click(comboboxRole)
    })

    const cellTestId = screen.getAllByRole('gridcell')

    await act(async () => {
      fireEvent.click(cellTestId[7])
    })

    expect(spy).toHaveBeenCalled()
    expect(spy).toHaveBeenCalledWith([
      startOfDay(defaultTestDate),
      startOfDay(new Date('2023-03-06')),
    ])
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
    const { container } = render(<FieldWithHooks title="title" />)

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
