import '@testing-library/jest-dom'

import { zodResolver } from '@hookform/resolvers/zod'
import { startOfDay } from 'date-fns'
import { axe, toHaveNoViolations } from 'jest-axe'
import { act } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { fireEvent, render, screen, waitFor } from '../../../../../../.jest/customRender'
import { Form } from '../../forms/Form'
import { DatePickerField } from '.'
import { defaultTestDate } from './DatePicker/DatePicker.test'

expect.extend(toHaveNoViolations)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FieldWithHooks = (props: any) => {
  const formSchema = z.object({
    fieldTest: z.coerce.date(),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { fieldTest: props.value || undefined },
  })
  return (
    <Form name="testForm" form={form} onSubmit={() => {}}>
      <DatePickerField
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

describe('DatePickerField', () => {
  describe('Semantics', () => {
    it('renders DatePicker with Label', () => {
      render(<FieldWithHooks />)

      expect(screen.getByTestId('DatePicker')).toBeInTheDocument()
      expect(screen.getByRole('combobox')).toBeInTheDocument()
    })

    it('forwards className', () => {
      render(<FieldWithHooks />)
      const combobox = screen.getByRole('combobox')

      expect(combobox).toHaveClass('className')
    })

    it('id and name from name prop', () => {
      render(<FieldWithHooks />)
      const combobox = screen.getByRole('combobox')

      expect(combobox).toHaveAttribute('id', 'fieldTest')
      expect(combobox).toHaveAttribute('name', 'fieldTest')
      expect(combobox).toHaveAttribute('type', 'button')
    })

    it('placeholder', () => {
      render(<FieldWithHooks />)
      const combobox = screen.getByRole('combobox')

      expect(combobox).toHaveTextContent('placeholder')
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
      const combobox = screen.getByRole('combobox')

      expect(combobox).toHaveAttribute('aria-invalid', 'false')
    })

    it('no aria-describedby when no error or description', () => {
      render(<FieldWithHooks />)
      const combobox = screen.getByRole('combobox')

      expect(combobox).not.toHaveAttribute('aria-describedby')
    })

    it('displays formatted value', () => {
      render(<FieldWithHooks value={defaultTestDate} />)
      const combobox = screen.getByRole('combobox')

      expect(combobox).toHaveTextContent('3/4/2023')
    })

    it('description in aria-describedby', () => {
      render(<FieldWithHooks labelProps={{ description: 'description' }} />)
      const combobox = screen.getByRole('combobox')
      const alert = screen.getByTestId('Alert')

      expect(alert).toHaveTextContent('description')
      expect(combobox).toHaveAttribute('aria-describedby', 'fieldTest-description')
    })

    it('labelProps forwarded', () => {
      render(<FieldWithHooks labelProps={{ className: 'className' }} />)

      expect(screen.getByTestId('LabelWrap')).toHaveClass('className')
    })
  })

  describe('Interaction', () => {
    it('onChange fires on date selection', async () => {
      const onChange = jest.fn()
      render(<FieldWithHooks value={defaultTestDate} onChange={onChange} />)
      const combobox = screen.getByRole('combobox')

      await act(async () => {
        fireEvent.click(combobox)
      })

      await act(async () => {
        fireEvent.click(screen.getAllByRole('gridcell')[8])
      })

      expect(onChange).toHaveBeenCalled()
      expect(onChange).toHaveBeenCalledWith(startOfDay(new Date('2023-03-07')))
    })

    it('error shown on invalid submit', async () => {
      render(<FieldWithHooks />)
      const combobox = screen.getByRole('combobox')
      const alert = screen.getByTestId('Alert')

      await act(async () => {
        fireEvent.change(combobox, { target: { value: '' } })
      })

      await act(async () => {
        fireEvent.submit(screen.getByTestId('submitButton'))
      })

      await waitFor(() => {
        expect(alert).toHaveTextContent('Invalid date')
        expect(alert).toHaveAttribute('role', 'alert')
        expect(combobox).toHaveAttribute('aria-describedby', 'fieldTest-description')
        expect(combobox).toHaveAttribute('aria-invalid', 'true')
      })
    })

    it('form submit works', async () => {
      const onSubmit = jest.fn()
      render(<FieldWithHooks />)
      screen.getByTestId('Form').onsubmit = onSubmit

      await act(async () => {
        fireEvent.click(screen.getByTestId('submitButton'))
      })

      // TODO beenCalledWith, spy return native event and not values
      expect(onSubmit).toHaveBeenCalled()
    })
  })

  describe('Accessibility', () => {
    it('no axe violations', async () => {
      const { container } = render(<FieldWithHooks title="title" />)

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
