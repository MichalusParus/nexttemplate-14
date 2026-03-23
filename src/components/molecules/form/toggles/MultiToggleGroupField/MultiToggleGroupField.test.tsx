import '@testing-library/jest-dom'

import { zodResolver } from '@hookform/resolvers/zod'
import { axe, toHaveNoViolations } from 'jest-axe'
import { act } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { fireEvent, render, screen, waitFor, within } from '../../../../../../.jest/customRender'
import { getOptions } from '../../../../../../.storybook/helpers'
import { Form } from '../../forms/Form'
import { MultiToggleGroupField } from './MultiToggleGroupField'

expect.extend(toHaveNoViolations)

const options = getOptions('fieldTest', 5)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FieldWithHooks = (props: any) => {
  const formSchema = z.object({
    fieldTest: z.array(z.string()).min(3, 'select one'),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { fieldTest: [] },
  })
  return (
    <Form name="testForm" form={form} onSubmit={() => {}}>
      <MultiToggleGroupField
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

describe('MultiToggleGroupField', () => {
  describe('Semantics', () => {
    it('renders MultiToggleGroup with Label', () => {
      render(<FieldWithHooks />)
      const group = screen.getByRole('group')

      expect(group).toBeInTheDocument()
      expect(within(group).getAllByRole('button')).toHaveLength(5)
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

    it('button attributes', () => {
      render(<FieldWithHooks />)
      const buttons = within(screen.getByRole('group')).getAllByRole('button')

      expect(buttons[0]).toHaveTextContent(options[0].label)
      expect(buttons[0]).not.toHaveAttribute('aria-describedby')
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
      const buttons = within(screen.getByRole('group')).getAllByRole('button')

      expect(buttons[0]).not.toHaveClass('selected')

      await act(async () => {
        fireEvent.click(buttons[0])
      })

      expect(buttons[0]).toHaveClass('selected')
    })

    it('onChange fires with value', async () => {
      const onChange = jest.fn()
      render(<FieldWithHooks onChange={onChange} />)

      await act(async () => {
        fireEvent.click(within(screen.getByRole('group')).getAllByRole('button')[1])
      })

      expect(onChange).toHaveBeenCalledWith([options[1].value])
    })

    it('error shown on invalid submit', async () => {
      render(<FieldWithHooks />)
      const group = screen.getByRole('group')
      const alert = screen.getByTestId('Alert')

      await act(async () => {
        fireEvent.submit(screen.getByTestId('submitButton'))
      })

      await waitFor(() => {
        expect(alert).toHaveTextContent('select one')
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
