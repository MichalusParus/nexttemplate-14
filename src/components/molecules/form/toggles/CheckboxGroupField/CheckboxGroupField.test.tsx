import '@testing-library/jest-dom'

import { zodResolver } from '@hookform/resolvers/zod'
import { axe, toHaveNoViolations } from 'jest-axe'
import { act } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { fireEvent, render, screen, waitFor } from '../../../../../../.jest/customRender'
import { getOptions } from '../../../../../../.storybook/helpers'
import { Form } from '../../forms/Form'
import { CheckboxGroupField } from '.'

expect.extend(toHaveNoViolations)

const options = getOptions('fieldTest', 5)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FieldWithHooks = (props: any) => {
  const formSchema = z.object({
    fieldTest: z.array(z.string()).min(3, 'min 3 checks'),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { fieldTest: [options[0].value] },
  })
  return (
    <Form name="testForm" form={form} onSubmit={() => {}}>
      <CheckboxGroupField
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

describe('CheckboxGroupField', () => {
  describe('Semantics', () => {
    it('renders CheckboxGroup with Label', () => {
      render(<FieldWithHooks />)

      expect(screen.getByRole('group')).toBeInTheDocument()
      expect(screen.getAllByRole('checkbox')).toHaveLength(5)
    })

    it('forwards className', () => {
      render(<FieldWithHooks />)

      expect(screen.getByRole('group')).toHaveClass('className')
    })

    it('id from name prop', () => {
      render(<FieldWithHooks />)

      expect(screen.getByRole('group')).toHaveAttribute('id', 'fieldTest')
    })

    it('legend renders as label', () => {
      render(<FieldWithHooks />)
      const fakeLabel = screen.getByTestId('FakeLabel')

      expect(fakeLabel).toHaveTextContent('Label')
      expect(fakeLabel.tagName).toBe('LEGEND')
    })

    it('checkbox attributes', () => {
      render(<FieldWithHooks />)
      const checkboxes = screen.getAllByRole('checkbox')
      const labels = screen.getAllByTestId('Label')

      expect(checkboxes[0]).toHaveAttribute('id', 'fieldTest-0')
      expect(checkboxes[0]).toHaveAttribute('name', 'fieldTest-0')
      expect(checkboxes[0]).toHaveAttribute('type', 'checkbox')
      expect(checkboxes[0]).toHaveAttribute('value', '0')
      expect(checkboxes[0]).not.toHaveAttribute('aria-describedby')
      expect(labels[0]).toHaveTextContent(options[0].label)
      expect(labels[0]).toHaveAttribute('for', 'fieldTest-0')
      expect(labels[0]).toHaveAttribute('id', 'fieldTest-0-label')
    })

    it('aria-labelledby points to label', () => {
      render(<FieldWithHooks />)

      expect(screen.getByRole('group')).toHaveAttribute('aria-labelledby', 'fieldTest-label')
    })

    it('aria-invalid false when no error', () => {
      render(<FieldWithHooks />)

      expect(screen.getByRole('group')).toHaveAttribute('aria-invalid', 'false')
    })

    it('description', () => {
      render(<FieldWithHooks labelProps={{ description: 'description' }} />)
      const alert = screen.getByTestId('Alert')

      expect(alert).toHaveTextContent('description')
    })

    it('labelProps forwarded', () => {
      render(<FieldWithHooks labelProps={{ className: 'className' }} />)

      expect(screen.getByTestId('LabelWrap')).toHaveClass('className')
    })
  })

  describe('Interaction', () => {
    it('value change on click', async () => {
      render(<FieldWithHooks />)
      const checkboxes = screen.getAllByRole('checkbox')

      expect(checkboxes[0]).toHaveAttribute('value', '0')

      await act(async () => {
        fireEvent.click(checkboxes[0])
      })

      expect(checkboxes[0]).toHaveAttribute('value', '0')
    })

    it('onChange fires with value', async () => {
      const onChange = jest.fn()
      render(<FieldWithHooks onChange={onChange} />)

      await act(async () => {
        fireEvent.click(screen.getAllByRole('checkbox')[1])
      })

      expect(onChange).toHaveBeenCalledWith([options[0].value, options[1].value])
    })

    it('error shown on invalid submit', async () => {
      render(<FieldWithHooks />)
      const group = screen.getByRole('group')
      const alert = screen.getByTestId('Alert')

      await act(async () => {
        fireEvent.submit(screen.getByTestId('submitButton'))
      })

      await waitFor(() => {
        expect(alert).toHaveTextContent('min 3 checks')
        expect(alert).toHaveAttribute('role', 'alert')
        expect(group).toHaveAttribute('aria-describedby', 'fieldTest-description')
        expect(group).toHaveAttribute('aria-invalid', 'true')
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
      const { container } = render(<FieldWithHooks />)

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
