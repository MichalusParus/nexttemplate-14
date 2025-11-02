import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'

import { fireEvent, render, screen } from '../../../../../../.jest/customRender'
import { CarouselControls } from '.'

expect.extend(toHaveNoViolations)

describe('CarouselControls', () => {
  it('default', () => {
    render(
      <CarouselControls
        selectedPage={1}
        pages={3}
        autoplay={'off'}
        isPaused={false}
        setIsPaused={() => {}}
        onPageChange={() => {}}
      />,
    )
    const previousTestId = screen.queryByTestId('PreviousButton')
    const nextTestId = screen.queryByTestId('NextButton')
    const autoplayTestId = screen.queryByTestId('AutoplayButton')
    const dottsTestId = screen.queryByTestId('DottWrap')

    expect(previousTestId).toBeInTheDocument()
    expect(nextTestId).toBeInTheDocument()
    expect(autoplayTestId).toBeNull()
    expect(dottsTestId).toBeInTheDocument()
  })

  it('autoplay', () => {
    const spy = jest.fn()
    render(
      <CarouselControls
        selectedPage={1}
        pages={3}
        autoplay={'on'}
        isPaused={false}
        setIsPaused={spy}
        onPageChange={() => {}}
      />,
    )
    const previousTestId = screen.queryByTestId('PreviousButton')
    const nextTestId = screen.queryByTestId('NextButton')
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
    expect(spy).toHaveBeenCalled()
  })

  it('isPaused', () => {
    const spy = jest.fn()
    render(
      <CarouselControls
        selectedPage={1}
        pages={3}
        autoplay={'on'}
        isPaused
        setIsPaused={spy}
        onPageChange={() => {}}
      />,
    )
    const autoplayTestId = screen.getByTestId('AutoplayButton')
    const playIconQuery = screen.queryByTestId('PlayIcon')
    const pauseIconQuery = screen.queryByTestId('PauseIcon')

    expect(playIconQuery).toBeInTheDocument()
    expect(pauseIconQuery).toBeNull()
    expect(autoplayTestId).toHaveAttribute('aria-label', 'Play')
  })

  it('hide', () => {
    render(
      <CarouselControls
        selectedPage={1}
        pages={3}
        autoplay={'off'}
        isPaused={false}
        hideArrows
        hideControlDotts
        setIsPaused={() => {}}
        onPageChange={() => {}}
      />,
    )
    const previousTestId = screen.queryByTestId('PreviousButton')
    const nextTestId = screen.queryByTestId('NextButton')
    const autoplayTestId = screen.queryByTestId('AutoplayButton')
    const dottsTestId = screen.queryByTestId('DottWrap')

    expect(previousTestId).toBeNull()
    expect(nextTestId).toBeNull()
    expect(autoplayTestId).toBeNull()
    expect(dottsTestId).toBeNull()
  })

  it('onPageChange', () => {
    const spy = jest.fn()
    render(
      <CarouselControls
        selectedPage={2}
        pages={3}
        autoplay={'off'}
        isPaused={false}
        setIsPaused={() => {}}
        onPageChange={spy}
      />,
    )
    const previousTestId = screen.getByTestId('PreviousButton')
    const nextTestId = screen.getByTestId('NextButton')
    const dott3TestId = screen.getByTestId('Dott2Button')

    fireEvent.click(previousTestId)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenNthCalledWith(1, 1, true)

    fireEvent.click(nextTestId)
    expect(spy).toHaveBeenCalledTimes(2)
    expect(spy).toHaveBeenNthCalledWith(2, 3, true)

    fireEvent.click(dott3TestId)
    expect(spy).toHaveBeenCalledTimes(3)
    expect(spy).toHaveBeenNthCalledWith(3, 3, true)
  })

  it('axe', async () => {
    const { container } = render(
      <CarouselControls
        selectedPage={1}
        pages={3}
        autoplay={'off'}
        isPaused={false}
        setIsPaused={() => {}}
        onPageChange={() => {}}
      />,
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
