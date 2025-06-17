import '@testing-library/jest-dom'

import { zodResolver } from '@hookform/resolvers/zod'
import { axe, toHaveNoViolations } from 'jest-axe'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { fireEvent, render, screen, waitFor } from '../../../../../../.jest/customRender'
import { getOptions } from '../../../../../../.storybook/helpers'
import { Form } from '../../Form'
import { MultiAutocompleteField } from './MultiAutocompleteField'

expect.extend(toHaveNoViolations)

const options = getOptions('fieldTest', 5)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FieldWithHooks = (props: any) => {
  const formSchema = z.object({
    fieldTest: z.array(z.string()).min(1, 'Required'),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { fieldTest: props.value || [] },
  })
  return (
    <Form name="testForm" form={form} onSubmit={() => {}}>
      <MultiAutocompleteField
        className="className"
        name="fieldTest"
        label="label"
        placeholder="placeholder"
        options={options}
        {...props}
      />
      <button form="testForm" type="submit" data-testid="submitButton">
        Submit
      </button>
    </Form>
  )
}

describe('MultiSelectField', () => {
  it('default', () => {
    render(<FieldWithHooks />)
    const fieldWrapTestId = screen.getByTestId('Autocomplete')
    const comboboxRole = screen.getByRole('combobox')
    const textboxRole = screen.getByRole('textbox')
    const labelTestId = screen.getByTestId('Label')
    const alertTestId = screen.getByTestId('Alert')
    const alertQuery = screen.queryByRole('alert')

    expect(fieldWrapTestId).toBeInTheDocument()
    expect(comboboxRole).toBeInTheDocument()
    expect(comboboxRole).toHaveClass('className')
    expect(comboboxRole).toHaveAttribute('id', 'fieldTest-combobox')
    expect(comboboxRole).toHaveAttribute('aria-invalid', 'false')
    expect(comboboxRole).not.toHaveAttribute('aria-describedby')
    expect(textboxRole).toHaveAttribute('id', 'fieldTest')
    expect(textboxRole).toHaveAttribute('placeholder', 'placeholder')
    expect(labelTestId).toBeInTheDocument()
    expect(labelTestId).toHaveTextContent('label')
    expect(labelTestId).toHaveAttribute('for', 'fieldTest')
    expect(labelTestId).toHaveAttribute('id', 'fieldTest-label')
    expect(alertTestId).toBeInTheDocument()
    expect(alertTestId).toHaveTextContent('')
    expect(alertTestId).toHaveAttribute('id', 'fieldTest-description')
    expect(alertQuery).toBeNull()
  })

  it('value', async () => {
    render(<FieldWithHooks value={[options[0].value]} />)
    const comboboxRole = screen.getByRole('combobox')

    expect(comboboxRole).toHaveTextContent(options[0].label)
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
    const textboxRole = screen.getByRole('textbox')
    const alertRole = screen.getByTestId('Alert')

    fireEvent.change(textboxRole, {
      target: {
        value: '',
      },
    })
    fireEvent.submit(screen.getByTestId('submitButton'))

    await waitFor(() => {
      expect(alertRole).toBeInTheDocument()
      expect(alertRole).toHaveTextContent('Required')
      expect(alertRole).toHaveAttribute('role', 'alert')
      expect(comboboxRole).toHaveAttribute('aria-describedby', 'fieldTest-description')
      expect(comboboxRole).toHaveAttribute('aria-invalid', 'true')
    })
  })

  it('onChange', () => {
    const spy = jest.fn()
    render(<FieldWithHooks onChange={spy} />)
    const comboboxRole = screen.getByRole('combobox')

    fireEvent.click(comboboxRole)
    const optionRoles = screen.getAllByRole('option')

    fireEvent.click(optionRoles[1])

    expect(spy).toHaveBeenCalled()
    expect(spy).toHaveBeenCalledWith([options[1].value])
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
    const { container } = render(<FieldWithHooks title="title" />)

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
