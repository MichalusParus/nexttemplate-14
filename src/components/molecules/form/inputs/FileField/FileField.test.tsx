import '@testing-library/jest-dom'

import { zodResolver } from '@hookform/resolvers/zod'
import { axe, toHaveNoViolations } from 'jest-axe'
import { act } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

import {
  createEvent,
  fireEvent,
  render,
  screen,
  waitFor,
} from '../../../../../../.jest/customRender'
import { Form } from '../../Form'
import { FileField } from '.'
import { createMockFile } from './FileInput/FileInput.test'

expect.extend(toHaveNoViolations)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FieldWithHooks = (props: any) => {
  const file = createMockFile()
  const defaultvalue = props?.noDefault ? [] : [file]
  const formSchema = z.object({
    fieldTest: z.array(z.instanceof(File)).min(1, 'min 1 file'),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { fieldTest: defaultvalue },
  })
  return (
    <Form name="testForm" form={form} onSubmit={() => {}}>
      <FileField className="className" name="fieldTest" label="Label" {...props} />
      <button form="testForm" type="submit" data-testid="submitButton">
        Submit
      </button>
    </Form>
  )
}

describe('FileField', () => {
  it('default', () => {
    render(<FieldWithHooks />)
    const fieldWrapTestId = screen.getByTestId('InputWrap')
    const inputTestId = screen.getByTestId('FileInput')
    const fileDetailTestId = screen.queryAllByTestId('FileDetail')
    const labelTestId = screen.getByTestId('Label')
    const alertTestId = screen.getByTestId('Alert')
    const alertQuery = screen.queryByRole('alert')

    expect(fieldWrapTestId).toBeInTheDocument()
    expect(fieldWrapTestId).toHaveClass('className')
    expect(inputTestId).toHaveAttribute('id', 'fieldTest')
    expect(inputTestId).toHaveAttribute('name', 'fieldTest')
    expect(inputTestId).toHaveAttribute('type', 'file')
    expect(fileDetailTestId).toHaveLength(1)
    expect(inputTestId).toHaveAttribute('aria-invalid', 'false')
    expect(inputTestId).not.toHaveAttribute('aria-describedby')
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
    render(<FieldWithHooks />)
    const inputTestId = screen.getByTestId('FileInput')
    const file = createMockFile()

    fireEvent.change(inputTestId, {
      target: {
        files: [file],
      },
    })
    const fileDetailTestId = screen.queryAllByTestId('FileDetail')

    waitFor(() => {
      expect(fileDetailTestId).toHaveLength(1)
    })
  })

  it('description', () => {
    render(<FieldWithHooks labelProps={{ description: 'description' }} />)
    const inputTestId = screen.getByTestId('FileInput')
    const alertTestId = screen.getByTestId('Alert')

    expect(alertTestId).toBeInTheDocument()
    expect(alertTestId).toHaveTextContent('description')
    expect(inputTestId).toHaveAttribute('aria-describedby', 'fieldTest-description')
  })

  it('error', async () => {
    render(<FieldWithHooks noDefault />)
    const inputTestId = screen.getByTestId('FileInput')

    fireEvent.submit(screen.getByTestId('submitButton'))
    const alertRole = screen.getByTestId('Alert')

    await waitFor(() => {
      expect(alertRole).toBeInTheDocument()
      expect(alertRole).toHaveTextContent('min 1 file')
      expect(alertRole).toHaveAttribute('role', 'alert')
      expect(inputTestId).toHaveAttribute('aria-describedby', 'fieldTest-description')
      expect(inputTestId).toHaveAttribute('aria-invalid', 'true')
    })
  })

  it('onDrop', async () => {
    const spy = jest.fn(async (file: File) => file)
    render(<FieldWithHooks onDrop={spy} />)
    const inputWrapTestId = screen.getByTestId('InputWrap')
    const file = createMockFile('test.pdf', 'application/pdf')

    await act(async () => {
      const event = createEvent.drop(inputWrapTestId)
      Object.defineProperty(event, 'dataTransfer', {
        value: {
          files: [file],
          types: ['Files'],
        },
      })
      fireEvent(inputWrapTestId, event)
    })

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(file)
  })

  it('onDelete', () => {
    const spy = jest.fn()
    const file = createMockFile()
    render(<FieldWithHooks onDelete={spy} />)
    const fileDeleteButtonTestId = screen.getByTestId('DeleteButton')

    fireEvent.click(fileDeleteButtonTestId)

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(file)
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
