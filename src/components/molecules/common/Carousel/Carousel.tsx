'use client'
import { useTranslations } from 'next-intl'
import {
  forwardRef,
  PropsWithChildren,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'

import { useTouch } from '@/utils/hooks/useTouch'
import { cn } from '@/utils/utils'

import { innerWrapClass } from './Carousel.style'
import { CarouselControls } from './CarouselControls/CarouselControls'

export type CarouselProps = {
  /** for passing custom tailwind classes */
  className?: string
  /** children length */
  pages: number
  /** optional label of component */
  label?: string
  /** for setting width as tailwind class */
  width?: string
  /** aspect ratio of carousel as tailwind class  */
  ratio?: string
  /** optional current page for external control. */
  currentPage?: number
  /** optional boolean for autoplay */
  autoplay?: boolean
  /** optional interval if autoplay is enabled */
  autoplayInterval?: number
  /** optional boolean for autoplay stopped state */
  autoplayStopped?: boolean
  /** optional boolean for hiding carousel arrows. */
  hideArrows?: boolean
  /** optional boolean for hiding carousel control dotts. */
  hideControlDotts?: boolean
  /** optional set current page fn for external control. */
  setCurrentPage?: (page: number) => void
}

/** Carousel component can display multiple panels or images controled by arrows and dotts. Children should be wrapped in CarouselItem. USE CLIENT */
export const Carousel = forwardRef<HTMLDivElement | null, PropsWithChildren<CarouselProps>>(
  (
    {
      className,
      pages,
      label,
      width = 'w-full',
      ratio = 'aspect-video',
      currentPage = 1,
      autoplay,
      autoplayInterval = 3000,
      autoplayStopped,
      hideArrows,
      hideControlDotts,
      children,
      setCurrentPage,
    },
    ref,
  ) => {
    const t = useTranslations('Components')
    const [internalCurrentPage, setInternalCurrentPage] = useState(currentPage)
    const [isPaused, setIsPaused] = useState(autoplayStopped)
    const selectedPage = currentPage && setCurrentPage ? currentPage : internalCurrentPage

    const handlePageChange = useCallback(
      (page: number, shouldPause: boolean = false) => {
        if (setCurrentPage) {
          setCurrentPage(page)
        } else {
          setInternalCurrentPage(page)
        }
        if (autoplay && !isPaused && shouldPause) {
          setIsPaused(true)
        }
      },
      [autoplay, isPaused, setIsPaused, setCurrentPage],
    )

    const handleSwipe = useCallback(
      (value: { x: number; y: number }) => {
        if (value.x > 0 && Math.abs(value.x) > 30) {
          handlePageChange(selectedPage === 1 ? pages : selectedPage - 1, true)
        } else if (value.x < 0 && Math.abs(value.x) > 30) {
          handlePageChange(selectedPage === pages ? 1 : selectedPage + 1, true)
        }
      },
      [pages, selectedPage, handlePageChange],
    )

    const { componentRef } = useTouch({ onSwipe: handleSwipe })
    useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(
      ref,
      () => componentRef.current,
    )

    useEffect(() => {
      let sliderInterval: ReturnType<typeof setInterval>
      if (autoplay && !isPaused) {
        sliderInterval = setInterval(() => {
          handlePageChange(selectedPage === pages ? 1 : selectedPage + 1)
        }, autoplayInterval)
      }
      return () => {
        clearInterval(sliderInterval)
      }
    }, [selectedPage, autoplay, isPaused, pages, autoplayInterval, handlePageChange])

    return (
      <div
        className={cn('Carousel', 'group relative flex items-center overflow-hidden', className)}
        ref={componentRef}
        role="region"
        aria-roledescription="carousel"
        aria-label={label || t('carousel')}
        data-testid="Carousel"
      >
        <div
          className={cn('CarouselRatioWrap', 'relative', width, ratio)}
          data-testid="CarouselRatioWrap"
        >
          <div
            className={cn('CarouselInnerWrap', 'max-h-full', innerWrapClass)}
            style={{
              width: `calc(100% * ${pages})`,
              marginLeft: `calc(-100% * ${selectedPage - 1})`,
            }}
            data-testid="CarouselInnerWrap"
          >
            {children}
          </div>
        </div>
        <CarouselControls
          selectedPage={selectedPage}
          pages={pages}
          autoplay={autoplay}
          isPaused={isPaused}
          hideArrows={hideArrows}
          hideControlDotts={hideControlDotts}
          setIsPaused={setIsPaused}
          onPageChange={handlePageChange}
        />
      </div>
    )
  },
)

Carousel.displayName = 'Carousel'
