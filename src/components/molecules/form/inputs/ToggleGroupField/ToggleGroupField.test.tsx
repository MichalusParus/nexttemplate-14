import '@testing-library/jest-dom'

import { zodResolver } from '@hookform/resolvers/zod'
import { axe, toHaveNoViolations } from 'jest-axe'
import { act } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { fireEvent, render, screen, waitFor } from '../../../../../../.jest/customRender'
import { getOptions } from '../../../../../../.storybook/helpers'
import { Form } from '../../forms/Form'
import { ToggleGroupField } from '.'

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
      <ToggleGroupField
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

describe('ToggleGroupField', () => {
  it('default', () => {
    render(<FieldWithHooks />)
    const toggleGroupRole = screen.getByRole('group')
    const buttonRoles = screen.getAllByRole('button')
    const fakeLabelTestId = screen.getByTestId('FakeLabel')

    expect(toggleGroupRole).toBeInTheDocument()
    expect(toggleGroupRole).toHaveClass('className')
    expect(toggleGroupRole).toHaveAttribute('id', 'fieldTest')
    expect(toggleGroupRole).toHaveAttribute('aria-invalid', 'false')
    expect(fakeLabelTestId).toBeInTheDocument()
    expect(fakeLabelTestId).toHaveTextContent('Label')
    expect(fakeLabelTestId.tagName).toBe('LEGEND')
    expect(buttonRoles[0]).toHaveTextContent(options[0].label)
    expect(buttonRoles[0]).not.toHaveAttribute('aria-describedby')
  })

  it('error', async () => {
    render(<FieldWithHooks />)
    const toggleGroupRole = screen.getByRole('group')
    const alertRole = screen.getByTestId('Alert')

    await act(async () => {
      fireEvent.submit(screen.getByTestId('submitButton'))
    })

    await waitFor(() => {
      expect(alertRole).toBeInTheDocument()
      expect(alertRole).toHaveTextContent('select one')
      expect(alertRole).toHaveAttribute('role', 'alert')
      expect(toggleGroupRole).toHaveAttribute('aria-describedby', 'fieldTest-description')
      expect(toggleGroupRole).toHaveAttribute('aria-invalid', 'true')
    })
  })

  it('value', async () => {
    render(<FieldWithHooks />)
    const buttonRoles = screen.getAllByRole('button')

    expect(buttonRoles[0]).not.toHaveClass('selected')

    await act(async () => {
      fireEvent.click(buttonRoles[0])
    })

    expect(buttonRoles[0]).toHaveClass('selected')
  })

  it('description', () => {
    render(<FieldWithHooks labelProps={{ description: 'description' }} />)
    const alertTestId = screen.getByTestId('Alert')

    expect(alertTestId).toBeInTheDocument()
    expect(alertTestId).toHaveTextContent('description')
  })

  it('onChange', async () => {
    const spy = jest.fn()
    render(<FieldWithHooks onChange={spy} />)
    const buttonRoles = screen.getAllByRole('button')

    await act(async () => {
      fireEvent.click(buttonRoles[1])
    })

    expect(spy).toHaveBeenCalled()
    expect(spy).toHaveBeenCalledWith(options[1].value)
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
