import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { act, createRef } from 'react'

import { ToastProvider } from '@/components/molecules/popovers/ToastProvider'

import {
  createEvent,
  fireEvent,
  render,
  screen,
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
  describe('Semantics', () => {
    it('renders hidden file input', () => {
      render(<FileInput name="inputTest" onDrop={asyncMockFn} onDelete={async () => {}} />)
      const hiddenInput = screen.getByTestId('FileInput')

      expect(hiddenInput).toBeInTheDocument()
      expect(hiddenInput).toHaveAttribute('type', 'file')
    })

    it('sets id and name from name prop', () => {
      render(<FileInput name="inputTest" onDrop={asyncMockFn} onDelete={async () => {}} />)
      const hiddenInput = screen.getByTestId('FileInput')

      expect(hiddenInput).toHaveAttribute('id', 'inputTest')
      expect(hiddenInput).toHaveAttribute('name', 'inputTest')
    })

    it('className lands on dropzone wrapper', () => {
      render(
        <FileInput
          className="className"
          name="inputTest"
          onDrop={asyncMockFn}
          onDelete={async () => {}}
        />,
      )
      const wrapper = screen.getByTestId('InputWrap')

      expect(wrapper).toHaveClass('className')
    })

    it('role="presentation" on dropzone wrapper', () => {
      render(<FileInput name="inputTest" onDrop={asyncMockFn} onDelete={async () => {}} />)
      const wrapper = screen.getByTestId('InputWrap')

      expect(wrapper).toHaveAttribute('role', 'presentation')
    })

    it('renders value as FileDetail list', () => {
      const file = createMockFile()

      render(
        <FileInput name="inputTest" value={[file]} onDrop={asyncMockFn} onDelete={async () => {}} />,
      )
      const fileDetails = screen.queryAllByTestId('FileDetail')
      const deleteButton = screen.getByTestId('DeleteButton')

      expect(fileDetails).toHaveLength(1)
      expect(fileDetails[0]).toHaveTextContent(file.name)
      expect(deleteButton).toBeInTheDocument()
    })

    it('error adds error class to wrapper', () => {
      render(
        <FileInput name="inputTest" error="error" onDrop={asyncMockFn} onDelete={async () => {}} />,
      )
      const wrapper = screen.getByTestId('InputWrap')

      expect(wrapper).toHaveClass('error')
    })

    it('disabled sets aria-disabled and disabled class', () => {
      render(
        <FileInput name="inputTest" disabled onDrop={asyncMockFn} onDelete={async () => {}} />,
      )
      const wrapper = screen.getByTestId('InputWrap')

      expect(wrapper).toHaveAttribute('aria-disabled', 'true')
      expect(wrapper).toHaveClass('disabled')
    })

    it('not disabled omits aria-disabled', () => {
      render(<FileInput name="inputTest" onDrop={asyncMockFn} onDelete={async () => {}} />)
      const wrapper = screen.getByTestId('InputWrap')

      expect(wrapper).not.toHaveAttribute('aria-disabled')
    })
  })

  describe('Keyboard', () => {
    it('focus reaches the input', () => {
      render(<FileInput name="inputTest" onDrop={asyncMockFn} onDelete={async () => {}} />)
      const hiddenInput = screen.getByTestId('FileInput')

      hiddenInput.focus()
      expect(document.activeElement).toBe(hiddenInput)
    })

    it('Enter opens file picker', () => {
      render(<FileInput name="inputTest" onDrop={asyncMockFn} onDelete={async () => {}} />)
      const hiddenInput = screen.getByTestId('FileInput')
      const clickSpy = jest.fn()
      hiddenInput.click = clickSpy

      const wrapper = screen.getByTestId('InputWrap')
      fireEvent.keyDown(wrapper, { key: 'Enter', code: 'Enter' })

      expect(clickSpy).toHaveBeenCalled()
    })

    it('Space opens file picker', () => {
      render(<FileInput name="inputTest" onDrop={asyncMockFn} onDelete={async () => {}} />)
      const hiddenInput = screen.getByTestId('FileInput')
      const clickSpy = jest.fn()
      hiddenInput.click = clickSpy

      const wrapper = screen.getByTestId('InputWrap')
      fireEvent.keyDown(wrapper, { key: ' ', code: 'Space' })

      expect(clickSpy).toHaveBeenCalled()
    })

    it('disabled blocks Enter', () => {
      render(
        <FileInput name="inputTest" disabled onDrop={asyncMockFn} onDelete={async () => {}} />,
      )
      const hiddenInput = screen.getByTestId('FileInput')
      const clickSpy = jest.fn()
      hiddenInput.click = clickSpy

      const wrapper = screen.getByTestId('InputWrap')
      fireEvent.keyDown(wrapper, { key: 'Enter', code: 'Enter' })

      expect(clickSpy).not.toHaveBeenCalled()
    })

    it('disabled blocks Space', () => {
      render(
        <FileInput name="inputTest" disabled onDrop={asyncMockFn} onDelete={async () => {}} />,
      )
      const hiddenInput = screen.getByTestId('FileInput')
      const clickSpy = jest.fn()
      hiddenInput.click = clickSpy

      const wrapper = screen.getByTestId('InputWrap')
      fireEvent.keyDown(wrapper, { key: ' ', code: 'Space' })

      expect(clickSpy).not.toHaveBeenCalled()
    })

    it('loading blocks Enter', async () => {
      let resolveUpload: (value: File) => void
      const onDrop = jest.fn(
        () => new Promise<File>(resolve => { resolveUpload = resolve }),
      )
      render(<FileInput name="inputTest" onDrop={onDrop} onDelete={async () => {}} />)
      const wrapper = screen.getByTestId('InputWrap')
      const file = createMockFile('test.pdf', 'application/pdf')

      // Trigger upload to set loading state
      await act(async () => {
        const event = createEvent.drop(wrapper)
        Object.defineProperty(event, 'dataTransfer', {
          value: { files: [file], types: ['Files'] },
        })
        fireEvent(wrapper, event)
      })

      const hiddenInput = screen.getByTestId('FileInput')
      const clickSpy = jest.fn()
      hiddenInput.click = clickSpy

      fireEvent.keyDown(wrapper, { key: 'Enter', code: 'Enter' })

      expect(clickSpy).not.toHaveBeenCalled()

      // Clean up pending promise
      await act(async () => { resolveUpload!(file) })
    })

    it('loading blocks Space', async () => {
      let resolveUpload: (value: File) => void
      const onDrop = jest.fn(
        () => new Promise<File>(resolve => { resolveUpload = resolve }),
      )
      render(<FileInput name="inputTest" onDrop={onDrop} onDelete={async () => {}} />)
      const wrapper = screen.getByTestId('InputWrap')
      const file = createMockFile('test.pdf', 'application/pdf')

      await act(async () => {
        const event = createEvent.drop(wrapper)
        Object.defineProperty(event, 'dataTransfer', {
          value: { files: [file], types: ['Files'] },
        })
        fireEvent(wrapper, event)
      })

      const hiddenInput = screen.getByTestId('FileInput')
      const clickSpy = jest.fn()
      hiddenInput.click = clickSpy

      fireEvent.keyDown(wrapper, { key: ' ', code: 'Space' })

      expect(clickSpy).not.toHaveBeenCalled()

      await act(async () => { resolveUpload!(file) })
    })
  })

  describe('Interaction', () => {
    it('onDrop fires per file', async () => {
      const onDrop = jest.fn(async (file: File) => file)
      render(<FileInput name="inputTest" onDrop={onDrop} onDelete={async () => {}} />)
      const wrapper = screen.getByTestId('InputWrap')
      const file = createMockFile('test.pdf', 'application/pdf')

      await act(async () => {
        const event = createEvent.drop(wrapper)
        Object.defineProperty(event, 'dataTransfer', {
          value: {
            files: [file],
            types: ['Files'],
          },
        })
        fireEvent(wrapper, event)
      })

      expect(onDrop).toHaveBeenCalledTimes(1)
      expect(onDrop).toHaveBeenCalledWith(file, expect.any(Function))
    })

    it('onProgress updates progress in FileDetail', async () => {
      let capturedOnProgress: (percent: number) => void
      const onDrop = jest.fn(
        (_file: File, onProgress: (p: number) => void) =>
          new Promise<File>(resolve => {
            capturedOnProgress = onProgress
            // Don't resolve — keep loading
            void resolve
          }),
      )

      render(<FileInput name="inputTest" onDrop={onDrop} onDelete={async () => {}} />)
      const wrapper = screen.getByTestId('InputWrap')
      const file = createMockFile('test.pdf', 'application/pdf')

      await act(async () => {
        const event = createEvent.drop(wrapper)
        Object.defineProperty(event, 'dataTransfer', {
          value: { files: [file], types: ['Files'] },
        })
        fireEvent(wrapper, event)
      })

      await act(async () => {
        capturedOnProgress!(50)
      })

      const progressBar = screen.getByRole('progressbar')

      expect(progressBar).toBeInTheDocument()
      expect(progressBar).toHaveAttribute('aria-valuenow', '50')
    })

    it('onDelete fires with file', async () => {
      const onDelete = jest.fn()
      const file = createMockFile()
      render(
        <FileInput name="inputTest" value={[file]} onDrop={asyncMockFn} onDelete={onDelete} />,
      )
      const deleteButton = screen.getByTestId('DeleteButton')

      await act(async () => {
        fireEvent.click(deleteButton)
      })

      expect(onDelete).toHaveBeenCalledTimes(1)
      expect(onDelete).toHaveBeenCalledWith(file)
    })

    it('maxFileCount rejects oversized batch with toast', async () => {
      const onDrop = jest.fn()
      const files = Array.from({ length: 5 }, (_, i) =>
        createMockFile(`test${i}.pdf`, 'application/pdf'),
      )

      render(
        <ToastProvider>
          <FileInput name="inputTest" maxFileCount={2} onDrop={onDrop} onDelete={async () => {}} />
        </ToastProvider>,
      )
      const wrapper = screen.getByTestId('InputWrap')

      await act(async () => {
        const event = createEvent.drop(wrapper)
        Object.defineProperty(event, 'dataTransfer', {
          value: {
            files: files,
            types: ['Files'],
          },
        })
        fireEvent(wrapper, event)
      })

      const toast = screen.getByTestId('Toast')

      expect(onDrop).toHaveBeenCalledTimes(0)
      expect(toast).toBeInTheDocument()
      expect(toast).toHaveRole('alert')
    })

    it('maxFileSize rejects oversized file with toast', async () => {
      const onDrop = jest.fn()
      const file = createMockFile('test.pdf', 'application/pdf')

      render(
        <ToastProvider>
          <FileInput name="inputTest" maxFileSize={1} onDrop={onDrop} onDelete={async () => {}} />
        </ToastProvider>,
      )
      const wrapper = screen.getByTestId('InputWrap')

      await act(async () => {
        const event = createEvent.drop(wrapper)
        Object.defineProperty(event, 'dataTransfer', {
          value: {
            files: [file],
            types: ['Files'],
          },
        })
        fireEvent(wrapper, event)
      })

      const toast = screen.getByTestId('Toast')

      expect(onDrop).toHaveBeenCalledTimes(0)
      expect(toast).toBeInTheDocument()
      expect(toast).toHaveRole('alert')
    })

    it('duplicate file rejected with toast', async () => {
      const onDrop = jest.fn()
      const file = createMockFile('test.pdf', 'application/pdf')

      render(
        <ToastProvider>
          <FileInput
            name="inputTest"
            value={[file]}
            onDrop={onDrop}
            onDelete={async () => {}}
          />
        </ToastProvider>,
      )
      const wrapper = screen.getByTestId('InputWrap')

      await act(async () => {
        const event = createEvent.drop(wrapper)
        Object.defineProperty(event, 'dataTransfer', {
          value: {
            files: [file],
            types: ['Files'],
          },
        })
        fireEvent(wrapper, event)
      })

      const toast = screen.getByTestId('Toast')

      expect(onDrop).toHaveBeenCalledTimes(0)
      expect(toast).toBeInTheDocument()
      expect(toast).toHaveRole('alert')
    })

    it('maxFileCount accounts for existing files', async () => {
      const onDrop = jest.fn()
      const existing1 = createMockFile('existing1.pdf', 'application/pdf')
      const existing2 = createMockFile('existing2.pdf', 'application/pdf')
      const newFile1 = createMockFile('new1.pdf', 'application/pdf')
      const newFile2 = createMockFile('new2.pdf', 'application/pdf')

      render(
        <ToastProvider>
          <FileInput
            name="inputTest"
            maxFileCount={3}
            value={[existing1, existing2]}
            onDrop={onDrop}
            onDelete={async () => {}}
          />
        </ToastProvider>,
      )
      const wrapper = screen.getByTestId('InputWrap')

      await act(async () => {
        const event = createEvent.drop(wrapper)
        Object.defineProperty(event, 'dataTransfer', {
          value: {
            files: [newFile1, newFile2],
            types: ['Files'],
          },
        })
        fireEvent(wrapper, event)
      })

      const toast = screen.getByTestId('Toast')

      expect(onDrop).toHaveBeenCalledTimes(0)
      expect(toast).toBeInTheDocument()
      expect(toast).toHaveRole('alert')
    })
  })

  describe('Ref', () => {
    it('forwards ref to wrapper HTMLDivElement', () => {
      const ref = createRef<HTMLDivElement>()
      render(<FileInput ref={ref} name="inputTest" onDrop={asyncMockFn} onDelete={async () => {}} />)

      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })
  })

  describe('Accessibility', () => {
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
})
