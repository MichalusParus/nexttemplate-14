import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { act, createRef, useState } from 'react'

import { fireEvent, render, screen } from '../../../../../.jest/customRender'
import { getCarouselItems } from '../../../../../.storybook/helpers'
import { Carousel, CarouselItemType } from '.'
import { CarouselItem } from './CarouselItem'

expect.extend(toHaveNoViolations)

const getTestItems = (count: number): CarouselItemType[] => {
  return getCarouselItems(count).map((_, i) => ({
    label: `Item ${i + 1}`,
    content: <div className="h-full w-full" data-testid="panel" />,
  }))
}

describe('Carousel', () => {
  describe('Semantics', () => {
    it('renders carousel container', () => {
      render(<Carousel items={getTestItems(3)} />)
      const carousel = screen.getByTestId('Carousel')

      expect(carousel).toBeInTheDocument()
    })

    it('forwards className', () => {
      render(<Carousel items={getTestItems(3)} className="className" />)
      const carousel = screen.getByTestId('Carousel')

      expect(carousel).toHaveClass('className')
    })

    it('role region with carousel roledescription', () => {
      render(<Carousel items={getTestItems(3)} />)
      const carousel = screen.getByTestId('Carousel')

      expect(carousel).toHaveAttribute('role', 'region')
      expect(carousel).toHaveAttribute('aria-roledescription', 'carousel')
    })

    it('default aria-label', () => {
      render(<Carousel items={getTestItems(3)} />)
      const carousel = screen.getByTestId('Carousel')

      expect(carousel).toHaveAttribute('aria-label', 'Carousel')
    })

    it('custom aria-label', () => {
      render(<Carousel items={getTestItems(3)} label="New Carousel" />)
      const carousel = screen.getByTestId('Carousel')

      expect(carousel).toHaveAttribute('aria-label', 'New Carousel')
    })

    it('ratio class on wrapper', () => {
      render(<Carousel items={getTestItems(3)} ratio="aspect-video" />)
      const ratioWrap = screen.getByTestId('CarouselRatioWrap')

      expect(ratioWrap).toHaveClass('aspect-video')
    })

    it('inner wrap width and margin-left', () => {
      render(<Carousel items={getTestItems(3)} />)
      const innerWrap = screen.getByTestId('CarouselInnerWrap')

      expect(innerWrap).toHaveStyle('width: calc(100% * 3);')
      expect(innerWrap).toHaveStyle('margin-left: calc(-100% * 0);')
    })

    it('renders item panels', () => {
      render(<Carousel items={getTestItems(3)} />)
      const panels = screen.getAllByTestId('panel')

      expect(panels).toHaveLength(3)
    })

    it('children API with pagesCount', () => {
      render(
        <Carousel pagesCount={3} className="className" ratio="aspect-video">
          <CarouselItem>
            <div className="h-full w-full" data-testid="panel-child" />
          </CarouselItem>
          <CarouselItem>
            <div className="h-full w-full" data-testid="panel-child" />
          </CarouselItem>
          <CarouselItem>
            <div className="h-full w-full" data-testid="panel-child" />
          </CarouselItem>
        </Carousel>,
      )
      const carousel = screen.getByTestId('Carousel')
      const panels = screen.getAllByTestId('panel-child')
      const innerWrap = screen.getByTestId('CarouselInnerWrap')

      expect(carousel).toBeInTheDocument()
      expect(carousel).toHaveClass('className')
      expect(innerWrap).toHaveStyle('width: calc(100% * 3);')
      expect(panels).toHaveLength(3)
    })

    it('empty state with noItemsLabel', () => {
      const label = 'No content available'
      render(<Carousel noItemsLabel={label} />)
      const emptyMessage = screen.getByText(label)
      const carouselItem = screen.getByTestId('CarouselItem')

      expect(emptyMessage).toBeInTheDocument()
      expect(carouselItem).toHaveAttribute('aria-label', label)
      expect(carouselItem).toHaveAttribute('aria-current', 'true')
    })

    it('hides arrows and dots', () => {
      render(<Carousel items={getTestItems(3)} hideArrows hideControlDots />)
      const previousButton = screen.queryByTestId('PreviousButton')
      const nextButton = screen.queryByTestId('NextButton')
      const autoplayButton = screen.queryByTestId('AutoplayButton')
      const dotWrap = screen.queryByTestId('DotWrap')

      expect(previousButton).toBeNull()
      expect(nextButton).toBeNull()
      expect(autoplayButton).toBeNull()
      expect(dotWrap).toBeNull()
    })
  })

  describe('Interaction', () => {
    it('next page advances margin-left', () => {
      render(<Carousel items={getTestItems(3)} />)
      const nextButton = screen.getByTestId('NextButton')
      const innerWrap = screen.getByTestId('CarouselInnerWrap')

      fireEvent.click(nextButton)
      expect(innerWrap).toHaveStyle('margin-left: calc(-100% * 1);')
    })

    it('previous page wraps to last', () => {
      render(<Carousel items={getTestItems(3)} />)
      const previousButton = screen.getByTestId('PreviousButton')
      const innerWrap = screen.getByTestId('CarouselInnerWrap')

      fireEvent.click(previousButton)
      expect(innerWrap).toHaveStyle('margin-left: calc(-100% * 2);')
    })

    it('swipe forward and backward', () => {
      render(<Carousel items={getTestItems(3)} />)
      const innerWrap = screen.getByTestId('CarouselInnerWrap')

      expect(innerWrap).toHaveStyle('margin-left: calc(-100% * 0);')

      fireEvent.touchStart(innerWrap, { touches: [{ clientX: 100, clientY: 0 }] })
      fireEvent.touchEnd(innerWrap, { changedTouches: [{ clientX: 50, clientY: 0 }] })
      expect(innerWrap).toHaveStyle('margin-left: calc(-100% * 1);')

      fireEvent.touchStart(innerWrap, { touches: [{ clientX: 50, clientY: 0 }] })
      fireEvent.touchEnd(innerWrap, { changedTouches: [{ clientX: 100, clientY: 0 }] })
      expect(innerWrap).toHaveStyle('margin-left: calc(-100% * 0);')
    })

    it('autoplay toggle and auto-pause on click', () => {
      render(<Carousel items={getTestItems(3)} autoplay="on" />)
      const previousButton = screen.queryByTestId('PreviousButton')
      const nextButton = screen.getByTestId('NextButton')
      const autoplayButton = screen.getByTestId('AutoplayButton')
      const dotWrap = screen.queryByTestId('DotWrap')

      expect(previousButton).toBeInTheDocument()
      expect(previousButton).toHaveAttribute('aria-label', 'previous page 3')
      expect(nextButton).toBeInTheDocument()
      expect(nextButton).toHaveAttribute('aria-label', 'next page 2')
      expect(autoplayButton).toBeInTheDocument()
      expect(dotWrap).toBeInTheDocument()
      expect(screen.queryByTestId('PlayIcon')).toBeNull()
      expect(screen.queryByTestId('PauseIcon')).toBeInTheDocument()
      expect(autoplayButton).toHaveAttribute('aria-label', 'Pause')

      fireEvent.click(autoplayButton)
      expect(autoplayButton).toHaveAttribute('aria-label', 'Play')
      expect(screen.queryByTestId('PauseIcon')).toBeNull()
      expect(screen.queryByTestId('PlayIcon')).toBeInTheDocument()

      fireEvent.click(autoplayButton)
      expect(screen.queryByTestId('PlayIcon')).toBeNull()
      expect(screen.queryByTestId('PauseIcon')).toBeInTheDocument()

      fireEvent.click(nextButton)
      expect(autoplayButton).toHaveAttribute('aria-label', 'Play')
      expect(screen.queryByTestId('PauseIcon')).toBeNull()
      expect(screen.queryByTestId('PlayIcon')).toBeInTheDocument()
    })

    it('vertical swipe does not change page', () => {
      render(<Carousel items={getTestItems(3)} />)
      const innerWrap = screen.getByTestId('CarouselInnerWrap')

      fireEvent.touchStart(innerWrap, { touches: [{ clientX: 100, clientY: 0 }] })
      fireEvent.touchEnd(innerWrap, { changedTouches: [{ clientX: 60, clientY: 100 }] })
      expect(innerWrap).toHaveStyle('margin-left: calc(-100% * 0);')
    })

    it('inactive slides have aria-hidden and inert', () => {
      render(<Carousel items={getTestItems(3)} />)
      const items = screen.getAllByTestId('CarouselItem')

      expect(items[0]).not.toHaveAttribute('aria-hidden')
      expect(items[1]).toHaveAttribute('aria-hidden', 'true')
      expect(items[2]).toHaveAttribute('aria-hidden', 'true')
    })

    it('onPageChange fires in uncontrolled mode', () => {
      const spy = jest.fn()
      render(<Carousel items={getTestItems(3)} onPageChange={spy} />)
      const nextButton = screen.getByTestId('NextButton')

      fireEvent.click(nextButton)
      expect(spy).toHaveBeenCalledWith(2)
    })

    it('onPageChange fires alongside setCurrentPage in controlled mode', () => {
      const onPageChange = jest.fn()
      const setCurrentPage = jest.fn()
      render(
        <Carousel
          items={getTestItems(3)}
          currentPage={1}
          setCurrentPage={setCurrentPage}
          onPageChange={onPageChange}
        />,
      )
      const nextButton = screen.getByTestId('NextButton')

      fireEvent.click(nextButton)
      expect(setCurrentPage).toHaveBeenCalledWith(2)
      expect(onPageChange).toHaveBeenCalledWith(2)
    })

    it('controlled mode', () => {
      const ControlledCarousel = () => {
        const [currentPage, setCurrentPage] = useState(1)
        return (
          <Carousel
            items={getTestItems(3)}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )
      }
      render(<ControlledCarousel />)
      const previousButton = screen.getByTestId('PreviousButton')
      const nextButton = screen.getByTestId('NextButton')
      const innerWrap = screen.getByTestId('CarouselInnerWrap')

      expect(innerWrap).toHaveStyle('width: calc(100% * 3);')
      expect(innerWrap).toHaveStyle('margin-left: calc(-100% * 0);')
      fireEvent.click(nextButton)
      expect(innerWrap).toHaveStyle('margin-left: calc(-100% * 1);')
      fireEvent.click(previousButton)
      expect(innerWrap).toHaveStyle('margin-left: calc(-100% * 0);')
    })

    it('single-item carousel hides arrows and dots', () => {
      render(<Carousel items={getTestItems(1)} />)
      const previousButton = screen.queryByTestId('PreviousButton')
      const nextButton = screen.queryByTestId('NextButton')
      const dotWrap = screen.queryByTestId('DotWrap')

      expect(previousButton).toBeNull()
      expect(nextButton).toBeNull()
      expect(dotWrap).toBeNull()
    })

    it('autoplay timer advances page', () => {
      jest.useFakeTimers()
      render(<Carousel items={getTestItems(3)} autoplay="on" />)
      const innerWrap = screen.getByTestId('CarouselInnerWrap')

      expect(innerWrap).toHaveStyle('margin-left: calc(-100% * 0);')

      act(() => {
        jest.advanceTimersByTime(3000)
      })
      expect(innerWrap).toHaveStyle('margin-left: calc(-100% * 1);')

      act(() => {
        jest.advanceTimersByTime(3000)
      })
      expect(innerWrap).toHaveStyle('margin-left: calc(-100% * 2);')

      jest.useRealTimers()
    })
  })

  describe('Ref', () => {
    it('exposes HTMLDivElement', () => {
      const ref = createRef<HTMLDivElement>()
      render(<Carousel ref={ref} items={getTestItems(3)} />)

      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })
  })

  describe('Accessibility', () => {
    it('no axe violations', async () => {
      const { container } = render(<Carousel items={getTestItems(3)} />)

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
