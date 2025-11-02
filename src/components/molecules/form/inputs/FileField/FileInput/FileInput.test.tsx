import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { act, createRef } from 'react'

import { ToastProvider } from '@/components/molecules/popovers/ToastProvider'

import {
  createEvent,
  fireEvent,
  render,
  screen,
  waitFor,
} from '../../../../../../../.jest/customRender'
import { FileInput } from '.'

expect.extend(toHaveNoViolations)

export const createMockFile = (
  name: string = 'mockFile.txt',
  fileType: string = 'text/plain',
  content: string = 'Hello, World!',
): File => {
  const blob = new Blob([content], { type: fileType })
  return new File([blob], name, { type: fileType })
}

const asyncMockFn = () => Promise.resolve(createMockFile())

describe('FileInput', () => {
  it('default', () => {
    render(
      <FileInput
        className="className"
        name="inputTest"
        onDrop={asyncMockFn}
        onDelete={async () => {}}
      />,
    )
    const inputWrapTestId = screen.getByTestId('InputWrap')
    const inputTestId = screen.getByTestId('FileInput')

    expect(inputWrapTestId).toBeInTheDocument()
    expect(inputWrapTestId).toHaveClass('className')
    expect(inputTestId).toHaveAttribute('type', 'file')
    expect(inputTestId).toHaveAttribute('id', 'inputTest')
    expect(inputTestId).toHaveAttribute('name', 'inputTest')
    inputTestId.focus()
    expect(document.activeElement).toBe(inputTestId)
  })

  it('value', () => {
    const file = createMockFile()

    render(
      <FileInput name="inputTest" value={[file]} onDrop={asyncMockFn} onDelete={async () => {}} />,
    )
    const fileDetails = screen.queryAllByTestId('FileDetail')
    const deleteButtonTestId = screen.getByTestId('DeleteButton')

    expect(fileDetails).toHaveLength(1)
    expect(fileDetails[0]).toHaveTextContent(file.name)
    expect(deleteButtonTestId).toBeInTheDocument()
  })

  it('maxFileCount', async () => {
    const spy = jest.fn()
    const files = Array.from({ length: 5 }, (_, i) =>
      createMockFile(`test${i}.pdf`, 'application/pdf'),
    )

    render(
      <ToastProvider>
        <FileInput name="inputTest" maxFileCount={2} onDrop={spy} onDelete={async () => {}} />
      </ToastProvider>,
    )
    const inputWrapTestId = screen.getByTestId('InputWrap')

    await act(async () => {
      const event = createEvent.drop(inputWrapTestId)
      Object.defineProperty(event, 'dataTransfer', {
        value: {
          files: files,
          types: ['Files'],
        },
      })
      fireEvent(inputWrapTestId, event)
    })

    const toastTestId = screen.getByTestId('Toast')

    expect(spy).toHaveBeenCalledTimes(0)
    expect(toastTestId).toBeInTheDocument()
    expect(toastTestId).toHaveRole('alert')
  })

  it('maxFileSize', async () => {
    const spy = jest.fn()
    const file = createMockFile('test.pdf', 'application/pdf')

    render(
      <ToastProvider>
        <FileInput name="inputTest" maxFileSize={1} onDrop={spy} onDelete={async () => {}} />
      </ToastProvider>,
    )
    const inputWrapTestId = screen.getByTestId('InputWrap')

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

    const toastTestId = screen.getByTestId('Toast')

    expect(spy).toHaveBeenCalledTimes(0)
    expect(toastTestId).toBeInTheDocument()
    expect(toastTestId).toHaveRole('alert')
  })

  it('sameFileName', async () => {
    const spy = jest.fn()
    const file = createMockFile('test.pdf', 'application/pdf')

    render(
      <ToastProvider>
        <FileInput name="inputTest" value={[file]} onDrop={spy} onDelete={async () => {}} />
      </ToastProvider>,
    )
    const inputWrapTestId = screen.getByTestId('InputWrap')

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

    const toastTestId = screen.getByTestId('Toast')

    expect(spy).toHaveBeenCalledTimes(0)
    expect(toastTestId).toBeInTheDocument()
    expect(toastTestId).toHaveRole('alert')
  })

  it('error', () => {
    render(
      <FileInput name="inputTest" error="error" onDrop={asyncMockFn} onDelete={async () => {}} />,
    )
    const inputWrapTestId = screen.getByTestId('InputWrap')

    expect(inputWrapTestId).toHaveClass('error')
  })

  it('onDrop', async () => {
    const spy = jest.fn(async (file: File) => file)
    render(<FileInput name="inputTest" onDrop={spy} onDelete={async () => {}} />)
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

  it('onDelete', async () => {
    const spy = jest.fn()
    const file = createMockFile()
    render(<FileInput name="inputTest" value={[file]} onDrop={asyncMockFn} onDelete={spy} />)
    const fileDeleteButtonTestId = screen.getByTestId('DeleteButton')

    await act(async () => {
      fireEvent.click(fileDeleteButtonTestId)
    })

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(file)
  })

  it('disabled', () => {
    render(<FileInput name="inputTest" disabled onDrop={asyncMockFn} onDelete={async () => {}} />)
    const inputTestId = screen.getByTestId('FileInput')

    expect(inputTestId).toHaveAttribute('disabled')
  })

  it('ref', async () => {
    const ref = createRef<HTMLDivElement>()
    render(<FileInput ref={ref} name="inputTest" onDrop={asyncMockFn} onDelete={async () => {}} />)

    await waitFor(() => {
      expect(ref.current).not.toBeNull()
    })
    expect(ref.current?.focus).toBeDefined()

    const focusMock = jest.spyOn(ref.current!, 'focus').mockImplementation(() => {})
    ref.current?.focus()

    expect(focusMock).toHaveBeenCalled()
    focusMock.mockRestore()
  })

  it('axe', async () => {
    const { container } = render(
      <label htmlFor="inputTest">
        <FileInput name="inputTest" onDrop={asyncMockFn} onDelete={async () => {}} />,
      </label>,
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
