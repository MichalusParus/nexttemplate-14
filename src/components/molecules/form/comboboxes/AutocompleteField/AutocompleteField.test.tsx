import '@testing-library/jest-dom'

import { zodResolver } from '@hookform/resolvers/zod'
import { axe, toHaveNoViolations } from 'jest-axe'
import { act } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { fireEvent, render, screen, waitFor } from '../../../../../../.jest/customRender'
import { getOptions } from '../../../../../../.storybook/helpers'
import { Form } from '../../forms/Form'
import { AutocompleteField } from './AutocompleteField'

expect.extend(toHaveNoViolations)

const options = getOptions('fieldTest', 5)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FieldWithHooks = (props: any) => {
  const formSchema = z.object({
    fieldTest: z.string(),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { fieldTest: props.value || undefined },
  })
  return (
    <Form name="testForm" form={form} onSubmit={() => {}}>
      <AutocompleteField
        className="className"
        name="fieldTest"
        label="label"
        placeholder="placeholder"
        options={options}
        onInputChange={() => {}}
        {...props}
      />
      <button form="testForm" type="submit" data-testid="submitButton">
        Submit
      </button>
    </Form>
  )
}

describe('AutocompleteField', () => {
  describe('Semantics', () => {
    it('renders Autocomplete with Label', () => {
      render(<FieldWithHooks />)

      expect(screen.getByTestId('Autocomplete')).toBeInTheDocument()
      expect(screen.getByRole('combobox')).toBeInTheDocument()
    })

    it('forwards className', () => {
      render(<FieldWithHooks />)

      expect(screen.getByTestId('Autocomplete')).toHaveClass('className')
    })

    it('id and name from name prop', () => {
      render(<FieldWithHooks />)

      expect(screen.getByRole('combobox')).toHaveAttribute('id', 'fieldTest-combobox')
      expect(screen.getByRole('textbox')).toHaveAttribute('id', 'fieldTest')
    })

    it('placeholder', () => {
      render(<FieldWithHooks />)

      expect(screen.getByRole('textbox')).toHaveAttribute('placeholder', 'placeholder')
    })

    it('displays selected value', () => {
      render(<FieldWithHooks value={options[0].value} />)

      expect(screen.getByRole('textbox')).toHaveValue(options[0].label)
    })

    it('label text with for attribute', () => {
      render(<FieldWithHooks />)
      const label = screen.getByTestId('Label')

      expect(label).toBeInTheDocument()
      expect(label).toHaveTextContent('label')
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

      expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'false')
    })

    it('no aria-describedby when no error or description', () => {
      render(<FieldWithHooks />)

      expect(screen.getByRole('combobox')).not.toHaveAttribute('aria-describedby')
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
    it('onChange fires on selection', async () => {
      const onChange = jest.fn()
      render(<FieldWithHooks onChange={onChange} />)

      await act(async () => {
        fireEvent.click(screen.getByRole('combobox'))
      })

      await act(async () => {
        fireEvent.click(screen.getAllByRole('option')[1])
      })

      expect(onChange).toHaveBeenCalledWith(options[1].value)
    })

    it('error shown on invalid submit', async () => {
      render(<FieldWithHooks />)
      const combobox = screen.getByRole('combobox')
      const alert = screen.getByTestId('Alert')

      await act(async () => {
        fireEvent.change(screen.getByRole('textbox'), { target: { value: '' } })
      })

      await act(async () => {
        fireEvent.submit(screen.getByTestId('submitButton'))
      })

      await waitFor(() => {
        expect(alert).toHaveTextContent('Required')
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

      expect(onSubmit).toHaveBeenCalled()
    })
  })

  describe('Accessibility', () => {
    it('no axe violations', async () => {
      const { container } = render(<FieldWithHooks value={options[0].value} title="title" />)

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
