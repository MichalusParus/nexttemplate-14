import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { act, createRef } from 'react'

import { fireEvent, render, screen, waitFor } from '../../../../../.jest/customRender'
import { getGalleryItems } from '../../../../../.storybook/helpers'
import { Gallery } from '.'

expect.extend(toHaveNoViolations)


describe('Gallery', () => {
  const items = getGalleryItems(18)

  describe('Semantics', () => {
    it('renders Paper root element', () => {
      render(<Gallery items={items} ratio="aspect-video" />)
      const paper = screen.getByTestId('Paper')

      expect(paper).toBeInTheDocument()
    })

    it('className forwarded to Paper', () => {
      render(<Gallery className="className" items={items} ratio="aspect-video" />)
      const paper = screen.getByTestId('Paper')

      expect(paper).toHaveClass('className')
    })

    it('renders control buttons matching item count', () => {
      render(<Gallery items={items} ratio="aspect-video" />)
      const buttons = screen.getAllByTestId('GalleryControlButton')

      expect(buttons).toHaveLength(18)
    })

    it('first control button selected by default', () => {
      render(<Gallery items={items} ratio="aspect-video" />)
      const buttons = screen.getAllByTestId('GalleryControlButton')

      expect(buttons[0]).toHaveClass('selected')
    })

    it('img alt matches item label', () => {
      render(<Gallery items={items} ratio="aspect-video" />)
      const imgs = screen.getAllByRole('img')

      expect(imgs[0]).toHaveAttribute('alt', items[0].label)
    })

    it('aria-label defaults to i18n gallery', () => {
      render(<Gallery items={items} ratio="aspect-video" />)
      const paper = screen.getByTestId('Paper')

      expect(paper).toHaveAttribute('aria-label', 'Gallery')
    })

    it('aria-label uses label prop when provided', () => {
      render(<Gallery items={items} ratio="aspect-video" label="My Gallery" />)
      const paper = screen.getByTestId('Paper')

      expect(paper).toHaveAttribute('aria-label', 'My Gallery')
    })

    it('paperProps forwarded to Paper', () => {
      render(<Gallery items={items} ratio="aspect-video" paperProps={{ className: 'paperClass' }} />)
      const paper = screen.getByTestId('Paper')

      expect(paper).toHaveClass('paperClass')
    })

    it('imageViewerProps forwarded to ImageViewer', () => {
      render(
        <Gallery
          items={items}
          ratio="aspect-video"
          imageViewerProps={{ className: 'imageViewerClass' }}
        />,
      )
      const imageViewer = screen.getByTestId('ImageViewer')

      expect(imageViewer).toHaveClass('imageViewerClass')
    })

    it('carouselProps forwarded to Carousel', () => {
      render(
        <Gallery
          items={items}
          ratio="aspect-video"
          carouselProps={{ className: 'carouselClass' }}
        />,
      )
      const carousel = screen.getByTestId('Carousel')

      expect(carousel).toHaveClass('carouselClass')
    })

    it('ImageViewer collapsed by default', () => {
      render(<Gallery items={items} ratio="aspect-video" />)
      const dialog = screen.queryByRole('dialog')
      const closeButton = screen.queryByTestId('ImageViewerCloseButton')
      const imageViewer = screen.getByTestId('ImageViewer')

      expect(dialog).toBeNull()
      expect(closeButton).toBeNull()
      expect(imageViewer).toHaveAttribute('aria-expanded', 'false')
    })

    it('carousel ratio matches ratio prop', () => {
      render(<Gallery items={items} ratio="aspect-video" />)
      const ratioWrap = screen.getAllByTestId('ImageRatioWrap')

      expect(ratioWrap[0]).toHaveClass('aspect-video')
    })

    it('autoplay starts paused', () => {
      render(<Gallery items={items} ratio="aspect-video" />)
      const playIcon = screen.queryByTestId('PlayIcon')
      const pauseIcon = screen.queryByTestId('PauseIcon')
      const autoplayButton = screen.getByTestId('AutoplayButton')

      expect(playIcon).toBeInTheDocument()
      expect(pauseIcon).toBeNull()
      expect(autoplayButton).toHaveAttribute('aria-label', 'Play')
    })

    it('dot controls hidden', () => {
      render(<Gallery items={items} ratio="aspect-video" />)
      const dots = screen.queryByTestId('DotWrap')

      expect(dots).toBeNull()
    })

    it('arrow button aria-labels show target pages', () => {
      render(<Gallery items={items} ratio="aspect-video" />)
      const previousButton = screen.getByTestId('PreviousButton')
      const nextButton = screen.getByTestId('NextButton')

      expect(previousButton).toHaveAttribute('aria-label', 'previous page 18')
      expect(nextButton).toHaveAttribute('aria-label', 'next page 2')
    })
  })

  describe('Interaction', () => {
    it('next button advances page', () => {
      render(<Gallery items={items} ratio="aspect-video" />)
      const nextButton = screen.getByTestId('NextButton')
      const buttons = screen.getAllByTestId('GalleryControlButton')

      fireEvent.click(nextButton)
      expect(buttons[1]).toHaveClass('selected')
      expect(buttons[0]).not.toHaveClass('selected')
    })

    it('previous button wraps to last page', () => {
      render(<Gallery items={items} ratio="aspect-video" />)
      const previousButton = screen.getByTestId('PreviousButton')
      const buttons = screen.getAllByTestId('GalleryControlButton')

      fireEvent.click(previousButton)
      expect(buttons[items.length - 1]).toHaveClass('selected')
      expect(buttons[0]).not.toHaveClass('selected')
    })

    it('swipe forward advances page', async () => {
      window.ontouchstart = null
      render(<Gallery items={items} ratio="aspect-video" />)
      const carousel = screen.getByTestId('Carousel')
      const buttons = screen.getAllByTestId('GalleryControlButton')

      expect(buttons[0]).toHaveClass('selected')

      await act(async () => {
        fireEvent.touchStart(carousel, { touches: [{ clientX: 100, clientY: 0 }] })
      })
      await act(async () => {
        fireEvent.touchEnd(carousel, { changedTouches: [{ clientX: 50, clientY: 0 }] })
      })

      await waitFor(() => {
        expect(buttons[1]).toHaveClass('selected')
      })
      expect(buttons[0]).not.toHaveClass('selected')
      delete (window as any).ontouchstart
    })

    it('swipe backward returns to previous page', async () => {
      window.ontouchstart = null
      render(<Gallery items={items} ratio="aspect-video" />)
      const carousel = screen.getByTestId('Carousel')
      const buttons = screen.getAllByTestId('GalleryControlButton')

      await act(async () => {
        fireEvent.touchStart(carousel, { touches: [{ clientX: 100, clientY: 0 }] })
      })
      await act(async () => {
        fireEvent.touchEnd(carousel, { changedTouches: [{ clientX: 50, clientY: 0 }] })
      })

      await waitFor(() => {
        expect(buttons[1]).toHaveClass('selected')
      })

      await act(async () => {
        fireEvent.touchStart(carousel, { touches: [{ clientX: 50, clientY: 0 }] })
      })
      await act(async () => {
        fireEvent.touchEnd(carousel, { changedTouches: [{ clientX: 100, clientY: 0 }] })
      })

      await waitFor(() => {
        expect(buttons[0]).toHaveClass('selected')
      })
      expect(buttons[1]).not.toHaveClass('selected')
      delete (window as any).ontouchstart
    })

    it('click ImageViewer opens dialog', () => {
      render(<Gallery items={items} ratio="aspect-video" />)
      const imageViewer = screen.getByTestId('ImageViewer')

      fireEvent.click(imageViewer)
      const dialog = screen.queryByRole('dialog')
      const closeButton = screen.getByTestId('ImageViewerCloseButton')

      expect(dialog).toBeInTheDocument()
      expect(closeButton).toBeInTheDocument()
    })

    it('click close button dismisses dialog', async () => {
      render(<Gallery items={items} ratio="aspect-video" />)
      const imageViewer = screen.getByTestId('ImageViewer')

      fireEvent.click(imageViewer)
      const closeButton = screen.getByTestId('ImageViewerCloseButton')
      fireEvent.click(closeButton)

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).toBeNull()
        expect(screen.queryByTestId('ImageViewerCloseButton')).toBeNull()
      })
    })

    it('click control button selects page', () => {
      render(<Gallery items={items} ratio="aspect-video" />)
      const buttons = screen.getAllByTestId('GalleryControlButton')

      fireEvent.click(buttons[2])
      expect(buttons[2]).toHaveClass('selected')
      expect(buttons[0]).not.toHaveClass('selected')
    })

    it('autoplay toggle switches play and pause icons', () => {
      render(<Gallery items={items} ratio="aspect-video" />)
      const autoplayButton = screen.getByTestId('AutoplayButton')

      fireEvent.click(autoplayButton)
      expect(autoplayButton).toHaveAttribute('aria-label', 'Pause')
      expect(screen.queryByTestId('PauseIcon')).toBeInTheDocument()
      expect(screen.queryByTestId('PlayIcon')).toBeNull()

      fireEvent.click(autoplayButton)
      expect(autoplayButton).toHaveAttribute('aria-label', 'Play')
      expect(screen.queryByTestId('PlayIcon')).toBeInTheDocument()
      expect(screen.queryByTestId('PauseIcon')).toBeNull()
    })

    it('manual navigation resets autoplay to paused', () => {
      render(<Gallery items={items} ratio="aspect-video" />)
      const autoplayButton = screen.getByTestId('AutoplayButton')
      const nextButton = screen.getByTestId('NextButton')

      fireEvent.click(autoplayButton)
      expect(autoplayButton).toHaveAttribute('aria-label', 'Pause')

      fireEvent.click(nextButton)
      expect(autoplayButton).toHaveAttribute('aria-label', 'Play')
      expect(screen.queryByTestId('PlayIcon')).toBeInTheDocument()
      expect(screen.queryByTestId('PauseIcon')).toBeNull()
    })
  })

  describe('Ref', () => {
    it('forwards ref to HTMLDivElement', () => {
      const ref = createRef<HTMLDivElement>()
      render(<Gallery ref={ref} items={items} ratio="aspect-video" />)

      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })
  })

  describe('Accessibility', () => {
    it('axe', async () => {
      const { container } = render(<Gallery items={items} ratio="aspect-video" />)

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
