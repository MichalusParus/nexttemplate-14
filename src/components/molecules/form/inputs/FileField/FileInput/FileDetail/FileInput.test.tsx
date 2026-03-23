import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'

import { fireEvent, render, screen } from '../../../../../../../../.jest/customRender'
import { FileDetail } from '.'

expect.extend(toHaveNoViolations)

export const createMockFile = (
  name: string = 'mockFile.txt',
  fileType: string = 'text/plain',
  content: string = 'Hello, World!',
): File => {
  const blob = new Blob([content], { type: fileType })
  return new File([blob], name, { type: fileType })
}

describe('FileDetail', () => {
  describe('Semantics', () => {
    it('renders file name and size in MB', () => {
      const file = createMockFile()

      render(<FileDetail file={file} onDelete={async () => {}} />)
      const fileDetail = screen.getByTestId('FileDetail')

      expect(fileDetail).toBeInTheDocument()
      expect(fileDetail).toHaveTextContent(
        `${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`,
      )
    })

    it('renders delete button', () => {
      const file = createMockFile()

      render(<FileDetail file={file} onDelete={async () => {}} />)
      const deleteButton = screen.getByTestId('DeleteButton')

      expect(deleteButton).toBeInTheDocument()
    })

    it('loading shows status indicator and hides text', () => {
      const file = createMockFile()

      render(<FileDetail file={file} isLoading onDelete={async () => {}} />)
      const fileDetail = screen.getByTestId('FileDetail')
      const deleteButton = screen.getByTestId('DeleteButton')
      const status = screen.getByRole('status')

      expect(status).toBeInTheDocument()
      expect(deleteButton).toBeInTheDocument()
      expect(fileDetail).toHaveTextContent('')
      expect(deleteButton).toHaveAttribute('aria-busy', 'true')
    })

    it('renders ProgressBar when progress is defined', () => {
      const file = createMockFile()

      render(<FileDetail file={file} isLoading progress={60} onDelete={async () => {}} />)
      const progressBar = screen.getByRole('progressbar')

      expect(progressBar).toBeInTheDocument()
      expect(progressBar).toHaveAttribute('aria-valuenow', '60')
    })

    it('renders InlineLoader when progress is undefined', () => {
      const file = createMockFile()

      render(<FileDetail file={file} isLoading onDelete={async () => {}} />)

      expect(screen.queryByRole('progressbar')).toBeNull()
    })
  })

  describe('Interaction', () => {
    it('delete button fires onDelete with file', () => {
      const file = createMockFile()
      const onDelete = jest.fn()

      render(<FileDetail file={file} onDelete={onDelete} />)
      const deleteButton = screen.getByTestId('DeleteButton')

      fireEvent.click(deleteButton)

      expect(onDelete).toHaveBeenCalledTimes(1)
      expect(onDelete).toHaveBeenCalledWith(file)
    })
  })

  describe('Accessibility', () => {
    it('axe', async () => {
      const file = createMockFile()
      const { container } = render(<FileDetail file={file} onDelete={async () => {}} />)

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
