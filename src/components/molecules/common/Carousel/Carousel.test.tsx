import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef, useState } from 'react'

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
  it('default', () => {
    render(<Carousel items={getTestItems(3)} className="className" ratio="aspect-video" />)
    const carouselTestId = screen.getByTestId('Carousel')
    const panelTestIds = screen.getAllByTestId('panel')
    const carouselRatioWrapTestId = screen.getByTestId('CarouselRatioWrap')
    const carouselInnerWrapTestId = screen.getByTestId('CarouselInnerWrap')

    expect(carouselTestId).toBeInTheDocument()
    expect(carouselTestId).toHaveClass('className')
    expect(carouselTestId).toHaveAttribute('role', 'region')
    expect(carouselTestId).toHaveAttribute('aria-roledescription', 'carousel')
    expect(carouselTestId).toHaveAttribute('aria-label', 'Carousel')
    expect(carouselRatioWrapTestId).toBeInTheDocument()
    expect(carouselRatioWrapTestId).toHaveClass('aspect-video')
    expect(carouselInnerWrapTestId).toBeInTheDocument()
    expect(carouselInnerWrapTestId).toHaveStyle('width: calc(100% * 3);')
    expect(carouselInnerWrapTestId).toHaveStyle('margin-left: calc(-100% * 0);')
    expect(panelTestIds).toHaveLength(3)
  })

  it('nextPage', () => {
    render(<Carousel items={getTestItems(3)} />)
    const nextButtonTestId = screen.getByTestId('NextButton')
    const carouselInnerWrapTestId = screen.getByTestId('CarouselInnerWrap')

    fireEvent.click(nextButtonTestId)
    expect(carouselInnerWrapTestId).toHaveStyle('margin-left: calc(-100% * 1);')
  })

  it('previousPage', () => {
    render(<Carousel items={getTestItems(3)} />)
    const previousButtonTestId = screen.getByTestId('PreviousButton')
    const carouselInnerWrapTestId = screen.getByTestId('CarouselInnerWrap')

    fireEvent.click(previousButtonTestId)
    expect(carouselInnerWrapTestId).toHaveStyle('margin-left: calc(-100% * 3);')
  })

  it('swipe', () => {
    render(<Carousel items={getTestItems(3)} />)

    const carouselInnerWrapTestId = screen.getByTestId('CarouselInnerWrap')

    expect(carouselInnerWrapTestId).toHaveStyle('margin-left: calc(-100% * 0);')

    fireEvent.touchStart(carouselInnerWrapTestId, { touches: [{ clientX: 100 }] })
    fireEvent.touchEnd(carouselInnerWrapTestId, { changedTouches: [{ clientX: 50 }] })

    expect(carouselInnerWrapTestId).toHaveStyle('margin-left: calc(-100% * 1);')

    fireEvent.touchStart(carouselInnerWrapTestId, { touches: [{ clientX: 50 }] })
    fireEvent.touchEnd(carouselInnerWrapTestId, { changedTouches: [{ clientX: 100 }] })

    expect(carouselInnerWrapTestId).toHaveStyle('margin-left: calc(-100% * 0);')
  })

  it('label', () => {
    render(<Carousel items={getTestItems(3)} label="New Carousel" />)
    const carouselTestId = screen.getByTestId('Carousel')

    expect(carouselTestId).toHaveAttribute('aria-label', 'New Carousel')
  })

  it('autoplay', () => {
    render(<Carousel items={getTestItems(3)} autoplay="on" />)
    const previousTestId = screen.queryByTestId('PreviousButton')
    const nextTestId = screen.getByTestId('NextButton')
    const autoplayTestId = screen.getByTestId('AutoplayButton')
    const dottsTestId = screen.queryByTestId('DottWrap')
    const playIconQuery = screen.queryByTestId('PlayIcon')
    const pauseIconQuery = screen.queryByTestId('PauseIcon')

    expect(previousTestId).toBeInTheDocument()
    expect(previousTestId).toHaveAttribute('aria-label', 'previous page 3')
    expect(nextTestId).toBeInTheDocument()
    expect(nextTestId).toHaveAttribute('aria-label', 'next page 2')
    expect(autoplayTestId).toBeInTheDocument()
    expect(dottsTestId).toBeInTheDocument()
    expect(playIconQuery).toBeNull()
    expect(pauseIconQuery).toBeInTheDocument()
    expect(autoplayTestId).toHaveAttribute('aria-label', 'Pause')

    fireEvent.click(autoplayTestId)
    const playIconQuery1 = screen.queryByTestId('PlayIcon')
    const pauseIconQuery1 = screen.queryByTestId('PauseIcon')
    expect(autoplayTestId).toHaveAttribute('aria-label', 'Play')
    expect(pauseIconQuery1).toBeNull()
    expect(playIconQuery1).toBeInTheDocument()

    fireEvent.click(autoplayTestId)
    const playIconQuery2 = screen.queryByTestId('PlayIcon')
    const pauseIconQuery2 = screen.queryByTestId('PauseIcon')
    expect(playIconQuery2).toBeNull()
    expect(pauseIconQuery2).toBeInTheDocument()

    fireEvent.click(nextTestId)
    const playIconQuery3 = screen.queryByTestId('PlayIcon')
    const pauseIconQuery3 = screen.queryByTestId('PauseIcon')
    expect(autoplayTestId).toHaveAttribute('aria-label', 'Play')
    expect(pauseIconQuery3).toBeNull()
    expect(playIconQuery3).toBeInTheDocument()
  })

  it('hide', () => {
    render(<Carousel items={getTestItems(3)} hideArrows hideControlDotts />)
    const previousTestId = screen.queryByTestId('PreviousButton')
    const nextTestId = screen.queryByTestId('NextButton')
    const autoplayTestId = screen.queryByTestId('AutoplayButton')
    const dottsTestId = screen.queryByTestId('DottWrap')

    expect(previousTestId).toBeNull()
    expect(nextTestId).toBeNull()
    expect(autoplayTestId).toBeNull()
    expect(dottsTestId).toBeNull()
  })

  it('controled', () => {
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
    const previousTestId = screen.getByTestId('PreviousButton')
    const nextTestId = screen.getByTestId('NextButton')
    const carouselInnerWrapTestId = screen.getByTestId('CarouselInnerWrap')

    expect(carouselInnerWrapTestId).toHaveStyle('width: calc(100% * 3);')
    expect(carouselInnerWrapTestId).toHaveStyle('margin-left: calc(-100% * 0);')
    fireEvent.click(nextTestId)
    expect(carouselInnerWrapTestId).toHaveStyle('margin-left: calc(-100% * 1);')
    fireEvent.click(previousTestId)
    expect(carouselInnerWrapTestId).toHaveStyle('margin-left: calc(-100% * 0);')
  })

  it('noItemsLabel', () => {
    const label = 'No content available'
    render(<Carousel noItemsLabel={label} />)
    const emptyMessage = screen.getByText(label)
    const carouselItemTestId = screen.getByTestId('CarouselItem')

    expect(emptyMessage).toBeInTheDocument()
    expect(carouselItemTestId).toHaveAttribute('aria-label', label)
    expect(carouselItemTestId).toHaveAttribute('aria-current', 'true')
  })

  it('ref', () => {
    const ref = createRef<HTMLDivElement>()
    render(<Carousel ref={ref} items={getTestItems(3)} />)

    expect(ref.current).not.toBeNull()
    expect(ref.current?.focus).toBeDefined()

    const focusMock = jest.spyOn(ref.current!, 'focus').mockImplementation(() => {})
    ref.current?.focus()

    expect(focusMock).toHaveBeenCalled()
    focusMock.mockRestore()
  })

  it('withChildren', () => {
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
    const carouselTestId = screen.getByTestId('Carousel')
    const panelTestIds = screen.getAllByTestId('panel-child')
    const carouselInnerWrapTestId = screen.getByTestId('CarouselInnerWrap')

    expect(carouselTestId).toBeInTheDocument()
    expect(carouselTestId).toHaveClass('className')
    expect(carouselInnerWrapTestId).toHaveStyle('width: calc(100% * 3);')
    expect(panelTestIds).toHaveLength(3)
  })

  it('axe', async () => {
    const { container } = render(<Carousel items={getTestItems(3)} />)

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
