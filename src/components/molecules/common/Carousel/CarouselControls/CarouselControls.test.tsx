import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'

import { fireEvent, render, screen } from '../../../../../../.jest/customRender'
import { CarouselControls } from '.'

expect.extend(toHaveNoViolations)

describe('CarouselControls', () => {
  describe('Semantics', () => {
    it('renders arrows and dots by default', () => {
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
      const previousButton = screen.queryByTestId('PreviousButton')
      const nextButton = screen.queryByTestId('NextButton')
      const autoplayButton = screen.queryByTestId('AutoplayButton')
      const dotWrap = screen.queryByTestId('DotWrap')

      expect(previousButton).toBeInTheDocument()
      expect(nextButton).toBeInTheDocument()
      expect(autoplayButton).toBeNull()
      expect(dotWrap).toBeInTheDocument()
    })

    it('autoplay on shows pause icon and aria-labels', () => {
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
      const previousButton = screen.queryByTestId('PreviousButton')
      const nextButton = screen.queryByTestId('NextButton')
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
      expect(spy).toHaveBeenCalled()
    })

    it('isPaused shows play icon', () => {
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
      const autoplayButton = screen.getByTestId('AutoplayButton')

      expect(screen.queryByTestId('PlayIcon')).toBeInTheDocument()
      expect(screen.queryByTestId('PauseIcon')).toBeNull()
      expect(autoplayButton).toHaveAttribute('aria-label', 'Play')
    })

    it('single page hides arrows and dots', () => {
      render(
        <CarouselControls
          selectedPage={1}
          pages={1}
          autoplay={'off'}
          isPaused={false}
          setIsPaused={() => {}}
          onPageChange={() => {}}
        />,
      )
      const previousButton = screen.queryByTestId('PreviousButton')
      const nextButton = screen.queryByTestId('NextButton')
      const dotWrap = screen.queryByTestId('DotWrap')

      expect(previousButton).toBeNull()
      expect(nextButton).toBeNull()
      expect(dotWrap).toBeNull()
    })

    it('hide removes all controls', () => {
      render(
        <CarouselControls
          selectedPage={1}
          pages={3}
          autoplay={'off'}
          isPaused={false}
          hideArrows
          hideControlDots
          setIsPaused={() => {}}
          onPageChange={() => {}}
        />,
      )
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
    it('onPageChange fires on prev, next, and dot clicks', () => {
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
      const previousButton = screen.getByTestId('PreviousButton')
      const nextButton = screen.getByTestId('NextButton')
      const dotButton = screen.getByTestId('Dot2Button')

      fireEvent.click(previousButton)
      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenNthCalledWith(1, 1, true)

      fireEvent.click(nextButton)
      expect(spy).toHaveBeenCalledTimes(2)
      expect(spy).toHaveBeenNthCalledWith(2, 3, true)

      fireEvent.click(dotButton)
      expect(spy).toHaveBeenCalledTimes(3)
      expect(spy).toHaveBeenNthCalledWith(3, 3, true)
    })

    it('dot click does not propagate to parent', () => {
      const parentSpy = jest.fn()
      const onPageChange = jest.fn()
      render(
        <div role="presentation" onClick={parentSpy}>
          <CarouselControls
            selectedPage={1}
            pages={3}
            autoplay={'off'}
            isPaused={false}
            setIsPaused={() => {}}
            onPageChange={onPageChange}
          />
        </div>,
      )
      const dotButton = screen.getByTestId('Dot0Button')

      fireEvent.click(dotButton)
      expect(onPageChange).toHaveBeenCalledWith(1, true)
      expect(parentSpy).not.toHaveBeenCalled()
    })
  })

  describe('Accessibility', () => {
    it('no axe violations', async () => {
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
})
