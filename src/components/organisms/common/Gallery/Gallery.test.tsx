import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { fireEvent, render, screen, waitFor } from '../../../../../.jest/customRender'
import { getGalleryItems } from '../../../../../.storybook/helpers'
import { Gallery } from '.'

expect.extend(toHaveNoViolations)

window.HTMLElement.prototype.scrollIntoView = jest.fn()

describe('Gallery', () => {
  const items = getGalleryItems(18)
  it('default', () => {
    render(<Gallery className="className" items={items} ratio="aspect-video" />)
    const galleryTestId = screen.getByTestId('Paper')
    const buttonTestIds = screen.getAllByTestId('GalleryControlButton')
    const imgRoles = screen.getAllByRole('img')

    expect(galleryTestId).toBeInTheDocument()
    expect(galleryTestId).toHaveClass('className')
    expect(buttonTestIds).toHaveLength(18)
    expect(buttonTestIds[0]).toHaveClass('selected')
    expect(imgRoles[0]).toHaveAttribute('alt', items[0].label)
  })

  it('nextPage', () => {
    render(<Gallery items={items} ratio="aspect-video" />)
    const nextButtonTestId = screen.getByTestId('NextButton')
    const carouselInnerWrapTestId = screen.getByTestId('CarouselInnerWrap')
    const buttonTestIds = screen.getAllByTestId('GalleryControlButton')

    fireEvent.click(nextButtonTestId)
    expect(carouselInnerWrapTestId).toHaveStyle('margin-left: calc(-100% * 1);')
    expect(buttonTestIds[1]).toHaveClass('selected')
  })

  it('previousPage', () => {
    render(<Gallery items={items} ratio="aspect-video" />)
    const previousButtonTestId = screen.getByTestId('PreviousButton')
    const carouselInnerWrapTestId = screen.getByTestId('CarouselInnerWrap')
    const buttonTestIds = screen.getAllByTestId('GalleryControlButton')

    fireEvent.click(previousButtonTestId)
    expect(carouselInnerWrapTestId).toHaveStyle('margin-left: calc(-100% * 3);')
    expect(buttonTestIds[items.length - 1]).toHaveClass('selected')
  })

  it('swipe', async () => {
    render(<Gallery items={items} ratio="aspect-video" />)
    const carouselInnerWrapTestId = screen.getByTestId('CarouselInnerWrap')
    const buttonTestIds = screen.getAllByTestId('GalleryControlButton')

    expect(carouselInnerWrapTestId).toHaveStyle('margin-left: calc(-100% * 0);')
    expect(buttonTestIds[0]).toHaveClass('selected')

    fireEvent.touchStart(carouselInnerWrapTestId, { touches: [{ clientX: 100 }] })
    fireEvent.touchEnd(carouselInnerWrapTestId, { changedTouches: [{ clientX: 50 }] })

    await waitFor(() => {
      expect(carouselInnerWrapTestId).toHaveStyle('margin-left: calc(-100% * 1);')
    })

    fireEvent.touchStart(carouselInnerWrapTestId, { touches: [{ clientX: 50 }] })
    fireEvent.touchEnd(carouselInnerWrapTestId, { changedTouches: [{ clientX: 100 }] })

    await waitFor(() => {
      expect(carouselInnerWrapTestId).toHaveStyle('margin-left: calc(-100% * 0);')
    })
  })

  it('open', async () => {
    render(<Gallery items={items} ratio="aspect-video" />)
    const imageViewerTestId = screen.getByTestId('ImageViewer')
    const viewerDialogQuery = screen.queryByRole('dialog')
    const closeButtonQuery = screen.queryByTestId('ImageViewerCloseButton')

    expect(viewerDialogQuery).toBeNull()
    expect(closeButtonQuery).toBeNull()
    expect(imageViewerTestId).toHaveAttribute('aria-expanded', 'false')

    fireEvent.click(imageViewerTestId)
    const viewerDialogQuery1 = screen.queryByRole('dialog')
    const closeButtonTestId = screen.getByTestId('ImageViewerCloseButton')
    expect(viewerDialogQuery1).toBeInTheDocument()
    expect(closeButtonTestId).toBeInTheDocument()

    fireEvent.click(closeButtonTestId)

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).toBeNull()
      expect(screen.queryByTestId('ImageViewerCloseButton')).toBeNull()
    })
  })

  it('controls', () => {
    render(<Gallery items={items} ratio="aspect-video" />)
    const controlsTestId = screen.getByTestId('GalleryControls')
    const carouselInnerWrapTestId = screen.getByTestId('CarouselInnerWrap')
    const buttonTestIds = screen.getAllByTestId('GalleryControlButton')
    const imgRatioTestIds = screen.getAllByTestId('ImageRatioWrap')
    const imgRoles = screen.getAllByRole('img')

    expect(controlsTestId).toBeInTheDocument()
    expect(buttonTestIds).toHaveLength(18)
    expect(imgRatioTestIds[0]).toHaveClass('aspect-video')
    expect(imgRoles[0]).toHaveAttribute('alt', items[0].label)

    fireEvent.click(buttonTestIds[2])
    expect(carouselInnerWrapTestId).toHaveStyle('margin-left: calc(-100% * 2);')
    expect(buttonTestIds[2]).toHaveClass('selected')
  })

  it('autoplay', () => {
    render(<Gallery items={items} ratio="aspect-video" />)
    const previousTestId = screen.queryByTestId('PreviousButton')
    const nextTestId = screen.getByTestId('NextButton')
    const autoplayTestId = screen.getByTestId('AutoplayButton')
    const dottsTestId = screen.queryByTestId('DottWrap')
    const playIconQuery = screen.queryByTestId('PlayIcon')
    const pauseIconQuery = screen.queryByTestId('PauseIcon')

    expect(previousTestId).toBeInTheDocument()
    expect(previousTestId).toHaveAttribute('aria-label', 'previous page 18')
    expect(nextTestId).toBeInTheDocument()
    expect(nextTestId).toHaveAttribute('aria-label', 'next page 2')
    expect(autoplayTestId).toBeInTheDocument()
    expect(dottsTestId).toBeNull()
    expect(playIconQuery).toBeInTheDocument()
    expect(pauseIconQuery).toBeNull()
    expect(autoplayTestId).toHaveAttribute('aria-label', 'Play')

    fireEvent.click(autoplayTestId)
    const playIconQuery1 = screen.queryByTestId('PlayIcon')
    const pauseIconQuery1 = screen.queryByTestId('PauseIcon')
    expect(autoplayTestId).toHaveAttribute('aria-label', 'Pause')
    expect(pauseIconQuery1).toBeInTheDocument()
    expect(playIconQuery1).toBeNull()

    fireEvent.click(autoplayTestId)
    const playIconQuery2 = screen.queryByTestId('PlayIcon')
    const pauseIconQuery2 = screen.queryByTestId('PauseIcon')
    expect(playIconQuery2).toBeInTheDocument()
    expect(pauseIconQuery2).toBeNull()

    fireEvent.click(nextTestId)
    const playIconQuery3 = screen.queryByTestId('PlayIcon')
    const pauseIconQuery3 = screen.queryByTestId('PauseIcon')
    expect(autoplayTestId).toHaveAttribute('aria-label', 'Play')
    expect(pauseIconQuery3).toBeNull()
    expect(playIconQuery3).toBeInTheDocument()
  })

  it('paperProps/imageViewerProps/carouselProps', () => {
    render(
      <Gallery
        className="className"
        items={items}
        ratio="aspect-video"
        paperProps={{ className: 'paperClass' }}
        imageViewerProps={{ className: 'imageViewerClass' }}
        carouselProps={{ className: 'carouselClass' }}
      />,
    )
    const paperTestId = screen.getByTestId('Paper')
    const imageViewerTestId = screen.getByTestId('ImageViewer')
    const carouselTestId = screen.getByTestId('Carousel')

    expect(paperTestId).toHaveClass('paperClass')
    expect(imageViewerTestId).toHaveClass('imageViewerClass')
    expect(carouselTestId).toHaveClass('carouselClass')
    expect(carouselTestId).toHaveClass('carouselClass')
  })

  it('ref', () => {
    const ref = createRef<HTMLDivElement>()
    render(<Gallery ref={ref} items={items} ratio="aspect-video" />)

    expect(ref.current).not.toBeNull()
    expect(ref.current?.focus).toBeDefined()

    const focusMock = jest.spyOn(ref.current!, 'focus').mockImplementation(() => {})
    ref.current?.focus()

    expect(focusMock).toHaveBeenCalled()
    focusMock.mockRestore()
  })

  it('axe', async () => {
    const { container } = render(<Gallery items={items} ratio="aspect-video" />)

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
