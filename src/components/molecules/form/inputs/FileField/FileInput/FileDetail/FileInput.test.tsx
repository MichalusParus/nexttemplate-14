import '@testing-library/jest-dom'

import { toHaveNoViolations } from 'jest-axe'

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
  it('default', () => {
    const file = createMockFile()

    render(<FileDetail file={file} onDelete={async () => {}} />)
    const fileDetailTestId = screen.getByTestId('FileDetail')
    const deleteButtonTestId = screen.getByTestId('DeleteButton')

    expect(fileDetailTestId).toBeInTheDocument()
    expect(fileDetailTestId).toHaveTextContent(
      `${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`,
    )
    expect(deleteButtonTestId).toBeInTheDocument()
  })

  it('isLoading', () => {
    const file = createMockFile()

    render(<FileDetail file={file} isLoading onDelete={async () => {}} />)
    const fileDetailTestId = screen.getByTestId('FileDetail')
    const deleteButtonTestId = screen.getByTestId('DeleteButton')
    const statusRole = screen.getByRole('status')

    expect(statusRole).toBeInTheDocument()
    expect(deleteButtonTestId).toBeInTheDocument()
    expect(fileDetailTestId).toHaveTextContent('')
    expect(deleteButtonTestId).toHaveAttribute('aria-busy', 'true')
  })

  it('onDelete', () => {
    const file = createMockFile()
    const spy = jest.fn()

    render(<FileDetail file={file} onDelete={spy} />)
    const deleteButtonTestId = screen.getByTestId('DeleteButton')

    fireEvent.click(deleteButtonTestId)

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(file)
  })
})
