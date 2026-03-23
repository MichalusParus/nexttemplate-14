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
import { Form } from '../../forms/Form'
import { FileField } from '.'
import { createMockFile } from './FileInput/FileInput.test'

expect.extend(toHaveNoViolations)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FieldWithHooks = (props: any) => {
  const file = createMockFile()
  const { noDefault, ...rest } = props
  const defaultvalue = noDefault ? [] : [file]
  const formSchema = z.object({
    fieldTest: z.array(z.instanceof(File)).min(1, 'min 1 file'),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { fieldTest: defaultvalue },
  })
  return (
    <Form name="testForm" form={form} onSubmit={() => {}}>
      <FileField className="className" name="fieldTest" label="Label" {...rest} />
      <button form="testForm" type="submit" data-testid="submitButton">
        Submit
      </button>
    </Form>
  )
}

describe('FileField', () => {
  describe('Semantics', () => {
    it('renders FileInput with Label', () => {
      render(<FieldWithHooks />)

      expect(screen.getByTestId('InputWrap')).toBeInTheDocument()
      expect(screen.getByTestId('FileInput')).toBeInTheDocument()
    })

    it('forwards className', () => {
      render(<FieldWithHooks />)

      expect(screen.getByTestId('InputWrap')).toHaveClass('className')
    })

    it('id and name from name prop', () => {
      render(<FieldWithHooks />)
      const input = screen.getByTestId('FileInput')

      expect(input).toHaveAttribute('id', 'fieldTest')
      expect(input).toHaveAttribute('name', 'fieldTest')
      expect(input).toHaveAttribute('type', 'file')
    })

    it('displays file detail', () => {
      render(<FieldWithHooks />)

      expect(screen.queryAllByTestId('FileDetail')).toHaveLength(1)
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

      expect(screen.getByTestId('FileInput')).toHaveAttribute('aria-invalid', 'false')
    })

    it('no aria-describedby when no error or description', () => {
      render(<FieldWithHooks />)

      expect(screen.getByTestId('FileInput')).not.toHaveAttribute('aria-describedby')
    })

    it('description in aria-describedby', () => {
      render(<FieldWithHooks labelProps={{ description: 'description' }} />)
      const input = screen.getByTestId('FileInput')
      const alert = screen.getByTestId('Alert')

      expect(alert).toHaveTextContent('description')
      expect(input).toHaveAttribute('aria-describedby', 'fieldTest-description')
    })

    it('labelProps forwarded', () => {
      render(<FieldWithHooks labelProps={{ className: 'className' }} />)

      expect(screen.getByTestId('LabelWrap')).toHaveClass('className')
    })
  })

  describe('Interaction', () => {
    it('default value renders FileDetail', () => {
      render(<FieldWithHooks />)

      expect(screen.queryAllByTestId('FileDetail')).toHaveLength(1)
    })

    it('onDrop fires with file', async () => {
      const onDrop = jest.fn(async (file: File) => file)
      render(<FieldWithHooks onDrop={onDrop} />)
      const inputWrap = screen.getByTestId('InputWrap')
      const file = createMockFile('test.pdf', 'application/pdf')

      await act(async () => {
        Object.defineProperty(HTMLElement.prototype, 'clientHeight', {
          configurable: true,
          value: 100,
        })
        Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
          configurable: true,
          value: 200,
        })
      })

      await act(async () => {
        const event = createEvent.drop(inputWrap)
        Object.defineProperty(event, 'dataTransfer', {
          value: {
            files: [file],
            types: ['Files'],
          },
        })
        fireEvent(inputWrap, event)
      })

      expect(onDrop).toHaveBeenCalledTimes(1)
      expect(onDrop).toHaveBeenCalledWith(file, expect.any(Function))
    })

    it('onDelete fires with file', async () => {
      const onDelete = jest.fn()
      const file = createMockFile()
      render(<FieldWithHooks onDelete={onDelete} />)

      await act(async () => {
        Object.defineProperty(HTMLElement.prototype, 'clientHeight', {
          configurable: true,
          value: 100,
        })
        Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
          configurable: true,
          value: 200,
        })
        fireEvent.click(screen.getByTestId('DeleteButton'))
      })

      expect(onDelete).toHaveBeenCalledTimes(1)
      expect(onDelete).toHaveBeenCalledWith(file)
    })

    it('error shown on invalid submit', async () => {
      render(<FieldWithHooks noDefault />)
      const input = screen.getByTestId('FileInput')

      await act(async () => {
        fireEvent.submit(screen.getByTestId('submitButton'))
      })

      const alert = screen.getByTestId('Alert')

      await waitFor(() => {
        expect(alert).toHaveTextContent('min 1 file')
        expect(alert).toHaveAttribute('role', 'alert')
        expect(input).toHaveAttribute('aria-describedby', 'fieldTest-description')
        expect(input).toHaveAttribute('aria-invalid', 'true')
      })
    })

    it('form submit works', async () => {
      const onSubmit = jest.fn()
      render(<FieldWithHooks />)
      screen.getByTestId('Form').onsubmit = onSubmit

      await act(async () => {
        Object.defineProperty(HTMLElement.prototype, 'clientHeight', {
          configurable: true,
          value: 100,
        })
        Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
          configurable: true,
          value: 200,
        })
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
