import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { fireEvent, render, screen, waitFor } from '../../../../../.jest/customRender'
import { ImageViewer } from '.'

expect.extend(toHaveNoViolations)

describe('ImageViewer', () => {
  it('default', () => {
    render(
      <ImageViewer className="className" name="viewerTest" label="Image">
        Image
      </ImageViewer>,
    )
    const imageViewerTestId = screen.getByTestId('ImageViewer')
    const dialogQuery = screen.queryByRole('dialog')

    expect(imageViewerTestId).toBeInTheDocument()
    expect(imageViewerTestId).toHaveClass('className')
    expect(imageViewerTestId).toHaveTextContent('Image')
    expect(imageViewerTestId).toHaveAttribute('aria-expanded', 'false')
    expect(imageViewerTestId).toHaveAttribute('aria-haspopup', 'dialog')
    expect(imageViewerTestId).toHaveAttribute('aria-controls', 'viewerTest')
    expect(imageViewerTestId).toHaveAttribute('aria-owns', 'viewerTest')
    expect(imageViewerTestId).toHaveAttribute('aria-label', 'Image')
    expect(dialogQuery).toBeNull()
    imageViewerTestId.focus()
    expect(document.activeElement).toBe(imageViewerTestId)
  })

  it('open', () => {
    render(<ImageViewer name="viewerTest">Image</ImageViewer>)
    const imageViewerTestId = screen.getByTestId('ImageViewer')
    const dialogQuery = screen.queryByRole('dialog')

    expect(dialogQuery).toBeNull()

    fireEvent.click(imageViewerTestId)
    const closeButtonTestId = screen.getByTestId('ImageViewerCloseButton')
    const dialogQuery1 = screen.queryByRole('dialog')

    expect(imageViewerTestId).toHaveAttribute('aria-expanded', 'true')
    expect(dialogQuery1).toBeInTheDocument()
    expect(closeButtonTestId).toBeInTheDocument()

    fireEvent.click(closeButtonTestId)
    const dialogQuery2 = screen.queryByRole('dialog')

    waitFor(() => {
      expect(dialogQuery2).toBeNull()
    })
  })

  it('controledOpen', () => {
    const spy = jest.fn()
    render(
      <ImageViewer name="viewerTest" isOpen={false} setIsOpen={spy}>
        Image
      </ImageViewer>,
    )
    const imageViewerTestId = screen.getByTestId('ImageViewer')
    const dialogQuery = screen.queryByRole('dialog')

    expect(dialogQuery).toBeNull()

    fireEvent.click(imageViewerTestId)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('controledClose', () => {
    const spy = jest.fn()
    render(
      <ImageViewer name="viewerTest" isOpen={true} setIsOpen={spy}>
        Image
      </ImageViewer>,
    )
    const closeButtonTestId = screen.getByTestId('ImageViewerCloseButton')
    const dialogQuery = screen.queryByRole('dialog')

    expect(dialogQuery).toBeInTheDocument()

    fireEvent.click(closeButtonTestId)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('ref', () => {
    const ref = createRef<HTMLButtonElement>()
    render(
      <ImageViewer name="viewerTest" isOpen setIsOpen={() => {}} ref={ref}>
        Image
      </ImageViewer>,
    )

    expect(ref.current).not.toBeNull()
    expect(ref.current?.focus).toBeDefined()

    const focusMock = jest.spyOn(ref.current!, 'focus').mockImplementation(() => {})
    ref.current?.focus()

    expect(focusMock).toHaveBeenCalled()
    focusMock.mockRestore()
  })

  it('axe', async () => {
    const { container } = render(
      <ImageViewer name="viewerTest" isOpen setIsOpen={() => {}}>
        Image
      </ImageViewer>,
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
